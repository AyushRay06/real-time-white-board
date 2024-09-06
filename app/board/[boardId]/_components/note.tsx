import { Kalam } from "next/font/google"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

import { Point, NoteLayer } from "@/types/canvas"
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils"
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

interface NoteProps {
  id: string
  layer: NoteLayer
  onPointDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Note = ({ layer, onPointDown, id, selectionColor }: NoteProps) => {
  const { x, y, height, width, fill, value } = layer

  const updateValue = useMutation(
    ({ storage, setMyPresence }, newValue: string) => {
      const liveLayers = storage.get("layers")

      liveLayers.get(id)?.set("value", newValue)
    },
    []
  )

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCss(fill) : "#000",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center  outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontsize(width, height),
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
      />
      t
    </foreignObject>
  )
}
