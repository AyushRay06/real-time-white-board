"use client"

import React, { useRef } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { TextLayer } from "@/types/canvas"
import { cn, colorToCss, getFontFamilyClass, getFontFamilyCss } from "@/lib/utils"
import { useMutation } from "@liveblocks/react/suspense"
import { useCanvasTheme } from "./canvas-theme-context"

interface TextProps {
  id: string
  layer: TextLayer
  onPointDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Text = ({ layer, onPointDown, id, selectionColor }: TextProps) => {
  const {
    x,
    y,
    height,
    width,
    fill,
    value,
    fontFamily = "sans",
    fontSize = 24,
    fontWeight = "normal",
    fontStyle = "normal",
    textDecoration = "none",
    textAlign = "left",
  } = layer

  const { theme } = useCanvasTheme()
  const isDark = theme === "dark"
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

  // Determine optimal text color: adapt dark/light mode unless a custom vibrant color is set
  let textColor = "#0f172a"
  if (fill) {
    const isDefaultBlack = fill.r <= 25 && fill.g <= 25 && fill.b <= 25
    if (isDark && isDefaultBlack) {
      textColor = "#f8fafc"
    } else {
      textColor = colorToCss(fill)
    }
  } else {
    textColor = isDark ? "#f8fafc" : "#0f172a"
  }

  const justifyMap = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }

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
        borderRadius: "4px",
        overflow: "visible",
      }}
    >
      <div
        className={cn(
          "w-full h-full flex items-center p-1.5 cursor-text",
          justifyMap[textAlign] || "justify-start"
        )}
      >
        <ContentEditable
          innerRef={editableRef as any}
          html={value !== undefined ? value : "Text"}
          onChange={handleContentChange}
          onKeyDown={(e) => e.stopPropagation()}
          className={cn(
            "w-full outline-none leading-snug tracking-normal selection:bg-indigo-500/30",
            getFontFamilyClass(fontFamily)
          )}
          style={{
            fontFamily: getFontFamilyCss(fontFamily),
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight === "bold" ? 700 : 400,
            fontStyle: fontStyle === "italic" ? "italic" : "normal",
            textDecoration: textDecoration === "underline" ? "underline" : "none",
            textAlign: textAlign,
            color: textColor,
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        />
      </div>
    </foreignObject>
  )
}
