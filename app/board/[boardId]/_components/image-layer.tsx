"use client"

import React, { memo } from "react"
import { ImageLayer } from "@/types/canvas"
import { useCanvasTheme } from "./canvas-theme-context"

interface ImageLayerComponentProps {
  id: string
  layer: ImageLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
  isConnecting?: boolean
  isConnectingFrom?: boolean
  onConnectClick?: (layerId: string) => void
  onDoubleClick?: (layerId: string) => void
}

export const ImageLayerComponent = memo(function ImageLayerComponent({
  id,
  layer,
  onPointerDown,
  selectionColor,
  isConnecting = false,
  isConnectingFrom = false,
  onConnectClick,
  onDoubleClick,
}: ImageLayerComponentProps) {
  const {
    x,
    y,
    width,
    height,
    src,
    fileName,
    opacity = 1,
    roundness = "rounded",
    strokeWidth = 1,
    strokeColor: customStrokeColor,
    strokePattern = "solid",
  } = layer

  const { theme } = useCanvasTheme()
  const isDark = theme === "dark"

  const radius = roundness === "sharp" ? 0 : roundness === "rounded" ? 8 : 16
  const clipId = `clip-img-${id}`

  const strokeColor = isConnectingFrom
    ? isDark ? "#60A5FA" : "#3B82F6"
    : selectionColor || customStrokeColor || (isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)")

  const effectiveStrokeWidth = isConnectingFrom || selectionColor ? 2.5 : strokeWidth

  const dashArray =
    strokePattern === "dotted"
      ? "3 4"
      : strokePattern === "dashed"
      ? "8 6"
      : undefined

  const handleClick = (e: React.MouseEvent) => {
    if (isConnecting) {
      e.stopPropagation()
      onConnectClick?.(id)
    }
  }

  // Anchor dot coordinates for connecting arrows
  const anchors = [
    { side: "top" as const, cx: width / 2, cy: 0 },
    { side: "right" as const, cx: width, cy: height / 2 },
    { side: "bottom" as const, cx: width / 2, cy: height },
    { side: "left" as const, cx: 0, cy: height / 2 },
  ]

  return (
    <g
      onPointerDown={(e) => onPointerDown(e, id)}
      onClick={handleClick}
      onDoubleClick={() => onDoubleClick?.(id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        cursor: isConnecting ? "crosshair" : "pointer",
      }}
      className="group select-none"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={width} height={height} rx={radius} ry={radius} />
        </clipPath>
      </defs>

      {/* Background shadow & backdrop */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill={isDark ? "#1e293b" : "#f1f5f9"}
        className="drop-shadow-md transition-shadow"
      />

      {/* Rendered Image */}
      <image
        href={src}
        x={0}
        y={0}
        width={width}
        height={height}
        preserveAspectRatio="none"
        clipPath={`url(#${clipId})`}
        style={{
          opacity,
          pointerEvents: "none",
        }}
      />

      {/* Image Border Outline */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill="none"
        stroke={strokeColor}
        strokeWidth={effectiveStrokeWidth}
        strokeDasharray={dashArray}
        className="transition-colors pointer-events-none"
      />

      {/* File Name Tag (shows on hover or when selected if name exists) */}
      {fileName && (selectionColor || false) && (
        <foreignObject
          x={0}
          y={height + 6}
          width={width}
          height={24}
          style={{ pointerEvents: "none" }}
        >
          <div className="flex items-center justify-center">
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-md shadow-sm truncate max-w-[90%] backdrop-blur-md ${
                isDark
                  ? "bg-slate-900/90 text-slate-300 border border-slate-700/60"
                  : "bg-white/90 text-slate-700 border border-slate-200/80"
              }`}
            >
              {fileName}
            </span>
          </div>
        </foreignObject>
      )}

      {/* Connection Anchor Points when arrow connecting mode is active */}
      {isConnecting &&
        anchors.map(({ side, cx, cy }) => (
          <circle
            key={side}
            cx={cx}
            cy={cy}
            r={5}
            fill={isDark ? "#60A5FA" : "#3B82F6"}
            stroke={isDark ? "#0f172a" : "#ffffff"}
            strokeWidth={2}
            className="animate-pulse pointer-events-none"
          />
        ))}
    </g>
  )
})
