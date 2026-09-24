"use client"

import React, { memo } from "react"
import { Plus, Minus, Maximize2, Grid, Keyboard, Download } from "lucide-react"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"

interface ZoomControlsProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  onFitToScreen: () => void
  showGrid: boolean
  onToggleGrid: () => void
  onOpenShortcuts: () => void
  onExport: (format: "png" | "svg" | "json") => void
}

export const ZoomControls = memo(function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitToScreen,
  showGrid,
  onToggleGrid,
  onOpenShortcuts,
  onExport,
}: ZoomControlsProps) {
  const [showExportMenu, setShowExportMenu] = React.useState(false)
  const zoomPercent = Math.round(zoom * 100)

  return (
    <div className="absolute bottom-4 right-4 z-40 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1.5 rounded-2xl shadow-lg border border-neutral-200 select-none">
      {/* Grid Toggle */}
      <Hint label={`Grid: ${showGrid ? "ON" : "OFF"} (G)`}>
        <Button
          variant="board"
          size="icon"
          onClick={onToggleGrid}
          className={showGrid ? "text-indigo-600 bg-indigo-50" : "text-neutral-500"}
        >
          <Grid className="w-4 h-4" />
        </Button>
      </Hint>

      <div className="h-4 w-px bg-neutral-200 mx-0.5" />

      {/* Zoom Out */}
      <Hint label="Zoom Out (Ctrl -)">
        <Button
          variant="board"
          size="icon"
          onClick={onZoomOut}
          disabled={zoom <= 0.25}
          className="text-neutral-600"
        >
          <Minus className="w-4 h-4" />
        </Button>
      </Hint>

      {/* Zoom Percentage (click to reset) */}
      <Hint label="Reset Zoom (Ctrl 0)">
        <button
          onClick={onResetZoom}
          className="px-2 py-1 text-xs font-semibold text-neutral-700 hover:text-indigo-600 hover:bg-neutral-100 rounded-md transition-colors min-w-[50px] text-center"
        >
          {zoomPercent}%
        </button>
      </Hint>

      {/* Zoom In */}
      <Hint label="Zoom In (Ctrl +)">
        <Button
          variant="board"
          size="icon"
          onClick={onZoomIn}
          disabled={zoom >= 3.0}
          className="text-neutral-600"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </Hint>

      {/* Fit to Screen */}
      <Hint label="Fit to Screen (Shift 1)">
        <Button
          variant="board"
          size="icon"
          onClick={onFitToScreen}
          className="text-neutral-600"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </Hint>

      <div className="h-4 w-px bg-neutral-200 mx-0.5" />

      {/* Export Menu */}
      <div className="relative">
        <Hint label="Export diagram">
          <Button
            variant="board"
            size="icon"
            onClick={() => setShowExportMenu((v) => !v)}
            className="text-neutral-600 hover:text-indigo-600"
          >
            <Download className="w-4 h-4" />
          </Button>
        </Hint>

        {showExportMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowExportMenu(false)}
            />
            <div className="absolute right-0 bottom-10 z-50 w-36 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 text-xs text-neutral-700 flex flex-col gap-0.5">
              <button
                onClick={() => {
                  setShowExportMenu(false)
                  onExport("png")
                }}
                className="px-3 py-1.5 text-left hover:bg-neutral-100 flex items-center justify-between font-medium"
              >
                <span>Export PNG</span>
                <span className="text-[10px] text-neutral-400">Image</span>
              </button>
              <button
                onClick={() => {
                  setShowExportMenu(false)
                  onExport("svg")
                }}
                className="px-3 py-1.5 text-left hover:bg-neutral-100 flex items-center justify-between font-medium"
              >
                <span>Export SVG</span>
                <span className="text-[10px] text-neutral-400">Vector</span>
              </button>
              <button
                onClick={() => {
                  setShowExportMenu(false)
                  onExport("json")
                }}
                className="px-3 py-1.5 text-left hover:bg-neutral-100 flex items-center justify-between font-medium"
              >
                <span>Export JSON</span>
                <span className="text-[10px] text-neutral-400">Schema</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Shortcuts */}
      <Hint label="Keyboard Shortcuts (?)">
        <Button
          variant="board"
          size="icon"
          onClick={onOpenShortcuts}
          className="text-neutral-600"
        >
          <Keyboard className="w-4 h-4" />
        </Button>
      </Hint>
    </div>
  )
})
