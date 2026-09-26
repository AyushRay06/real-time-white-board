"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MousePointer,
  Pencil,
  StickyNote,
  Square,
  Circle as CircleIcon,
  ZoomIn,
  ZoomOut,
  Plus,
  RotateCcw,
  Sparkles,
  Move,
  Trash2,
  Check,
  Edit3,
  Monitor,
  Network,
  Shield,
  Cpu,
  Radio,
  Database,
  Box,
} from "lucide-react"
import {
  AwsLambdaIcon,
  AmazonS3Icon,
  AmazonDynamoDBIcon,
  AmazonApiGatewayIcon,
  RedisIcon,
} from "@/components/icons/tool-icons"

export interface CanvasItem {
  id: string
  type: "sticky" | "rect" | "circle" | "sys-component"
  title: string
  content?: string
  author: string
  authorColor: string
  color: string
  borderColor: string
  textColor: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  icon?: any
  isToolIcon?: boolean
  iconBg?: string
  iconColor?: string
}

interface Connector {
  id: string
  fromId: string
  toId: string
  color: string
  dashed?: boolean
  label?: string
}

interface DrawnLine {
  id: string
  points: Array<{ x: number; y: number }>
  color: string
  width: number
}

interface FloatingReaction {
  id: number
  emoji: string
  x: number
  y: number
}

interface PinnedReaction {
  id: string
  emoji: string
  x: number
  y: number
}

interface Point {
  x: number
  y: number
}

interface IntersectionResult {
  x: number
  y: number
  normal: { x: number; y: number }
}

const INITIAL_ITEMS: CanvasItem[] = [
  {
    id: "item-1",
    type: "sys-component",
    title: "Web Client",
    author: "Client",
    authorColor: "bg-blue-600",
    color: "bg-white",
    borderColor: "border-blue-300",
    textColor: "text-blue-950",
    icon: Monitor,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    x: 60,
    y: 175,
    width: 110,
    height: 95,
    rotation: 0,
  },
  {
    id: "item-2",
    type: "sys-component",
    title: "Amazon API Gateway",
    author: "Gateway",
    authorColor: "bg-purple-600",
    color: "bg-white",
    borderColor: "border-purple-300",
    textColor: "text-purple-950",
    icon: AmazonApiGatewayIcon,
    isToolIcon: true,
    x: 245,
    y: 175,
    width: 125,
    height: 95,
    rotation: 0,
  },
  {
    id: "item-3",
    type: "sys-component",
    title: "AWS Lambda",
    author: "Compute",
    authorColor: "bg-amber-600",
    color: "bg-white",
    borderColor: "border-amber-300",
    textColor: "text-amber-950",
    icon: AwsLambdaIcon,
    isToolIcon: true,
    x: 440,
    y: 75,
    width: 125,
    height: 95,
    rotation: 0,
  },
  {
    id: "item-4",
    type: "sys-component",
    title: "Amazon DynamoDB",
    author: "Database",
    authorColor: "bg-blue-600",
    color: "bg-white",
    borderColor: "border-blue-300",
    textColor: "text-blue-950",
    icon: AmazonDynamoDBIcon,
    isToolIcon: true,
    x: 440,
    y: 275,
    width: 135,
    height: 95,
    rotation: 0,
  },
  {
    id: "item-5",
    type: "sys-component",
    title: "Redis Cache",
    author: "Cache",
    authorColor: "bg-rose-600",
    color: "bg-white",
    borderColor: "border-rose-300",
    textColor: "text-rose-950",
    icon: RedisIcon,
    isToolIcon: true,
    x: 655,
    y: 75,
    width: 115,
    height: 95,
    rotation: 0,
  },
  {
    id: "item-6",
    type: "sys-component",
    title: "Amazon S3",
    author: "Storage",
    authorColor: "bg-emerald-600",
    color: "bg-white",
    borderColor: "border-emerald-300",
    textColor: "text-emerald-950",
    icon: AmazonS3Icon,
    isToolIcon: true,
    x: 655,
    y: 275,
    width: 115,
    height: 95,
    rotation: 0,
  },
  {
    id: "item-7",
    type: "sticky",
    title: "⚡️ Architecture RFC",
    content: "• Token cache TTL: 3600s\n• Multi-AZ read replicas\n• Zero-downtime deploys",
    author: "Ayush",
    authorColor: "bg-amber-600",
    color: "bg-amber-100",
    borderColor: "border-amber-300",
    textColor: "text-amber-950",
    x: 825,
    y: 165,
    width: 175,
    height: 125,
    rotation: -1.5,
  },
]

