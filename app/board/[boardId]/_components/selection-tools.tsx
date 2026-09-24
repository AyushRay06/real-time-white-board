"use client"

import { memo, useEffect, useState } from "react"
import { Camera, Color, LayerType } from "@/types/canvas"
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
  Activity,
  Layers,
  Sparkles,
  Flame,
} from "lucide-react"

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

    const cycleComponentStatus = useMutation(({ storage }) => {
      const liveLayers = storage.get("layers")
      selection.forEach((id) => {
        const layer = liveLayers.get(id)
        if (layer && layer.get("type") === LayerType.Component) {
          const cur = ((layer as any).get("status") as string) || "none"
          const next = cur === "none" ? "healthy" : cur === "healthy" ? "warning" : cur === "warning" ? "error" : "none"
          ;(layer as any).set("status", next === "none" ? undefined : next)
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
          const cur = (layer as any).get("status") as string
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
      const items: { id: string; x: number; width: number }[] = []
      selection.forEach((id) => {
        const l = liveLayers.get(id)
        if (l && l.get("type") !== LayerType.Arrow) {
          items.push({ id, x: l.get("x") || 0, width: l.get("width") || 100 })
        }
      })
      if (items.length < 3) return
      items.sort((a, b) => a.x - b.x)
      const first = items[0]
      const last = items[items.length - 1]
      const totalSpan = last.x - first.x
      const step = totalSpan / (items.length - 1)
      items.forEach((item, idx) => {
        const l = liveLayers.get(item.id)
        if (l) l.set("x", first.x + idx * step)
      })
    }, [selection])

    // To bring layer to front
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

    // To move layer back
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
        className="absolute p-2.5 rounded-2xl bg-white shadow-xl border border-neutral-200 flex items-center gap-1.5 select-none z-40 animate-in fade-in zoom-in-95 duration-100"
        style={{
          left: `calc(${position.x}px - 140px)`,
          top: `${position.y - 65}px`,
        }}
      >
        <ColorPicker onChange={setFill} />

        <div className="h-6 w-px bg-neutral-200 mx-1" />

        {/* Duplicate button */}
        {onDuplicate && (
          <Hint label="Duplicate (Ctrl+D)">
            <Button variant="board" size="icon" onClick={onDuplicate} className="text-neutral-600">
              <Copy className="w-4 h-4" />
            </Button>
          </Hint>
        )}

        {/* Rename button */}
        {canRename && onRename && (
          <Hint label="Rename / Label">
            <Button variant="board" size="icon" onClick={onRename} className="text-neutral-600">
              <Edit3 className="w-4 h-4" />
            </Button>
          </Hint>
        )}

        {/* Select connected layout button */}
        {onSelectConnected && (
          <Hint label="Select Entire Layout / Architecture">
            <Button variant="board" size="icon" onClick={onSelectConnected} className="text-neutral-600 hover:text-indigo-600">
              <Network className="w-4 h-4" />
            </Button>
          </Hint>
        )}

        {/* Border / Stroke Pattern Toggle */}
        <Hint label={`Stroke Pattern: ${currentStrokePattern.toUpperCase()} (Click to toggle Solid / Dashed / Dotted)`}>
          <Button variant="board" size="icon" onClick={toggleStrokePattern} className="text-neutral-600 hover:text-indigo-600 font-mono text-xs font-bold w-8">
            {currentStrokePattern === "solid" ? "—" : currentStrokePattern === "dashed" ? "- -" : "···"}
          </Button>
        </Hint>

        {/* Toggle Curvy vs Sharp Arrow & Direction */}
        {isArrow && (
          <>
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
          </>
        )}

        {/* Component Health Status Badge & Fault Injection */}
        {isComponent && (
          <>
            <Hint label="Toggle Health Badge (🟢 Healthy, 🟡 Warning, 🔴 Error)">
              <Button variant="board" size="icon" onClick={cycleComponentStatus} className="text-neutral-600 hover:text-indigo-600">
                <Activity className="w-4 h-4" />
              </Button>
            </Hint>
            <Hint label="Inject Fault / Outage (Simulate Node Down)">
              <Button variant="board" size="icon" onClick={injectFault} className="text-neutral-600 hover:text-rose-600 hover:bg-rose-50">
                <Flame className="w-4 h-4" />
              </Button>
            </Hint>
          </>
        )}

        {/* Multi-Selection Alignment Tools */}
        {selection.length > 1 && (
          <>
            <div className="h-6 w-px bg-neutral-200 mx-0.5" />
            <Hint label="Align Horizontally (Row)">
              <Button variant="board" size="icon" onClick={alignHorizontally} className="text-neutral-600 hover:text-indigo-600">
                <AlignCenterHorizontal className="w-4 h-4" />
              </Button>
            </Hint>
            <Hint label="Align Vertically (Column)">
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
          </>
        )}

        <div className="flex gap-x-0.5">
          <Hint label="Bring to front">
            <Button variant="board" size="icon" onClick={bringToFront} className="text-neutral-600">
              <BringToFront className="w-4 h-4" />
            </Button>
          </Hint>
          <Hint label="Send back">
            <Button variant="board" size="icon" onClick={moveToBack} className="text-neutral-600">
              <SendToBack className="w-4 h-4" />
            </Button>
          </Hint>
        </div>

        <div className="h-6 w-px bg-neutral-200 mx-1" />

        <Hint label="Delete (Del)">
          <Button variant="board" size="icon" onClick={deleteLayers} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </Button>
        </Hint>
      </div>
    )
  }
)

SelectionTools.displayName = "SelectionTools"
