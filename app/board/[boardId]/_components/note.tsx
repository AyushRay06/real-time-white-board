"use client"

import React, { useRef } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { NoteLayer } from "@/types/canvas"
import { cn, colorToCss, getContrastingTextColor, getFontFamilyClass, getFontFamilyCss } from "@/lib/utils"
import { useMutation } from "@liveblocks/react/suspense"

interface NoteProps {
  id: string
  layer: NoteLayer
  onPointDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Note = ({ layer, onPointDown, id, selectionColor }: NoteProps) => {
  const {
    x,
    y,
    height,
    width,
    fill,
    value,
    fontFamily = "handwriting",
    fontSize = 20,
    fontWeight = "normal",
    textAlign = "center",
  } = layer

  const editableRef = useRef<HTMLElement>(null)

  const updateValue = useMutation(
    ({ storage }, newValue: string) => {
      const liveLayers = storage.get("layers")
      liveLayers.get(id)?.set("value", newValue)
    },
    [id]
  )

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  const textColor = fill ? getContrastingTextColor(fill) : "#000"

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointDown(e, id)}
      style={{
        outline: selectionColor ? `2px solid ${selectionColor}` : "none",
        outlineOffset: "2px",
        backgroundColor: fill ? colorToCss(fill) : "#fef08a",
        borderRadius: "8px",
      }}
      className="shadow-lg drop-shadow-md select-none transition-shadow"
    >
      <div className="w-full h-full p-3 flex items-center justify-center">
        <ContentEditable
          innerRef={editableRef as any}
          html={value !== undefined ? value : "Note"}
          onChange={handleContentChange}
          className={cn(
            "w-full outline-none leading-snug tracking-wide",
            getFontFamilyClass(fontFamily)
          )}
          style={{
            fontFamily: getFontFamilyCss(fontFamily),
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight === "bold" ? 700 : 400,
            textAlign: textAlign,
            color: textColor,
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        />
      </div>
    </foreignObject>
  )
}