const INITIAL_CONNECTORS: Connector[] = [
  {
    id: "conn-1",
    fromId: "item-1",
    toId: "item-2",
    color: "#6366F1",
    label: "HTTPS",
  },
  {
    id: "conn-2",
    fromId: "item-2",
    toId: "item-3",
    color: "#8B5CF6",
    label: "gRPC",
  },
  {
    id: "conn-3",
    fromId: "item-2",
    toId: "item-4",
    color: "#10B981",
    label: "REST",
  },
  {
    id: "conn-4",
    fromId: "item-3",
    toId: "item-5",
    color: "#F43F5E",
    label: "Cache",
    dashed: true,
  },
  {
    id: "conn-5",
    fromId: "item-4",
    toId: "item-6",
    color: "#0EA5E9",
    label: "SQL",
  },
  {
    id: "conn-6",
    fromId: "item-4",
    toId: "item-7",
    color: "#F59E0B",
    label: "RFC Note",
    dashed: true,
  },
]

const COLOR_PRESETS = [
  { name: "Purple", hex: "#8B5CF6", bg: "bg-purple-100/95", border: "border-purple-300", text: "text-purple-950" },
  { name: "Indigo", hex: "#6366F1", bg: "bg-indigo-50/95", border: "border-indigo-300", text: "text-indigo-950" },
  { name: "Emerald", hex: "#10B981", bg: "bg-emerald-100/95", border: "border-emerald-300", text: "text-emerald-950" },
  { name: "Amber", hex: "#F59E0B", bg: "bg-amber-100/95", border: "border-amber-300", text: "text-amber-950" },
  { name: "Rose", hex: "#F43F5E", bg: "bg-rose-100/95", border: "border-rose-300", text: "text-rose-950" },
]

/**
 * Calculates the exact boundary intersection point and outward normal
 * for rectangle, sticky note, or circle shapes.
 */
function getShapeBoundary(shape: CanvasItem, targetCenter: Point): IntersectionResult {
  const cx = shape.x + shape.width / 2
  const cy = shape.y + shape.height / 2
  const dx = targetCenter.x - cx
  const dy = targetCenter.y - cy

  if (shape.type === "circle") {
    const radius = shape.width / 2
    const len = Math.hypot(dx, dy) || 1
    const nx = dx / len
    const ny = dy / len
    return {
      x: cx + nx * radius,
      y: cy + ny * radius,
      normal: { x: nx, y: ny },
    }
  }

  // Rectangle / Sticky Note boundary calculation
  const hw = shape.width / 2
  const hh = shape.height / 2
  const absDx = Math.abs(dx) || 0.0001
  const absDy = Math.abs(dy) || 0.0001

  if (absDy / absDx <= hh / hw) {
    // Left or Right face intersection
    if (dx > 0) {
      return {
        x: cx + hw,
        y: cy + (dy / absDx) * hw,
        normal: { x: 1, y: 0 },
      }
    } else {
      return {
        x: cx - hw,
        y: cy - (dy / absDx) * hw,
        normal: { x: -1, y: 0 },
      }
    }
  } else {
    // Top or Bottom face intersection
    if (dy > 0) {
      return {
        x: cx + (dx / absDy) * hh,
        y: cy + hh,
        normal: { x: 0, y: 1 },
      }
    } else {
      return {
        x: cx - (dx / absDy) * hh,
        y: cy - hh,
        normal: { x: 0, y: -1 },
      }
    }
  }
}

/**
 * Generates dynamic cubic bezier arrow path and midpoint label coordinates
 */
