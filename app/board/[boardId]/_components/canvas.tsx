"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Camera, CanvasMode, CanvasState, Color,
  LayerType, Point, Side, XYWH, SysComponent, DocType,
} from "@/types/canvas"
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import {
  useCanRedo, useHistory, useCanUndo,
  useMutation, useStorage, useOthersMapped, useSelf,
} from "@liveblocks/react/suspense"
import { CursorsPresence } from "./cursors-presence"
import {
  cn,
  colorToCss, connectionIdToColor,
  findIntersectinglayersWithRectangle,
  penPointsToPathLayer, pointerEventToCanvasPoint, resizeBounds,
} from "@/lib/utils"
import { nanoid } from "nanoid"
import { LiveObject } from "@liveblocks/client"
import { LayerPreview } from "./layer-preview"
import { SelectionBox } from "./selection-box"
import { SelectionTools } from "./selection-tools"
import { Path } from "./path"
import { useDisableScrollBounce } from "@/hooks/use-disable-scroll-bounce"
import { useDeleteLayers } from "@/hooks/use-delete-layers"
import { ComponentLibrary } from "./component-library"
import { getAnchorPoint, computeBestAnchors } from "./sys-component-layer"
import { ZoomControls } from "./zoom-controls"
import { CanvasContextMenu } from "./context-menu"
import { ShortcutsModal } from "./shortcuts-modal"
import { ComponentRenameDialog } from "./component-rename-dialog"
import { Minimap } from "./minimap"
import { SimulationProvider, useSimulation } from "./simulation-context"
import { ArchitectureSimulator } from "./architecture-simulator"
import { ArchitectureTourBar } from "./architecture-tour-bar"
import { useCanvasTheme } from "./canvas-theme-context"
import { exportDiagram } from "./export-utils"

// ─── Preview line while connecting ──────────────────────────────────────────
function ConnectingPreviewLine({ fromLayerId, to }: { fromLayerId: string; to: Point }) {
  const layer = useStorage((root) => root.layers.get(fromLayerId))
  if (!layer) return null
  const cx = layer.x + layer.width  / 2
  const cy = layer.y + layer.height / 2
  return (
    <line
      x1={cx} y1={cy} x2={to.x} y2={to.y}
      stroke="#6366f1" strokeWidth={2} strokeDasharray="6 4"
      style={{ pointerEvents: "none" }}
    />
  )
}

const MAX_LAYERS = 200

interface CanvasProps { boardId: string }

export const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <SimulationProvider>
      <CanvasInner boardId={boardId} />
    </SimulationProvider>
  )
}

