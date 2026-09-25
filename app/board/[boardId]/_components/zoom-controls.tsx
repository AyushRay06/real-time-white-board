"use client"

import React, { memo } from "react"
import {
  Plus,
  Minus,
  Maximize2,
  Grid,
  Keyboard,
  Download,
  Map,
  Sun,
  Moon,
  LayoutGrid,
} from "lucide-react"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { useCanvasTheme } from "./canvas-theme-context"
import { cn } from "@/lib/utils"

interface ZoomControlsProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  onFitToScreen: () => void
  gridType: "dots" | "cross" | "none"
  onToggleGrid: () => void
  onOpenShortcuts: () => void
  onExport: (format: "png" | "svg" | "json" | "mermaid") => void
  onToggleMinimap?: () => void
  isMinimapOpen?: boolean
}

export const ZoomControls = memo(function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitToScreen,
  gridType,
  onToggleGrid,
  onOpenShortcuts,
  onExport,
  onToggleMinimap,
  isMinimapOpen,
}: ZoomControlsProps) {
  const { theme, toggleTheme } = useCanvasTheme()
  const [showExportMenu, setShowExportMenu] = React.useState(false)
  const zoomPercent = Math.round(zoom * 100)

  return (
    <div
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 backdrop-blur-md px-2 py-1 rounded-xl shadow-lg select-none hover:shadow-xl transition-all border",
        theme === "dark"
          ? "bg-slate-900/95 border-slate-800 text-white"
          : "bg-white/95 border-neutral-200 text-slate-800"
      )}
    >
      {/* Grid Mode Toggle (Dots ➔ Crisscross Squares ➔ Off) */}
      <Hint
        label={
          gridType === "dots"
            ? "Grid: Dotted (click for Crisscross Squares) [G]"
            : gridType === "cross"
            ? "Grid: Crisscross Squares (click to Turn Off) [G]"
            : "Grid: Off (click for Dotted Grid) [G]"
        }
      >
        <button
          onClick={onToggleGrid}
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-lg transition-colors",
            gridType !== "none"
              ? theme === "dark"
                ? "bg-indigo-950/60 text-indigo-400"
                : "text-indigo-600 bg-indigo-50"
              : theme === "dark"
              ? "text-slate-400 hover:text-white hover:bg-slate-800"
              : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
          )}
        >
          {gridType === "cross" ? (
            <LayoutGrid className="w-3.5 h-3.5 text-cyan-400 animate-in zoom-in-75" />
          ) : (
            <Grid className={cn("w-3.5 h-3.5", gridType === "dots" && "text-indigo-500")} />
          )}
        </button>
      </Hint>

      <div className={cn("h-3.5 w-px mx-0.5", theme === "dark" ? "bg-slate-800" : "bg-neutral-200")} />

      {/* Zoom Out */}
      <Hint label="Zoom Out (Ctrl -)">
        <button
          onClick={onZoomOut}
          disabled={zoom <= 0.25}
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
            theme === "dark"
              ? "text-slate-300 hover:text-white hover:bg-slate-800"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          )}
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
      </Hint>

      {/* Zoom Percentage (click to reset) */}
      <Hint label="Reset Zoom (Ctrl 0)">
        <button
          onClick={onResetZoom}
          className={cn(
            "px-1.5 py-0.5 text-[11px] font-semibold rounded-md transition-colors min-w-[42px] text-center",
            theme === "dark"
              ? "text-slate-200 hover:text-white hover:bg-slate-800"
              : "text-neutral-700 hover:text-indigo-600 hover:bg-neutral-100"
          )}
        >
          {zoomPercent}%
        </button>
      </Hint>

      {/* Zoom In */}
      <Hint label="Zoom In (Ctrl +)">
        <button
          onClick={onZoomIn}
          disabled={zoom >= 3.0}
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
            theme === "dark"
              ? "text-slate-300 hover:text-white hover:bg-slate-800"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          )}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </Hint>

      {/* Fit to Screen */}
      <Hint label="Fit to Screen (Shift 1)">
        <button
          onClick={onFitToScreen}
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-lg transition-colors",
            theme === "dark"
              ? "text-slate-300 hover:text-white hover:bg-slate-800"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          )}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </Hint>

      <div className={cn("h-3.5 w-px mx-0.5", theme === "dark" ? "bg-slate-800" : "bg-neutral-200")} />

      {/* Export Menu */}
      <div className="relative">
        <Hint label="Export diagram">
          <button
            onClick={() => setShowExportMenu((v) => !v)}
            className={cn(
              "h-7 w-7 flex items-center justify-center rounded-lg transition-colors",
              theme === "dark"
                ? "text-slate-300 hover:text-indigo-400 hover:bg-slate-800"
                : "text-neutral-600 hover:text-indigo-600 hover:bg-neutral-100"
            )}
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </Hint>

        {showExportMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowExportMenu(false)}
            />
            <div
              className={cn(
                "absolute right-0 bottom-9 z-50 w-36 rounded-xl shadow-xl border py-1 text-xs flex flex-col gap-0.5 backdrop-blur-md",
                theme === "dark" ? "bg-slate-900/95 border-slate-800 text-slate-200" : "bg-white/95 border-neutral-200 text-neutral-700"
              )}
            >
              <button
                onClick={() => {
                  setShowExportMenu(false)
                  onExport("png")
                }}
                className={cn(
                  "px-2.5 py-1 text-left flex items-center justify-between font-medium rounded-lg mx-1",
                  theme === "dark" ? "hover:bg-slate-800 text-slate-200" : "hover:bg-neutral-100 text-neutral-700"
                )}
              >
                <span>Export PNG</span>
                <span className="text-[10px] text-neutral-400">Image</span>
              </button>
              <button
                onClick={() => {
                  setShowExportMenu(false)
                  onExport("svg")
                }}
                className={cn(
                  "px-2.5 py-1 text-left flex items-center justify-between font-medium rounded-lg mx-1",
                  theme === "dark" ? "hover:bg-slate-800 text-slate-200" : "hover:bg-neutral-100 text-neutral-700"
                )}
              >
                <span>Export SVG</span>
                <span className="text-[10px] text-neutral-400">Vector</span>
              </button>
              <button
                onClick={() => {
                  setShowExportMenu(false)
                  onExport("json")
                }}
                className={cn(
                  "px-2.5 py-1 text-left flex items-center justify-between font-medium rounded-lg mx-1",
                  theme === "dark" ? "hover:bg-slate-800 text-slate-200" : "hover:bg-neutral-100 text-neutral-700"
                )}
              >
                <span>Export JSON</span>
                <span className="text-[10px] text-neutral-400">Schema</span>
              </button>
              <button
                onClick={() => {
                  setShowExportMenu(false)
                  onExport("mermaid")
                }}
                className={cn(
                  "px-2.5 py-1 text-left flex items-center justify-between font-medium text-indigo-500 rounded-lg mx-1",
                  theme === "dark" ? "hover:bg-slate-800" : "hover:bg-neutral-100"
                )}
              >
                <span>Mermaid.js</span>
                <span className="text-[10px] text-indigo-400">Diagram</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Minimap toggle button */}
      {onToggleMinimap && (
        <Hint label="Minimap Navigator (M)">
          <button
            onClick={onToggleMinimap}
            className={cn(
              "h-7 w-7 flex items-center justify-center rounded-lg transition-colors",
              isMinimapOpen
                ? theme === "dark" ? "text-indigo-400 bg-indigo-950/50" : "text-indigo-600 bg-indigo-50"
                : theme === "dark" ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            <Map className="w-3.5 h-3.5" />
          </button>
        </Hint>
      )}

      {/* Shortcuts */}
      <Hint label="Keyboard Shortcuts (?)">
        <button
          onClick={onOpenShortcuts}
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-lg transition-colors",
            theme === "dark"
              ? "text-slate-300 hover:text-white hover:bg-slate-800"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          )}
        >
          <Keyboard className="w-3.5 h-3.5" />
        </button>
      </Hint>

      <div className={cn("h-3.5 w-px mx-0.5", theme === "dark" ? "bg-slate-800" : "bg-neutral-200")} />

      {/* Canvas Theme Toggle (Light / Dark) */}
      <Hint label={theme === "dark" ? "Switch to Light Canvas" : "Switch to Dark Canvas"}>
        <button
          onClick={toggleTheme}
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-lg transition-colors",
            theme === "dark"
              ? "text-amber-400 hover:text-amber-300 hover:bg-slate-800"
              : "text-slate-700 hover:text-indigo-600 hover:bg-neutral-100"
          )}
        >
          {theme === "dark" ? (
            <Sun className="w-3.5 h-3.5 transition-transform hover:rotate-45" />
          ) : (
            <Moon className="w-3.5 h-3.5 transition-transform hover:-rotate-12" />
          )}
        </button>
      </Hint>
    </div>
  )
})
