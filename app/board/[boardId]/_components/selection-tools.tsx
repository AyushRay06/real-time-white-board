"use client"

import { memo, useEffect, useState } from "react"
import { Camera, Color } from "@/types/canvas"
import { useSelectionBounds } from "@/hooks/use-selection-bound"
import { useMutation, useSelf } from "@liveblocks/react/suspense"
import { ColorPicker } from "./color-picker"
import { useDeleteLayers } from "@/hooks/use-delete-layers"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { BringToFront, SendToBack, Trash2 } from "lucide-react"

interface SelectionToolsProps {
  camera: Camera
  setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection)
    const selectionBounds = useSelectionBounds()
    const [position, setPosition] = useState({ x: 0, y: 0 })

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
        const x = selectionBounds.x + selectionBounds.width / 2 + camera.x
        const y = selectionBounds.y + camera.y

        setPosition({ x, y })
      }
    }, [selectionBounds, camera])

    if (!selectionBounds) {
      return null
    }

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          left: `calc(${position.x - 220}px)`,
          top: `${position.y - 128}px`, // Adjusted to be slightly above the selection
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button variant="board" size="icon">
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send back">
            <Button variant="board" size="icon">
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 className="h-6 w-6 text-neutral-500" />
            </Button>
          </Hint>
        </div>
      </div>
    )
  }
)

SelectionTools.displayName = "SelectionTools"

// "use client"

// import { memo } from "react"
// import { Camera, Color } from "@/types/canvas"
// import { useSelectionBounds } from "@/hooks/use-selection-bound"
// import { useSelf } from "@liveblocks/react/suspense"

// interface SelectionToolsProps {
//   camera: Camera
//   setLastUsedColor: (color: Color) => void
// }

// export const SelectionTools = memo(
//   ({ camera, setLastUsedColor }: SelectionToolsProps) => {
//     const selection = useSelf((me) => me.presence.selection)
//     const selectionBounds = useSelectionBounds()

//     if (!selectionBounds) {
//       return null
//     }

//     const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
//     const y = selectionBounds.y + camera.y

//     return (
//       <div
//         className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
//         style={{
//           transform: translate(
//           calc(${x}px-50%),
//           calc(${y - 16}px-100%)),
//         }}
//       >
//         Selection tools
//       </div>
//     )
//   }
// )
