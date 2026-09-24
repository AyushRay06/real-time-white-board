"use client"

import { memo, useEffect, useState } from "react"
import { Camera, Color, LayerType } from "@/types/canvas"
import { useSelectionBounds } from "@/hooks/use-selection-bound"
import { useMutation, useSelf, useStorage } from "@liveblocks/react/suspense"
import { ColorPicker } from "./color-picker"
import { useDeleteLayers } from "@/hooks/use-delete-layers"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { BringToFront, SendToBack, Trash2, Copy, Edit3, Network, Spline, CornerDownRight } from "lucide-react"

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
    const currentArrowStyle = isArrow && "arrowStyle" in soleLayer ? (soleLayer.arrowStyle || "curvy") : "curvy"

    const toggleArrowStyle = useMutation(({ storage }) => {
      if (!soleLayerId) return
      const layer = storage.get("layers").get(soleLayerId)
      if (layer && layer.get("type") === LayerType.Arrow) {
        const cur = ((layer as any).get("arrowStyle") as any) || "curvy"
        const next = cur === "sharp" ? "curvy" : "sharp"
        ;(layer as any).set("arrowStyle", next)
      }
    }, [soleLayerId])

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

        {/* Toggle Curvy vs Sharp Arrow */}
        {isArrow && (
          <Hint label={currentArrowStyle === "sharp" ? "Switch to Curvy Arrow" : "Switch to Sharp Arrow"}>
            <Button variant="board" size="icon" onClick={toggleArrowStyle} className="text-neutral-600 hover:text-indigo-600">
              {currentArrowStyle === "sharp" ? <Spline className="w-4 h-4" /> : <CornerDownRight className="w-4 h-4" />}
            </Button>
          </Hint>
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
