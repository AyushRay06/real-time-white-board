import { Kalam } from "next/font/google"
import ContentEditable from "react-contenteditable"

import { TextLayer } from "@/types/canvas"
import { cn, colorToCss } from "@/lib/utils"
import { useMutation } from "@liveblocks/react/suspense"

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
})

interface TextProps {
  id: string
  layer: TextLayer
  onPointDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Text = ({ layer, onPointDown, id, selectionColor }: TextProps) => {
  const { x, y, height, width, fill, value } = layer

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={"Text"}
        onChange={() => {}}
        className={cn(
          "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          color: fill ? colorToCss(fill) : "#000",
        }}
      />
    </foreignObject>
  )
}