function computeConnectorData(fromItem?: CanvasItem, toItem?: CanvasItem) {
  if (!fromItem || !toItem) return null

  const fromCenter = { x: fromItem.x + fromItem.width / 2, y: fromItem.y + fromItem.height / 2 }
  const toCenter = { x: toItem.x + toItem.width / 2, y: toItem.y + toItem.height / 2 }

  const start = getShapeBoundary(fromItem, toCenter)
  const end = getShapeBoundary(toItem, fromCenter)

  const dist = Math.hypot(end.x - start.x, end.y - start.y)
  const curvature = Math.min(90, Math.max(30, dist * 0.35))

  const cp1 = {
    x: start.x + start.normal.x * curvature,
    y: start.y + start.normal.y * curvature,
  }
  const cp2 = {
    x: end.x + end.normal.x * curvature,
    y: end.y + end.normal.y * curvature,
  }

  const path = `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`

  // Cubic bezier midpoint calculation (t = 0.5)
  const midX = 0.125 * start.x + 0.375 * cp1.x + 0.375 * cp2.x + 0.125 * end.x
  const midY = 0.125 * start.y + 0.375 * cp1.y + 0.375 * cp2.y + 0.125 * end.y

  return { path, midX, midY }
}

export function CanvasSimulator() {
  const [items, setItems] = useState<CanvasItem[]>(INITIAL_ITEMS)
  const [connectors, setConnectors] = useState<Connector[]>(INITIAL_CONNECTORS)
  const [activeTool, setActiveTool] = useState<string>("select")
  const [activeColorIndex, setActiveColorIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  // Freehand drawing state
  const [drawnLines, setDrawnLines] = useState<DrawnLine[]>([])
  const [currentLine, setCurrentLine] = useState<DrawnLine | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Interactive reactions state
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([])
  const [pinnedReactions, setPinnedReactions] = useState<PinnedReaction[]>([])

  // Direct item dragging state
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const dragStartRef = useRef<{
    pointerX: number
    pointerY: number
    itemX: number
    itemY: number
  } | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const activeColor = COLOR_PRESETS[activeColorIndex]

  // Clean reaction burst
  const triggerReactionBurst = useCallback((emoji: string, clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = clientX - rect.left
    const y = clientY - rect.top

    const newReactions = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      emoji,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 20,
    }))
    setFloatingReactions((prev) => [...prev.slice(-15), ...newReactions])
  }, [])

  // Auto clean floating reactions
  useEffect(() => {
    if (floatingReactions.length === 0) return
    const timer = setTimeout(() => {
      setFloatingReactions((prev) => prev.slice(4))
    }, 1800)
    return () => clearTimeout(timer)
  }, [floatingReactions])

  // Change color for selected item or future elements
  const handleColorSelect = (index: number) => {
    setActiveColorIndex(index)
    const chosen = COLOR_PRESETS[index]
    if (selectedItemId) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === selectedItemId
            ? { ...it, color: chosen.bg, borderColor: chosen.border, textColor: chosen.text }
            : it
        )
      )
    }
  }

  // Quick-spawn helper
  const spawnItem = useCallback(
    (type: "sticky" | "rect" | "circle", atX?: number, atY?: number) => {
      const id = `${type}-${Date.now()}`
      const baseOffset = (items.length % 5) * 25
      const spawnX = atX ?? 250 + baseOffset
      const spawnY = atY ?? 150 + baseOffset

      let newItem: CanvasItem
      if (type === "sticky") {
        newItem = {
          id,
          type: "sticky",
          title: "New Note",
          content: "Tap to edit or drag to connect ideas.",
          author: "You",
          authorColor: "bg-purple-600",
          color: activeColor.bg,
          borderColor: activeColor.border,
          textColor: activeColor.text,
          x: Math.max(10, Math.min(780, spawnX - 100)),
          y: Math.max(10, Math.min(380, spawnY - 60)),
          width: 200,
          height: 120,
          rotation: (Math.random() - 0.5) * 3,
        }
      } else if (type === "rect") {
        newItem = {
          id,
          type: "rect",
          title: "Pipeline Node",
          content: "Microservice / API endpoint",
          author: "You",
          authorColor: "bg-indigo-600",
          color: activeColor.bg,
          borderColor: activeColor.border,
          textColor: activeColor.text,
          x: Math.max(10, Math.min(780, spawnX - 110)),
          y: Math.max(10, Math.min(380, spawnY - 55)),
          width: 220,
          height: 110,
          rotation: 0,
        }
      } else {
        newItem = {
          id,
          type: "circle",
          title: "Concept",
          content: "Database Cluster",
          author: "You",
          authorColor: "bg-pink-600",
          color: activeColor.bg,
          borderColor: activeColor.border,
          textColor: activeColor.text,
          x: Math.max(10, Math.min(800, spawnX - 65)),
          y: Math.max(10, Math.min(380, spawnY - 65)),
          width: 130,
          height: 130,
          rotation: 0,
        }
      }

      setItems((prev) => [...prev, newItem])
      setSelectedItemId(id)
      return id
    },
    [activeColor, items.length]
  )

  // Direct item pointer dragging
  const handleItemPointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (activeTool === "pen") return // Allow drawing over card
    e.stopPropagation()
    setSelectedItemId(id)
    setDraggingId(id)

    const item = items.find((it) => it.id === id)
    if (!item) return

    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      itemX: item.x,
      itemY: item.y,
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}
  }

  const handleItemPointerMove = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingId !== id || !dragStartRef.current) return
    const scale = zoomLevel / 100
    const deltaX = (e.clientX - dragStartRef.current.pointerX) / scale
    const deltaY = (e.clientY - dragStartRef.current.pointerY) / scale

    const newX = Math.max(10, Math.min(850, dragStartRef.current.itemX + deltaX))
    const newY = Math.max(10, Math.min(460, dragStartRef.current.itemY + deltaY))

    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, x: newX, y: newY } : it))
    )
  }

  const handleItemPointerUp = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingId === id) {
      setDraggingId(null)
      dragStartRef.current = null
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}
    }
  }

  // Canvas pointer down for freehand drawing or placing new objects
  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const scale = zoomLevel / 100
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale

    if (activeTool === "pen") {
      setIsDrawing(true)
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {}
      setCurrentLine({
        id: `line-${Date.now()}`,
        points: [{ x, y }],
        color: activeColor.hex,
        width: 3.5,
      })
    } else if (activeTool === "sticky") {
      spawnItem("sticky", x, y)
      setActiveTool("select")
    } else if (activeTool === "rect") {
      spawnItem("rect", x, y)
      setActiveTool("select")
    } else if (activeTool === "circle") {
      spawnItem("circle", x, y)
      setActiveTool("select")
    } else if (["rocket", "fire", "idea", "heart", "thumbs"].includes(activeTool)) {
      const emojiMap: Record<string, string> = {
        rocket: "🚀",
        fire: "🔥",
        idea: "💡",
        heart: "❤️",
        thumbs: "👍",
      }
      const emoji = emojiMap[activeTool] || "🚀"
      setPinnedReactions((prev) => [...prev.slice(-25), { id: `pin-${Date.now()}`, emoji, x, y }])
      triggerReactionBurst(emoji, e.clientX, e.clientY)
    } else {
      setSelectedItemId(null)
    }
  }

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDrawing || activeTool !== "pen" || !currentLine) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const scale = zoomLevel / 100
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale

    setCurrentLine((prev) =>
      prev ? { ...prev, points: [...prev.points, { x, y }] } : null
    )
  }

  const handleCanvasPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDrawing) {
      if (currentLine && currentLine.points.length > 1) {
        setDrawnLines((prev) => [...prev, currentLine])
      }
      setIsDrawing(false)
      setCurrentLine(null)
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}
    }
  }

  // Delete selected item
  const handleDeleteItem = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setItems((prev) => prev.filter((it) => it.id !== id))
    setConnectors((prev) => prev.filter((c) => c.fromId !== id && c.toId !== id))
    if (selectedItemId === id) setSelectedItemId(null)
  }

  // Reset entire canvas
  const resetCanvas = () => {
    setItems(INITIAL_ITEMS)
    setConnectors(INITIAL_CONNECTORS)
    setDrawnLines([])
    setPinnedReactions([])
    setSelectedItemId(null)
    setZoomLevel(100)
    setActiveTool("select")
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-none border border-slate-200/90 bg-white shadow-[0_20px_70px_-15px_rgba(79,70,229,0.12)] backdrop-blur-xl overflow-hidden">
      {/* Canvas Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-slate-100 bg-slate-50/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-comico font-bold text-slate-800 text-sm">
              Sprint Planning & Architecture Canvas
            </span>
          </div>

          <div className="flex items-center -space-x-1.5 ml-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white ring-1 ring-slate-200">
              A
            </span>
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white ring-1 ring-slate-200">
              S
            </span>
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white ring-1 ring-slate-200">
              L
            </span>
            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-medium border-2 border-white ring-1 ring-slate-200">
              +4
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {drawnLines.length > 0 && (
            <button
              onClick={() => setDrawnLines([])}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-none transition-colors cursor-pointer"
              title="Clear freehand drawings"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear ink</span>
            </button>
          )}

          <button
            onClick={() => {
              spawnItem("sticky")
              setActiveTool("select")
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 rounded-none border border-indigo-200/60 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Sticky</span>
          </button>

          <button
            onClick={resetCanvas}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-none hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Reset canvas elements"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        ref={containerRef}
        onPointerDown={handleCanvasPointerDown}
        onPointerMove={handleCanvasPointerMove}
        onPointerUp={handleCanvasPointerUp}
        className={`relative w-full h-[540px] sm:h-[600px] overflow-hidden select-none bg-[#FAFBFD] ${
          activeTool === "pen"
            ? "cursor-crosshair"
            : activeTool !== "select"
            ? "cursor-cell"
            : "cursor-default"
        }`}
        style={{
          backgroundImage: `radial-gradient(#CBD5E1 1.25px, transparent 1.25px)`,
          backgroundSize: "24px 24px",
        }}
      >
        {/* Left-Hand Vertical Tools Dock (matching actual canvas toolbar) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 z-30 flex flex-col items-center gap-1 bg-white/95 p-1.5 rounded-none border border-slate-200/80 shadow-lg shadow-slate-300/40 backdrop-blur-md">
          {/* Select & Drag Tool */}
          <button
            onClick={() => setActiveTool("select")}
            className={`p-2 rounded-none text-xs font-medium transition-all cursor-pointer ${
              activeTool === "select"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
            title="Select & Move Objects: Drag boxes to see dynamic arrows follow!"
          >
            <MousePointer className="w-4 h-4" />
          </button>

          {/* Pencil Freehand Tool */}
          <button
            onClick={() => setActiveTool("pen")}
            className={`p-2 rounded-none text-xs font-medium transition-all cursor-pointer ${
              activeTool === "pen"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
            title="Pencil: Click and drag anywhere to draw freely"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* Sticky Note Tool */}
          <button
            onClick={() => {
              if (activeTool === "sticky") {
                spawnItem("sticky")
              } else {
                setActiveTool("sticky")
                spawnItem("sticky")
              }
            }}
            className={`p-2 rounded-none text-xs font-medium transition-all cursor-pointer ${
              activeTool === "sticky"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
            title="Sticky Note: Click to place a 3D sticky note"
          >
            <StickyNote className="w-4 h-4" />
          </button>

          {/* Rectangle / Microservice Node Tool */}
          <button
            onClick={() => {
              if (activeTool === "rect") {
                spawnItem("rect")
              } else {
                setActiveTool("rect")
                spawnItem("rect")
              }
            }}
            className={`p-2 rounded-none text-xs font-medium transition-all cursor-pointer ${
              activeTool === "rect"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
            title="Architecture Box: Click to place a service block"
          >
            <Square className="w-4 h-4" />
          </button>

          {/* Circle / Cache Node Tool */}
          <button
            onClick={() => {
              if (activeTool === "circle") {
                spawnItem("circle")
              } else {
                setActiveTool("circle")
                spawnItem("circle")
              }
            }}
            className={`p-2 rounded-none text-xs font-medium transition-all cursor-pointer ${
              activeTool === "circle"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
            title="Service Node: Click to place a cache or state node"
          >
            <CircleIcon className="w-4 h-4" />
          </button>

          <div className="w-5 h-[1px] bg-slate-200 my-0.5" />

          {/* Color Palette Swatches */}
          <div className="flex flex-col items-center gap-1.5 py-0.5">
            {COLOR_PRESETS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => handleColorSelect(i)}
                className={`w-3.5 h-3.5 rounded-none transition-transform cursor-pointer ${
                  activeColorIndex === i ? "scale-125 ring-2 ring-indigo-400 ring-offset-1" : "hover:scale-110"
                }`}
                style={{ backgroundColor: c.hex }}
                title={`Color: ${c.name} (applies to drawing & shapes)`}
              />
            ))}
          </div>

          <div className="w-5 h-[1px] bg-slate-200 my-0.5" />

          {/* Quick Emoji Reaction Stamps */}
          <div className="flex flex-col items-center gap-0.5">
            {[
              { id: "rocket", emoji: "🚀", title: "Rocket" },
              { id: "fire", emoji: "🔥", title: "Fire" },
              { id: "idea", emoji: "💡", title: "Idea" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={(e) => {
                  setActiveTool(item.id)
                  triggerReactionBurst(item.emoji, e.clientX, e.clientY)
                  const rect = containerRef.current?.getBoundingClientRect()
                  if (rect) {
                    const stampX = (rect.width / 2) + (Math.random() - 0.5) * 200
                    const stampY = (rect.height / 2) + (Math.random() - 0.5) * 120
                    setPinnedReactions((prev) => [
                      ...prev.slice(-25),
                      { id: `pin-${Date.now()}`, emoji: item.emoji, x: stampX, y: stampY },
                    ])
                  }
                }}
                className={`p-1.5 text-sm transition-transform rounded-none cursor-pointer ${
                  activeTool === item.id
                    ? "bg-indigo-100 scale-125 shadow-xs"
                    : "hover:scale-125 hover:bg-slate-100"
                }`}
                title={`Stamp ${item.title}: Click to burst and stamp on canvas`}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tool Notification Badge */}
        <div className="absolute top-4 right-4 sm:right-6 z-20 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white/95 border border-slate-200 shadow-sm text-xs font-medium text-slate-700 backdrop-blur-md pointer-events-none">
          {activeTool === "pen" ? (
            <>
              <Pencil className="w-3.5 h-3.5 text-indigo-600 animate-bounce" />
              <span>Pencil Active: Click and drag anywhere to draw!</span>
            </>
          ) : activeTool === "select" ? (
            <>
              <Move className="w-3.5 h-3.5 text-indigo-600" />
              <span>Drag any box: Connecting arrows smoothly route & stay connected!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Click anywhere on canvas to place your {activeTool}!</span>
            </>
          )}
        </div>

        {/* Scalable Canvas Layer */}
        <div
          className="w-full h-full relative origin-center transition-transform duration-150"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* Dynamic SVG Connectors Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            <defs>
              <marker
                id="dynamicArrowPurple"
                markerWidth="9"
                markerHeight="9"
                refX="8"
                refY="4.5"
                orient="auto"
              >
                <path d="M 0 1 L 8 4.5 L 0 8 z" fill="#8B5CF6" />
              </marker>
              <marker
                id="dynamicArrowEmerald"
                markerWidth="9"
                markerHeight="9"
                refX="8"
                refY="4.5"
                orient="auto"
              >
                <path d="M 0 1 L 8 4.5 L 0 8 z" fill="#10B981" />
              </marker>
              <marker
                id="dynamicArrowCyan"
                markerWidth="9"
                markerHeight="9"
                refX="8"
                refY="4.5"
                orient="auto"
              >
                <path d="M 0 1 L 8 4.5 L 0 8 z" fill="#06B6D4" />
              </marker>
              <marker
                id="dynamicArrowIndigo"
                markerWidth="9"
                markerHeight="9"
                refX="8"
                refY="4.5"
                orient="auto"
              >
                <path d="M 0 1 L 8 4.5 L 0 8 z" fill="#6366F1" />
              </marker>
            </defs>

            {/* Connecting arrows between boxes */}
            {connectors.map((conn) => {
              const fromItem = items.find((it) => it.id === conn.fromId)
              const toItem = items.find((it) => it.id === conn.toId)
              const data = computeConnectorData(fromItem, toItem)
              if (!data) return null

              const markerId =
                conn.color === "#10B981"
                  ? "url(#dynamicArrowEmerald)"
                  : conn.color === "#06B6D4"
                  ? "url(#dynamicArrowCyan)"
                  : conn.color === "#6366F1"
                  ? "url(#dynamicArrowIndigo)"
                  : "url(#dynamicArrowPurple)"

              return (
                <g key={conn.id}>
                  <path
                    d={data.path}
                    fill="none"
                    stroke={conn.color}
                    strokeWidth="2.5"
                    strokeDasharray={conn.dashed ? "6 5" : undefined}
                    markerEnd={markerId}
                    strokeLinecap="round"
                  />
                  {conn.label && (
                    <g transform={`translate(${data.midX}, ${data.midY})`}>
                      <rect
                        x="-40"
                        y="-12"
                        width="80"
                        height="20"
                        rx="10"
                        fill="white"
                        stroke={conn.color}
                        strokeWidth="1"
                        className="shadow-xs"
                      />
                      <text
                        x="0"
                        y="2"
                        fill={conn.color}
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="select-none font-mono tracking-tight"
                      >
                        {conn.label}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* Freehand Drawn SVG Paths */}
            {drawnLines.map((line) => {
              if (line.points.length < 2) return null
              const d = line.points.reduce(
                (acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.y}`,
                ""
              )
              return (
                <path
                  key={line.id}
                  d={d}
                  fill="none"
                  stroke={line.color}
                  strokeWidth={line.width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )
            })}

            {/* Active Line in Progress */}
            {currentLine && currentLine.points.length > 1 && (
              <path
                d={currentLine.points.reduce(
                  (acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.y}`,
                  ""
                )}
                fill="none"
                stroke={currentLine.color}
                strokeWidth={currentLine.width}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>

          {/* Render All Canvas Items (Stickies, Rectangles, Circles) */}
          {items.map((item) => {
            const isSelected = selectedItemId === item.id
            const isDragging = draggingId === item.id

            return (
              <div
                key={item.id}
                onPointerDown={(e) => handleItemPointerDown(item.id, e)}
                onPointerMove={(e) => handleItemPointerMove(item.id, e)}
                onPointerUp={(e) => handleItemPointerUp(item.id, e)}
                style={{
                  position: "absolute",
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  width: `${item.width}px`,
                  minHeight: `${item.height}px`,
                  transform: `rotate(${item.rotation}deg)`,
                  zIndex: isDragging ? 50 : isSelected ? 40 : 20,
                  touchAction: "none",
                  clipPath:
                    item.type === "sticky"
                      ? "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%)"
                      : undefined,
                }}
                className={`group border transition-shadow select-none relative ${
                  isDragging ? "cursor-grabbing shadow-2xl scale-[1.02]" : "cursor-grab shadow-md hover:shadow-lg"
                } ${item.borderColor} ${item.color} ${item.textColor} ${
                  isSelected ? "ring-2 ring-indigo-500 ring-offset-2" : ""
                } ${
                  item.type === "circle"
                    ? "rounded-none flex flex-col items-center justify-center text-center p-3 aspect-square"
                    : item.type === "sticky"
                    ? "rounded-none p-4"
                    : item.type === "sys-component"
                    ? "rounded-none p-2.5 flex flex-col items-center justify-center"
                    : "rounded-none p-4"
                }`}
              >
                {/* 1. ACTUAL CANVAS SYSTEM COMPONENT CARD */}
                {item.type === "sys-component" && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center pointer-events-none relative">
                    {/* Status Pill Top-Right */}
                    <div className="absolute top-0 right-0 flex items-center gap-1 px-1.5 py-0.5 rounded-none bg-emerald-50 border border-emerald-200/80 text-[7px] font-bold text-emerald-700 font-mono">
                      <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse" />
                      <span>ONLINE</span>
                    </div>

                    {/* Icon Badge */}
                    {item.isToolIcon && item.icon ? (
                      <div className="mb-1.5 flex items-center justify-center">
                        <item.icon size={36} showBadge={true} badgeClassName="rounded-none shadow-2xs" />
                      </div>
                    ) : (
                      <div className={`w-9 h-9 rounded-none flex items-center justify-center mb-1.5 shadow-2xs ${item.iconBg || "bg-indigo-100"}`}>
                        {item.icon ? (
                          <item.icon className={`w-5 h-5 ${item.iconColor || "text-indigo-600"}`} strokeWidth={1.8} />
                        ) : (
                          <Box className="w-5 h-5 text-indigo-600" strokeWidth={1.8} />
                        )}
                      </div>
                    )}

                    {/* Clean Component Title (No descriptions) */}
                    <span className="text-[11px] font-bold text-slate-800 leading-tight tracking-tight">
                      {item.title}
                    </span>
                  </div>
                )}

                {/* 2. 3D Paper Sticky Note Details */}
                {item.type === "sticky" && (
                  <>
                    {/* Top Adhesive Band */}
                    <div className="w-full h-3 -mt-4 -mx-4 mb-2.5 px-4 bg-black/[0.04] border-b border-black/[0.06] flex items-center pointer-events-none">
                      <div className="w-full h-[1px] bg-white/30 rounded-none" />
                    </div>

                    {/* 3D Curled Corner Flap */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none select-none overflow-visible">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full overflow-visible"
                        style={{ filter: "drop-shadow(-2px -2px 2.5px rgba(0,0,0,0.22))" }}
                      >
                        <defs>
                          <linearGradient id={`sim-curl-${item.id}`} x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.6" />
                            <stop offset="60%" stopColor="#fef08a" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                          </linearGradient>
                          <radialGradient id={`sim-shadow-${item.id}`} cx="20%" cy="20%" r="80%">
                            <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <path d="M 0 24 Q 12 20 24 0 L 24 24 Z" fill={`url(#sim-shadow-${item.id})`} />
                        <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill="#fef08a" />
                        <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill={`url(#sim-curl-${item.id})`} />
                        <path
                          d="M 24 0 C 19 9 12 18 0 24"
                          stroke="rgba(255, 255, 255, 0.75)"
                          strokeWidth="0.8"
                          fill="none"
                        />
                      </svg>
                    </div>

                    {/* Sticky Note Content */}
                    <h4 className="font-comico font-bold text-xs leading-tight mb-1 pointer-events-none">
                      {item.title}
                    </h4>
                    {item.content && (
                      <p className="text-[11px] leading-relaxed whitespace-pre-line opacity-85 pointer-events-none">
                        {item.content}
                      </p>
                    )}
                  </>
                )}

                {/* Floating Action Controls on Selected Item */}
                {isSelected && (
                  <div className="absolute -top-3.5 right-2 flex items-center gap-1 bg-white border border-slate-200 rounded-none px-1.5 py-0.5 shadow-md z-30">
                    <button
                      onClick={(e) => handleDeleteItem(item.id, e)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded-none transition-colors cursor-pointer"
                      title="Delete object"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Fallback for regular rect/circle if placed */}
                {item.type !== "sys-component" && item.type !== "sticky" && (
                  <>
                    <h4 className="font-comico font-bold text-sm leading-tight mb-1 pointer-events-none">
                      {item.title}
                    </h4>
                    {item.content && (
                      <p className="text-xs leading-relaxed whitespace-pre-line opacity-85 pointer-events-none">
                        {item.content}
                      </p>
                    )}
                  </>
                )}
              </div>
            )
          })}

          {/* Pinned Emoji Stickers on Canvas */}
          {pinnedReactions.map((pin) => (
            <motion.div
              key={pin.id}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              style={{
                position: "absolute",
                left: `${pin.x}px`,
                top: `${pin.y}px`,
              }}
              className="text-2xl select-none z-25 filter drop-shadow-sm pointer-events-none -translate-x-1/2 -translate-y-1/2"
            >
              {pin.emoji}
            </motion.div>
          ))}

          {/* Simulated Multiplayer Cursors */}
          <motion.div
            animate={{
              x: [180, 260, 320, 240, 180],
              y: [120, 160, 140, 210, 120],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 z-30 pointer-events-none flex items-center gap-1"
          >
            <svg
              className="w-4 h-4 text-emerald-500 filter drop-shadow"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" />
            </svg>
            <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-none shadow-sm">
              Sarah
            </span>
          </motion.div>

          <motion.div
            animate={{
              x: [620, 540, 480, 580, 620],
              y: [220, 180, 260, 240, 220],
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 z-30 pointer-events-none flex items-center gap-1"
          >
            <svg
              className="w-4 h-4 text-purple-500 filter drop-shadow"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" />
            </svg>
            <span className="text-[10px] font-bold bg-purple-500 text-white px-1.5 py-0.5 rounded-none shadow-sm">
              Alex
            </span>
          </motion.div>
        </div>

        {/* Reaction Floating Particle Bursts */}
        <AnimatePresence>
          {floatingReactions.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 1, scale: 0.5, y: 0 }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0.5, 1.4, 1.8],
                y: -140,
                x: (Math.random() - 0.5) * 60,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: `${r.x}px`,
                top: `${r.y}px`,
                pointerEvents: "none",
                zIndex: 60,
              }}
              className="text-3xl select-none filter drop-shadow-md"
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Canvas Bottom Control Footer */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50 border-t border-slate-200/80 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Multiplayer live sync</span>
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="hidden sm:inline">Dynamic arrow auto-routing</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel((z) => Math.max(60, z - 15))}
            className="p-1.5 hover:bg-slate-200/70 rounded-none text-slate-600 transition-colors cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(100)}
            className="px-2 font-mono text-[11px] font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
            title="Reset zoom to 100%"
          >
            {zoomLevel}%
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
            className="p-1.5 hover:bg-slate-200/70 rounded-none text-slate-600 transition-colors cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
