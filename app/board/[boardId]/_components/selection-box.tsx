"use client"

import { memo } from "react"
import { LayerType, Side, XYWH } from "@/types/canvas"
import { useStorage, useSelf } from "@liveblocks/react/suspense"
import { useSelectionBounds } from "@/hooks/use-selection-bound"

interface SelecetionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
  onDragSelectionStart?: (e: React.PointerEvent) => void
}

const HANDLE_WIDTH = 8

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown, onDragSelectionStart }: SelecetionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    )
    const selectionCount = useSelf((me) => me.presence.selection.length)
    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId &&
        root.layers.get(soleLayerId)?.type !== LayerType.Path &&
        root.layers.get(soleLayerId)?.type !== LayerType.Arrow
    )
    const isSoleArrow = useStorage((root) =>
      soleLayerId ? root.layers.get(soleLayerId)?.type === LayerType.Arrow : false
    )
    const bounds = useSelectionBounds()
    if (!bounds || isSoleArrow) {
      return null
    }

    return (
      <>
        {/* Multi-Selection Draggable Header Bar */}
        {selectionCount > 1 && onDragSelectionStart && (
          <g
            style={{
              transform: `translate(${bounds.x}px, ${bounds.y - 36}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onDragSelectionStart(e)
            }}
            className="cursor-grab active:cursor-grabbing select-none"
          >
            <rect
              x={0}
              y={0}
              width={Math.max(240, Math.min(bounds.width, 360))}
              height={30}
              rx={8}
              className="fill-indigo-600 hover:fill-indigo-700 shadow-md transition-colors"
            />
            <foreignObject
              x={0}
              y={0}
              width={Math.max(240, Math.min(bounds.width, 360))}
              height={30}
              className="pointer-events-none"
            >
              <div className="h-full w-full flex items-center justify-center gap-2 text-white text-xs font-semibold px-3">
                <span className="text-sm">❖</span>
                <span>Move Architecture ({selectionCount} items)</span>
              </div>
            </foreignObject>
          </g>
        )}

        <rect
          className={
            selectionCount > 1
              ? "fill-indigo-500/5 stroke-indigo-500 stroke-2 cursor-grab active:cursor-grabbing"
              : "fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          }
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
          }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
          strokeDasharray={selectionCount > 1 ? "6 4" : undefined}
          onPointerDown={
            selectionCount > 1 && onDragSelectionStart
              ? (e) => {
                  e.stopPropagation()
                  onDragSelectionStart(e)
                }
              : undefined
          }
        />
        {isShowingHandles && (
          <>
            <rect
              //left-top
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px,${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds)
              }}
            />
            <rect
              //middle-top
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Top, bounds)
              }}
            />
            <rect
              //right-top
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Top + Side.Right, bounds)
              }}
            />
            <rect
              //right-middle
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Right, bounds)
              }}
            />
            <rect
              //right-bottom
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds)
              }}
            />
            <rect
              //middle-bottom
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Bottom, bounds)
              }}
            />
            <rect
              //left-bottom
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px,
                ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds)
              }}
            />
            <rect
              //left-middle
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px,
                ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Left, bounds)
              }}
            />
          </>
        )}
      </>
    )
  }
)

SelectionBox.displayName = "SelectionBox"
