import { Kalam } from "next/font/google"
import ContentEditable from "react-contenteditable"

import { TextLayer } from "@/types/canvas"
import { cn, colorToCss } from "@/lib/utils"
import { useMutation } from "@liveblocks/react/suspense"
import { Weight } from "lucide-react"

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
})

//function for fontsize
const calculateFontsize = (width: number, height: number) => {
  const maxFontSize = 96
  const scalefactor = 0.5
  const fontSizeBasedOnHeight = height * scalefactor
  const fontSizeBasedOnWidth = width * scalefactor

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
}

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
          fontSize: calculateFontsize(width, height),
          color: fill ? colorToCss(fill) : "#000",
        }}
      />
    </foreignObject>
  )
}
