import { Layer, LayerType, ArrowLayer, ComponentLayer, SysComponent } from "@/types/canvas"
import { COMPONENT_LABELS } from "./sys-component-layer"

export interface StageDescription {
  stage: number
  label: string
  fromName: string
  toName: string
  arrowIds: string[]
  hasError: boolean
}

export interface ArchitectureGraphAnalysis {
  arrowStages: Record<string, number>
  nodeStages: Record<string, number>
  totalStages: number
  stageDescriptions: StageDescription[]
  haltedArrowIds: Set<string>
  failingArrowIds: Set<string>
  failedNodeIds: Set<string>
}

function getComponentName(layer?: Layer): string {
  if (!layer) return "Unknown"
  if (layer.type === LayerType.Component) {
    const comp = layer as ComponentLayer
    if (comp.value && comp.value.trim().length > 0) {
      return comp.value.trim()
    }
    return COMPONENT_LABELS[comp.componentType] || comp.componentType || "Component"
  }
  if (layer.value && layer.value.trim().length > 0) {
    return layer.value.trim()
  }
  return "Node"
}

const CLIENT_COMPONENTS = new Set([
  SysComponent.WebClient,
  SysComponent.MobileClient,
  SysComponent.DesktopClient,
  SysComponent.IoTDevice,
])

/**
 * Analyzes the canvas architecture DAG:
 * - Computes topological hop stages for each arrow (Stage 0, Stage 1, Stage 2, ...)
 * - Tracks causal request propagation from clients/roots to downstreams
 * - Identifies failed nodes, failing arrows, and downstream halted branches in Chaos mode
 */
