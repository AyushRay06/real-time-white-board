import React, { memo } from "react"
import { Layers, Edit2 } from "lucide-react"
import { SectionLayer } from "@/types/canvas"

interface SectionLayerComponentProps {
  id: string
  layer: SectionLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
  onDoubleClick?: (layerId: string) => void
}

export const SectionLayerComponent = memo(
  ({ id, layer, onPointerDown, selectionColor, onDoubleClick }: SectionLayerComponentProps) => {
    const { x, y, width, height, fill, value } = layer
    const label = value || "Architecture Zone"

    const r = fill?.r ?? 99
    const g = fill?.g ?? 102
    const b = fill?.b ?? 241

    const isSelected = Boolean(selectionColor)

    return (
      <g
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
        onPointerDown={(e) => onPointerDown(e, id)}
        onDoubleClick={(e) => {
          e.stopPropagation()
          onDoubleClick?.(id)
        }}
        className="cursor-move group select-none"
      >
        {/* Main translucent bounding box */}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={16}
          ry={16}
          fill={`rgba(${r}, ${g}, ${b}, ${isSelected ? 0.12 : 0.07})`}
          stroke={selectionColor || `rgba(${r}, ${g}, ${b}, ${isSelected ? 0.8 : 0.45})`}
          strokeWidth={isSelected ? 2.5 : 2}
          strokeDasharray="8 6"
          className="transition-colors duration-150"
        />

        {/* Top-left Section Title Header Badge */}
        <foreignObject
          x={12}
          y={12}
          width={Math.max(160, Math.min(width - 24, 340))}
          height={38}
          className="pointer-events-auto"
        >
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-sm backdrop-blur-md transition-all ${
              isSelected
                ? "bg-white/95 text-indigo-900 border-indigo-300 shadow-md ring-2 ring-indigo-400/20"
                : "bg-white/85 text-neutral-800 border-neutral-300 hover:bg-white/95"
            }`}
            title="Double-click to rename this section"
            onDoubleClick={(e) => {
              e.stopPropagation()
              onDoubleClick?.(id)
            }}
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
            >
              <Layers className="w-2.5 h-2.5" />
            </div>
            <span className="truncate max-w-[200px] tracking-wide font-medium">
              {label}
            </span>
            <Edit2 className="w-2.5 h-2.5 opacity-40 hover:opacity-100 cursor-pointer ml-auto" />
          </div>
        </foreignObject>

        {/* Bottom-right subtle dimensions indicator when selected */}
        {isSelected && (
          <text
            x={width - 12}
            y={height - 12}
            textAnchor="end"
            fontSize={10}
            fontFamily="monospace"
            fill={`rgba(${r}, ${g}, ${b}, 0.8)`}
            className="pointer-events-none font-semibold select-none"
          >
            {Math.round(width)} × {Math.round(height)}
          </text>
        )}
      </g>
    )
  }
)

SectionLayerComponent.displayName = "SectionLayerComponent"