const CanvasInner = ({ boardId }: CanvasProps) => {
  const { theme } = useCanvasTheme()
  const layerIds = useStorage((root) => root.layerIds)
  const layers = useStorage((root) => root.layers)
  const pencilDraft = useSelf((me) => me.presence.pencilDraft)
  const mySelection = useSelf((me) => me.presence.selection)

  const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 })
  const [lastUsedColour, setLastUsedColor] = useState<Color>({ r: 0, g: 0, b: 0 })
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const [libraryTab, setLibraryTab] = useState<"components" | "specs" | "templates">("components")
  const openSpecs = useCallback(() => {
    setLibraryTab("specs")
    setIsLibraryOpen(true)
  }, [])
  const onDocSelect = useCallback((docType: DocType) => {
    setCanvasState({
      mode: CanvasMode.Inserting,
      layerType: LayerType.Doc,
      docType,
    })
  }, [])
  const [gridType, setGridType] = useState<"dots" | "cross" | "none">("dots")
  const toggleGrid = useCallback(() => {
    setGridType((prev) => (prev === "dots" ? "cross" : prev === "cross" ? "none" : "dots"))
  }, [])
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)
  const [renamingLayerId, setRenamingLayerId] = useState<string | null>(null)
  const [arrowStyle, setArrowStyle] = useState<"curvy" | "sharp">("curvy")
  const [isMinimapOpen, setIsMinimapOpen] = useState(true)

  const { startTour, stopTour, isTourActive } = useSimulation()

  const handleStartTour = useCallback(() => {
    const compIds: string[] = []
    layerIds.forEach((id) => {
      const l = layers.get(id)
      if (l && (l.type === LayerType.Component || l.type === LayerType.Section)) {
        compIds.push(id)
      }
    })
    compIds.sort((a, b) => {
      const la = layers.get(a)
      const lb = layers.get(b)
      if (!la || !lb) return 0
      return la.x - lb.x
    })
    if (compIds.length === 0) {
      layerIds.forEach((id) => {
        const l = layers.get(id)
        if (l && l.type !== LayerType.Arrow) compIds.push(id)
      })
    }
    if (compIds.length > 0) {
      startTour(compIds)
    }
  }, [layerIds, layers, startTour])

  // Layer rendering order: Sections (background zones) -> Shapes -> Components/Notes/Text -> Arrows (on top)
  const sortedLayerIds = useMemo(() => {
    const getPriority = (id: string) => {
      const l = layers.get(id)
      if (!l) return 2
      if (l.type === LayerType.Section) return 0 // background zones
      if (l.type === LayerType.Rectangle || l.type === LayerType.Ellipse || l.type === LayerType.Path) return 1 // shapes
      if (l.type === LayerType.Component || l.type === LayerType.Note || l.type === LayerType.Text) return 2 // components, text, notes
      if (l.type === LayerType.Arrow) return 3 // arrows and arrowheads rendered crisp on top of components!
      return 2
    }
    return [...layerIds].sort((a, b) => getPriority(a) - getPriority(b))
  }, [layerIds, layers])

  const handleFocusTourLayer = useCallback((targetId: string) => {
    const l = layers.get(targetId)
    if (!l) return
    const targetZoom = 1.15
    const centerX = window.innerWidth / 2 - (l.x + l.width / 2) * targetZoom
    const centerY = window.innerHeight / 2 - (l.y + l.height / 2) * targetZoom
    setCamera({ x: centerX, y: centerY, zoom: targetZoom })
  }, [layers])

  const toggleDefaultArrowStyle = useCallback(() => {
    setArrowStyle((s) => s === "sharp" ? "curvy" : "sharp")
  }, [])

  // Track spacebar for pan/grab
  const [isSpacePressed, setIsSpacePressed] = useState(false)

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

  // Clipboard for Copy / Paste
  const clipboardRef = useRef<any[]>([])

  // Preview arrow endpoint while the user has clicked "from" and is moving the mouse
  const [connectPreview, setConnectPreview] = useState<Point | null>(null)

  const svgRef = useRef<SVGSVGElement>(null)

  useDisableScrollBounce()
  const history   = useHistory()
  const canRedo   = useCanRedo()
  const canUndo   = useCanUndo()
  const deleteLayers = useDeleteLayers()

  // ─── ERASER STATE & MUTATIONS ───────────────────────────────────────────
  const isErasingRef = useRef(false)
  const [eraserPoint, setEraserPoint] = useState<Point | null>(null)

  const deleteLayerById = useMutation(
    ({ storage, setMyPresence }, targetId: string) => {
      const liveLayers = storage.get("layers")
      const liveLayerIds = storage.get("layerIds")
      if (!liveLayers.get(targetId)) return

      const arrowsToDelete: string[] = []
      liveLayerIds.forEach((id) => {
        const l = liveLayers.get(id)
        if (l && l.get("type") === LayerType.Arrow) {
          const arrow = l.toObject() as any
          if (arrow.fromLayerId === targetId || arrow.toLayerId === targetId) {
            arrowsToDelete.push(id)
          }
        }
      })

      const toDelete = [targetId, ...arrowsToDelete]
      toDelete.forEach((id) => {
        liveLayers.delete(id)
        const idx = liveLayerIds.indexOf(id)
        if (idx !== -1) {
          liveLayerIds.delete(idx)
        }
      })
      setMyPresence({ selection: [] })
    },
    []
  )

  const eraseAtPoint = useMutation(
    ({ storage, setMyPresence }, point: Point) => {
      const liveLayers = storage.get("layers")
      const liveLayerIds = storage.get("layerIds")
      const R = 22
      const ex1 = point.x - R
      const ey1 = point.y - R
      const ex2 = point.x + R
      const ey2 = point.y + R

      const toDeleteIds: string[] = []

      liveLayerIds.forEach((id) => {
        const l = liveLayers.get(id)
        if (!l) return
        const type = l.get("type")
        const x = l.get("x") || 0
        const y = l.get("y") || 0
        const w = l.get("width") || 10
        const h = l.get("height") || 10

        // Bounding box collision test
        const intersects = !(x > ex2 || x + w < ex1 || y > ey2 || y + h < ey1)
        if (!intersects) return

        if (type === LayerType.Path) {
          // Freehand drawing stroke: check proximity to stroke points
          const pathObj = l.toObject() as any
          const pts = (pathObj?.points as number[][]) || []
          let hit = false
          for (let i = 0; i < pts.length; i++) {
            const px = x + pts[i][0]
            const py = y + pts[i][1]
            if ((px - point.x) ** 2 + (py - point.y) ** 2 <= (R + 12) ** 2) {
              hit = true
              break
            }
          }
          if (hit) toDeleteIds.push(id)
        } else if (type === LayerType.Arrow) {
          // Arrow: hit within bounding box
          toDeleteIds.push(id)
        } else {
          // Component, Text, Note, Section, Rectangle, Ellipse
          toDeleteIds.push(id)
        }
      })

      if (toDeleteIds.length === 0) return

      // Clean up connected arrows
      const connectedArrows: string[] = []
      liveLayerIds.forEach((id) => {
        if (toDeleteIds.includes(id)) return
        const l = liveLayers.get(id)
        if (l && l.get("type") === LayerType.Arrow) {
          const arrow = l.toObject() as any
          if (toDeleteIds.includes(arrow.fromLayerId) || toDeleteIds.includes(arrow.toLayerId)) {
            connectedArrows.push(id)
          }
        }
      })

      const allToDelete = [...toDeleteIds, ...connectedArrows]
      allToDelete.forEach((id) => {
        liveLayers.delete(id)
        const idx = liveLayerIds.indexOf(id)
        if (idx !== -1) {
          liveLayerIds.delete(idx)
        }
      })
      setMyPresence({ selection: [] })
    },
    []
  )

  // Track spacebar key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Space" && !e.repeat) {
        const activeTag = document.activeElement?.tagName.toLowerCase()
        if (activeTag !== "input" && activeTag !== "textarea") {
          e.preventDefault()
          setIsSpacePressed(true)
        }
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setIsSpacePressed(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // ─── INSERT STANDARD LAYER & SECTIONS ───────────────────────────────────
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Section,
      position: Point
    ) => {
      const liveLayers = storage.get("layers")
      if (liveLayers.size >= MAX_LAYERS) return
      const liveLayerIds = storage.get("layerIds")
      const layerId = nanoid()
      const isSection = layerType === LayerType.Section
      const isText = layerType === LayerType.Text
      const isRect = layerType === LayerType.Rectangle
      const isEllipse = layerType === LayerType.Ellipse
      const isNote = layerType === LayerType.Note

      const width = isSection ? 440 : isText ? 240 : isRect ? 180 : isEllipse ? 150 : 150
      const height = isSection ? 300 : isText ? 44 : isRect ? 120 : isEllipse ? 150 : 150

      const defaultFill = isSection
        ? { r: 99, g: 102, b: 241 }
        : isText
        ? (theme === "dark" ? { r: 248, g: 250, b: 252 } : { r: 15, g: 23, b: 42 })
        : isNote
        ? { r: 254, g: 240, b: 138 }
        : lastUsedColour

      const layerData: any = {
        type: layerType,
        x: position.x - (isSection || isText || isRect || isEllipse ? width / 2 : 0),
        y: position.y - (isSection || isText || isRect || isEllipse ? height / 2 : 0),
        height,
        width,
        fill: defaultFill,
        value: isSection ? "Architecture Zone" : isText ? "Text" : undefined,
      }

      if (isText) {
        layerData.fontFamily = "sans"
        layerData.fontSize = 24
        layerData.fontWeight = "normal"
        layerData.fontStyle = "normal"
        layerData.textDecoration = "none"
        layerData.textAlign = "left"
      } else if (isRect) {
        layerData.fillStyle = "solid"
        layerData.strokeWidth = 2
        layerData.strokePattern = "solid"
        layerData.roundness = "rounded"
        layerData.fontFamily = "sans"
        layerData.fontSize = 18
        layerData.fontWeight = "normal"
        layerData.textAlign = "center"
      } else if (isEllipse) {
        layerData.fillStyle = "solid"
        layerData.strokeWidth = 2
        layerData.strokePattern = "solid"
        layerData.fontFamily = "sans"
        layerData.fontSize = 18
        layerData.fontWeight = "normal"
        layerData.textAlign = "center"
      } else if (isNote) {
        layerData.fontFamily = "handwriting"
        layerData.fontSize = 20
        layerData.fontWeight = "normal"
        layerData.textAlign = "center"
      }

      const layer = new LiveObject(layerData)
      if (isSection && liveLayerIds.length > 0) {
        liveLayerIds.insert(layerId, 0)
      } else {
        liveLayerIds.push(layerId)
      }
      liveLayers.set(layerId, layer as any)
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvasState({ mode: CanvasMode.None })
    },
    [lastUsedColour, theme]
  )

  // ─── INSERT SYSTEM DESIGN COMPONENT ─────────────────────────────────────
  const insertComponent = useMutation(
    ({ storage, setMyPresence }, componentType: SysComponent, position: Point, customLabel?: string) => {
      const liveLayers = storage.get("layers")
      if (liveLayers.size >= MAX_LAYERS) return
      const liveLayerIds = storage.get("layerIds")
      const layerId = nanoid()
      const layer = new LiveObject({
        type: LayerType.Component,
        x: position.x - 65, y: position.y - 55,
        width: 130, height: 110,
        fill: { r: 99, g: 102, b: 241 },
        componentType,
        value: customLabel,
      })
      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer as any)
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvasState({ mode: CanvasMode.None })
      return layerId
    }, []
  )

  // ─── INSERT SYSTEM DESIGN DOC / TABLE ───────────────────────────────────
  const insertDoc = useMutation(
    ({ storage, setMyPresence }, docType: DocType, position: Point) => {
      const liveLayers = storage.get("layers")
      if (liveLayers.size >= MAX_LAYERS) return
      const liveLayerIds = storage.get("layerIds")
      const layerId = nanoid()

      let width = 500
      let height = 360
      let title = "System Requirements"
      let defaultItems: any[] = []

      if (docType === "requirements") {
        width = 520
        height = 380
        title = "System Requirements"
        defaultItems = [
          { id: nanoid(), type: "functional", text: "User can create and publish posts with rich media", priority: "P0" },
          { id: nanoid(), type: "functional", text: "Followers receive real-time timeline feed updates", priority: "P0" },
          { id: nanoid(), type: "functional", text: "Search tweets and user accounts by keyword", priority: "P1" },
          { id: nanoid(), type: "functional", text: "Push notifications dispatched on mentions & likes", priority: "P2" },
          { id: nanoid(), type: "non-functional", text: "High Availability: 99.99% multi-region uptime SLA", priority: "P0" },
          { id: nanoid(), type: "non-functional", text: "Low Latency: Timeline read latency < 100ms (p99)", priority: "P0" },
          { id: nanoid(), type: "non-functional", text: "Scalability: 100M DAU and 50,000 peak read QPS", priority: "P0" },
          { id: nanoid(), type: "non-functional", text: "Eventual Consistency: Acceptable for follower feeds", priority: "P1" },
        ]
      } else if (docType === "api") {
        width = 540
        height = 360
        title = "API Endpoints Specification"
        defaultItems = [
          { id: nanoid(), method: "POST", path: "/api/v1/posts", description: "Create a new post with text & media", responseCode: "201" },
          { id: nanoid(), method: "GET", path: "/api/v1/feed", description: "Fetch paginated home timeline feed", responseCode: "200" },
          { id: nanoid(), method: "GET", path: "/api/v1/users/{id}", description: "Retrieve user profile & follower count", responseCode: "200" },
          { id: nanoid(), method: "POST", path: "/api/v1/follow/{id}", description: "Follow target user & subscribe to feed", responseCode: "200" },
          { id: nanoid(), method: "DELETE", path: "/api/v1/posts/{id}", description: "Delete post & invalidate cache tags", responseCode: "204" },
        ]
      } else if (docType === "estimation") {
        width = 480
        height = 360
        title = "Capacity & Estimations (Back-of-Envelope)"
        defaultItems = [
          { id: nanoid(), metric: "Daily Active Users (DAU)", value: "100 Million", unit: "Users / Day", notes: "10:1 Read to Write ratio" },
          { id: nanoid(), metric: "Write Throughput (QPS)", value: "1,150 QPS", unit: "Writes / sec", notes: "Peak: 2,500 QPS (2.5x spike)" },
          { id: nanoid(), metric: "Read Throughput (QPS)", value: "115,000 QPS", unit: "Reads / sec", notes: "Peak: 250,000 QPS" },
          { id: nanoid(), metric: "Daily Data Storage", value: "50 GB / day", unit: "GB / Day", notes: "~18 TB per year text metadata" },
          { id: nanoid(), metric: "Media / Blob Storage", value: "5 TB / day", unit: "TB / Day", notes: "Offloaded to S3 / Object Store" },
          { id: nanoid(), metric: "Memory Cache (RAM)", value: "1.2 TB RAM", unit: "RAM", notes: "80/20 rule: Cache 20% hot daily read data" },
        ]
      } else if (docType === "bottlenecks") {
        width = 540
        height = 380
        title = "Bottlenecks & SPOF Analysis"
        defaultItems = [
          { id: nanoid(), component: "Database Primary Write Hotspot", severity: "Critical", risk: "Single primary database instance will saturate on write IOPS", mitigation: "Horizontal range/hash sharding by user_id + write buffer" },
          { id: nanoid(), component: "Cache Stampede on Viral Posts", severity: "High", risk: "Simultaneous key expiry causes thundering herd to database", mitigation: "Distributed mutex lock + probabilistic early expiry (XFetch)" },
          { id: nanoid(), component: "Celebrity / Hot-Key Fanout", severity: "Critical", risk: "Users with 50M+ followers cause unbounded write queue backpressure", mitigation: "Hybrid push/pull model: pull for celebrities, push for standard users" },
          { id: nanoid(), component: "Network Egress Saturation", severity: "Medium", risk: "Global video streaming saturates datacenter bandwidth", mitigation: "Geo-distributed CDN edge caching with TLS session resumption" },
        ]
      }

      const layer = new LiveObject({
        type: LayerType.Doc,
        x: position.x - width / 2,
        y: position.y - height / 2,
        width,
        height,
        fill: { r: 99, g: 102, b: 241 },
        docType,
        title,
        itemsJson: JSON.stringify(defaultItems),
      })

      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer as any)
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvasState({ mode: CanvasMode.None })
      return layerId
    },
    []
  )

  // ─── INSERT ARROW ────────────────────────────────────────────────────────
  const insertArrow = useMutation(
    ({ storage, setMyPresence }, fromLayerId: string, toLayerId: string, label?: string, styleParam?: "curvy" | "sharp") => {
      const liveLayers = storage.get("layers")
      if (liveLayers.size >= MAX_LAYERS) return

      const fromLayer = liveLayers.get(fromLayerId)
      const toLayer   = liveLayers.get(toLayerId)
      if (!fromLayer || !toLayer) return

      const fromBounds = { x: fromLayer.get("x"), y: fromLayer.get("y"), width: fromLayer.get("width"), height: fromLayer.get("height") }
      const toBounds   = { x: toLayer.get("x"),   y: toLayer.get("y"),   width: toLayer.get("width"),   height: toLayer.get("height")   }

      const { fromAnchor, toAnchor } = computeBestAnchors(fromBounds, toBounds)
      const fromPt = getAnchorPoint(fromBounds.x, fromBounds.y, fromBounds.width, fromBounds.height, fromAnchor)
      const toPt   = getAnchorPoint(toBounds.x,   toBounds.y,   toBounds.width,   toBounds.height,   toAnchor)

      const liveLayerIds = storage.get("layerIds")
      const arrowId = nanoid()
      const arrow = new LiveObject({
        type: LayerType.Arrow,
        fromLayerId, toLayerId, fromAnchor, toAnchor,
        x: Math.min(fromPt.x, toPt.x),
        y: Math.min(fromPt.y, toPt.y),
        width:  Math.abs(fromPt.x - toPt.x) || 10,
        height: Math.abs(fromPt.y - toPt.y) || 10,
        fill: { r: 99, g: 102, b: 241 },
        value: label,
        arrowStyle: styleParam || arrowStyle,
      })
      liveLayerIds.push(arrowId)
      liveLayers.set(arrowId, arrow as any)
      setMyPresence({ selection: [] }, { addToHistory: true })
    }, [arrowStyle]
  )

  // ─── DUPLICATE SELECTED LAYERS ──────────────────────────────────────────
  const duplicateSelectedLayers = useMutation(({ storage, setMyPresence, self }) => {
    const liveLayers = storage.get("layers")
    const liveLayerIds = storage.get("layerIds")
    const selection = self.presence.selection
    if (!selection.length) return
    const newSelection: string[] = []

    selection.forEach((id) => {
      const layer = liveLayers.get(id)
      if (!layer) return
      if (liveLayers.size >= MAX_LAYERS) return

      const newId = nanoid()
      const data = layer.toObject()
      const newLayer = new LiveObject({
        ...data,
        x: (data.x ?? 0) + 30,
        y: (data.y ?? 0) + 30,
      })
      liveLayers.set(newId, newLayer as any)
      liveLayerIds.push(newId)
      newSelection.push(newId)
    })

    if (newSelection.length > 0) {
      setMyPresence({ selection: newSelection }, { addToHistory: true })
    }
  }, [])

  // ─── COPY & PASTE ────────────────────────────────────────────────────────
  const copySelectedLayers = useMutation(({ storage, self }) => {
    const liveLayers = storage.get("layers")
    const selection = self.presence.selection
    if (!selection.length) return

    const items: any[] = []
    selection.forEach((id) => {
      const layer = liveLayers.get(id)
      if (layer) items.push(layer.toObject())
    })
    clipboardRef.current = items
  }, [])

  const pasteLayers = useMutation(({ storage, setMyPresence }) => {
    if (!clipboardRef.current.length) return
    const liveLayers = storage.get("layers")
    const liveLayerIds = storage.get("layerIds")
    const newSelection: string[] = []

    clipboardRef.current.forEach((item) => {
      if (liveLayers.size >= MAX_LAYERS) return
      const newId = nanoid()
      const newLayer = new LiveObject({
        ...item,
        x: (item.x ?? 0) + 30,
        y: (item.y ?? 0) + 30,
      })
      liveLayers.set(newId, newLayer as any)
      liveLayerIds.push(newId)
      newSelection.push(newId)
    })

    if (newSelection.length > 0) {
      setMyPresence({ selection: newSelection }, { addToHistory: true })
      clipboardRef.current = clipboardRef.current.map((item) => ({
        ...item,
        x: (item.x ?? 0) + 30,
        y: (item.y ?? 0) + 30,
      }))
    }
  }, [])

  // ─── NUDGE SELECTED LAYERS ───────────────────────────────────────────────
  const nudgeSelectedLayers = useMutation(
    ({ storage, self }, dx: number, dy: number) => {
      const liveLayers = storage.get("layers")
      self.presence.selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer) {
          if (layer.get("type") === LayerType.Arrow) {
            const cur = (layer as any).get("controlOffset") || { x: 0, y: 0 }
            ;(layer as any).set("controlOffset", { x: cur.x + dx, y: cur.y + dy })
          } else {
            layer.update({
              x: layer.get("x") + dx,
              y: layer.get("y") + dy,
            })
          }
        }
      })
    },
    []
  )

  // ─── SELECT ALL ──────────────────────────────────────────────────────────
  const selectAllLayers = useMutation(({ setMyPresence }) => {
    setMyPresence({ selection: [...layerIds] })
  }, [layerIds])

  // ─── SELECT CONNECTED LAYOUT / ARCHITECTURE ─────────────────────────────
  const selectConnectedLayout = useMutation(({ storage, self, setMyPresence }) => {
    const liveLayers = storage.get("layers")
    const liveLayerIds = storage.get("layerIds")
    const selection = self.presence.selection
    if (!selection.length) return

    const visited = new Set<string>(selection)
    const queue = [...selection]

    const adj: Record<string, string[]> = {}
    liveLayerIds.forEach((id) => {
      const l = liveLayers.get(id)
      if (l && l.get("type") === LayerType.Arrow) {
        const arrow = l.toObject() as any
        const from = arrow.fromLayerId as string | undefined
        const to = arrow.toLayerId as string | undefined
        if (from && to) {
          if (!adj[from]) adj[from] = []
          if (!adj[to]) adj[to] = []
          adj[from].push(to)
          adj[to].push(from)
        }
      }
    })

    while (queue.length > 0) {
      const curr = queue.shift()!
      const neighbors = adj[curr] || []
      for (const n of neighbors) {
        if (!visited.has(n)) {
          visited.add(n)
          queue.push(n)
        }
      }
    }

    setMyPresence({ selection: Array.from(visited) }, { addToHistory: true })
  }, [])

  // ─── BRING TO FRONT / SEND TO BACK ───────────────────────────────────────
  const bringToFront = useMutation(({ storage, self }) => {
    const liveLayersIds = storage.get("layerIds")
    const selection = self.presence.selection
    const indices: number[] = []
    const arr = liveLayersIds.toImmutable()
    for (let i = 0; i < arr.length; i++) {
      if (selection.includes(arr[i])) indices.push(i)
    }
    for (let i = indices.length - 1; i >= 0; i--) {
      liveLayersIds.move(indices[i], arr.length - 1 - i)
    }
  }, [])

  const moveToBack = useMutation(({ storage, self }) => {
    const liveLayersIds = storage.get("layerIds")
    const selection = self.presence.selection
    const indices: number[] = []
    const arr = liveLayersIds.toImmutable()
    for (let i = 0; i < arr.length; i++) {
      if (selection.includes(arr[i])) indices.push(i)
    }
    for (let i = 0; i < indices.length; i++) {
      liveLayersIds.move(indices[i], i)
    }
  }, [])

  // ─── UPDATE COMPONENT LABEL ──────────────────────────────────────────────
  const updateComponentLabel = useMutation(({ storage }, layerId: string, val: string) => {
    const layer = storage.get("layers").get(layerId)
    if (layer) {
      layer.set("value", val)
    }
  }, [])

  // ─── INSERT ARCHITECTURE TEMPLATES (SMART NON-OVERLAPPING PLACEMENT) ────
  const insertTemplate = useMutation(({ storage, setMyPresence }, templateId: string) => {
    const liveLayers = storage.get("layers")
    const liveLayerIds = storage.get("layerIds")

    // Find bounds of existing layers so template NEVER overlaps
    let maxX = -Infinity
    let minY = Infinity
    let count = 0
    liveLayerIds.forEach((id) => {
      const l = liveLayers.get(id)
      if (l && l.get("type") !== LayerType.Arrow) {
        count++
        const lx = l.get("x") || 0
        const lw = l.get("width") || 130
        const ly = l.get("y") || 0
        if (lx + lw > maxX) maxX = lx + lw
        if (ly < minY) minY = ly
      }
    })

    let startX = 120
    let startY = 180
    if (count > 0 && maxX > -Infinity) {
      startX = maxX + 160 // placed neatly to the right
      startY = (minY !== Infinity && minY > 50 && minY < 1200) ? minY : 180
    }

    const createdCompIds: string[] = []

    const addComp = (type: SysComponent, relX: number, relY: number, label?: string) => {
      const id = nanoid()
      const layer = new LiveObject({
        type: LayerType.Component,
        x: startX + relX,
        y: startY + relY,
        width: 130,
        height: 110,
        fill: { r: 99, g: 102, b: 241 },
        componentType: type,
        value: label,
      })
      liveLayers.set(id, layer as any)
      liveLayerIds.push(id)
      createdCompIds.push(id)
      return id
    }

    const addConn = (fromId: string, toId: string, label?: string) => {
      const fromLayer = liveLayers.get(fromId)
      const toLayer = liveLayers.get(toId)
      if (!fromLayer || !toLayer) return

      const fromBounds = { x: fromLayer.get("x"), y: fromLayer.get("y"), width: fromLayer.get("width"), height: fromLayer.get("height") }
      const toBounds = { x: toLayer.get("x"), y: toLayer.get("y"), width: toLayer.get("width"), height: toLayer.get("height") }
      const { fromAnchor, toAnchor } = computeBestAnchors(fromBounds, toBounds)
      const fromPt = getAnchorPoint(fromBounds.x, fromBounds.y, fromBounds.width, fromBounds.height, fromAnchor)
      const toPt = getAnchorPoint(toBounds.x, toBounds.y, toBounds.width, toBounds.height, toAnchor)

      const id = nanoid()
      const arrow = new LiveObject({
        type: LayerType.Arrow,
        fromLayerId: fromId,
        toLayerId: toId,
        fromAnchor,
        toAnchor,
        x: Math.min(fromPt.x, toPt.x),
        y: Math.min(fromPt.y, toPt.y),
        width: Math.abs(fromPt.x - toPt.x) || 10,
        height: Math.abs(fromPt.y - toPt.y) || 10,
        fill: { r: 99, g: 102, b: 241 },
        value: label,
      })
      liveLayers.set(id, arrow as any)
      liveLayerIds.push(id)
    }

    let tplWidth = 780
    let tplHeight = 550

    if (templateId === "three-tier") {
      tplWidth = 800
      tplHeight = 560
      const client = addComp(SysComponent.WebClient, 0, 140, "Web Client")
      const dns = addComp(SysComponent.DNS, 200, 0, "Route 53 DNS")
      const lb = addComp(SysComponent.LoadBalancer, 200, 260, "ALB")
      const srv1 = addComp(SysComponent.Server, 420, 140, "Web Server 1")
      const srv2 = addComp(SysComponent.Server, 420, 360, "Web Server 2")
      const cache = addComp(SysComponent.Cache, 640, 0, "Redis Cluster")
      const primaryDb = addComp(SysComponent.PrimaryDB, 640, 220, "Postgres Leader")
      const replicaDb = addComp(SysComponent.ReplicaDB, 640, 420, "Read Replica")

      addConn(client, dns, "DNS Query")
      addConn(client, lb, "HTTPS Request")
      addConn(lb, srv1, "Round Robin")
      addConn(lb, srv2, "Round Robin")
      addConn(srv1, cache, "Cache Read")
      addConn(srv1, primaryDb, "Write Query")
      addConn(srv2, primaryDb, "Write Query")
      addConn(primaryDb, replicaDb, "Replication")
    } else if (templateId === "microservices") {
      tplWidth = 980
      tplHeight = 440
      const client = addComp(SysComponent.MobileClient, 0, 160, "Mobile App")
      const gw = addComp(SysComponent.APIGateway, 200, 160, "API Gateway")
      const auth = addComp(SysComponent.Microservice, 410, 0, "Auth Service")
      const orders = addComp(SysComponent.Microservice, 410, 280, "Order Service")
      const queue = addComp(SysComponent.MessageQueue, 620, 280, "Kafka Queue")
      const worker = addComp(SysComponent.Microservice, 820, 280, "Payment Worker")
      const db = addComp(SysComponent.Database, 620, 0, "User DB")

      addConn(client, gw, "REST / GraphQL")
      addConn(gw, auth, "JWT Verify")
      addConn(gw, orders, "Create Order")
      addConn(auth, db, "User Lookup")
      addConn(orders, queue, "Publish Event")
      addConn(queue, worker, "Consume Msg")
    } else if (templateId === "cdn-caching") {
      tplWidth = 800
      tplHeight = 440
      const client1 = addComp(SysComponent.WebClient, 0, 40, "US Users")
      const client2 = addComp(SysComponent.WebClient, 0, 260, "EU Users")
      const cdn = addComp(SysComponent.CDN, 220, 150, "Cloudflare Edge")
      const docker = addComp(SysComponent.Docker, 450, 150, "Container App")
      const cache = addComp(SysComponent.Cache, 670, 20, "Global Cache")
      const db = addComp(SysComponent.Database, 670, 260, "Cloud Spanner")

      addConn(client1, cdn, "Edge Request")
      addConn(client2, cdn, "Edge Request")
      addConn(cdn, docker, "Cache Miss")
      addConn(docker, cache, "Memcache")
      addConn(docker, db, "SQL Queries")
    }

    setIsLibraryOpen(false)

    // AUTOMATICALLY SELECT ALL COMPONENTS IN THE TEMPLATE (SO THEY CAN MOVE TOGETHER)
    setMyPresence({ selection: createdCompIds }, { addToHistory: true })

    // Pan camera to smoothly bring the newly inserted template into view
    if (typeof window !== "undefined") {
      const screenW = window.innerWidth
      const screenH = window.innerHeight
      const targetX = screenW / 2 - (startX + tplWidth / 2) * camera.zoom
      const targetY = screenH / 2 - (startY + tplHeight / 2) * camera.zoom
      setCamera((c) => ({ ...c, x: targetX, y: targetY }))
    }
  }, [camera.zoom])

  // ─── TRANSLATE (SUPPORTS ARCHITECTURE GROUPS & SECTIONS) ────────────────
  const translateSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating || !canvasState.current) return
      const offset = { x: point.x - canvasState.current.x, y: point.y - canvasState.current.y }
      const liveLayers = storage.get("layers")
      const liveLayerIds = storage.get("layerIds")

      const layersToMove = new Set<string>(self.presence.selection)

      // If any selected layer is an Architecture Section, also move all components/layers enclosed inside it!
      for (const selId of self.presence.selection) {
        const selLayer = liveLayers.get(selId)
        if (selLayer && selLayer.get("type") === LayerType.Section) {
          const sx = selLayer.get("x") || 0
          const sy = selLayer.get("y") || 0
          const sw = selLayer.get("width") || 440
          const sh = selLayer.get("height") || 300

          liveLayerIds.forEach((otherId) => {
            if (otherId === selId || layersToMove.has(otherId)) return
            const other = liveLayers.get(otherId)
            if (!other || other.get("type") === LayerType.Arrow) return
            const ox = other.get("x") || 0
            const oy = other.get("y") || 0
            const ow = other.get("width") || 100
            const oh = other.get("height") || 100
            const cx = ox + ow / 2
            const cy = oy + oh / 2
            // If the element's center is inside this section
            if (cx >= sx && cx <= sx + sw && cy >= sy && cy <= sy + sh) {
              layersToMove.add(otherId)
            }
          })
        }
      }

      layersToMove.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer) {
          if (layer.get("type") === LayerType.Arrow) {
            const cur = (layer as any).get("controlOffset") || { x: 0, y: 0 }
            ;(layer as any).set("controlOffset", {
              x: cur.x + offset.x,
              y: cur.y + offset.y,
            })
          } else {
            layer.update({ x: layer.get("x") + offset.x, y: layer.get("y") + offset.y })
          }
        }
      })
      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [canvasState]
  )

  const onDragSelectionStart = useCallback(
    (e: React.PointerEvent) => {
      history.pause()
      e.stopPropagation()
      const point = pointerEventToCanvasPoint(e, camera)
      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [camera, history]
  )

  const unselectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) setMyPresence({ selection: [] }, { addToHistory: true })
  }, [])

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layersObj = storage.get("layers").toImmutable()
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current })
      const ids = findIntersectinglayersWithRectangle(layerIds, layersObj, origin, current)
      setMyPresence({ selection: ids })
    }, [layerIds]
  )

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5)
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current })
  }, [])

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence
      if (canvasState.mode !== CanvasMode.Pencil || e.buttons !== 1 || pencilDraft == null) return
      setMyPresence({
        cursor: point,
        pencilDraft: pencilDraft.length === 1 && pencilDraft[0][0] === point.x && pencilDraft[0][1] === point.y
          ? pencilDraft : [...pencilDraft, [point.x, point.y, e.pressure]],
      })
    }, [canvasState.mode]
  )

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers")
      const { pencilDraft } = self.presence
      if (pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS) {
        setMyPresence({ pencilDraft: null }); return
      }
      const id = nanoid()
      liveLayers.set(id, new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColour)))
      const liveLayerIds = storage.get("layerIds")
      liveLayerIds.push(id)
      setMyPresence({ pencilDraft: null })
      setCanvasState({ mode: CanvasMode.Pencil })
    }, [lastUsedColour]
  )

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({ pencilDraft: [[point.x, point.y, pressure]], penColor: lastUsedColour })
    }, [lastUsedColour]
  )

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point, lockAspectRatio: boolean = false) => {
      if (canvasState.mode !== CanvasMode.Resizing) return
      const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point, lockAspectRatio)
      const layer = storage.get("layers").get(self.presence.selection[0])
      if (layer) layer.update(bounds)
    }, [canvasState]
  )

  const onResizeHandlePointerDown = useCallback((corner: Side, initialBounds: XYWH) => {
    history.pause()
    setCanvasState({ mode: CanvasMode.Resizing, initialBounds, corner })
  }, [history])

  // ─── ZOOM & WHEEL NAVIGATION (DIRECT SCROLL ZOOMS IN / OUT) ────────
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    if (e.shiftKey) {
      // Shift + Wheel -> Pan horizontally (left / right)
      setCamera((c) => ({ ...c, x: c.x - (e.deltaY || e.deltaX) }))
    } else {
      // Direct scroll zooms in / out centered at cursor position
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92
      setCamera((c) => {
        const newZoom = Math.min(3.0, Math.max(0.2, c.zoom * zoomFactor))
        const newX = e.clientX - (e.clientX - c.x) * (newZoom / c.zoom)
        const newY = e.clientY - (e.clientY - c.y) * (newZoom / c.zoom)
        return { x: newX, y: newY, zoom: newZoom }
      })
    }
  }, [])

  const zoomIn = useCallback(() => {
    setCamera((c) => {
      const newZoom = Math.min(3.0, c.zoom * 1.2)
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const newX = centerX - (centerX - c.x) * (newZoom / c.zoom)
      const newY = centerY - (centerY - c.y) * (newZoom / c.zoom)
      return { x: newX, y: newY, zoom: newZoom }
    })
  }, [])

  const zoomOut = useCallback(() => {
    setCamera((c) => {
      const newZoom = Math.max(0.2, c.zoom / 1.2)
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const newX = centerX - (centerX - c.x) * (newZoom / c.zoom)
      const newY = centerY - (centerY - c.y) * (newZoom / c.zoom)
      return { x: newX, y: newY, zoom: newZoom }
    })
  }, [])

  const resetZoom = useCallback(() => {
    setCamera((c) => ({ ...c, zoom: 1 }))
  }, [])

  const fitToScreen = useCallback(() => {
    if (!layerIds || layerIds.length === 0) {
      setCamera({ x: 0, y: 0, zoom: 1 })
      return
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    layerIds.forEach((id) => {
      const l = layers.get(id)
      if (l) {
        minX = Math.min(minX, l.x)
        minY = Math.min(minY, l.y)
        maxX = Math.max(maxX, l.x + (l.width || 100))
        maxY = Math.max(maxY, l.y + (l.height || 100))
      }
    })

    if (minX === Infinity) {
      setCamera({ x: 0, y: 0, zoom: 1 })
      return
    }

    const width = maxX - minX || 200
    const height = maxY - minY || 200
    const screenW = window.innerWidth
    const screenH = window.innerHeight

    const targetZoom = Math.min(1.5, Math.max(0.3, Math.min((screenW - 200) / width, (screenH - 200) / height)))
    const targetX = (screenW - width * targetZoom) / 2 - minX * targetZoom
    const targetY = (screenH - height * targetZoom) / 2 - minY * targetZoom

    setCamera({ x: targetX, y: targetY, zoom: targetZoom })
  }, [layerIds, layers])

  // ─── POINTER EVENTS ──────────────────────────────────────────────────────
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()

      // Canvas Panning (Drag to Move Canvas)
      if (canvasState.mode === CanvasMode.Panning) {
        if (canvasState.origin.x !== 0 || canvasState.origin.y !== 0) {
          const dx = e.clientX - canvasState.origin.x
          const dy = e.clientY - canvasState.origin.y
          setCamera((c) => ({
            ...c,
            x: canvasState.cameraOrigin.x + dx,
            y: canvasState.cameraOrigin.y + dy,
          }))
        }
        return
      }

      const current = pointerEventToCanvasPoint(e, camera)
      if (canvasState.mode === CanvasMode.Eraser) {
        if (isErasingRef.current || e.buttons === 1) {
          eraseAtPoint(current)
        }
        setEraserPoint(current)
        setMyPresence({ cursor: current })
        return
      }

      if (canvasState.mode === CanvasMode.Pressing)          startMultiSelection(current, canvasState.origin)
      else if (canvasState.mode === CanvasMode.SelectionNet) updateSelectionNet(current, canvasState.origin)
      else if (canvasState.mode === CanvasMode.Translating)  translateSelectedLayer(current)
      else if (canvasState.mode === CanvasMode.Resizing)     resizeSelectedLayer(current, e.shiftKey)
      else if (canvasState.mode === CanvasMode.Pencil)       continueDrawing(current, e)
      else if (canvasState.mode === CanvasMode.Connecting && canvasState.from) setConnectPreview(current)
      setMyPresence({ cursor: current })
    },
    [continueDrawing, camera, canvasState, resizeSelectedLayer, translateSelectedLayer, startMultiSelection, updateSelectionNet, eraseAtPoint]
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    isErasingRef.current = false
    setEraserPoint(null)
    setMyPresence({ cursor: null })
  }, [canvasState])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (contextMenu) setContextMenu(null)

    // Central scroll mouse button (middle-click): toggle between Move and default Select mode
    if (e.button === 1) {
      e.preventDefault()
      if (canvasState.mode === CanvasMode.Panning) {
        // Toggle OFF: switch back to default arrow/click interaction
        setCanvasState({ mode: CanvasMode.None })
      } else {
        // Toggle ON: switch to move canvas mode
        setCanvasState({
          mode: CanvasMode.Panning,
          origin: { x: e.clientX, y: e.clientY },
          cameraOrigin: { x: camera.x, y: camera.y },
        })
      }
      return
    }

    // Hand tool / Spacebar held pans canvas
    if (canvasState.mode === CanvasMode.Panning || isSpacePressed) {
      setCanvasState({
        mode: CanvasMode.Panning,
        origin: { x: e.clientX, y: e.clientY },
        cameraOrigin: { x: camera.x, y: camera.y },
      })
      return
    }

    const point = pointerEventToCanvasPoint(e, camera)
    if (canvasState.mode === CanvasMode.Eraser) {
      isErasingRef.current = true
      eraseAtPoint(point)
      return
    }
    if (canvasState.mode === CanvasMode.Inserting) return
    if (canvasState.mode === CanvasMode.Pencil) { startDrawing(point, e.pressure); return }
    if (canvasState.mode === CanvasMode.Connecting) {
      if (canvasState.from) {
        setCanvasState({ mode: CanvasMode.Connecting, from: null })
        setConnectPreview(null)
      }
      return
    }
    setCanvasState({ origin: point, mode: CanvasMode.Pressing })
  }, [camera, canvasState, startDrawing, contextMenu, isSpacePressed, eraseAtPoint])

  const onPointerUp = useMutation(({}, e: React.PointerEvent) => {
    // Releasing the middle button should not trigger layer selection/insertion
    if (e.button === 1) {
      if (canvasState.mode === CanvasMode.Panning) {
        // Keep Hand tool active with reset origin so subsequent drags work
        setCanvasState({
          mode: CanvasMode.Panning,
          origin: { x: 0, y: 0 },
          cameraOrigin: { x: camera.x, y: camera.y },
        })
      }
      return
    }

    if (canvasState.mode === CanvasMode.Eraser) {
      isErasingRef.current = false
      return
    }
    if (canvasState.mode === CanvasMode.Panning) {
      if (isSpacePressed) {
        setCanvasState({ mode: CanvasMode.None })
      } else {
        // Keep Hand tool active with reset origin so next drag works
        setCanvasState({
          mode: CanvasMode.Panning,
          origin: { x: 0, y: 0 },
          cameraOrigin: { x: camera.x, y: camera.y },
        })
      }
      return
    }

    const point = pointerEventToCanvasPoint(e, camera)
    if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
      unselectLayer()
      setCanvasState({ mode: CanvasMode.None })
    } else if (canvasState.mode === CanvasMode.Pencil) {
      insertPath()
    } else if (canvasState.mode === CanvasMode.Inserting) {
      if (canvasState.layerType === LayerType.Component && canvasState.componentType) {
        insertComponent(canvasState.componentType, point)
      } else if (canvasState.layerType === LayerType.Doc && canvasState.docType) {
        insertDoc(canvasState.docType, point)
      } else if (canvasState.layerType !== LayerType.Component && canvasState.layerType !== LayerType.Doc) {
        insertLayer(canvasState.layerType as any, point)
      }
    } else if (canvasState.mode !== CanvasMode.Connecting) {
      setCanvasState({ mode: CanvasMode.None })
    }
    history.resume()
  }, [camera, canvasState, history, insertLayer, insertComponent, insertDoc, unselectLayer, insertPath, isSpacePressed])

  const selections = useOthersMapped((other) => other.presence.selection)

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      // Central scroll mouse button (middle-click): toggle between Move and default Select mode even over layers
      if (e.button === 1) {
        e.preventDefault()
        e.stopPropagation()
        if (canvasState.mode === CanvasMode.Panning) {
          // Toggle OFF: switch back to default arrow/click interaction
          setCanvasState({ mode: CanvasMode.None })
        } else {
          // Toggle ON: switch to move canvas mode
          setCanvasState({
            mode: CanvasMode.Panning,
            origin: { x: e.clientX, y: e.clientY },
            cameraOrigin: { x: camera.x, y: camera.y },
          })
        }
        return
      }

      if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting) return
      if (canvasState.mode === CanvasMode.Connecting) return
      if (canvasState.mode === CanvasMode.Eraser) {
        e.stopPropagation()
        isErasingRef.current = true
        deleteLayerById(layerId)
        return
      }
      if (canvasState.mode === CanvasMode.Panning || isSpacePressed) {
        setCanvasState({
          mode: CanvasMode.Panning,
          origin: { x: e.clientX, y: e.clientY },
          cameraOrigin: { x: camera.x, y: camera.y },
        })
        return
      }

      history.pause()
      e.stopPropagation()
      const point = pointerEventToCanvasPoint(e, camera)

      // Shift + click to toggle selection
      if (e.shiftKey) {
        const isSelected = self.presence.selection.includes(layerId)
        const next = isSelected
          ? self.presence.selection.filter((id) => id !== layerId)
          : [...self.presence.selection, layerId]
        setMyPresence({ selection: next }, { addToHistory: true })
        return
      }

      // If clicked item is not in current multi-selection, select it alone
      // But if it IS already part of the multi-selection, keep whole group selected!
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true })
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [setCanvasState, camera, history, canvasState.mode, isSpacePressed, deleteLayerById]
  )

  const onConnectClick = useCallback((layerId: string) => {
    if (canvasState.mode !== CanvasMode.Connecting) return

    if (!canvasState.from) {
      setCanvasState({ mode: CanvasMode.Connecting, from: layerId })
      setConnectPreview(null)
    } else {
      if (canvasState.from !== layerId) {
        insertArrow(canvasState.from, layerId)
      }
      setCanvasState({ mode: CanvasMode.Connecting, from: null })
      setConnectPreview(null)
    }
  }, [canvasState, insertArrow])

  const layerIdsToColorSelection = useMemo(() => {
    const map: Record<string, string> = {}
    for (const user of selections) {
      const [connectionId, selection] = user
      for (const layerId of selection) map[layerId] = connectionIdToColor(connectionId)
    }
    return map
  }, [selections])

  // ─── KEYBOARD SHORTCUTS ──────────────────────────────────────────────────
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const activeTag = document.activeElement?.tagName.toLowerCase()
      if (activeTag === "input" || activeTag === "textarea") return

      const isCtrl = e.ctrlKey || e.metaKey

      if (isCtrl) {
        switch (e.key.toLowerCase()) {
          case "z":
            e.preventDefault()
            if (e.shiftKey) history.redo(); else history.undo()
            break
          case "y":
            e.preventDefault()
            history.redo()
            break
          case "d":
            e.preventDefault()
            duplicateSelectedLayers()
            break
          case "c":
            e.preventDefault()
            copySelectedLayers()
            break
          case "v":
            e.preventDefault()
            pasteLayers()
            break
          case "a":
            e.preventDefault()
            if (e.shiftKey) {
              selectConnectedLayout()
            } else {
              selectAllLayers()
            }
            break
          case "0":
            e.preventDefault()
            resetZoom()
            break
          case "=":
          case "+":
            e.preventDefault()
            zoomIn()
            break
          case "-":
            e.preventDefault()
            zoomOut()
            break
        }
        return
      }

      // Non-ctrl shortcuts
      switch (e.key) {
        case "Escape":
          if (isTourActive) {
            stopTour()
          }
          if (canvasState.mode === CanvasMode.Connecting) {
            setCanvasState({ mode: CanvasMode.None })
            setConnectPreview(null)
          } else if (canvasState.mode === CanvasMode.Eraser) {
            setCanvasState({ mode: CanvasMode.None })
            setEraserPoint(null)
          } else {
            unselectLayer()
            setCanvasState({ mode: CanvasMode.None })
          }
          break
        case "Delete":
        case "Backspace":
          deleteLayers()
          break
        case "g":
        case "G":
          toggleGrid()
          break
        case "?":
          setIsShortcutsOpen(true)
          break
        case "v":
        case "V":
          setCanvasState({ mode: CanvasMode.None })
          break
        case "e":
        case "E":
          setCanvasState({ mode: CanvasMode.Eraser })
          break
        case "h":
        case "H":
          if (canvasState.mode === CanvasMode.Panning) {
            setCanvasState({ mode: CanvasMode.None })
          } else {
            setCanvasState({
              mode: CanvasMode.Panning,
              origin: { x: 0, y: 0 },
              cameraOrigin: { x: camera.x, y: camera.y },
            })
          }
          break
        case "c":
        case "C":
          setCanvasState({ mode: CanvasMode.Connecting, from: null })
          break
        case "p":
        case "P":
          setCanvasState({ mode: CanvasMode.Pencil })
          break
        case "t":
        case "T":
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text })
          break
        case "n":
        case "N":
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Note })
          break
        case "r":
        case "R":
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Rectangle })
          break
        case "o":
        case "O":
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Ellipse })
          break
        case "s":
        case "S":
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Section })
          break
        case "l":
        case "L":
          setIsLibraryOpen((v) => !v)
          break
        case "m":
        case "M":
          setIsMinimapOpen((v) => !v)
          break
        // When no layer is selected or holding Alt: Arrow keys pan the canvas!
        case "ArrowLeft":
          e.preventDefault()
          if (mySelection.length === 0 || e.altKey) {
            setCamera((c) => ({ ...c, x: c.x + (e.shiftKey ? 60 : 30) }))
          } else {
            nudgeSelectedLayers(e.shiftKey ? -10 : -1, 0)
          }
          break
        case "ArrowRight":
          e.preventDefault()
          if (mySelection.length === 0 || e.altKey) {
            setCamera((c) => ({ ...c, x: c.x - (e.shiftKey ? 60 : 30) }))
          } else {
            nudgeSelectedLayers(e.shiftKey ? 10 : 1, 0)
          }
          break
        case "ArrowUp":
          e.preventDefault()
          if (mySelection.length === 0 || e.altKey) {
            setCamera((c) => ({ ...c, y: c.y + (e.shiftKey ? 60 : 30) }))
          } else {
            nudgeSelectedLayers(0, e.shiftKey ? -10 : -1)
          }
          break
        case "ArrowDown":
          e.preventDefault()
          if (mySelection.length === 0 || e.altKey) {
            setCamera((c) => ({ ...c, y: c.y - (e.shiftKey ? 60 : 30) }))
          } else {
            nudgeSelectedLayers(0, e.shiftKey ? 10 : 1)
          }
          break
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [
    deleteLayers, history, canvasState.mode, duplicateSelectedLayers,
    copySelectedLayers, pasteLayers, selectAllLayers, selectConnectedLayout,
    nudgeSelectedLayers, unselectLayer, zoomIn, zoomOut, resetZoom, mySelection.length
  ])

  const onLibrarySelect = useCallback((type: SysComponent) => {
    setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Component, componentType: type })
    setIsLibraryOpen(false)
  }, [])

  // ─── EXPORT DIAGRAM ──────────────────────────────────────────────────────
  const handleExport = useCallback(
    (format: "png" | "svg" | "json" | "mermaid") => {
      exportDiagram({
        format,
        boardId,
        layers,
        layerIds,
        theme,
        svgElement: svgRef.current,
        camera,
      })
    },
    [layerIds, layers, boardId, theme, camera]
  )

  const connectingFromId = canvasState.mode === CanvasMode.Connecting ? canvasState.from : null

  // Rename single selected layer
  const soleLayerId = mySelection.length === 1 ? mySelection[0] : null
  const soleLayer = soleLayerId ? layers.get(soleLayerId) : null
  const initialRenameVal = soleLayer && "value" in soleLayer ? (soleLayer.value || "") : ""

  const isPanActive = canvasState.mode === CanvasMode.Panning || isSpacePressed
  const cursorStyle = isPanActive
    ? (canvasState.mode === CanvasMode.Panning && canvasState.origin.x !== 0 ? "grabbing" : "grab")
    : canvasState.mode === CanvasMode.Connecting
    ? "crosshair"
    : canvasState.mode === CanvasMode.Eraser
    ? "cell"
    : "default"

  const isSelectedArrow = soleLayer?.type === LayerType.Arrow
  const selectedArrowStyle = (isSelectedArrow && "arrowStyle" in soleLayer ? (soleLayer.arrowStyle || "curvy") : "curvy") as "curvy" | "sharp"

  const toggleSelectedArrowStyle = useMutation(({ storage }) => {
    if (!soleLayerId) return
    const layer = storage.get("layers").get(soleLayerId)
    if (layer && layer.get("type") === LayerType.Arrow) {
      const cur = ((layer as any).get("arrowStyle") as any) || "curvy"
      const next = cur === "sharp" ? "curvy" : "sharp"
      ;(layer as any).set("arrowStyle", next)
    }
  }, [soleLayerId])

  return (
    <main
      className={cn(
        "h-full w-full relative touch-none overflow-hidden transition-colors duration-200",
        theme === "dark" ? "bg-[#0b0f19] text-white" : "bg-neutral-100 text-neutral-900"
      )}
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu({ x: e.clientX, y: e.clientY })
      }}
    >
      <Info boardId={boardId} />
      <Participants />

      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canRedo={canRedo}
        canUndo={canUndo}
        isLibraryOpen={isLibraryOpen}
        onToggleLibrary={() => {
          setLibraryTab("components")
          setIsLibraryOpen((v) => !v)
        }}
        onOpenSpecs={openSpecs}
        isSpecsActive={isLibraryOpen && libraryTab === "specs"}
        arrowStyle={arrowStyle}
        onToggleArrowStyle={toggleDefaultArrowStyle}
        onSelectAllArchitecture={selectAllLayers}
      />

      <ComponentLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelect={onLibrarySelect}
        onSelectTemplate={insertTemplate}
        onSelectDoc={onDocSelect}
        initialTab={libraryTab}
      />

      {/* Status hints (placed below top simulator bar) */}
      {canvasState.mode === CanvasMode.Connecting && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl z-50 pointer-events-none select-none flex items-center gap-2 animate-bounce">
          <span>{canvasState.from ? "✓ Source selected — click destination component · Esc to cancel" : "Click source component to start arrow connection"}</span>
        </div>
      )}
      {canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Component && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl z-50 pointer-events-none select-none">
          Click anywhere on canvas to place this system component
        </div>
      )}
      {canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Doc && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl z-50 pointer-events-none select-none">
          Click anywhere on canvas to place this system design table
        </div>
      )}
      {canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Section && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl z-50 pointer-events-none select-none">
          Click anywhere on canvas to create an Architecture Section / Zone Box
        </div>
      )}
      {canvasState.mode === CanvasMode.Eraser && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl z-50 pointer-events-none select-none flex items-center gap-2 animate-pulse">
          <span>🧹 Eraser Active — Click or drag through any component, arrow, drawing, or text to erase · Esc to finish</span>
        </div>
      )}
      {isPanActive && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-neutral-800/90 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg z-50 pointer-events-none select-none flex items-center gap-1.5 backdrop-blur-sm">
          <span>Click & drag to pan canvas in any direction</span>
        </div>
      )}

      {/* Floating Architecture Trace Runner (only renders when active) */}
      <ArchitectureSimulator />

      {/* Step-by-Step Architecture Presentation / Tour Bar */}
      <ArchitectureTourBar onFocusLayer={handleFocusTourLayer} />

      {/* Floating Selection Tools */}
      <SelectionTools
        camera={camera}
        setLastUsedColor={setLastUsedColor}
        onDuplicate={duplicateSelectedLayers}
        onRename={() => {
          if (soleLayerId) setRenamingLayerId(soleLayerId)
        }}
        onSelectConnected={selectConnectedLayout}
      />

      {/* Floating Zoom & Controls Widget */}
      <ZoomControls
        zoom={camera.zoom}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetZoom={resetZoom}
        onFitToScreen={fitToScreen}
        gridType={gridType}
        onToggleGrid={toggleGrid}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onExport={handleExport}
        isMinimapOpen={isMinimapOpen}
        onToggleMinimap={() => setIsMinimapOpen((v) => !v)}
      />

      {/* Interactive Minimap Navigator */}
      {isMinimapOpen && (
        <Minimap
          camera={camera}
          setCamera={setCamera}
        />
      )}

      {/* Right-click Context Menu */}
      {contextMenu && (
        <CanvasContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          hasSelection={mySelection.length > 0}
          hasClipboard={clipboardRef.current.length > 0}
          onClose={() => setContextMenu(null)}
          onCopy={copySelectedLayers}
          onPaste={pasteLayers}
          onDuplicate={duplicateSelectedLayers}
          onDelete={deleteLayers}
          onBringToFront={bringToFront}
          onSendToBack={moveToBack}
          onEditLabel={
            soleLayerId
              ? () => setRenamingLayerId(soleLayerId)
              : undefined
          }
          onSelectConnected={selectConnectedLayout}
          onToggleArrowStyle={toggleSelectedArrowStyle}
          isArrow={isSelectedArrow}
          currentArrowStyle={selectedArrowStyle}
          onSelectAll={selectAllLayers}
          onFitToScreen={fitToScreen}
          onOpenLibrary={() => setIsLibraryOpen(true)}
        />
      )}

      {/* Rename Dialog */}
      {renamingLayerId && (
        <ComponentRenameDialog
          isOpen={Boolean(renamingLayerId)}
          initialValue={initialRenameVal}
          onClose={() => setRenamingLayerId(null)}
          onSave={(val) => {
            updateComponentLabel(renamingLayerId, val)
            setRenamingLayerId(null)
          }}
        />
      )}

      {/* Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <svg
        ref={svgRef}
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave as any}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onAuxClick={(e) => {
          if (e.button === 1) e.preventDefault()
        }}
        style={{ cursor: cursorStyle }}
      >
        <defs>
          {/* Subtle dotted grid pattern */}
          <pattern id="canvas-grid-dots" width={36} height={36} patternUnits="userSpaceOnUse">
            <circle cx={18} cy={18} r={1.2} fill={theme === "dark" ? "#334155" : "#D1D5DB"} />
          </pattern>

          {/* Crisscross squares grid pattern */}
          <pattern id="canvas-grid-cross" width={36} height={36} patternUnits="userSpaceOnUse">
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke={theme === "dark" ? "rgba(51, 65, 85, 0.45)" : "rgba(203, 213, 225, 0.65)"}
              strokeWidth={1}
            />
          </pattern>
        </defs>

        <g
          style={{
            transform: `translate(${camera.x}px,${camera.y}px) scale(${camera.zoom})`,
            transformOrigin: "0 0",
          }}
        >
          {/* Grid Background */}
          {gridType !== "none" && (
            <rect
              x={-50000}
              y={-50000}
              width={100000}
              height={100000}
              fill={gridType === "dots" ? "url(#canvas-grid-dots)" : "url(#canvas-grid-cross)"}
              style={{ pointerEvents: "none" }}
            />
          )}

          {sortedLayerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              onLayerDoubleClick={(id) => setRenamingLayerId(id)}
              selectionColor={layerIdsToColorSelection[layerId]}
              canvasState={canvasState}
              connectingFromId={connectingFromId}
              onConnectClick={onConnectClick}
            />
          ))}

          <SelectionBox
            onResizeHandlePointerDown={onResizeHandlePointerDown}
            onDragSelectionStart={onDragSelectionStart}
          />

          {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
            <rect
              className="fill-indigo-500/10 stroke-indigo-500 stroke-1"
              x={Math.min(canvasState.origin.x, canvasState.current.x)}
              y={Math.min(canvasState.origin.y, canvasState.current.y)}
              width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              height={Math.abs(canvasState.origin.y - canvasState.current.y)}
            />
          )}

          <CursorsPresence />

          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path points={pencilDraft} x={0} y={0} fill={colorToCss(lastUsedColour)} />
          )}

          {/* Live preview arrow while user has picked "from" and is hovering */}
          {canvasState.mode === CanvasMode.Connecting && canvasState.from && connectPreview && (
            <ConnectingPreviewLine fromLayerId={canvasState.from} to={connectPreview} />
          )}

          {/* Eraser touch indicator circle */}
          {canvasState.mode === CanvasMode.Eraser && eraserPoint && (
            <g
              style={{
                transform: `translate(${eraserPoint.x}px, ${eraserPoint.y}px)`,
              }}
              className="pointer-events-none"
            >
              <circle
                r={22}
                className="fill-rose-500/20 stroke-rose-500 stroke-[1.5]"
                strokeDasharray="4 3"
              />
              <circle r={2.5} className="fill-rose-600" />
            </g>
          )}
        </g>
      </svg>
    </main>
  )
}