export function analyzeArchitectureGraph(
  layers: ReadonlyMap<string, Layer> | Map<string, Layer>
): ArchitectureGraphAnalysis {
  const arrowStages: Record<string, number> = {}
  const nodeStages: Record<string, number> = {}
  const haltedArrowIds = new Set<string>()
  const failingArrowIds = new Set<string>()
  const failedNodeIds = new Set<string>()

  // 1. Identify all arrows and components
  const arrows: Array<{ id: string; arrow: ArrowLayer }> = []
  const componentIds = new Set<string>()

  layers.forEach((layer, id) => {
    if (layer.type === LayerType.Arrow) {
      arrows.push({ id, arrow: layer as ArrowLayer })
    } else if (layer.type === LayerType.Component) {
      componentIds.add(id)
      const comp = layer as ComponentLayer
      if (comp.status === "error") {
        failedNodeIds.add(id)
      }
    }
  })

  // If no arrows, return default empty analysis
  if (arrows.length === 0) {
    return {
      arrowStages: {},
      nodeStages: {},
      totalStages: 1,
      stageDescriptions: [],
      haltedArrowIds,
      failingArrowIds,
      failedNodeIds,
    }
  }

  // 2. Build adjacency graph (directed: from -> to)
  const outgoing = new Map<string, Array<{ arrowId: string; toId: string }>>()
  const incoming = new Map<string, Array<{ arrowId: string; fromId: string }>>()

  for (const { id, arrow } of arrows) {
    const { fromLayerId, toLayerId } = arrow
    if (!outgoing.has(fromLayerId)) outgoing.set(fromLayerId, [])
    if (!incoming.has(toLayerId)) incoming.set(toLayerId, [])

    outgoing.get(fromLayerId)!.push({ arrowId: id, toId: toLayerId })
    incoming.get(toLayerId)!.push({ arrowId: id, fromId: fromLayerId })

    // If destination node is failed, mark arrow as failing
    if (failedNodeIds.has(toLayerId)) {
      failingArrowIds.add(id)
    }
  }

  // 3. Find source / root nodes
  // Priority:
  // a) Client components with in-degree === 0
  // b) Any component with in-degree === 0 that has outgoing arrows
  // c) If cycles/all have incoming, pick component with smallest x (leftmost ingress)
  const connectedNodes = new Set<string>()
  for (const { arrow } of arrows) {
    connectedNodes.add(arrow.fromLayerId)
    connectedNodes.add(arrow.toLayerId)
  }

  const roots: string[] = []
  const clientRoots: string[] = []

  connectedNodes.forEach((nodeId) => {
    const inCount = incoming.get(nodeId)?.length || 0
    if (inCount === 0) {
      const nodeLayer = layers.get(nodeId)
      if (
        nodeLayer &&
        nodeLayer.type === LayerType.Component &&
        CLIENT_COMPONENTS.has((nodeLayer as ComponentLayer).componentType)
      ) {
        clientRoots.push(nodeId)
      } else {
        roots.push(nodeId)
      }
    }
  })

  const effectiveRoots = clientRoots.length > 0 ? [...clientRoots, ...roots] : roots

  // Fallback if graph is a pure cycle: pick leftmost node
  if (effectiveRoots.length === 0 && connectedNodes.size > 0) {
    let minX = Infinity
    let leftmostId = ""
    connectedNodes.forEach((nodeId) => {
      const l = layers.get(nodeId)
      if (l && l.x < minX) {
        minX = l.x
        leftmostId = nodeId
      }
    })
    if (leftmostId) effectiveRoots.push(leftmostId)
  }

  // 4. BFS Traversal to assign stages (hop depth)
  const queue: Array<{ nodeId: string; stage: number; path: Set<string> }> = []
  for (const root of effectiveRoots) {
    nodeStages[root] = 0
    queue.push({ nodeId: root, stage: 0, path: new Set([root]) })
  }

  while (queue.length > 0) {
    const { nodeId, stage, path } = queue.shift()!
    const outEdges = outgoing.get(nodeId) || []

    for (const edge of outEdges) {
      // Assign arrow stage (minimum hop distance from ingress)
      if (arrowStages[edge.arrowId] === undefined) {
        arrowStages[edge.arrowId] = stage
      } else {
        arrowStages[edge.arrowId] = Math.min(arrowStages[edge.arrowId], stage)
      }

      // Update destination node stage
      const nextStage = stage + 1
      if (nodeStages[edge.toId] === undefined || nextStage > nodeStages[edge.toId]) {
        nodeStages[edge.toId] = nextStage
      }

      // Avoid infinite cycles (guard with max hop limit)
      if (!path.has(edge.toId) && nextStage < 16) {
        const nextPath = new Set(path)
        nextPath.add(edge.toId)
        queue.push({ nodeId: edge.toId, stage: nextStage, path: nextPath })
      }
    }
  }

  // 5. Handle any disconnected or island arrows
  for (const { id } of arrows) {
    if (arrowStages[id] === undefined) {
      arrowStages[id] = 0
    }
  }

  // 6. Compute total stages
  const stageValues = Object.values(arrowStages)
  const totalStages = stageValues.length > 0 ? Math.max(1, ...stageValues.map((s) => s + 1)) : 1

  // 7. Cascade Failure Analysis (for Chaos Mode)
  // Any arrow starting from a failed node is halted
  // Any downstream path originating from a failed node is also halted
  if (failedNodeIds.size > 0) {
    const failureQueue: string[] = Array.from(failedNodeIds)
    const visitedFailed = new Set<string>(failedNodeIds)

    while (failureQueue.length > 0) {
      const failedId = failureQueue.shift()!
      const outEdges = outgoing.get(failedId) || []
      for (const edge of outEdges) {
        haltedArrowIds.add(edge.arrowId)
        if (!visitedFailed.has(edge.toId)) {
          visitedFailed.add(edge.toId)
          failureQueue.push(edge.toId)
        }
      }
    }
  }

  // 8. Generate human-readable descriptions for each stage
  const stageGroups: Record<number, Array<{ id: string; arrow: ArrowLayer }>> = {}
  for (const { id, arrow } of arrows) {
    const st = arrowStages[id] ?? 0
    if (!stageGroups[st]) stageGroups[st] = []
    stageGroups[st].push({ id, arrow })
  }

  const stageDescriptions: StageDescription[] = []
  for (let s = 0; s < totalStages; s++) {
    const group = stageGroups[s] || []
    if (group.length > 0) {
      const first = group[0]
      const fromL = layers.get(first.arrow.fromLayerId)
      const toL = layers.get(first.arrow.toLayerId)
      const fromName = getComponentName(fromL)
      const toName = getComponentName(toL)
      const hasError = group.some((g) => failingArrowIds.has(g.id))

      let label = `${fromName} ➔ ${toName}`
      if (group.length > 1) {
        label += ` (+${group.length - 1} parallel)`
      }

      stageDescriptions.push({
        stage: s,
        label,
        fromName,
        toName,
        arrowIds: group.map((g) => g.id),
        hasError,
      })
    } else {
      stageDescriptions.push({
        stage: s,
        label: `Stage ${s + 1}`,
        fromName: "Component",
        toName: "Component",
        arrowIds: [],
        hasError: false,
      })
    }
  }

  return {
    arrowStages,
    nodeStages,
    totalStages,
    stageDescriptions,
    haltedArrowIds,
    failingArrowIds,
    failedNodeIds,
  }
}
