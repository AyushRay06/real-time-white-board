"use client"

import { memo, useState, useRef, useEffect, useCallback } from "react"
import { useStorage, useMutation } from "@liveblocks/react/suspense"
import { ArrowLayer, AnchorSide, Point, ArrowStyle } from "@/types/canvas"
import { getAnchorPoint } from "./sys-component-layer"
import { useSimulation } from "./simulation-context"

interface ArrowLayerProps {
  id: string
  layer: ArrowLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

function buildCubicPath(
  from: Point, to: Point,
  fromAnchor: AnchorSide, toAnchor: AnchorSide
): { d: string; cp1: Point; cp2: Point } {
  const dx = Math.abs(to.x - from.x)
  const dy = Math.abs(to.y - from.y)
  const tension = Math.max(60, Math.max(dx, dy) * 0.45)

  let cp1: Point
  switch (fromAnchor) {
    case "right":  cp1 = { x: from.x + tension, y: from.y }; break
    case "left":   cp1 = { x: from.x - tension, y: from.y }; break
    case "bottom": cp1 = { x: from.x, y: from.y + tension }; break
    default:       cp1 = { x: from.x, y: from.y - tension }; break
  }

  let cp2: Point
  switch (toAnchor) {
    case "left":   cp2 = { x: to.x - tension, y: to.y }; break
    case "right":  cp2 = { x: to.x + tension, y: to.y }; break
    case "top":    cp2 = { x: to.x, y: to.y - tension }; break
    default:       cp2 = { x: to.x, y: to.y + tension }; break
  }

  return {
    d: `M ${from.x} ${from.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${to.x} ${to.y}`,
    cp1,
    cp2,
  }
}

/** Crisp orthogonal / sharp right-angle routing */
function buildSharpPath(
  from: Point, to: Point,
  fromAnchor: AnchorSide, toAnchor: AnchorSide
): { d: string; mid: Point } {
  if ((fromAnchor === "right" || fromAnchor === "left") && (toAnchor === "left" || toAnchor === "right")) {
    const midX = (from.x + to.x) / 2
    return {
      d: `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`,
      mid: { x: midX, y: (from.y + to.y) / 2 },
    }
  } else if ((fromAnchor === "bottom" || fromAnchor === "top") && (toAnchor === "top" || toAnchor === "bottom")) {
    const midY = (from.y + to.y) / 2
    return {
      d: `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`,
      mid: { x: (from.x + to.x) / 2, y: midY },
    }
  } else {
    // Corner turn
    const corner = (fromAnchor === "right" || fromAnchor === "left")
      ? { x: to.x, y: from.y }
      : { x: from.x, y: to.y }
    return {
      d: `M ${from.x} ${from.y} L ${corner.x} ${corner.y} L ${to.x} ${to.y}`,
      mid: { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 },
    }
  }
}

/** Cubic bezier point at t=0.5 — true visual midpoint of the curve */
function bezierMidpoint(p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const t = 0.5
  const mt = 1 - t
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  }
}

function arrowheadPoints(to: Point, toAnchor: AnchorSide): string {
  const size = 10
  let angle: number
  switch (toAnchor) {
    case "left":   angle = 0;             break
    case "right":  angle = Math.PI;       break
    case "top":    angle = Math.PI / 2;   break
    default:       angle = -Math.PI / 2;  break
  }
  const a = { x: to.x + size * Math.cos(angle),         y: to.y + size * Math.sin(angle) }
  const b = { x: to.x + (size / 2) * Math.cos(angle + (2 * Math.PI) / 3), y: to.y + (size / 2) * Math.sin(angle + (2 * Math.PI) / 3) }
  const c = { x: to.x + (size / 2) * Math.cos(angle - (2 * Math.PI) / 3), y: to.y + (size / 2) * Math.sin(angle - (2 * Math.PI) / 3) }
  return `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`
}

