"use client"

import { memo, useEffect, useState } from "react"
import { Camera, Color, LayerType, ComponentStatus } from "@/types/canvas"
import { useSelectionBounds } from "@/hooks/use-selection-bound"
import { useMutation, useSelf, useStorage } from "@liveblocks/react/suspense"
import { ColorPicker } from "./color-picker"
import { useDeleteLayers } from "@/hooks/use-delete-layers"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import {
  BringToFront,
  SendToBack,
  Trash2,
  Copy,
  Edit3,
  Network,
  Spline,
  CornerDownRight,
  ArrowRightLeft,
  AlignCenterVertical,
  AlignCenterHorizontal,
  MoreHorizontal,
  Sparkles,
  Flame,
  ChevronDown,
  Check,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SelectionToolsProps {
  camera: Camera
  setLastUsedColor: (color: Color) => void
  onDuplicate?: () => void
  onRename?: () => void
  onSelectConnected?: () => void
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor, onDuplicate, onRename, onSelectConnected }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection)
    const selectionBounds = useSelectionBounds()
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const soleLayerId = selection.length === 1 ? selection[0] : null
    const soleLayer = useStorage((root) =>
      soleLayerId ? root.layers.get(soleLayerId) : null
    )
    const canRename =
      soleLayer?.type === LayerType.Component ||
      soleLayer?.type === LayerType.Text ||
      soleLayer?.type === LayerType.Section
    const isArrow = soleLayer?.type === LayerType.Arrow
    const isComponent = soleLayer?.type === LayerType.Component
    const currentArrowStyle = isArrow && "arrowStyle" in soleLayer ? (soleLayer.arrowStyle || "curvy") : "curvy"
    const currentStrokePattern = soleLayer && "strokePattern" in soleLayer ? (soleLayer.strokePattern || "solid") : "solid"
    const currentDirection = isArrow && "direction" in soleLayer ? (soleLayer.direction || "forward") : "forward"
    const currentStatus: ComponentStatus =
      soleLayer && "status" in soleLayer && soleLayer.status
        ? (soleLayer.status as ComponentStatus)
        : "none"

    const toggleArrowStyle = useMutation(({ storage }) => {
      if (!soleLayerId) return
      const layer = storage.get("layers").get(soleLayerId)
      if (layer && layer.get("type") === LayerType.Arrow) {
        const cur = ((layer as any).get("arrowStyle") as any) || "curvy"
        const next = cur === "sharp" ? "curvy" : "sharp"
        ;(layer as any).set("arrowStyle", next)
      }
    }, [soleLayerId])

    const toggleStrokePattern = useMutation(({ storage }) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (!layer) return
        const cur = ((layer as any).get("strokePattern") as string) || "solid"
        const next = cur === "solid" ? "dashed" : cur === "dashed" ? "dotted" : "solid"
        ;(layer as any).set("strokePattern", next)
      })
    }, [selection])

    const toggleArrowDirection = useMutation(({ storage }) => {
      if (!soleLayerId) return
      const layer = storage.get("layers").get(soleLayerId)
      if (layer && layer.get("type") === LayerType.Arrow) {
        const cur = ((layer as any).get("direction") as string) || "forward"
        const next = cur === "forward" ? "bidirectional" : cur === "bidirectional" ? "none" : "forward"
        ;(layer as any).set("direction", next)
      }
    }, [soleLayerId])

    // Explicit Status Assignment Mutation
    const setComponentStatus = useMutation(({ storage }, newStatus: ComponentStatus) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer && layer.get("type") === LayerType.Component) {
          const text =
            newStatus === "healthy"
              ? "HEALTHY"
              : newStatus === "warning"
              ? "WARNING"
              : newStatus === "error"
              ? "OUTAGE"
              : newStatus === "info"
              ? "MAINTENANCE"
              : ""
          ;(layer as any).set("status", newStatus)
          ;(layer as any).set("statusText", text)
        }
      })
    }, [selection])

    const toggleAnimatedFlow = useMutation(({ storage }) => {
      if (!soleLayerId) return
      const layer = storage.get("layers").get(soleLayerId)
      if (layer && layer.get("type") === LayerType.Arrow) {
        const cur = Boolean((layer as any).get("isAnimated"))
        ;(layer as any).set("isAnimated", !cur)
      }
    }, [soleLayerId])

    const injectFault = useMutation(({ storage }) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer && layer.get("type") === LayerType.Component) {
          const cur = ((layer as any).get("status") as string) || "none"
          if (cur === "error") {
            ;(layer as any).set("status", "healthy")
            ;(layer as any).set("statusText", "HEALTHY")
          } else {
            ;(layer as any).set("status", "error")
            ;(layer as any).set("statusText", "OUTAGE")
          }
        }
      })
    }, [selection])

    // Alignment and Distribution Mutations
    const alignHorizontally = useMutation(({ storage }) => {
      if (selection.length < 2) return
      const liveLayers = storage.get("layers")
      let sumY = 0
      let count = 0
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l && l.get("type") !== LayerType.Arrow) {
          sumY += (l.get("y") || 0) + (l.get("height") || 100) / 2
          count++
        }
      })
      if (count < 2) return
      const avgY = sumY / count
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l && l.get("type") !== LayerType.Arrow) {
          const h = l.get("height") || 100
          l.set("y", avgY - h / 2)
        }
      })
    }, [selection])

    const alignVertically = useMutation(({ storage }) => {
      if (selection.length < 2) return
      const liveLayers = storage.get("layers")
      let sumX = 0
      let count = 0
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l && l.get("type") !== LayerType.Arrow) {
          sumX += (l.get("x") || 0) + (l.get("width") || 100) / 2
          count++
        }
      })
      if (count < 2) return
      const avgX = sumX / count
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l && l.get("type") !== LayerType.Arrow) {
          const w = l.get("width") || 100
          l.set("x", avgX - w / 2)
        }
      })
    }, [selection])

    const distributeHorizontally = useMutation(({ storage }) => {
      if (selection.length < 3) return
      const liveLayers = storage.get("layers")
      const validNodes: { id: string; x: number; width: number }[] = []
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l && l.get("type") !== LayerType.Arrow) {
          validNodes.push({ id, x: l.get("x") || 0, width: l.get("width") || 100 })
        }
      })
      if (validNodes.length < 3) return
      validNodes.sort((a, b) => a.x - b.x)
      const first = validNodes[0]
      const last = validNodes[validNodes.length - 1]
      const totalSpan = last.x - first.x
      const step = totalSpan / (validNodes.length - 1)

      validNodes.forEach((node, idx) => {
        if (idx === 0 || idx === validNodes.length - 1) return
        const l = liveLayers.get(node.id)
        if (l) {
          l.set("x", first.x + step * idx)
        }
      })
    }, [selection])

    // Move to front / back
    const bringToFront = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds")
        const indices: number[] = []
        const arr = liveLayersIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i)
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayersIds.move(indices[i], arr.length - 1 - i)
        }
      },
      [selection]
    )

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds")
        const indices: number[] = []
        const arr = liveLayersIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i)
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayersIds.move(indices[i], i)
        }
      },
      [selection]
    )

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers")
        setLastUsedColor(fill)

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill)
        })
      },
      [selection, setLastUsedColor]
    )

    const deleteLayers = useDeleteLayers()

    useEffect(() => {
      if (selectionBounds) {
        const zoom = camera.zoom || 1
        const x = (selectionBounds.x + selectionBounds.width / 2) * zoom + camera.x
        const y = selectionBounds.y * zoom + camera.y

        setPosition({ x, y })
      }
    }, [selectionBounds, camera])

    if (!selectionBounds) {
      return null
    }

    return (
      <div
        className="absolute p-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-neutral-200/90 flex items-center gap-1 select-none z-40 animate-in fade-in zoom-in-95 duration-100"
        style={{
          left: `${position.x}px`,
          top: `${Math.max(75, position.y - 58)}px`,
          transform: "translateX(-50%)",
        }}
      >
        {/* Color Swatch */}
        <div className="flex items-center px-1">
          <ColorPicker onChange={setFill} />
        </div>

        <div className="h-5 w-px bg-neutral-200" />

        {/* Component Specific Controls */}
        {isComponent && (
          <div className="flex items-center gap-1">
            {/* Status Badge Dropdown Option Selector */}
            <DropdownMenu>
              <Hint label="Assign Health Status Badge">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="board"
                    size="sm"
                    className="h-8 px-2 flex items-center gap-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 text-xs font-medium hover:bg-neutral-50 transition-all"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        currentStatus === "healthy"
                          ? "bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse"
                          : currentStatus === "warning"
                          ? "bg-amber-500 shadow-sm shadow-amber-500/50"
                          : currentStatus === "error"
                          ? "bg-rose-500 shadow-sm shadow-rose-500/50"
                          : currentStatus === "info"
                          ? "bg-blue-500 shadow-sm shadow-blue-500/50"
                          : "bg-neutral-300"
                      }`}
                    />
                    <span className="capitalize text-neutral-700 font-semibold text-[11px]">
                      {currentStatus === "none" ? "Status" : currentStatus}
                    </span>
                    <ChevronDown className="w-3 h-3 text-neutral-400 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
              </Hint>
              <DropdownMenuContent align="center" side="top" sideOffset={8} className="w-48 p-1.5 rounded-xl shadow-xl border border-neutral-200 bg-white z-50">
                <DropdownMenuItem
                  onClick={() => setComponentStatus("none")}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer hover:bg-neutral-100"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <span>None (No Badge)</span>
                  {currentStatus === "none" && <Check className="w-3.5 h-3.5 ml-auto text-neutral-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("healthy")}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer hover:bg-emerald-50 text-emerald-700 font-medium"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Healthy (Normal)</span>
                  {currentStatus === "healthy" && <Check className="w-3.5 h-3.5 ml-auto text-emerald-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("warning")}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer hover:bg-amber-50 text-amber-700 font-medium"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Warning (Degraded)</span>
                  {currentStatus === "warning" && <Check className="w-3.5 h-3.5 ml-auto text-amber-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("error")}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer hover:bg-rose-50 text-rose-700 font-medium"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Outage (Error)</span>
                  {currentStatus === "error" && <Check className="w-3.5 h-3.5 ml-auto text-rose-600" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setComponentStatus("info")}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer hover:bg-blue-50 text-blue-700 font-medium"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Maintenance (Info)</span>
                  {currentStatus === "info" && <Check className="w-3.5 h-3.5 ml-auto text-blue-600" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Hint label="Inject Fault / Outage (Simulate Node Down)">
              <Button
                variant="board"
                size="icon"
                onClick={injectFault}
                className={currentStatus === "error" ? "text-rose-600 bg-rose-50" : "text-neutral-600 hover:text-rose-600 hover:bg-rose-50"}
              >
                <Flame className="w-4 h-4" />
              </Button>
            </Hint>

            <div className="h-5 w-px bg-neutral-200" />
          </div>
        )}

        {/* Arrow Specific Controls */}
        {isArrow && (
          <div className="flex items-center gap-1">
            <Hint label={currentArrowStyle === "sharp" ? "Switch to Curvy Arrow" : "Switch to Sharp Arrow"}>
              <Button variant="board" size="icon" onClick={toggleArrowStyle} className="text-neutral-600 hover:text-indigo-600">
                {currentArrowStyle === "sharp" ? <Spline className="w-4 h-4" /> : <CornerDownRight className="w-4 h-4" />}
              </Button>
            </Hint>
            <Hint label={`Direction: ${currentDirection === "bidirectional" ? "Bidirectional (⇄)" : currentDirection === "none" ? "Plain Line (—)" : "Forward (→)"}`}>
              <Button variant="board" size="icon" onClick={toggleArrowDirection} className="text-neutral-600 hover:text-indigo-600">
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </Hint>
            <Hint label={`Live Energy Flow: ${(soleLayer as any)?.isAnimated ? "ON" : "OFF"}`}>
              <Button
                variant="board"
                size="icon"
                onClick={toggleAnimatedFlow}
                className={(soleLayer as any)?.isAnimated ? "text-cyan-600 bg-cyan-50" : "text-neutral-600 hover:text-cyan-600"}
              >
                <Sparkles className="w-4 h-4" />
              </Button>
            </Hint>
            <div className="h-5 w-px bg-neutral-200" />
          </div>
        )}

        {/* Pattern, Rename & Connected Layout */}
        <div className="flex items-center gap-1">
          {/* Border / Stroke Pattern Toggle */}
          <Hint label={`Stroke Pattern: ${currentStrokePattern.toUpperCase()} (Solid / Dashed / Dotted)`}>
            <Button variant="board" size="icon" onClick={toggleStrokePattern} className="text-neutral-600 hover:text-indigo-600 font-mono text-xs font-bold w-8">
              {currentStrokePattern === "solid" ? "—" : currentStrokePattern === "dashed" ? "- -" : "···"}
            </Button>
          </Hint>

          {canRename && onRename && (
            <Hint label="Rename / Label">
              <Button variant="board" size="icon" onClick={onRename} className="text-neutral-600 hover:text-indigo-600">
                <Edit3 className="w-4 h-4" />
              </Button>
            </Hint>
          )}

          {onSelectConnected && (
            <Hint label="Select Entire Connected Layout">
              <Button variant="board" size="icon" onClick={onSelectConnected} className="text-neutral-600 hover:text-indigo-600">
                <Network className="w-4 h-4" />
              </Button>
            </Hint>
          )}
        </div>

        <div className="h-5 w-px bg-neutral-200" />

        {/* Duplication & Layer Ordering */}
        <div className="flex items-center gap-0.5">
          {onDuplicate && (
            <Hint label="Duplicate (Ctrl+D)">
              <Button variant="board" size="icon" onClick={onDuplicate} className="text-neutral-600 hover:text-indigo-600">
                <Copy className="w-4 h-4" />
              </Button>
            </Hint>
          )}
          <Hint label="Bring to Front">
            <Button variant="board" size="icon" onClick={bringToFront} className="text-neutral-600">
              <BringToFront className="w-4 h-4" />
            </Button>
          </Hint>
          <Hint label="Send to Back">
            <Button variant="board" size="icon" onClick={moveToBack} className="text-neutral-600">
              <SendToBack className="w-4 h-4" />
            </Button>
          </Hint>
        </div>

        {/* Multi-Selection Alignment (only visible when > 1 items selected) */}
        {selection.length > 1 && (
          <>
            <div className="h-5 w-px bg-neutral-200" />
            <div className="flex items-center gap-0.5">
              <Hint label="Align Horizontal (Row)">
                <Button variant="board" size="icon" onClick={alignHorizontally} className="text-neutral-600 hover:text-indigo-600">
                  <AlignCenterHorizontal className="w-4 h-4" />
                </Button>
              </Hint>
              <Hint label="Align Vertical (Column)">
                <Button variant="board" size="icon" onClick={alignVertically} className="text-neutral-600 hover:text-indigo-600">
                  <AlignCenterVertical className="w-4 h-4" />
                </Button>
              </Hint>
              {selection.length > 2 && (
                <Hint label="Distribute Evenly">
                  <Button variant="board" size="icon" onClick={distributeHorizontally} className="text-neutral-600 hover:text-indigo-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </Hint>
              )}
            </div>
          </>
        )}

        <div className="h-5 w-px bg-neutral-200" />

        {/* Delete */}
        <Hint label="Delete (Del)">
          <Button variant="board" size="icon" onClick={deleteLayers} className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
            <Trash2 className="w-4 h-4" />
          </Button>
        </Hint>
      </div>
    )
  }
)

SelectionTools.displayName = "SelectionTools"
