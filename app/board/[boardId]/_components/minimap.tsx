"use client"

import React, { memo, useRef, useCallback, useState } from "react"
import { useStorage } from "@liveblocks/react/suspense"
import { Camera, LayerType } from "@/types/canvas"
import { Map, ChevronDown, ChevronUp } from "lucide-react"
import { useCanvasTheme } from "./canvas-theme-context"
import { cn } from "@/lib/utils"

interface MinimapProps {
  camera: Camera
  setCamera: React.Dispatch<React.SetStateAction<Camera>>
}

const MAP_WIDTH = 220
const MAP_HEIGHT = 140
const PADDING = 180

export const Minimap = memo(({ camera, setCamera }: MinimapProps) => {
  const { theme } = useCanvasTheme()
  const layerIds = useStorage((root) => root.layerIds)
  const layers = useStorage((root) => root.layers)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const isDraggingRef = useRef(false)

  // Compute world bounding box of all layers
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  layerIds.forEach((id) => {
    const l = layers.get(id)
    if (!l) return
    const x = l.x ?? 0
    const y = l.y ?? 0
    const w = l.width ?? 100
    const h = l.height ?? 100
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x + w)
    maxY = Math.max(maxY, y + h)
  })

  // If canvas is empty, use a default 2000x2000 area around origin
  if (minX === Infinity || maxX - minX < 200) {
    minX = -800
    minY = -600
    maxX = 1200
    maxY = 800
  } else {
    minX -= PADDING
    minY -= PADDING
    maxX += PADDING
    maxY += PADDING
  }

  const worldWidth = Math.max(800, maxX - minX)
  const worldHeight = Math.max(600, maxY - minY)

  // Minimap scaling factors
  const scaleX = MAP_WIDTH / worldWidth
  const scaleY = MAP_HEIGHT / worldHeight
  const scale = Math.min(scaleX, scaleY)

  const offsetX = (MAP_WIDTH - worldWidth * scale) / 2
  const offsetY = (MAP_HEIGHT - worldHeight * scale) / 2

  const worldToMap = useCallback(
    (wx: number, wy: number) => ({
      x: offsetX + (wx - minX) * scale,
      y: offsetY + (wy - minY) * scale,
    }),
    [offsetX, offsetY, minX, minY, scale]
  )

  const mapToWorld = useCallback(
    (mx: number, my: number) => ({
      x: (mx - offsetX) / scale + minX,
      y: (my - offsetY) / scale + minY,
    }),
    [offsetX, offsetY, minX, minY, scale]
  )

  // Screen Viewport rectangle in world coords
  const screenW = typeof window !== "undefined" ? window.innerWidth : 1200
  const screenH = typeof window !== "undefined" ? window.innerHeight : 800
  const viewWorldX = -camera.x / camera.zoom
  const viewWorldY = -camera.y / camera.zoom
  const viewWorldW = screenW / camera.zoom
  const viewWorldH = screenH / camera.zoom

  const viewMapStart = worldToMap(viewWorldX, viewWorldY)
  const viewMapW = viewWorldW * scale
  const viewMapH = viewWorldH * scale

  // Jump camera to point on map click or drag
  const handleMapPointer = useCallback(
    (e: React.PointerEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      const targetWorld = mapToWorld(mx, my)

      // Center viewport on clicked point
      setCamera((c) => ({
        ...c,
        x: screenW / 2 - targetWorld.x * c.zoom,
        y: screenH / 2 - targetWorld.y * c.zoom,
      }))
    },
    [mapToWorld, screenW, screenH, setCamera]
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation()
      isDraggingRef.current = true
      handleMapPointer(e)
    },
    [handleMapPointer]
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isDraggingRef.current && e.buttons === 1) {
        handleMapPointer(e)
      }
    },
    [handleMapPointer]
  )

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  return (
    <div className="absolute bottom-5 right-5 z-40 select-none">
      <div
        className={cn(
          "backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-all duration-200 hover:shadow-2xl border",
          theme === "dark"
            ? "bg-slate-900/95 border-slate-800 text-white"
            : "bg-white/90 border-neutral-200/80 text-neutral-800"
        )}
      >
        {/* Header bar */}
        <div
          className={cn(
            "flex items-center justify-between px-3 py-1.5 border-b text-[11px] font-semibold",
            theme === "dark"
              ? "bg-slate-950/80 border-slate-800 text-slate-200"
              : "bg-neutral-50/80 border-neutral-100 text-neutral-600"
          )}
        >
          <div className="flex items-center gap-1.5">
            <Map className="w-3.5 h-3.5 text-indigo-500" />
            <span>Navigator</span>
            <span
              className={cn(
                "text-[10px] font-normal",
                theme === "dark" ? "text-slate-400" : "text-neutral-400"
              )}
            >
              ({layerIds.length} items)
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed((v) => !v)}
            className={cn(
              "p-0.5 rounded transition",
              theme === "dark"
                ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                : "hover:bg-neutral-200/60 text-neutral-500 hover:text-neutral-800"
            )}
            title={isCollapsed ? "Expand Navigator (M)" : "Collapse Navigator (M)"}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Miniature SVG Canvas */}
        {!isCollapsed && (
          <div className={cn("relative p-1", theme === "dark" ? "bg-slate-950" : "bg-neutral-900/5")}>
            <svg
              ref={svgRef}
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              className={cn(
                "cursor-crosshair rounded-xl overflow-hidden block",
                theme === "dark" ? "bg-[#090d16]" : "bg-neutral-50"
              )}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            >
              {/* Subtle background grid */}
              <defs>
                <pattern id="mini-grid" width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle
                    cx="7"
                    cy="7"
                    r="0.8"
                    fill={theme === "dark" ? "#1e293b" : "#E5E7EB"}
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mini-grid)" />

              {/* Render layer miniatures */}
              {layerIds.map((id) => {
                const l = layers.get(id)
                if (!l) return null
                const pos = worldToMap(l.x ?? 0, l.y ?? 0)
                const w = Math.max(3, (l.width ?? 100) * scale)
                const h = Math.max(3, (l.height ?? 100) * scale)

                if (l.type === LayerType.Section) {
                  return (
                    <rect
                      key={id}
                      x={pos.x}
                      y={pos.y}
                      width={w}
                      height={h}
                      rx={2}
                      className="fill-indigo-500/10 stroke-indigo-400 stroke-[0.8]"
                      strokeDasharray="2 1"
                    />
                  )
                }

                if (l.type === LayerType.Component) {
                  return (
                    <rect
                      key={id}
                      x={pos.x}
                      y={pos.y}
                      width={w}
                      height={h}
                      rx={2}
                      className="fill-indigo-600/80 stroke-indigo-800 stroke-[0.5]"
                    />
                  )
                }

                if (l.type === LayerType.Note) {
                  return (
                    <rect
                      key={id}
                      x={pos.x}
                      y={pos.y}
                      width={w}
                      height={h}
                      rx={1}
                      fill="#FDE047"
                      className="stroke-amber-400 stroke-[0.5]"
                    />
                  )
                }

                if (l.type === LayerType.Ellipse) {
                  return (
                    <ellipse
                      key={id}
                      cx={pos.x + w / 2}
                      cy={pos.y + h / 2}
                      rx={w / 2}
                      ry={h / 2}
                      className="fill-neutral-400/60 stroke-neutral-600 stroke-[0.5]"
                    />
                  )
                }

                if (l.type === LayerType.Arrow) {
                  return (
                    <line
                      key={id}
                      x1={pos.x}
                      y1={pos.y}
                      x2={pos.x + w}
                      y2={pos.y + h}
                      className="stroke-indigo-500 stroke-[1]"
                    />
                  )
                }

                return (
                  <rect
                    key={id}
                    x={pos.x}
                    y={pos.y}
                    width={w}
                    height={h}
                    rx={1}
                    className="fill-neutral-400/60"
                  />
                )
              })}

              {/* Viewport Box (Current screen view) */}
              <rect
                x={viewMapStart.x}
                y={viewMapStart.y}
                width={Math.max(6, viewMapW)}
                height={Math.max(6, viewMapH)}
                rx={3}
                className="fill-indigo-500/15 stroke-indigo-600 stroke-[1.5] transition-all duration-75"
                pointerEvents="none"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
})

Minimap.displayName = "Minimap"
