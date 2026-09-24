"use client"

import { memo, useState, useEffect } from "react"
import { Camera, Color, LayerType, ComponentStatus, SysComponent } from "@/types/canvas"
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
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { COMPONENT_LABELS, ICON_MAP } from "./sys-component-layer"

interface SelectionToolsProps {
  camera: Camera
  setLastUsedColor: (color: Color) => void
  onDuplicate?: () => void
  onRename?: () => void
  onSelectConnected?: () => void
}

const PALETTE: { name: string; color: Color; hex: string }[] = [
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
  ({ camera, setLastUsedColor, onDuplicate, onSelectConnected }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection)
    const selectionBounds = useSelectionBounds()

    const soleLayerId = selection.length === 1 ? selection[0] : null
    const soleLayer = useStorage((root) =>
      soleLayerId ? root.layers.get(soleLayerId) : null
    )

    // Local label state for snappy inline editing
    const [labelInput, setLabelInput] = useState("")
    const soleLayerValue = soleLayer && "value" in soleLayer ? soleLayer.value : null

    useEffect(() => {
      setLabelInput(soleLayerValue || "")
    }, [soleLayerId, soleLayerValue])

    // Save label on blur or Enter
    const saveLabel = useMutation(({ storage }, value: string) => {
      if (!soleLayerId) return
      storage.get("layers").get(soleLayerId)?.set("value", value)
    }, [soleLayerId])

    // Change layer color (updates customColor for components, fill for arrows/shapes)
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

    // Arrow specific mutations
    const setArrowStyle = useMutation(({ storage }, style: "curvy" | "sharp") => {
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

    // Component health status mutation
    const setComponentStatus = useMutation(
      ({ storage }, newStatus: ComponentStatus) => {
        if (!soleLayerId) return
        const layer = storage.get("layers").get(soleLayerId)
        if (layer && layer.get("type") === LayerType.Component) {
          ;(layer as any).set("status", newStatus)
          let statusText = ""
          switch (newStatus) {
            case "healthy": statusText = "HEALTHY"; break
            case "warning": statusText = "WARN";    break
            case "error":   statusText = "OUTAGE";  break
            case "info":    statusText = "INFO";    break
            default:        statusText = "";        break
          }
          ;(layer as any).set("statusText", statusText)
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

    // Alignment mutations
    const alignHorizontal = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 2) return
      const liveLayers = storage.get("layers")
      const centerY = selectionBounds.y + selectionBounds.height / 2
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer) {
          const h = (layer.get("height") as number) || 0
          layer.set("y", centerY - h / 2)
        }
      })
    }, [selection, selectionBounds])

    const alignVertical = useMutation(({ storage }) => {
      if (!selectionBounds || selection.length < 2) return
      const liveLayers = storage.get("layers")
      const centerX = selectionBounds.x + selectionBounds.width / 2
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer) {
          const w = (layer.get("width") as number) || 0
          layer.set("x", centerX - w / 2)
        }
      })
    }, [selection, selectionBounds])

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

    // Smart-Flip Positioning: NEVER overlap the selected component
    // If component is near top of screen (screenY < 125), flip BELOW the component!
    // Otherwise place comfortably ABOVE the component with a clean margin.
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

    const currentArrowStyle = isArrow && soleLayer && "arrowStyle" in soleLayer ? (soleLayer.arrowStyle || "curvy") : "curvy"
    const currentStrokePattern = soleLayer && "strokePattern" in soleLayer ? (soleLayer.strokePattern || "solid") : "solid"
    const currentDirection = isArrow && soleLayer && "direction" in soleLayer ? (soleLayer.direction || "forward") : "forward"
    const currentStatus: ComponentStatus = isComponent && soleLayer && "status" in soleLayer && soleLayer.status ? (soleLayer.status as ComponentStatus) : "none"
    const compType = isComponent && soleLayer && "componentType" in soleLayer ? (soleLayer.componentType as SysComponent) : null
    const CompIcon = compType ? ICON_MAP[compType] || Box : Box

    return (
      <div
        style={{
          position: "fixed",
          left: `${Math.max(180, Math.min(typeof window !== "undefined" ? window.innerWidth - 180 : 800, tooltipX))}px`,
          top: `${Math.max(65, tooltipY)}px`,
          transform: "translate(-50%, 0)",
        }}
        className="z-50 flex items-center gap-2 bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/80 shadow-2xl rounded-2xl px-3 py-1.5 text-white select-none transition-all duration-150 text-xs animate-in fade-in zoom-in-95 pointer-events-auto"
      >
        {/* ── SECTION 1: INLINE EDITABLE NAME & TYPE ── */}
        {isComponent && compType && (
          <div className="flex items-center gap-1.5 border-r border-neutral-700/80 pr-2">
            <div className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">
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
              className="bg-neutral-800/80 hover:bg-neutral-800 focus:bg-neutral-950 border border-neutral-700 focus:border-indigo-400 outline-none rounded-lg px-2 py-0.5 text-xs font-semibold text-white w-28 sm:w-36 transition"
            />
          </div>
        )}

        {isArrow && (
          <div className="flex items-center gap-1.5 border-r border-neutral-700/80 pr-2">
            <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
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
              className="bg-neutral-800/80 hover:bg-neutral-800 focus:bg-neutral-950 border border-neutral-700 focus:border-cyan-400 outline-none rounded-lg px-2 py-0.5 text-xs font-semibold text-white w-28 sm:w-32 transition"
            />
          </div>
        )}

        {isSection && (
          <div className="flex items-center gap-1.5 border-r border-neutral-700/80 pr-2">
            <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={labelInput}
              placeholder="Zone Name"
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={(e) => saveLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveLabel(e.currentTarget.value)
                  e.currentTarget.blur()
                }
              }}
              className="bg-neutral-800/80 hover:bg-neutral-800 focus:bg-neutral-950 border border-neutral-700 focus:border-emerald-400 outline-none rounded-lg px-2 py-0.5 text-xs font-semibold text-white w-28 sm:w-36 transition"
            />
          </div>
        )}

        {isMultiple && (
          <div className="flex items-center gap-1 border-r border-neutral-700/80 pr-2 text-neutral-300 font-medium text-[11px]">
            <span className="font-semibold text-indigo-400">{selection.length}</span>
            <span>items</span>
          </div>
        )}

        {/* ── SECTION 2: CONTEXT-RELEVANT CONTROLS (ZERO MISMATCH) ── */}

        {/* COMPONENT: Health Status Dropdown */}
        {isComponent && (
          <div className="flex items-center gap-1 border-r border-neutral-700/80 pr-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-xs font-medium text-white transition">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      currentStatus === "healthy"
                        ? "bg-emerald-400"
                        : currentStatus === "warning"
                        ? "bg-amber-400"
                        : currentStatus === "error"
                        ? "bg-rose-500"
                        : currentStatus === "info"
                        ? "bg-sky-400"
                        : "bg-neutral-500"
                    }`}
                  />
                  <span className="capitalize">{currentStatus === "none" ? "Status" : currentStatus}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                side="bottom"
                className="w-36 bg-neutral-900 border border-neutral-750 text-white rounded-xl shadow-2xl p-1 z-50 text-xs"
              >
                <DropdownMenuItem
                  onClick={() => setComponentStatus("none")}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neutral-500" />
                    <span>None</span>
                  </div>
                  {currentStatus === "none" && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("healthy")}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Healthy</span>
                  </div>
                  {currentStatus === "healthy" && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("warning")}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Warning</span>
                  </div>
                  {currentStatus === "warning" && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("error")}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Outage (Error)</span>
                  </div>
                  {currentStatus === "error" && <Check className="w-3.5 h-3.5 text-rose-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("info")}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span>Info</span>
                  </div>
                  {currentStatus === "info" && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* ARROW: Curvature, Pattern, Direction (ONLY for Arrow) */}
        {isArrow && (
          <div className="flex items-center gap-1.5 border-r border-neutral-700/80 pr-2">
            {/* Style */}
            <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-700">
              <Hint label="Curvy Bezier">
                <button
                  onClick={() => setArrowStyle("curvy")}
                  className={`p-1 rounded ${
                    currentArrowStyle === "curvy" ? "bg-cyan-500 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Spline className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Sharp 90°">
                <button
                  onClick={() => setArrowStyle("sharp")}
                  className={`p-1 rounded ${
                    currentArrowStyle === "sharp" ? "bg-cyan-500 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                </button>
              </Hint>
            </div>

            {/* Pattern */}
            <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-700">
              <Hint label="Solid Line">
                <button
                  onClick={() => setStrokePattern("solid")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "solid" ? "bg-cyan-500 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  —
                </button>
              </Hint>
              <Hint label="Dashed Line">
                <button
                  onClick={() => setStrokePattern("dashed")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "dashed" ? "bg-cyan-500 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  - -
                </button>
              </Hint>
            </div>

            {/* Direction */}
            <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-700">
              <Hint label="Forward (➔)">
                <button
                  onClick={() => setArrowDirection("forward")}
                  className={`p-1 rounded ${
                    currentDirection === "forward" ? "bg-cyan-500 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Bidirectional (⇄)">
                <button
                  onClick={() => setArrowDirection("bidirectional")}
                  className={`p-1 rounded ${
                    currentDirection === "bidirectional" ? "bg-cyan-500 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>
              </Hint>
            </div>
          </div>
        )}

        {/* SECTION: Border Pattern (ONLY for Section) */}
        {isSection && (
          <div className="flex items-center gap-1 border-r border-neutral-700/80 pr-2">
            <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-700">
              <Hint label="Solid Border">
                <button
                  onClick={() => setStrokePattern("solid")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "solid" ? "bg-emerald-500 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  —
                </button>
              </Hint>
              <Hint label="Dashed Border">
                <button
                  onClick={() => setStrokePattern("dashed")}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                    currentStrokePattern === "dashed" ? "bg-emerald-500 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  - -
                </button>
              </Hint>
            </div>
          </div>
        )}

        {/* ── SECTION 3: COMPACT COLOR DROPDOWN (Saves 70% space!) ── */}
        <div className="flex items-center border-r border-neutral-700/80 pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-xs font-medium text-white transition"
              >
                <div
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{
                    backgroundColor:
                      isComponent && !soleLayer?.customColor
                        ? "#94a3b8" // neutral default indicator
                        : soleLayer?.fill
                        ? `rgb(${soleLayer.fill.r}, ${soleLayer.fill.g}, ${soleLayer.fill.b})`
                        : "#6366f1",
                  }}
                />
                <span className="hidden sm:inline">Color</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              side={shouldFlipBelow ? "bottom" : "top"}
              className="bg-neutral-900 border border-neutral-750 text-white rounded-xl shadow-2xl p-2 z-50 min-w-[160px]"
            >
              <div className="text-[10px] text-neutral-400 font-semibold uppercase px-1 mb-1.5">
                Palette
              </div>
              <div className="grid grid-cols-4 gap-1.5 p-1">
                {PALETTE.map((swatch) => (
                  <Hint key={swatch.name} label={swatch.name}>
                    <button
                      onClick={() => setFill(swatch.color)}
                      style={{ backgroundColor: swatch.hex }}
                      className="w-6 h-6 rounded-full border border-white/20 hover:scale-115 transition-transform focus:outline-none shadow-sm"
                    />
                  </Hint>
                ))}
              </div>

              {/* Reset to Original Default Theme (for Components) */}
              {isComponent && (
                <button
                  onClick={resetComponentColor}
                  className="w-full mt-1.5 pt-1.5 border-t border-neutral-800 flex items-center justify-center gap-1.5 py-1 text-[11px] text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
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
                className="p-1 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
              >
                <Network className="w-3.5 h-3.5" />
              </button>
            </Hint>
          )}

          {isMultiple && (
            <>
              <Hint label="Align Center Horizontally">
                <button
                  onClick={alignHorizontal}
                  className="p-1 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
                >
                  <AlignCenterHorizontal className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Align Center Vertically">
                <button
                  onClick={alignVertical}
                  className="p-1 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
                >
                  <AlignCenterVertical className="w-3.5 h-3.5" />
                </button>
              </Hint>
            </>
          )}

          {onDuplicate && (
            <Hint label="Duplicate (Cmd+D)">
              <button
                onClick={onDuplicate}
                className="p-1 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </Hint>
          )}

          <Hint label="Send to Back">
            <button
              onClick={moveToBack}
              className="p-1 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
            >
              <SendToBack className="w-3.5 h-3.5" />
            </button>
          </Hint>

          <Hint label="Bring to Front">
            <button
              onClick={moveToFront}
              className="p-1 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
            >
              <BringToFront className="w-3.5 h-3.5" />
            </button>
          </Hint>

          <div className="h-3 w-px bg-neutral-700/80 mx-0.5" />

          <Hint label="Delete">
            <button
              onClick={deleteLayers}
              className="p-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/60 transition"
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
