import { Layer, LayerType, ArrowLayer } from "@/types/canvas"

interface AutoLayoutNode {
  id: string
  x: number
  y: number
  width: number
  height: number
  rank: number
  inDegree: number
}

/**
 * Intelligent topological auto-layout for architecture diagrams.
 * Organizes connected services into logical left-to-right tiers:
 * Clients -> Gateways -> Microservices -> Caches/Databases
 */
export function computeAutoLayout(
  layers: Map<string, Layer> | ReadonlyMap<string, Layer>,
  layerIds: readonly string[]
): Map<string, { x: number; y: number }> {
  const result = new Map<string, { x: number; y: number }>()

  // 1. Filter out only node layers (components, rectangles, notes, docs - excluding sections which are containers)
  const nodeIds = layerIds.filter((id) => {
    const l = layers.get(id)
    return (
      l &&
      l.type !== LayerType.Arrow &&
      l.type !== LayerType.Path &&
      l.type !== LayerType.Section
    )
  })

  if (nodeIds.length === 0) return result

  const nodes = new Map<string, AutoLayoutNode>()
  const adj = new Map<string, string[]>()
  const reverseAdj = new Map<string, string[]>()

  nodeIds.forEach((id) => {
    const l = layers.get(id)!
    nodes.set(id, {
      id,
      x: l.x,
      y: l.y,
      width: l.width || 120,
      height: l.height || 60,
      rank: 0,
      inDegree: 0,
    })
    adj.set(id, [])
    reverseAdj.set(id, [])
  })

  // 2. Build graph from arrows
  layerIds.forEach((id) => {
    const l = layers.get(id)
    if (l && l.type === LayerType.Arrow) {
      const arrow = l as ArrowLayer
      const from = arrow.fromLayerId
      const to = arrow.toLayerId
      if (nodes.has(from) && nodes.has(to) && from !== to) {
        adj.get(from)!.push(to)
        reverseAdj.get(to)!.push(from)
        nodes.get(to)!.inDegree += 1
      }
    }
  })

  // 3. Assign topological rank
  const queue: string[] = []
  nodes.forEach((node) => {
    if (node.inDegree === 0) {
      queue.push(node.id)
    }
  })

  // If there are cycles or disconnected components with no 0-in-degree nodes
  if (queue.length === 0 && nodeIds.length > 0) {
    queue.push(nodeIds[0])
  }

  const visited = new Set<string>()
  while (queue.length > 0) {
    const currId = queue.shift()!
    if (visited.has(currId)) continue
    visited.add(currId)

    const currNode = nodes.get(currId)!
    const children = adj.get(currId) || []

    children.forEach((childId) => {
      const childNode = nodes.get(childId)
      if (childNode) {
        childNode.rank = Math.max(childNode.rank, currNode.rank + 1)
        queue.push(childId)
      }
    })
  }

  // Handle any nodes that were unvisited (disconnected components)
  nodeIds.forEach((id) => {
    if (!visited.has(id)) {
      const node = nodes.get(id)!
      node.rank = 0
    }
  })

  // 4. Group nodes by rank
  const rankGroups = new Map<number, AutoLayoutNode[]>()
  nodes.forEach((node) => {
    if (!rankGroups.has(node.rank)) {
      rankGroups.set(node.rank, [])
    }
    rankGroups.get(node.rank)!.push(node)
  })

  // 5. Position nodes with comfortable spacing
  const HORIZONTAL_COL_GAP = 280
  const VERTICAL_ROW_GAP = 60
  const START_X = 150
  const START_Y = 150

  const sortedRanks = Array.from(rankGroups.keys()).sort((a, b) => a - b)

  // Find max column height for vertical centering
  let maxColHeight = 0
  sortedRanks.forEach((rank) => {
    const colNodes = rankGroups.get(rank)!
    const totalH = colNodes.reduce((sum, n) => sum + n.height + VERTICAL_ROW_GAP, 0)
    maxColHeight = Math.max(maxColHeight, totalH)
  })

  sortedRanks.forEach((rank, colIdx) => {
    const colNodes = rankGroups.get(rank)!
    const colTotalH = colNodes.reduce((sum, n) => sum + n.height + VERTICAL_ROW_GAP, 0)
    const yOffset = (maxColHeight - colTotalH) / 2

    let currY = START_Y + Math.max(0, yOffset)
    const currX = START_X + colIdx * HORIZONTAL_COL_GAP

    colNodes.forEach((node) => {
      result.set(node.id, {
        x: currX,
        y: currY,
      })
      currY += node.height + VERTICAL_ROW_GAP
    })
  })

  return result
}