export const ArrowLayerComponent = memo(function ArrowLayerComponent({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: ArrowLayerProps) {
  const fromLayer = useStorage((root) => root.layers.get(layer.fromLayerId))
  const toLayer   = useStorage((root) => root.layers.get(layer.toLayerId))

  const [editing, setEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Persist label to Liveblocks storage
  const saveLabel = useMutation(({ storage }, value: string) => {
    storage.get("layers").get(id)?.set("value", value.trim())
  }, [id])

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const handleDblClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setEditing(true)
  }, [])

  const commitEdit = useCallback((value: string) => {
    saveLabel(value)
    setEditing(false)
  }, [saveLabel])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitEdit(e.currentTarget.value)
    } else if (e.key === "Escape") {
      setEditing(false)
    }
    e.stopPropagation()
  }, [commitEdit])

  // If either connected layer is gone, don't render
  if (!fromLayer || !toLayer) return null

  const fromPt = getAnchorPoint(fromLayer.x, fromLayer.y, fromLayer.width, fromLayer.height, layer.fromAnchor)
  const toPt   = getAnchorPoint(toLayer.x,   toLayer.y,   toLayer.width,   toLayer.height,   layer.toAnchor)

  const isSharp = layer.arrowStyle === "sharp" || layer.arrowStyle === "orthogonal"

  let pathD: string
  let mid: Point

  if (isSharp) {
    const sharp = buildSharpPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor)
    pathD = sharp.d
    mid = sharp.mid
  } else {
    const cubic = buildCubicPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor)
    pathD = cubic.d
    mid = bezierMidpoint(fromPt, cubic.cp1, cubic.cp2, toPt)
  }

  const arrowPts = arrowheadPoints(toPt, layer.toAnchor)
  const stroke   = selectionColor || "#6366f1"

  // Label pill dimensions
  const labelText    = layer.value || ""
  const hasLabel     = labelText.length > 0
  const pillPadX     = 10
  const pillH        = 22
  const charWidth    = 7
  const pillW        = Math.max(60, labelText.length * charWidth + pillPadX * 2)
  let simContext: any = null
  try {
    simContext = useSimulation()
  } catch {
    // fallback if rendered outside provider
  }

  const isSimulating = (simContext && simContext.simMode !== "idle") || layer.isAnimated
  const simMode = simContext?.simMode || (layer.isAnimated ? "playing" : "idle")
  const simSpeed = simContext?.simSpeed || 1

  const baseDur = Math.max(0.6, 2.4 / simSpeed)
  const packetColor =
    simMode === "chaos"
      ? "#ef4444"
      : simMode === "spike"
      ? "#f59e0b"
      : "#06b6d4" // electric cyan

  return (
    <g
      onPointerDown={(e) => onPointerDown(e, id)}
      onDoubleClick={handleDblClick}
      style={{ cursor: "pointer" }}
    >
      {/* Wide invisible hit area */}
      <path d={pathD} fill="none" stroke="transparent" strokeWidth={18} />

      {/* Visible line / curve */}
      {/* Visible line / curve */}
      <path
        d={pathD}
        fill="none"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={
          selectionColor
            ? "6 3"
            : layer.strokePattern === "dotted"
            ? "3 4"
            : layer.strokePattern === "dashed"
            ? "7 5"
            : undefined
        }
      />

      {/* Destination Arrowhead */}
      {layer.direction !== "none" && (
        <polygon
          points={arrowPts}
          fill={stroke}
          stroke={stroke}
          strokeWidth={1}
        />
      )}

      {/* Source Arrowhead for Bidirectional */}
      {layer.direction === "bidirectional" && (
        <polygon
          points={arrowheadPoints(
            fromPt,
            layer.fromAnchor === "right"
              ? "left"
              : layer.fromAnchor === "left"
              ? "right"
              : layer.fromAnchor === "top"
              ? "bottom"
              : "top"
          )}
          fill={stroke}
          stroke={stroke}
          strokeWidth={1}
        />
      )}

      {/* ── Animated Traffic Packets & Energy Flow ── */}
      {isSimulating && (
        <g style={{ pointerEvents: "none" }}>
          {/* Glowing Energy Flow Overlay */}
          <path
            d={pathD}
            fill="none"
            stroke={packetColor}
            strokeWidth={3}
            strokeDasharray="8 12"
            opacity={0.65}
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="40"
              to="0"
              dur={`${Math.max(0.4, 1.2 / simSpeed)}s`}
              repeatCount="indefinite"
            />
          </path>

          {/* Packet 1 Glow Ring */}
          <circle r={8} fill="none" stroke={packetColor} strokeWidth={1.5} opacity={0.45}>
            <animateMotion
              dur={`${baseDur}s`}
              repeatCount="indefinite"
              path={pathD}
              rotate="auto"
            />
          </circle>

          {/* Packet 1 Core */}
          <circle r={4.5} fill={packetColor} opacity={0.95}>
            <animateMotion
              dur={`${baseDur}s`}
              repeatCount="indefinite"
              path={pathD}
              rotate="auto"
            />
          </circle>

          {/* Packet 2: Offset by 50% */}
          <circle r={3.5} fill={packetColor} opacity={0.85}>
            <animateMotion
              dur={`${baseDur}s`}
              begin={`${baseDur * 0.5}s`}
              repeatCount="indefinite"
              path={pathD}
              rotate="auto"
            />
          </circle>

          {/* Spike Mode: Extra rapid burst packet */}
          {simMode === "spike" && (
            <circle r={5} fill="#f97316" opacity={0.95}>
              <animateMotion
                dur={`${baseDur * 0.65}s`}
                begin={`${baseDur * 0.25}s`}
                repeatCount="indefinite"
                path={pathD}
                rotate="auto"
              />
            </circle>
          )}

          {/* Chaos Mode: Error alert burst */}
          {simMode === "chaos" && (
            <circle r={4} fill="#dc2626" opacity={0.95}>
              <animateMotion
                dur={`${baseDur * 0.8}s`}
                begin={`${baseDur * 0.7}s`}
                repeatCount="indefinite"
                path={pathD}
                rotate="auto"
              />
            </circle>
          )}

          {/* Bidirectional: Return ACK packet flowing in reverse */}
          {layer.direction === "bidirectional" && (
            <circle r={3.5} fill="#10b981" opacity={0.9}>
              <animateMotion
                dur={`${baseDur * 1.1}s`}
                begin={`${baseDur * 0.35}s`}
                keyPoints="1;0"
                keyTimes="0;1"
                repeatCount="indefinite"
                path={pathD}
                rotate="auto"
              />
            </circle>
          )}
        </g>
      )}

      {/* ── Midpoint label pill (view mode) ── */}
      {hasLabel && !editing && (
        <g style={{ pointerEvents: "all" }}>
          {/* Pill drop shadow */}
          <rect
            x={mid.x - pillW / 2 + 1}
            y={mid.y - pillH / 2 + 2}
            width={pillW}
            height={pillH}
            rx={pillH / 2}
            fill="rgba(0,0,0,0.10)"
          />
          {/* Pill background */}
          <rect
            x={mid.x - pillW / 2}
            y={mid.y - pillH / 2}
            width={pillW}
            height={pillH}
            rx={pillH / 2}
            fill="#ffffff"
            stroke={selectionColor ? "#6366f1" : "#c7d2fe"}
            strokeWidth={1.5}
          />
          {/* Pill text */}
          <text
            x={mid.x}
            y={mid.y + 4}
            textAnchor="middle"
            fill="#3730a3"
            fontSize={11}
            fontWeight={600}
            fontFamily="Inter, system-ui, sans-serif"
            style={{ userSelect: "none" }}
          >
            {labelText}
          </text>
        </g>
      )}

      {/* ── Inline editor (editing mode) ── */}
      {editing && (
        <foreignObject
          x={mid.x - 70}
          y={mid.y - 15}
          width={140}
          height={30}
          style={{ overflow: "visible" }}
        >
          {/* @ts-ignore */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <input
              ref={inputRef}
              defaultValue={labelText}
              placeholder="e.g. Read / Write"
              onKeyDown={handleKeyDown}
              onBlur={(e) => commitEdit(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 130,
                height: 26,
                padding: "0 8px",
                fontSize: 11,
                fontWeight: 600,
                color: "#1e1b4b",
                background: "#ffffff",
                border: "2px solid #6366f1",
                borderRadius: 9999,
                outline: "none",
                boxShadow: "0 2px 8px rgba(99,102,241,0.25)",
                textAlign: "center",
                fontFamily: "Inter, system-ui, sans-serif",
                boxSizing: "border-box",
              }}
            />
          </div>
        </foreignObject>
      )}
    </g>
  )
})
