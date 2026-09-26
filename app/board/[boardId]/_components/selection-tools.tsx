"use client"

import { memo, useState, useEffect } from "react"
import {
  Camera,
  Color,
  LayerType,
  ComponentStatus,
  SysComponent,
  FontFamily,
  FontWeight,
  FontStyle,
  TextDecoration,
  TextAlign,
  FillStyle,
  StrokeWidth,
  Roundness,
  DocType,
} from "@/types/canvas"
import { useSelectionBounds } from "@/hooks/use-selection-bound"
import { useMutation, useSelf, useStorage } from "@liveblocks/react/suspense"
import { useDeleteLayers } from "@/hooks/use-delete-layers"
import { Hint } from "@/components/hint"
import {
  BringToFront,
  SendToBack,
  Trash2,
  Copy,
  Network,
  Spline,
  CornerDownRight,
  ArrowRight,
  ArrowRightLeft,
  Minus,
  Layers,
  ChevronDown,
  Check,
  Box,
  Palette,
  RotateCcw,
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignStartHorizontal,
  AlignEndHorizontal,
  AlignStartVertical,
  AlignEndVertical,
  AlignHorizontalDistributeCenter,
  AlignVerticalDistributeCenter,
  Lock,
  Unlock,
  Tag,
  Type,
  Square,
  Circle,
  StickyNote,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  CheckSquare2,
  Globe,
  Calculator,
  AlertTriangle,
  Database,
  ListOrdered,
  Boxes,
  Maximize2,
  Move,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { COMPONENT_LABELS, ICON_MAP } from "./sys-component-layer"
import { useCanvasTheme } from "./canvas-theme-context"

interface SelectionToolsProps {
  camera: Camera
  setLastUsedColor: (color: Color) => void
  onDuplicate?: () => void
  onRename?: () => void
  onSelectConnected?: () => void
  onSelectEnclosed?: (sectionId: string) => void
  onFitSectionToEnclosed?: (sectionId: string) => void
  moveSectionWithContents?: boolean
  onToggleMoveSectionWithContents?: () => void
}

const SECTION_PRESETS = [
  { name: "VPC Network", fill: { r: 99, g: 102, b: 241 }, pattern: "dashed" as const, desc: "Virtual Private Cloud boundary" },
  { name: "Public Subnet (DMZ)", fill: { r: 16, g: 185, b: 129 }, pattern: "dashed" as const, desc: "Public facing DMZ & Load Balancers" },
  { name: "Private App Subnet", fill: { r: 14, g: 165, b: 233 }, pattern: "dashed" as const, desc: "Internal microservices tier" },
  { name: "Database & Storage Tier", fill: { r: 245, g: 158, b: 11 }, pattern: "dotted" as const, desc: "Stateful databases, caches & queues" },
  { name: "Kubernetes Cluster", fill: { r: 168, g: 85, b: 247 }, pattern: "dashed" as const, desc: "Container pods & service mesh" },
  { name: "Security & Auth Zone", fill: { r: 244, g: 63, b: 94 }, pattern: "solid" as const, desc: "IAM, Key Vault & Auth services" },
]

const PALETTE: { name: string; color: Color; hex: string }[] = [
  { name: "Dark", hex: "#0f172a", color: { r: 15, g: 23, b: 42 } },
  { name: "Light", hex: "#f8fafc", color: { r: 248, g: 250, b: 252 } },
  { name: "Indigo", hex: "#6366f1", color: { r: 99, g: 102, b: 241 } },
  { name: "Sky", hex: "#0ea5e9", color: { r: 14, g: 165, b: 233 } },
  { name: "Emerald", hex: "#10b981", color: { r: 16, g: 185, b: 129 } },
  { name: "Amber", hex: "#f59e0b", color: { r: 245, g: 158, b: 11 } },
  { name: "Rose", hex: "#f43f5e", color: { r: 244, g: 63, b: 94 } },
  { name: "Purple", hex: "#a855f7", color: { r: 168, g: 85, b: 247 } },
  { name: "Cyan", hex: "#06b6d4", color: { r: 6, g: 182, b: 212 } },
  { name: "Slate", hex: "#64748b", color: { r: 100, g: 116, b: 139 } },
]

export const SelectionTools = memo(
  ({
    camera,
    setLastUsedColor,
    onDuplicate,
    onSelectConnected,
    onSelectEnclosed,
    onFitSectionToEnclosed,
    moveSectionWithContents = true,
    onToggleMoveSectionWithContents,
  }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection)
    const selectionBounds = useSelectionBounds()
    const { theme } = useCanvasTheme()
    const isLight = theme === "light"

    const soleLayerId = selection.length === 1 ? selection[0] : null
    const soleLayer = useStorage((root) =>
      soleLayerId ? root.layers.get(soleLayerId) : null
    )
    const isAnyLocked = useStorage((root) =>
      selection.some((id) => (root.layers.get(id) as any)?.isLocked === true)
    )

    // Local label state for snappy inline editing
    const [labelInput, setLabelInput] = useState("")
    const soleLayerValue = soleLayer && "value" in soleLayer ? (soleLayer.value as string) : null
    const soleLayerTitle = soleLayer && "title" in soleLayer ? (soleLayer.title as string) : null

    useEffect(() => {
      setLabelInput(soleLayerValue || soleLayerTitle || "")
    }, [soleLayerId, soleLayerValue, soleLayerTitle])

    // Save label on blur or Enter
    const saveLabel = useMutation(({ storage }, value: string) => {
      if (!soleLayerId) return
      const l = storage.get("layers").get(soleLayerId)
      l?.set("value", value)
      if (l && l.get("type") === LayerType.Doc) {
        ;(l as any).set("title", value)
      }
    }, [soleLayerId])

    // Change layer color (updates customColor for components, fill for arrows/shapes/text)
    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers")
        setLastUsedColor(fill)
        selection.forEach((id) => {
          const l = liveLayers.get(id)
          if (!l) return
          l.set("fill", fill)
          if (l.get("type") === LayerType.Component) {
            ;(l as any).set("customColor", fill)
          }
        })
      },
      [selection, setLastUsedColor]
    )

    // Reset component color back to default authentic theme
    const resetComponentColor = useMutation(({ storage }) => {
      if (!soleLayerId) return
      const layer = storage.get("layers").get(soleLayerId)
      if (layer && layer.get("type") === LayerType.Component) {
        ;(layer as any).set("customColor", undefined)
      }
    }, [soleLayerId])

    // Typography mutations
    const setFontFamily = useMutation(({ storage }, fontFamily: FontFamily) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) (l as any).set("fontFamily", fontFamily)
      })
    }, [selection])

    const setFontSize = useMutation(({ storage }, fontSize: number) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) (l as any).set("fontSize", fontSize)
      })
    }, [selection])

    const setFontWeight = useMutation(({ storage }, fontWeight: FontWeight) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) (l as any).set("fontWeight", fontWeight)
      })
    }, [selection])

    const setFontStyle = useMutation(({ storage }, fontStyle: FontStyle) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) (l as any).set("fontStyle", fontStyle)
      })
    }, [selection])

    const setTextDecoration = useMutation(({ storage }, textDecoration: TextDecoration) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) (l as any).set("textDecoration", textDecoration)
      })
    }, [selection])

    const setTextAlign = useMutation(({ storage }, textAlign: TextAlign) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) (l as any).set("textAlign", textAlign)
      })
    }, [selection])

    // Shape mutations
    const setFillStyle = useMutation(({ storage }, fillStyle: FillStyle) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) (l as any).set("fillStyle", fillStyle)
      })
    }, [selection])

    const setStrokeWidth = useMutation(({ storage }, strokeWidth: number) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) (l as any).set("strokeWidth", strokeWidth)
      })
    }, [selection])

    const setRoundness = useMutation(({ storage }, roundness: Roundness) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) (l as any).set("roundness", roundness)
      })
    }, [selection])

    // Arrow specific mutations
    const setArrowStyle = useMutation(({ storage }, style: "curvy" | "sharp" | "straight") => {
      if (!soleLayerId) return
      const layer = storage.get("layers").get(soleLayerId)
      if (layer && layer.get("type") === LayerType.Arrow) {
        ;(layer as any).set("arrowStyle", style)
      }
    }, [soleLayerId])

    const setStrokePattern = useMutation(
      ({ storage }, pattern: "solid" | "dashed" | "dotted") => {
        const liveLayers = storage.get("layers")
        selection.forEach((id) => {
          const layer = liveLayers.get(id)
          if (layer) {
            ;(layer as any).set("strokePattern", pattern)
          }
        })
      },
      [selection]
    )

    const setArrowDirection = useMutation(
      ({ storage }, direction: "forward" | "bidirectional" | "none") => {
        if (!soleLayerId) return
        const layer = storage.get("layers").get(soleLayerId)
        if (layer && layer.get("type") === LayerType.Arrow) {
          ;(layer as any).set("direction", direction)
        }
      },
      [soleLayerId]
    )

    const setSequenceStep = useMutation(
      ({ storage }, step: number | undefined) => {
        if (!soleLayerId) return
        const layer = storage.get("layers").get(soleLayerId)
        if (layer && layer.get("type") === LayerType.Arrow) {
          ;(layer as any).set("sequenceStep", step)
        }
      },
      [soleLayerId]
    )

    // Component health status mutation
    const setComponentStatus = useMutation(
      ({ storage }, newStatus: ComponentStatus) => {
        if (!soleLayerId) return
        const layer = storage.get("layers").get(soleLayerId)
        if (layer && layer.get("type") === LayerType.Component) {
          ;(layer as any).set("status", newStatus)
          let statusText = ""
          switch (newStatus) {
            case "healthy":    statusText = "HEALTHY";    break
            case "warning":    statusText = "WARN";       break
            case "error":      statusText = "OUTAGE";     break
            case "info":       statusText = "INFO";       break
            case "active":     statusText = "ACTIVE";     break
            case "planned":    statusText = "PLANNED";    break
            case "degraded":   statusText = "DEGRADED";   break
            case "deprecated": statusText = "DEPRECATED"; break
            default:           statusText = "";           break
          }
          ;(layer as any).set("statusText", statusText)
        }
      },
      [soleLayerId]
    )

    // Architecture Section Preset mutation
    const applySectionPreset = useMutation(
      (
        { storage },
        preset: { name: string; fill: Color; pattern: "solid" | "dashed" | "dotted" }
      ) => {
        if (!soleLayerId) return
        const layer = storage.get("layers").get(soleLayerId)
        if (layer && layer.get("type") === LayerType.Section) {
          layer.set("value", preset.name)
          layer.set("fill", preset.fill)
          ;(layer as any).set("strokePattern", preset.pattern)
          setLabelInput(preset.name)
        }
      },
      [soleLayerId]
    )

    // Layer ordering mutations
    const moveToFront = useMutation(({ storage }) => {
      const liveLayerIds = storage.get("layerIds")
      const indices: number[] = []
      const arr = liveLayerIds.toImmutable()
      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) indices.push(i)
      }
      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i))
      }
    }, [selection])

    const moveToBack = useMutation(({ storage }) => {
      const liveLayerIds = storage.get("layerIds")
      const indices: number[] = []
      const arr = liveLayerIds.toImmutable()
      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) indices.push(i)
      }
      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i)
      }
    }, [selection])

    // Multi-Layer Alignment Mutations
    const alignLeft = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 2) return
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer && !layer.get("isLocked")) {
          layer.set("x", selectionBounds.x)
        }
      })
    }, [selection, selectionBounds])

    const alignCenterH = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 2) return
      const liveLayers = storage.get("layers")
      const centerX = selectionBounds.x + selectionBounds.width / 2
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer && !layer.get("isLocked")) {
          const w = (layer.get("width") as number) || 0
          layer.set("x", centerX - w / 2)
        }
      })
    }, [selection, selectionBounds])

    const alignRight = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 2) return
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer && !layer.get("isLocked")) {
          const w = (layer.get("width") as number) || 0
          layer.set("x", selectionBounds.x + selectionBounds.width - w)
        }
      })
    }, [selection, selectionBounds])

    const alignTop = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 2) return
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer && !layer.get("isLocked")) {
          layer.set("y", selectionBounds.y)
        }
      })
    }, [selection, selectionBounds])

    const alignCenterV = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 2) return
      const liveLayers = storage.get("layers")
      const centerY = selectionBounds.y + selectionBounds.height / 2
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer && !layer.get("isLocked")) {
          const h = (layer.get("height") as number) || 0
          layer.set("y", centerY - h / 2)
        }
      })
    }, [selection, selectionBounds])

    const alignBottom = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 2) return
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer && !layer.get("isLocked")) {
          const h = (layer.get("height") as number) || 0
          layer.set("y", selectionBounds.y + selectionBounds.height - h)
        }
      })
    }, [selection, selectionBounds])

    // Distribution Mutations (requires at least 3 layers)
    const distributeHorizontal = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 3) return
      const liveLayers = storage.get("layers")
      const items = selection
        .map((id) => {
          const l = liveLayers.get(id)
          return l ? { id, layer: l, x: (l.get("x") as number) || 0, w: (l.get("width") as number) || 0 } : null
        })
        .filter(Boolean) as { id: string; layer: any; x: number; w: number }[]
      if (items.length < 3) return
      items.sort((a, b) => a.x - b.x)
      const first = items[0]
      const last = items[items.length - 1]
      const totalSpan = last.x + last.w - first.x
      const totalItemWidths = items.reduce((acc, it) => acc + it.w, 0)
      const remainingGap = Math.max(0, totalSpan - totalItemWidths)
      const gap = remainingGap / (items.length - 1)
      let curX = first.x
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (!item.layer.get("isLocked")) {
          item.layer.set("x", curX)
        }
        curX += item.w + gap
      }
    }, [selection, selectionBounds])

    const distributeVertical = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 3) return
      const liveLayers = storage.get("layers")
      const items = selection
        .map((id) => {
          const l = liveLayers.get(id)
          return l ? { id, layer: l, y: (l.get("y") as number) || 0, h: (l.get("height") as number) || 0 } : null
        })
        .filter(Boolean) as { id: string; layer: any; y: number; h: number }[]
      if (items.length < 3) return
      items.sort((a, b) => a.y - b.y)
      const first = items[0]
      const last = items[items.length - 1]
      const totalSpan = last.y + last.h - first.y
      const totalItemHeights = items.reduce((acc, it) => acc + it.h, 0)
      const remainingGap = Math.max(0, totalSpan - totalItemHeights)
      const gap = remainingGap / (items.length - 1)
      let curY = first.y
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (!item.layer.get("isLocked")) {
          item.layer.set("y", curY)
        }
        curY += item.h + gap
      }
    }, [selection, selectionBounds])

    // Layer Locking Mutation
    const toggleLock = useMutation(({ storage }) => {
      const liveLayers = storage.get("layers")
      const anyLocked = selection.some((id) => liveLayers.get(id)?.get("isLocked") === true)
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l) {
          ;(l as any).set("isLocked", !anyLocked)
        }
      })
    }, [selection])

    // Arrow Protocol Mutation
    const setArrowProtocol = useMutation(
      ({ storage }, protocol: string | undefined) => {
        if (!soleLayerId) return
        const layer = storage.get("layers").get(soleLayerId)
        if (layer && layer.get("type") === LayerType.Arrow) {
          ;(layer as any).set("protocol", protocol)
        }
      },
      [soleLayerId]
    )

    const deleteLayers = useDeleteLayers()

    // If nothing selected or bounds not ready, render nothing
    if (selection.length === 0 || !selectionBounds) {
      return null
    }

    const zoom = camera.zoom || 1
    const screenX = selectionBounds.x * zoom + camera.x
    const screenY = selectionBounds.y * zoom + camera.y
    const screenW = selectionBounds.width * zoom
    const screenH = selectionBounds.height * zoom

    // Smart-Flip Positioning: NEVER overlap selected components
    const shouldFlipBelow = screenY < 125
    const tooltipY = shouldFlipBelow
      ? screenY + screenH + 12
      : screenY - 52

    const tooltipX = screenX + screenW / 2

    const isMultiple = selection.length > 1
    const layerType = soleLayer?.type

    const isComponent = layerType === LayerType.Component
    const isArrow = layerType === LayerType.Arrow
    const isSection = layerType === LayerType.Section
    const isText = layerType === LayerType.Text
    const isRect = layerType === LayerType.Rectangle
    const isEllipse = layerType === LayerType.Ellipse
    const isShape = isRect || isEllipse
    const isNote = layerType === LayerType.Note
    const isDoc = layerType === LayerType.Doc
    const docType: DocType | null = isDoc && soleLayer && "docType" in soleLayer ? (soleLayer.docType as DocType) : null

    const currentArrowStyle = isArrow && soleLayer && "arrowStyle" in soleLayer ? (soleLayer.arrowStyle || "curvy") : "curvy"
    const currentStrokePattern = soleLayer && "strokePattern" in soleLayer ? (soleLayer.strokePattern || "solid") : "solid"
    const currentStrokeWidth = soleLayer && "strokeWidth" in soleLayer ? (soleLayer.strokeWidth || 2) : 2
    const currentFillStyle: FillStyle = soleLayer && "fillStyle" in soleLayer ? (soleLayer.fillStyle || "solid") : "solid"
    const currentRoundness: Roundness = soleLayer && "roundness" in soleLayer ? (soleLayer.roundness || "rounded") : "rounded"
    const currentFontFamily: FontFamily = soleLayer && "fontFamily" in soleLayer ? (soleLayer.fontFamily || (isNote ? "handwriting" : "sans")) : (isNote ? "handwriting" : "sans")
    const currentFontSize = soleLayer && "fontSize" in soleLayer ? (soleLayer.fontSize || (isText ? 24 : isNote ? 20 : 18)) : (isText ? 24 : isNote ? 20 : 18)
    const currentFontWeight: FontWeight = soleLayer && "fontWeight" in soleLayer ? (soleLayer.fontWeight || "normal") : "normal"
    const currentFontStyle: FontStyle = soleLayer && "fontStyle" in soleLayer ? (soleLayer.fontStyle || "normal") : "normal"
    const currentTextDecoration: TextDecoration = soleLayer && "textDecoration" in soleLayer ? (soleLayer.textDecoration || "none") : "none"
    const currentTextAlign: TextAlign = soleLayer && "textAlign" in soleLayer ? (soleLayer.textAlign || (isText ? "left" : "center")) : (isText ? "left" : "center")
    const currentDirection = isArrow && soleLayer && "direction" in soleLayer ? (soleLayer.direction || "forward") : "forward"
    const currentSequenceStep: number | undefined = isArrow && soleLayer && "sequenceStep" in soleLayer ? (soleLayer.sequenceStep as number | undefined) : undefined
    const currentProtocol: string | undefined = isArrow && soleLayer && "protocol" in soleLayer ? ((soleLayer as any).protocol as string | undefined) : undefined
    const currentStatus: ComponentStatus = isComponent && soleLayer && "status" in soleLayer && soleLayer.status ? (soleLayer.status as ComponentStatus) : "none"
    const compType = isComponent && soleLayer && "componentType" in soleLayer ? (soleLayer.componentType as SysComponent) : null
    const CompIcon = compType ? ICON_MAP[compType] || Box : Box

    const toggleBold = () => setFontWeight(currentFontWeight === "bold" ? "normal" : "bold")
    const toggleItalic = () => setFontStyle(currentFontStyle === "italic" ? "normal" : "italic")
    const toggleUnderline = () => setTextDecoration(currentTextDecoration === "underline" ? "none" : "underline")

    const containerClasses = isLight
      ? "bg-white/95 text-slate-800 border-slate-200/90 shadow-xl shadow-slate-900/10"
      : "bg-neutral-900/95 text-white border-neutral-700/80 shadow-2xl"

    const dividerClass = isLight ? "border-slate-200" : "border-neutral-700/80"

    const inputClassComp = isLight
      ? "bg-slate-100 hover:bg-slate-200/70 focus:bg-white border-slate-200 focus:border-indigo-500 text-slate-900 placeholder:text-slate-400"
      : "bg-neutral-800/80 hover:bg-neutral-800 focus:bg-neutral-950 border-neutral-700 focus:border-indigo-400 text-white placeholder:text-neutral-500"

    const inputClassArrow = isLight
      ? "bg-slate-100 hover:bg-slate-200/70 focus:bg-white border-slate-200 focus:border-cyan-500 text-slate-900 placeholder:text-slate-400"
      : "bg-neutral-800/80 hover:bg-neutral-800 focus:bg-neutral-950 border-neutral-700 focus:border-cyan-400 text-white placeholder:text-neutral-500"

    const inputClassText = isLight
      ? "bg-slate-100 hover:bg-slate-200/70 focus:bg-white border-slate-200 focus:border-violet-500 text-slate-900 placeholder:text-slate-400"
      : "bg-neutral-800/80 hover:bg-neutral-800 focus:bg-neutral-950 border-neutral-700 focus:border-violet-400 text-white placeholder:text-neutral-500"

    const inputClassShape = isLight
      ? "bg-slate-100 hover:bg-slate-200/70 focus:bg-white border-slate-200 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
      : "bg-neutral-800/80 hover:bg-neutral-800 focus:bg-neutral-950 border-neutral-700 focus:border-blue-400 text-white placeholder:text-neutral-500"

    const buttonPillClass = isLight
      ? "bg-slate-100 hover:bg-slate-200/70 border-slate-200 text-slate-800"
      : "bg-neutral-800 hover:bg-neutral-750 border-neutral-700 text-white"

    const buttonPillInactive = isLight
      ? "text-slate-500 hover:text-slate-900"
      : "text-neutral-400 hover:text-white"

    const dropdownMenuContentClass = isLight
      ? "bg-white border-slate-200 text-slate-800 shadow-xl"
      : "bg-neutral-900 border-neutral-750 text-white shadow-2xl"

    const dropdownMenuItemClass = isLight
      ? "hover:bg-slate-100 text-slate-800 cursor-pointer"
      : "hover:bg-neutral-800 text-white cursor-pointer"

    const actionButtonClass = isLight
      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      : "text-neutral-300 hover:text-white hover:bg-neutral-800"

    return (
      <div
        style={{
          position: "fixed",
          left: `${Math.max(220, Math.min(typeof window !== "undefined" ? window.innerWidth - 220 : 800, tooltipX))}px`,
          top: `${Math.max(65, tooltipY)}px`,
          transform: "translate(-50%, 0)",
        }}
        className={`z-50 flex items-center gap-1.5 backdrop-blur-xl border rounded-2xl px-3 py-1.5 select-none transition-all duration-150 text-xs animate-in fade-in zoom-in-95 pointer-events-auto ${containerClasses}`}
      >
        {/* ── SECTION 1: INLINE EDITABLE NAME & TYPE ── */}
        {isComponent && compType && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            <div className={`p-1 rounded-md ${isLight ? "bg-indigo-50 text-indigo-600" : "bg-indigo-500/20 text-indigo-400"}`}>
              <CompIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={labelInput}
              placeholder={COMPONENT_LABELS[compType]}
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={(e) => saveLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveLabel(e.currentTarget.value)
                  e.currentTarget.blur()
                }
              }}
              className={`outline-none rounded-lg px-2 py-0.5 text-xs font-semibold w-28 sm:w-36 transition border ${inputClassComp}`}
            />
          </div>
        )}

        {isArrow && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            <div className={`p-1 rounded-md ${isLight ? "bg-cyan-50 text-cyan-600" : "bg-cyan-500/20 text-cyan-400"}`}>
              <Spline className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={labelInput}
              placeholder="Protocol / Label"
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={(e) => saveLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveLabel(e.currentTarget.value)
                  e.currentTarget.blur()
                }
              }}
              className={`outline-none rounded-lg px-2 py-0.5 text-xs font-semibold w-28 sm:w-32 transition border ${inputClassArrow}`}
            />
          </div>
        )}

        {isText && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            <div className={`p-1 rounded-md ${isLight ? "bg-violet-50 text-violet-600" : "bg-violet-500/20 text-violet-400"}`}>
              <Type className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={labelInput}
              placeholder="Text..."
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={(e) => saveLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveLabel(e.currentTarget.value)
                  e.currentTarget.blur()
                }
              }}
              className={`outline-none rounded-lg px-2 py-0.5 text-xs font-medium w-28 sm:w-36 transition border ${inputClassText}`}
            />
          </div>
        )}

        {isRect && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            <div className={`p-1 rounded-md ${isLight ? "bg-blue-50 text-blue-600" : "bg-blue-500/20 text-blue-400"}`}>
              <Square className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={labelInput}
              placeholder="Rectangle label..."
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={(e) => saveLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveLabel(e.currentTarget.value)
                  e.currentTarget.blur()
                }
              }}
              className={`outline-none rounded-lg px-2 py-0.5 text-xs font-medium w-28 sm:w-36 transition border ${inputClassShape}`}
            />
          </div>
        )}

        {isEllipse && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            <div className={`p-1 rounded-md ${isLight ? "bg-amber-50 text-amber-600" : "bg-amber-500/20 text-amber-400"}`}>
              <Circle className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={labelInput}
              placeholder="Circle label..."
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={(e) => saveLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveLabel(e.currentTarget.value)
                  e.currentTarget.blur()
                }
              }}
              className={`outline-none rounded-lg px-2 py-0.5 text-xs font-medium w-28 sm:w-36 transition border ${inputClassShape}`}
            />
          </div>
        )}

        {isNote && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            <div className={`p-1 rounded-md ${isLight ? "bg-yellow-50 text-yellow-600" : "bg-yellow-500/20 text-yellow-400"}`}>
              <StickyNote className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={labelInput}
              placeholder="Note..."
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={(e) => saveLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveLabel(e.currentTarget.value)
                  e.currentTarget.blur()
                }
              }}
              className={`outline-none rounded-lg px-2 py-0.5 text-xs font-medium w-28 sm:w-36 transition border ${inputClassShape}`}
            />
          </div>
        )}

        {isDoc && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            <div
              className={`p-1 rounded-md ${
                docType === "requirements"
                  ? isLight ? "bg-emerald-50 text-emerald-600" : "bg-emerald-500/20 text-emerald-400"
                  : docType === "api"
                  ? isLight ? "bg-indigo-50 text-indigo-600" : "bg-indigo-500/20 text-indigo-400"
                  : docType === "estimation"
                  ? isLight ? "bg-amber-50 text-amber-600" : "bg-amber-500/20 text-amber-400"
                  : docType === "schema"
                  ? isLight ? "bg-cyan-50 text-cyan-600" : "bg-cyan-500/20 text-cyan-400"
                  : docType === "flow"
                  ? isLight ? "bg-violet-50 text-violet-600" : "bg-violet-500/20 text-violet-400"
                  : isLight ? "bg-rose-50 text-rose-600" : "bg-rose-500/20 text-rose-400"
              }`}
            >
              {docType === "requirements" ? (
                <CheckSquare2 className="w-3.5 h-3.5" />
              ) : docType === "api" ? (
                <Globe className="w-3.5 h-3.5" />
              ) : docType === "estimation" ? (
                <Calculator className="w-3.5 h-3.5" />
              ) : docType === "schema" ? (
                <Database className="w-3.5 h-3.5" />
              ) : docType === "flow" ? (
                <ListOrdered className="w-3.5 h-3.5" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5" />
              )}
            </div>
            <input
              type="text"
              value={labelInput}
              placeholder="Table title..."
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={(e) => saveLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveLabel(e.currentTarget.value)
                  e.currentTarget.blur()
                }
              }}
              className={`outline-none rounded-lg px-2 py-0.5 text-xs font-semibold w-32 sm:w-44 transition border ${inputClassComp}`}
            />
          </div>
        )}

        {isSection && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            <div className={`p-1 rounded-md ${isLight ? "bg-indigo-50 text-indigo-600" : "bg-indigo-500/20 text-indigo-400"}`}>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={labelInput}
              placeholder="Zone / Subnet Name"
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={(e) => saveLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveLabel(e.currentTarget.value)
                  e.currentTarget.blur()
                }
              }}
              className={`outline-none rounded-lg px-2 py-0.5 text-xs font-semibold w-32 sm:w-40 transition border ${inputClassComp}`}
            />
          </div>
        )}

        {isMultiple && (
          <div className={`flex items-center gap-1 border-r pr-2 font-medium text-[11px] ${dividerClass} ${isLight ? "text-slate-600" : "text-neutral-300"}`}>
            <span className={`font-semibold ${isLight ? "text-indigo-600" : "text-indigo-400"}`}>{selection.length}</span>
            <span>items</span>
          </div>
        )}

        {/* ── SECTION 2: CONTEXT-RELEVANT CONTROLS (ZERO MISMATCH) ── */}

        {/* ─── SYSTEM DESIGN SPEC BADGE (DOC) ─── */}
        {isDoc && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            <span
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                docType === "requirements"
                  ? isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : docType === "api"
                  ? isLight ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                  : docType === "estimation"
                  ? isLight ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  : isLight ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-rose-500/20 text-rose-400 border-rose-500/30"
              }`}
            >
              {docType === "requirements"
                ? "Requirements Table"
                : docType === "api"
                ? "RESTful API Spec"
                : docType === "estimation"
                ? "Capacity Estimations"
                : "Bottlenecks & SPOFs"}
            </span>
          </div>
        )}

        {/* ─── TYPOGRAPHY CONTROLS (TEXT & NOTE) ─── */}
        {(isText || isNote) && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            {/* Font Family Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium transition ${buttonPillClass}`}
                >
                  <span className="capitalize">{currentFontFamily}</span>
                  <ChevronDown className={`w-3 h-3 ${isLight ? "text-slate-400" : "text-neutral-400"}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side={shouldFlipBelow ? "bottom" : "top"}
                className={`rounded-xl p-1.5 z-50 min-w-[140px] border ${dropdownMenuContentClass}`}
              >
                <DropdownMenuItem
                  onClick={() => setFontFamily("sans")}
                  className={`flex items-center justify-between text-xs py-1.5 font-sans-canvas ${dropdownMenuItemClass}`}
                >
                  <span>Sans (Modern)</span>
                  {currentFontFamily === "sans" && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFontFamily("handwriting")}
                  className={`flex items-center justify-between text-xs py-1.5 font-handwriting-canvas ${dropdownMenuItemClass}`}
                >
                  <span>Handwriting</span>
                  {currentFontFamily === "handwriting" && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFontFamily("serif")}
                  className={`flex items-center justify-between text-xs py-1.5 font-serif-canvas ${dropdownMenuItemClass}`}
                >
                  <span>Serif (Classic)</span>
                  {currentFontFamily === "serif" && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFontFamily("mono")}
                  className={`flex items-center justify-between text-xs py-1.5 font-mono-canvas ${dropdownMenuItemClass}`}
                >
                  <span>Monospace</span>
                  {currentFontFamily === "mono" && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Font Size Presets */}
            <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
              {[
                { label: "S", size: isText ? 16 : 16 },
                { label: "M", size: isText ? 24 : 20 },
                { label: "L", size: isText ? 36 : 28 },
                { label: "XL", size: isText ? 48 : 36 },
              ].map((item) => (
                <Hint key={item.label} label={`Font size ${item.size}px`}>
                  <button
                    onClick={() => setFontSize(item.size)}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                      currentFontSize === item.size
                        ? "bg-indigo-500 text-white shadow-sm"
                        : buttonPillInactive
                    }`}
                  >
                    {item.label}
                  </button>
                </Hint>
              ))}
            </div>

            {/* Bold / Italic / Underline (For Text) */}
            {isText && (
              <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
                <Hint label="Bold (Cmd+B)">
                  <button
                    onClick={toggleBold}
                    className={`p-1 rounded font-bold transition ${
                      currentFontWeight === "bold" ? "bg-indigo-500 text-white" : buttonPillInactive
                    }`}
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                </Hint>
                <Hint label="Italic (Cmd+I)">
                  <button
                    onClick={toggleItalic}
                    className={`p-1 rounded italic transition ${
                      currentFontStyle === "italic" ? "bg-indigo-500 text-white" : buttonPillInactive
                    }`}
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                </Hint>
                <Hint label="Underline">
                  <button
                    onClick={toggleUnderline}
                    className={`p-1 rounded underline transition ${
                      currentTextDecoration === "underline" ? "bg-indigo-500 text-white" : buttonPillInactive
                    }`}
                  >
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                </Hint>
              </div>
            )}

            {/* Text Alignment (For Text) */}
            {isText && (
              <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
                <Hint label="Align Left">
                  <button
                    onClick={() => setTextAlign("left")}
                    className={`p-1 rounded transition ${
                      currentTextAlign === "left" ? "bg-indigo-500 text-white" : buttonPillInactive
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                </Hint>
                <Hint label="Align Center">
                  <button
                    onClick={() => setTextAlign("center")}
                    className={`p-1 rounded transition ${
                      currentTextAlign === "center" ? "bg-indigo-500 text-white" : buttonPillInactive
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                </Hint>
                <Hint label="Align Right">
                  <button
                    onClick={() => setTextAlign("right")}
                    className={`p-1 rounded transition ${
                      currentTextAlign === "right" ? "bg-indigo-500 text-white" : buttonPillInactive
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                </Hint>
              </div>
            )}
          </div>
        )}

        {/* ─── SHAPE RESTYLING CONTROLS (RECTANGLE & ELLIPSE) ─── */}
        {isShape && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            {/* Fill Style */}
            <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
              <Hint label="Solid Fill">
                <button
                  onClick={() => setFillStyle("solid")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                    currentFillStyle === "solid" ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                  }`}
                >
                  Solid
                </button>
              </Hint>
              <Hint label="Semi-Transparent / Tint">
                <button
                  onClick={() => setFillStyle("semi")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                    currentFillStyle === "semi" ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                  }`}
                >
                  Tint
                </button>
              </Hint>
              <Hint label="Outline Only">
                <button
                  onClick={() => setFillStyle("transparent")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                    currentFillStyle === "transparent" ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                  }`}
                >
                  Outline
                </button>
              </Hint>
            </div>

            {/* Stroke Thickness */}
            <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
              <Hint label="Thin (1.5px)">
                <button
                  onClick={() => setStrokeWidth(1.5)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition ${
                    currentStrokeWidth === 1.5 ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                  }`}
                >
                  Thin
                </button>
              </Hint>
              <Hint label="Medium (3px)">
                <button
                  onClick={() => setStrokeWidth(3)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition ${
                    currentStrokeWidth === 3 ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                  }`}
                >
                  Med
                </button>
              </Hint>
              <Hint label="Thick (5px)">
                <button
                  onClick={() => setStrokeWidth(5)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition ${
                    currentStrokeWidth === 5 ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                  }`}
                >
                  Thick
                </button>
              </Hint>
            </div>

            {/* Stroke Pattern */}
            <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
              <Hint label="Solid Line">
                <button
                  onClick={() => setStrokePattern("solid")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition ${
                    currentStrokePattern === "solid" ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                  }`}
                >
                  —
                </button>
              </Hint>
              <Hint label="Dashed Line">
                <button
                  onClick={() => setStrokePattern("dashed")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition ${
                    currentStrokePattern === "dashed" ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                  }`}
                >
                  - -
                </button>
              </Hint>
              <Hint label="Dotted Line">
                <button
                  onClick={() => setStrokePattern("dotted")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition ${
                    currentStrokePattern === "dotted" ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                  }`}
                >
                  ···
                </button>
              </Hint>
            </div>

            {/* Corner Roundness (Only for Rectangle) */}
            {isRect && (
              <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
                <Hint label="Sharp Corners (0px)">
                  <button
                    onClick={() => setRoundness("sharp")}
                    className={`p-1 rounded transition ${
                      currentRoundness === "sharp" ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                    }`}
                  >
                    <Square className="w-3.5 h-3.5" />
                  </button>
                </Hint>
                <Hint label="Rounded Corners (12px)">
                  <button
                    onClick={() => setRoundness("rounded")}
                    className={`p-1 rounded transition ${
                      currentRoundness === "rounded" ? "bg-blue-500 text-white shadow-sm" : buttonPillInactive
                    }`}
                  >
                    <div className="w-3.5 h-3.5 border-2 border-current rounded-[4px]" />
                  </button>
                </Hint>
              </div>
            )}
          </div>
        )}

        {/* COMPONENT: Health Status Dropdown */}
        {isComponent && (
          <div className={`flex items-center gap-1 border-r pr-2 ${dividerClass}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium transition ${buttonPillClass}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      currentStatus === "healthy" || currentStatus === "active"
                        ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                        : currentStatus === "warning" || currentStatus === "degraded"
                        ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                        : currentStatus === "error" || currentStatus === "deprecated"
                        ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]"
                        : currentStatus === "info" || currentStatus === "planned"
                        ? "bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.7)]"
                        : "bg-slate-400"
                    }`}
                  />
                  <span className="capitalize">{currentStatus === "none" ? "Status" : currentStatus}</span>
                  <ChevronDown className={`w-3 h-3 ${isLight ? "text-slate-400" : "text-neutral-400"}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side={shouldFlipBelow ? "bottom" : "top"}
                className={`rounded-xl p-1 z-50 min-w-[140px] border ${dropdownMenuContentClass}`}
              >
                <DropdownMenuItem
                  onClick={() => setComponentStatus("none")}
                  className={`flex items-center justify-between text-xs py-1.5 ${dropdownMenuItemClass}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>No Status</span>
                  </div>
                  {currentStatus === "none" && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("active")}
                  className={`flex items-center justify-between text-xs py-1.5 ${dropdownMenuItemClass}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Active (Live)</span>
                  </div>
                  {(currentStatus === "active" || currentStatus === "healthy") && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("planned")}
                  className={`flex items-center justify-between text-xs py-1.5 ${dropdownMenuItemClass}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>Planned (Roadmap)</span>
                  </div>
                  {(currentStatus === "planned" || currentStatus === "info") && <Check className="w-3.5 h-3.5 text-sky-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("degraded")}
                  className={`flex items-center justify-between text-xs py-1.5 ${dropdownMenuItemClass}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Degraded (Warning)</span>
                  </div>
                  {(currentStatus === "degraded" || currentStatus === "warning") && <Check className="w-3.5 h-3.5 text-amber-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("deprecated")}
                  className={`flex items-center justify-between text-xs py-1.5 ${dropdownMenuItemClass}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Deprecated</span>
                  </div>
                  {(currentStatus === "deprecated" || currentStatus === "error") && <Check className="w-3.5 h-3.5 text-rose-500" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* ARROW: Curvature, Pattern, Direction (ONLY for Arrow) */}
        {isArrow && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            {/* Style */}
            <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
              <Hint label="Curvy Bezier">
                <button
                  onClick={() => setArrowStyle("curvy")}
                  className={`p-1 rounded ${
                    currentArrowStyle === "curvy" ? "bg-cyan-500 text-white" : buttonPillInactive
                  }`}
                >
                  <Spline className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Sharp 90°">
                <button
                  onClick={() => setArrowStyle("sharp")}
                  className={`p-1 rounded ${
                    currentArrowStyle === "sharp" || currentArrowStyle === "orthogonal" ? "bg-cyan-500 text-white" : buttonPillInactive
                  }`}
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Straight Line">
                <button
                  onClick={() => setArrowStyle("straight")}
                  className={`p-1 rounded ${
                    currentArrowStyle === "straight" ? "bg-cyan-500 text-white" : buttonPillInactive
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </Hint>
            </div>

            {/* Pattern */}
            <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
              <Hint label="Solid Line">
                <button
                  onClick={() => setStrokePattern("solid")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "solid" ? "bg-cyan-500 text-white" : buttonPillInactive
                  }`}
                >
                  —
                </button>
              </Hint>
              <Hint label="Dashed Line">
                <button
                  onClick={() => setStrokePattern("dashed")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "dashed" ? "bg-cyan-500 text-white" : buttonPillInactive
                  }`}
                >
                  - -
                </button>
              </Hint>
              <Hint label="Dotted Line">
                <button
                  onClick={() => setStrokePattern("dotted")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "dotted" ? "bg-cyan-500 text-white" : buttonPillInactive
                  }`}
                >
                  ···
                </button>
              </Hint>
            </div>

            {/* Direction */}
            <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
              <Hint label="Forward (➔)">
                <button
                  onClick={() => setArrowDirection("forward")}
                  className={`p-1 rounded ${
                    currentDirection === "forward" ? "bg-cyan-500 text-white" : buttonPillInactive
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Bidirectional (⇄)">
                <button
                  onClick={() => setArrowDirection("bidirectional")}
                  className={`p-1 rounded ${
                    currentDirection === "bidirectional" ? "bg-cyan-500 text-white" : buttonPillInactive
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>
              </Hint>
            </div>

            {/* Sequence Flow Step Badge */}
            <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
              <Hint label={currentSequenceStep ? `Sequence Step ${currentSequenceStep} (Click to clear)` : "Add Sequence Step # to Arrow"}>
                <button
                  onClick={() => {
                    if (currentSequenceStep) {
                      setSequenceStep(undefined)
                    } else {
                      setSequenceStep(1)
                    }
                  }}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-bold font-mono transition ${
                    currentSequenceStep
                      ? "bg-indigo-500 text-white shadow-sm"
                      : buttonPillInactive
                  }`}
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>{currentSequenceStep ? `Step ${currentSequenceStep}` : "Step #"}</span>
                </button>
              </Hint>

              {currentSequenceStep && (
                <div className="flex items-center ml-0.5 border-l border-neutral-300/40 dark:border-neutral-700/60 pl-0.5">
                  <button
                    onClick={() => setSequenceStep(Math.max(1, currentSequenceStep - 1))}
                    disabled={currentSequenceStep <= 1}
                    className={`px-1 py-0.5 text-[10px] font-bold rounded ${currentSequenceStep <= 1 ? "opacity-30 cursor-not-allowed" : buttonPillInactive}`}
                  >
                    -
                  </button>
                  <button
                    onClick={() => setSequenceStep(currentSequenceStep + 1)}
                    className={`px-1 py-0.5 text-[10px] font-bold rounded ${buttonPillInactive}`}
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* Arrow Protocol / Transport Layer Selector */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono font-medium transition ${currentProtocol ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" : buttonPillInactive}`}>
                    <Tag className="w-3 h-3 text-cyan-500" />
                    <span>{currentProtocol || "Protocol"}</span>
                    <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side={shouldFlipBelow ? "bottom" : "top"} className={`rounded-xl p-1 z-50 min-w-[130px] border ${dropdownMenuContentClass}`}>
                  {["None", "HTTPS", "gRPC", "WebSocket", "Kafka", "SQL", "GraphQL", "TCP", "UDP"].map((proto) => (
                    <DropdownMenuItem
                      key={proto}
                      onClick={() => setArrowProtocol(proto === "None" ? undefined : proto)}
                      className={`flex items-center justify-between text-xs py-1.5 font-mono ${dropdownMenuItemClass}`}
                    >
                      <span>{proto}</span>
                      {((proto === "None" && !currentProtocol) || currentProtocol === proto) && (
                        <Check className="w-3.5 h-3.5 text-cyan-500" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

        {/* ─── ARCHITECTURE SECTION / ZONE CONTROLS ─── */}
        {isSection && (
          <div className={`flex items-center gap-1.5 border-r pr-2 ${dividerClass}`}>
            {/* Zone Presets Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium transition ${buttonPillClass}`}
                >
                  <span>Presets</span>
                  <ChevronDown className={`w-3 h-3 ${isLight ? "text-slate-400" : "text-neutral-400"}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side={shouldFlipBelow ? "bottom" : "top"}
                className={`rounded-xl p-1.5 z-50 min-w-[220px] border ${dropdownMenuContentClass}`}
              >
                {SECTION_PRESETS.map((p) => (
                  <DropdownMenuItem
                    key={p.name}
                    onClick={() => applySectionPreset(p)}
                    className={`flex items-center gap-2 text-xs py-1.5 ${dropdownMenuItemClass}`}
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: `rgb(${p.fill.r}, ${p.fill.g}, ${p.fill.b})` }}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-[10px] opacity-60">{p.desc}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Stroke Pattern */}
            <div className={`flex items-center p-0.5 rounded-lg border ${buttonPillClass}`}>
              <Hint label="Solid Line">
                <button
                  onClick={() => setStrokePattern("solid")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "solid" ? "bg-indigo-500 text-white" : buttonPillInactive
                  }`}
                >
                  —
                </button>
              </Hint>
              <Hint label="Dashed Line (Default for Subnets)">
                <button
                  onClick={() => setStrokePattern("dashed")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "dashed" ? "bg-indigo-500 text-white" : buttonPillInactive
                  }`}
                >
                  - -
                </button>
              </Hint>
              <Hint label="Dotted Line">
                <button
                  onClick={() => setStrokePattern("dotted")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "dotted" ? "bg-indigo-500 text-white" : buttonPillInactive
                  }`}
                >
                  ···
                </button>
              </Hint>
            </div>

            {/* Select All Enclosed Components */}
            {soleLayerId && onSelectEnclosed && (
              <Hint label="Select all components inside this zone">
                <button
                  onClick={() => onSelectEnclosed(soleLayerId)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium transition ${buttonPillClass}`}
                >
                  <Boxes className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="hidden sm:inline">Select Inside</span>
                </button>
              </Hint>
            )}

            {/* Auto-Fit Zone Boundary */}
            {soleLayerId && onFitSectionToEnclosed && (
              <Hint label="Auto-fit zone boundary around enclosed components">
                <button
                  onClick={() => onFitSectionToEnclosed(soleLayerId)}
                  className={`p-1.5 rounded-lg border text-xs font-medium transition ${buttonPillClass}`}
                >
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-500" />
                </button>
              </Hint>
            )}

            {/* Move with contents toggle */}
            {onToggleMoveSectionWithContents && (
              <Hint label={moveSectionWithContents ? "Dragging zone moves enclosed components (Hold Alt to move zone only)" : "Dragging moves zone boundary only"}>
                <button
                  onClick={onToggleMoveSectionWithContents}
                  className={`flex items-center gap-1 px-1.5 py-1 rounded-lg border text-xs font-medium transition ${
                    moveSectionWithContents
                      ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30"
                      : buttonPillInactive
                  }`}
                >
                  <Move className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden md:inline">
                    {moveSectionWithContents ? "Grouped" : "Frame Only"}
                  </span>
                </button>
              </Hint>
            )}
          </div>
        )}

        {/* ── SECTION 3: COMPACT COLOR DROPDOWN ── */}
        <div className={`flex items-center border-r pr-2 ${dividerClass}`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium transition ${buttonPillClass}`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border shadow-sm ${isLight ? "border-slate-300" : "border-white/20"}`}
                  style={{
                    backgroundColor:
                      isComponent && !soleLayer?.customColor
                        ? "#94a3b8"
                        : soleLayer?.fill
                        ? `rgb(${soleLayer.fill.r}, ${soleLayer.fill.g}, ${soleLayer.fill.b})`
                        : "#6366f1",
                  }}
                />
                <span className="hidden sm:inline">Color</span>
                <ChevronDown className={`w-3 h-3 ${isLight ? "text-slate-400" : "text-neutral-400"}`} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              side={shouldFlipBelow ? "bottom" : "top"}
              className={`rounded-xl p-2 z-50 min-w-[170px] border ${dropdownMenuContentClass}`}
            >
              <div className={`text-[10px] font-semibold uppercase px-1 mb-1.5 ${isLight ? "text-slate-400" : "text-neutral-400"}`}>
                Palette
              </div>
              <div className="grid grid-cols-5 gap-1.5 p-1">
                {PALETTE.map((swatch) => (
                  <Hint key={swatch.name} label={swatch.name}>
                    <button
                      onClick={() => setFill(swatch.color)}
                      style={{ backgroundColor: swatch.hex }}
                      className={`w-5 h-5 rounded-full border hover:scale-115 transition-transform focus:outline-none shadow-sm ${
                        isLight ? "border-slate-300" : "border-white/20"
                      }`}
                    />
                  </Hint>
                ))}
              </div>

              {/* Reset to Original Default Theme (for Components) */}
              {isComponent && (
                <button
                  onClick={resetComponentColor}
                  className={`w-full mt-1.5 pt-1.5 border-t flex items-center justify-center gap-1.5 py-1 text-[11px] rounded transition ${
                    isLight
                      ? "border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      : "border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Original</span>
                </button>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* ── SECTION 4: ACTIONS (DUPLICATE, ORDER, DELETE) ── */}
        <div className="flex items-center gap-0.5">
          {isComponent && onSelectConnected && (
            <Hint label="Select Connected Architecture">
              <button
                onClick={onSelectConnected}
                className={`p-1 rounded-lg transition ${actionButtonClass}`}
              >
                <Network className="w-3.5 h-3.5" />
              </button>
            </Hint>
          )}

          {isMultiple && (
            <div className="flex items-center gap-0.5 border-r pr-1 border-neutral-200 dark:border-neutral-700/80">
              <Hint label="Align Left">
                <button
                  onClick={alignLeft}
                  className={`p-1 rounded-lg transition ${actionButtonClass}`}
                >
                  <AlignStartHorizontal className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Align Center Horizontally">
                <button
                  onClick={alignCenterH}
                  className={`p-1 rounded-lg transition ${actionButtonClass}`}
                >
                  <AlignCenterHorizontal className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Align Right">
                <button
                  onClick={alignRight}
                  className={`p-1 rounded-lg transition ${actionButtonClass}`}
                >
                  <AlignEndHorizontal className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Align Top">
                <button
                  onClick={alignTop}
                  className={`p-1 rounded-lg transition ${actionButtonClass}`}
                >
                  <AlignStartVertical className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Align Center Vertically">
                <button
                  onClick={alignCenterV}
                  className={`p-1 rounded-lg transition ${actionButtonClass}`}
                >
                  <AlignCenterVertical className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Align Bottom">
                <button
                  onClick={alignBottom}
                  className={`p-1 rounded-lg transition ${actionButtonClass}`}
                >
                  <AlignEndVertical className="w-3.5 h-3.5" />
                </button>
              </Hint>
              {selection.length >= 3 && (
                <>
                  <Hint label="Distribute Horizontally">
                    <button
                      onClick={distributeHorizontal}
                      className={`p-1 rounded-lg transition ${actionButtonClass}`}
                    >
                      <AlignHorizontalDistributeCenter className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                  </Hint>
                  <Hint label="Distribute Vertically">
                    <button
                      onClick={distributeVertical}
                      className={`p-1 rounded-lg transition ${actionButtonClass}`}
                    >
                      <AlignVerticalDistributeCenter className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                  </Hint>
                </>
              )}
            </div>
          )}

          <Hint label={isAnyLocked ? "Unlock (Ctrl+L)" : "Lock Layer (Ctrl+L)"}>
            <button
              onClick={toggleLock}
              className={`p-1 rounded-lg transition ${
                isAnyLocked
                  ? "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                  : actionButtonClass
              }`}
            >
              {isAnyLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>
          </Hint>

          {onDuplicate && (
            <Hint label="Duplicate (Cmd+D)">
              <button
                onClick={onDuplicate}
                className={`p-1 rounded-lg transition ${actionButtonClass}`}
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </Hint>
          )}

          <Hint label="Send to Back">
            <button
              onClick={moveToBack}
              className={`p-1 rounded-lg transition ${actionButtonClass}`}
            >
              <SendToBack className="w-3.5 h-3.5" />
            </button>
          </Hint>

          <Hint label="Bring to Front">
            <button
              onClick={moveToFront}
              className={`p-1 rounded-lg transition ${actionButtonClass}`}
            >
              <BringToFront className="w-3.5 h-3.5" />
            </button>
          </Hint>

          <div className={`h-3 w-px mx-0.5 ${isLight ? "bg-slate-200" : "bg-neutral-700/80"}`} />

          <Hint label="Delete">
            <button
              onClick={deleteLayers}
              className={`p-1 rounded-lg transition ${
                isLight
                  ? "text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  : "text-rose-400 hover:text-rose-300 hover:bg-rose-950/60"
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </Hint>
        </div>
      </div>
    )
  }
)

SelectionTools.displayName = "SelectionTools"
