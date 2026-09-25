"use client"

import React, { useRef } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { RectangleLayer } from "@/types/canvas"
import { colorToCss, colorToRgba, getContrastingTextColor, cn, getFontFamilyClass, getFontFamilyCss } from "@/lib/utils"
import { useMutation } from "@liveblocks/react/suspense"
import { useCanvasTheme } from "./canvas-theme-context"

interface RectangleProps {
  id: string
  layer: RectangleLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const {
    x,
    y,
    width,
    height,
    fill,
    strokePattern = "solid",
    strokeWidth = 2,
    fillStyle = "solid",
    roundness = "rounded",
    value = "",
    fontFamily = "sans",
    fontSize = 18,
    fontWeight = "normal",
    textAlign = "center",
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

  const dashArray =
    strokePattern === "dotted"
      ? "3 4"
      : strokePattern === "dashed"
      ? "8 6"
      : undefined

  // Determine fill color based on fillStyle
  let shapeFill = "#3b82f6"
  if (fillStyle === "transparent") {
    shapeFill = "transparent"
  } else if (fillStyle === "semi") {
    shapeFill = fill ? colorToRgba(fill, isDark ? 0.22 : 0.15) : "rgba(59, 130, 246, 0.15)"
  } else {
    shapeFill = fill ? colorToCss(fill) : "#3b82f6"
  }

  // Determine stroke color
  const baseColor = fill ? colorToCss(fill) : "#3b82f6"
  const strokeColor =
    selectionColor ||
    (fillStyle !== "solid" || strokePattern !== "solid"
      ? baseColor
      : "transparent")

  const effectiveStrokeWidth = selectionColor ? Math.max(strokeWidth, 2) : (strokeColor === "transparent" ? 0 : strokeWidth)
  const radius = roundness === "sharp" ? 0 : 12

  // Determine text color inside shape
  let textColor = isDark ? "#f8fafc" : "#0f172a"
  if (fillStyle === "solid" && fill) {
    textColor = getContrastingTextColor(fill)
  } else if (fillStyle !== "solid" && fill) {
    textColor = isDark ? "#f8fafc" : "#0f172a"
  }

  return (
    <g
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      className="cursor-pointer group"
    >
      <rect
        className="drop-shadow-sm transition-all"
        x={0}
        y={0}
        rx={radius}
        ry={radius}
        width={width}
        height={height}
        stroke={strokeColor}
        strokeDasharray={dashArray}
        fill={shapeFill}
        strokeWidth={effectiveStrokeWidth}
      />

      {/* Embedded Text Label for Shape */}
      <foreignObject
        x={8}
        y={8}
        width={Math.max(1, width - 16)}
        height={Math.max(1, height - 16)}
        style={{ pointerEvents: value ? "auto" : "none" }}
      >
        <div className="w-full h-full flex items-center justify-center p-1 overflow-hidden select-none">
          <ContentEditable
            innerRef={editableRef as any}
            html={value || ""}
            onChange={handleContentChange}
            className={cn(
              "w-full outline-none leading-snug drop-shadow-sm",
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
    </g>
  )
}
