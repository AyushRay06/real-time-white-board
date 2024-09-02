import { EllipseLayer } from "@/types/canvas"
import React from "react"

interface RectangleProps {
  id: string
  layer: EllipseLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Ellipse = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      stroke="transparent"
      fill="#000"
      strokeWidth={1}
    />
  )
}
