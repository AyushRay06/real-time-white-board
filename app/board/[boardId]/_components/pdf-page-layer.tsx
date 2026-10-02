"use client"

import React, { memo, useState } from "react"
import { PdfPageLayer } from "@/types/canvas"
import { useCanvasTheme } from "./canvas-theme-context"
import { Copy, FileText, Check, Download } from "lucide-react"
import { toast } from "sonner"

interface PdfPageLayerComponentProps {
  id: string
  layer: PdfPageLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
  isConnecting?: boolean
  isConnectingFrom?: boolean
  onConnectClick?: (layerId: string) => void
  onDoubleClick?: (layerId: string) => void
}

export const PdfPageLayerComponent = memo(function PdfPageLayerComponent({
  id,
  layer,
  onPointerDown,
  selectionColor,
  isConnecting = false,
  isConnectingFrom = false,
  onConnectClick,
  onDoubleClick,
}: PdfPageLayerComponentProps) {
  const {
    x,
    y,
    width,
    height,
    src,
    pdfName,
    pageNumber,
    totalPages,
    extractedText,
    opacity = 1,
    roundness = "rounded",
    strokeWidth = 1,
    strokeColor: customStrokeColor,
  } = layer

  const { theme } = useCanvasTheme()
  const isDark = theme === "dark"
  const [copied, setCopied] = useState(false)

  const radius = roundness === "sharp" ? 0 : roundness === "rounded" ? 6 : 12
  const clipId = `clip-pdf-${id}`

  const strokeColor = isConnectingFrom
    ? isDark ? "#60A5FA" : "#3B82F6"
    : selectionColor || customStrokeColor || (isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.12)")

  const effectiveStrokeWidth = isConnectingFrom || selectionColor ? 2.5 : strokeWidth

  const handleClick = (e: React.MouseEvent) => {
    if (isConnecting) {
      e.stopPropagation()
      onConnectClick?.(id)
    }
  }

  const handleCopyText = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!extractedText) {
      toast.info("No text content found on this page")
      return
    }
    navigator.clipboard.writeText(extractedText)
    setCopied(true)
    toast.success(`Copied text from Page ${pageNumber} of ${pdfName}`)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPage = (e: React.MouseEvent) => {
    e.stopPropagation()
    const a = document.createElement("a")
    a.href = src
    a.download = `${pdfName.replace(/\.pdf$/i, "")}-page-${pageNumber}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success(`Downloaded Page ${pageNumber}`)
  }

  // Anchor points for connecting arrows
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

      {/* Sheet of paper drop-shadow */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill="#ffffff"
        className="drop-shadow-lg"
      />

      {/* Rendered PDF Page Image */}
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

      {/* Sheet border */}
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
        className="transition-colors pointer-events-none"
      />

      {/* Top Floating Badge Bar with Page Info & Quick Action Tools */}
      <foreignObject
        x={8}
        y={-34}
        width={Math.max(220, width - 16)}
        height={32}
        style={{ pointerEvents: "auto" }}
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          {/* Page Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-md backdrop-blur-md border ${
              isDark
                ? "bg-slate-900/90 text-slate-200 border-slate-700/80"
                : "bg-white/95 text-slate-800 border-slate-200/90"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            <span className="truncate max-w-[130px]" title={pdfName}>
              {pdfName}
            </span>
            <span className="text-[11px] px-1.5 py-0.2 bg-rose-500/10 text-rose-500 font-bold rounded">
              {pageNumber} / {totalPages}
            </span>
          </div>

          {/* Quick Copy Text Button */}
          {extractedText && (
            <button
              onClick={handleCopyText}
              title="Copy page text to clipboard"
              className={`p-1 rounded-lg text-xs font-medium shadow-md backdrop-blur-md border transition-colors ${
                isDark
                  ? "bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/80"
                  : "bg-white/95 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200/90"
              }`}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          {/* Download Page Button */}
          <button
            onClick={handleDownloadPage}
            title="Download page image"
            className={`p-1 rounded-lg text-xs font-medium shadow-md backdrop-blur-md border transition-colors ${
              isDark
                ? "bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-700/80"
                : "bg-white/95 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200/90"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </foreignObject>

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
