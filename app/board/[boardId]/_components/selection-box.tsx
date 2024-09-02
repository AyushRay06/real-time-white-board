"use client"

import { memo } from "react"
import { LayerType, Side, XYWH } from "@/types/canvas"
import { useStorage, useSelf } from "@liveblocks/react/suspense"

interface SelecetionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
}

const HANDLE_WIDTH = 8

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelecetionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    )
    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    )

    return(
        <div></div>
    )
  }
)
