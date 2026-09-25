"use client"

import React, { useRef } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { EllipseLayer } from "@/types/canvas"
import { colorToCss, colorToRgba, getContrastingTextColor, cn, getFontFamilyClass, getFontFamilyCss } from "@/lib/utils"
import { useMutation } from "@liveblocks/react/suspense"
import { useCanvasTheme } from "./canvas-theme-context"

interface EllipseProps {
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
}: EllipseProps) => {
  const {
    x,
    y,
    width,
    height,
    fill,
    strokePattern = "solid",
    strokeWidth = 2,
    fillStyle = "solid",
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

  // Determine text color inside ellipse
  let textColor = isDark ? "#f8fafc" : "#0f172a"
  if (fillStyle === "solid" && fill) {
    textColor = getContrastingTextColor(fill)
  } else if (fillStyle !== "solid" && fill) {
    textColor = isDark ? "#f8fafc" : "#0f172a"
  }

  const innerW = Math.max(1, width * 0.7)
  const innerH = Math.max(1, height * 0.7)

  return (
    <g
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      className="cursor-pointer group"
    >
      <ellipse
        className="drop-shadow-sm transition-all"
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        stroke={strokeColor}
        strokeDasharray={dashArray}
        fill={shapeFill}
        strokeWidth={effectiveStrokeWidth}
      />

      {/* Embedded Text Label for Ellipse */}
      <foreignObject
        x={(width - innerW) / 2}
        y={(height - innerH) / 2}
        width={innerW}
        height={innerH}
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
