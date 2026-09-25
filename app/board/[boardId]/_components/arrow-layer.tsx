"use client"

import { memo, useState, useRef, useEffect, useCallback } from "react"
import { useStorage, useMutation } from "@liveblocks/react/suspense"
import { ArrowLayer, AnchorSide, Point, ArrowStyle } from "@/types/canvas"
import { getAnchorPoint } from "./sys-component-layer"
import { useSimulation } from "./simulation-context"

import { colorToCss } from "@/lib/utils"

interface ArrowLayerProps {
  id: string
  layer: ArrowLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

function buildCubicPath(
  from: Point,
  to: Point,
  fromAnchor: AnchorSide,
  toAnchor: AnchorSide,
  controlOffset?: Point
): { d: string; cp1: Point; cp2: Point; mid: Point } {
  const dx = Math.abs(to.x - from.x)
  const dy = Math.abs(to.y - from.y)
  const tension = Math.max(60, Math.max(dx, dy) * 0.45)

  const ox = controlOffset?.x ?? 0
  const oy = controlOffset?.y ?? 0

  let cp1: Point
  switch (fromAnchor) {
    case "right":  cp1 = { x: from.x + tension + ox, y: from.y + oy }; break
    case "left":   cp1 = { x: from.x - tension + ox, y: from.y + oy }; break
    case "bottom": cp1 = { x: from.x + ox, y: from.y + tension + oy }; break
    default:       cp1 = { x: from.x + ox, y: from.y - tension + oy }; break
  }

  let cp2: Point
  switch (toAnchor) {
    case "left":   cp2 = { x: to.x - tension + ox, y: to.y + oy }; break
    case "right":  cp2 = { x: to.x + tension + ox, y: to.y + oy }; break
    case "top":    cp2 = { x: to.x + ox, y: to.y - tension + oy }; break
    default:       cp2 = { x: to.x + ox, y: to.y + tension + oy }; break
  }

  const mid = bezierMidpoint(from, cp1, cp2, to)

  return {
    d: `M ${from.x} ${from.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${to.x} ${to.y}`,
    cp1,
    cp2,
    mid,
  }
}

/** Crisp orthogonal / sharp right-angle routing with flow bend offset */
function buildSharpPath(
  from: Point,
  to: Point,
  fromAnchor: AnchorSide,
  toAnchor: AnchorSide,
  controlOffset?: Point
): { d: string; mid: Point } {
  const ox = controlOffset?.x ?? 0
  const oy = controlOffset?.y ?? 0

  if ((fromAnchor === "right" || fromAnchor === "left") && (toAnchor === "left" || toAnchor === "right")) {
    const midX = (from.x + to.x) / 2 + ox
    const midY = (from.y + to.y) / 2 + oy
    return {
      d: `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`,
      mid: { x: midX, y: midY },
    }
  } else if ((fromAnchor === "bottom" || fromAnchor === "top") && (toAnchor === "top" || toAnchor === "bottom")) {
    const midX = (from.x + to.x) / 2 + ox
    const midY = (from.y + to.y) / 2 + oy
    return {
      d: `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`,
      mid: { x: midX, y: midY },
    }
  } else {
    // Corner turn
    const cornerX = (fromAnchor === "right" || fromAnchor === "left")
      ? to.x + ox
      : from.x + ox
    const cornerY = (fromAnchor === "right" || fromAnchor === "left")
      ? from.y + oy
      : to.y + oy
    return {
      d: `M ${from.x} ${from.y} L ${cornerX} ${cornerY} L ${to.x} ${to.y}`,
      mid: { x: cornerX, y: cornerY },
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

/**
 * Computes arrowhead polygon points such that the tip touches the component edge
 * and the wings/base extend BACKWARDS outside the component, preventing any overlap.
 */
function arrowheadPoints(tip: Point, toAnchor: AnchorSide, size: number = 10): string {
  const half = size * 0.58
  let p1: Point // tip (at component edge)
  let p2: Point // wing 1 (outside component)
  let p3: Point // wing 2 (outside component)

  switch (toAnchor) {
    case "left":
      // Arrow approaches from left -> points right into left edge of component
      p1 = { x: tip.x, y: tip.y }
      p2 = { x: tip.x - size, y: tip.y - half }
      p3 = { x: tip.x - size, y: tip.y + half }
      break
    case "right":
      // Arrow approaches from right -> points left into right edge of component
      p1 = { x: tip.x, y: tip.y }
      p2 = { x: tip.x + size, y: tip.y - half }
      p3 = { x: tip.x + size, y: tip.y + half }
      break
    case "top":
      // Arrow approaches from above -> points down into top edge of component
      p1 = { x: tip.x, y: tip.y }
      p2 = { x: tip.x - half, y: tip.y - size }
      p3 = { x: tip.x + half, y: tip.y - size }
      break
    case "bottom":
    default:
      // Arrow approaches from below -> points up into bottom edge of component
      p1 = { x: tip.x, y: tip.y }
      p2 = { x: tip.x - half, y: tip.y + size }
      p3 = { x: tip.x + half, y: tip.y + size }
      break
  }
  return `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
}

export const ArrowLayerComponent = memo(function ArrowLayerComponent({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: ArrowLayerProps) {
  const fromLayer = useStorage((root) => root.layers.get(layer.fromLayerId))
  const toLayer   = useStorage((root) => root.layers.get(layer.toLayerId))
  const simContext = useSimulation()

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
  const controlOffset = layer.controlOffset

  let pathD: string
  let mid: Point

  if (isSharp) {
    const sharp = buildSharpPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor, controlOffset)
    pathD = sharp.d
    mid = sharp.mid
  } else {
    const cubic = buildCubicPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor, controlOffset)
    pathD = cubic.d
    mid = cubic.mid
  }

  const arrowPts = arrowheadPoints(toPt, layer.toAnchor)
  const stroke   = selectionColor || (layer.fill ? colorToCss(layer.fill) : "#6366f1")

  // Mutations to edit arrow flow and anchors
  const updateControlOffset = useMutation(({ storage }, offset: Point) => {
    ;(storage.get("layers").get(id) as any)?.set("controlOffset", offset)
  }, [id])

  const updateFromAnchor = useMutation(({ storage }, anchor: AnchorSide) => {
    ;(storage.get("layers").get(id) as any)?.set("fromAnchor", anchor)
  }, [id])

  const updateToAnchor = useMutation(({ storage }, anchor: AnchorSide) => {
    ;(storage.get("layers").get(id) as any)?.set("toAnchor", anchor)
  }, [id])

  // Drag the arrow bend / flow controller handle
  const handleBendPointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation()
    e.preventDefault()

    const target = (e.target as SVGElement).ownerSVGElement
    const ctm = target?.getScreenCTM()
    const scaleX = ctm ? ctm.a : 1
    const scaleY = ctm ? ctm.d : 1

    const startClientX = e.clientX
    const startClientY = e.clientY
    const startOffset = layer.controlOffset || { x: 0, y: 0 }

    const onPointerMove = (ev: PointerEvent) => {
      const dx = (ev.clientX - startClientX) / scaleX
      const dy = (ev.clientY - startClientY) / scaleY
      updateControlOffset({
        x: Math.round(startOffset.x + dx),
        y: Math.round(startOffset.y + dy),
      })
    }

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
  }, [layer.controlOffset, updateControlOffset])

  // Drag the source or destination endpoint to change the attached component anchor
  const handleAnchorDrag = useCallback((e: React.PointerEvent, type: "from" | "to") => {
    e.stopPropagation()
    e.preventDefault()

    const targetLayer = type === "from" ? fromLayer : toLayer
    if (!targetLayer) return

    const target = (e.target as SVGElement).ownerSVGElement

    const centerX = targetLayer.x + targetLayer.width / 2
    const centerY = targetLayer.y + targetLayer.height / 2

    const onPointerMove = (ev: PointerEvent) => {
      if (!target) return
      const currentCtm = target.getScreenCTM()
      if (!currentCtm) return

      const svgPoint = target.createSVGPoint()
      svgPoint.x = ev.clientX
      svgPoint.y = ev.clientY
      const canvasPt = svgPoint.matrixTransform(currentCtm.inverse())

      const dx = canvasPt.x - centerX
      const dy = canvasPt.y - centerY

      let nextAnchor: AnchorSide
      if (Math.abs(dx) >= Math.abs(dy)) {
        nextAnchor = dx >= 0 ? "right" : "left"
      } else {
        nextAnchor = dy >= 0 ? "bottom" : "top"
      }

      if (type === "from") {
        if (layer.fromAnchor !== nextAnchor) updateFromAnchor(nextAnchor)
      } else {
        if (layer.toAnchor !== nextAnchor) updateToAnchor(nextAnchor)
      }
    }

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
  }, [fromLayer, toLayer, layer.fromAnchor, layer.toAnchor, updateFromAnchor, updateToAnchor])

  // Label pill, Protocol chip & Sequence Step dimensions
  const protocolText = layer.protocol || ""
  const userText     = layer.value || layer.label || ""
  const hasProtocol  = Boolean(protocolText)
  const labelText    = hasProtocol ? (userText ? `${protocolText} • ${userText}` : protocolText) : userText
  const sequenceStep = layer.sequenceStep
  const hasStep      = typeof sequenceStep === "number" && sequenceStep > 0
  const hasLabel     = labelText.length > 0 || hasStep
  const pillPadX     = hasStep ? 14 : 10
  const pillH        = 24
  const charWidth    = 7.2
  const isStepOnly   = hasStep && labelText.length === 0
  const pillW        = isStepOnly
    ? 26
    : Math.max(hasStep ? 76 : 56, labelText.length * charWidth + pillPadX * 2 + (hasStep ? 18 : 0))

  const isSimulating = Boolean(simContext && simContext.isSimulating) || layer.isAnimated
  const simSpeed = simContext?.simSpeed || 1

  const arrowStage = simContext?.graph?.arrowStages?.[id] ?? 0
  const totalStages = simContext?.graph?.totalStages || 1

  // Timing for Sequential Causal Request Propagation
  const stageDur = Math.max(0.6, 1.4 / simSpeed)
  const pauseDur = Math.max(0.2, 0.5 / simSpeed)
  const totalDur = totalStages * stageDur + pauseDur

  const pStartRaw = (arrowStage * stageDur) / totalDur
  const pEndRaw = ((arrowStage + 1) * stageDur) / totalDur

  const pStart = Math.max(0, Math.min(0.99, pStartRaw))
  const pEnd = Math.max(pStart + 0.01, Math.min(1, pEndRaw))

  const normalKeyPoints = pStart === 0 ? "0;1;1" : "0;0;1;1"
  const normalKeyTimes =
    pStart === 0
      ? `0;${pEnd.toFixed(4)};1`
      : `0;${pStart.toFixed(4)};${pEnd.toFixed(4)};1`

  const normalOpacityValues = pStart === 0 ? "1;1;0;0" : "0;0;1;1;0;0"
  const normalOpacityKeyTimes =
    pStart === 0
      ? `0;${Math.max(0, pEnd - 0.005).toFixed(4)};${pEnd.toFixed(4)};1`
      : `0;${Math.max(0, pStart - 0.002).toFixed(4)};${Math.min(1, pStart + 0.004).toFixed(4)};${Math.max(0, pEnd - 0.004).toFixed(4)};${Math.min(1, pEnd + 0.002).toFixed(4)};1`

  // Return ACK packet for bidirectional arrows
  const pMid = (pStart + pEnd) / 2
  const ackKeyPoints = "1;1;0;0"
  const ackKeyTimes = `0;${pMid.toFixed(4)};${pEnd.toFixed(4)};1`
  const ackOpacityValues = "0;0;1;1;0;0"
  const ackOpacityKeyTimes = `0;${Math.max(0, pMid - 0.002).toFixed(4)};${Math.min(1, pMid + 0.004).toFixed(4)};${Math.max(0, pEnd - 0.004).toFixed(4)};${Math.min(1, pEnd + 0.002).toFixed(4)};1`

  return (
    <g
      onPointerDown={(e) => onPointerDown(e, id)}
      onDoubleClick={handleDblClick}
      style={{ cursor: "pointer" }}
    >
      {/* Wide invisible hit area for easy selection */}
      <path d={pathD} fill="none" stroke="transparent" strokeWidth={26} />

      {/* ── SELECTION HIGHLIGHT & INTERACTIVE CONTROLLERS ── */}
      {selectionColor && (
        <g>
          {/* Outer glowing aura */}
          <path
            d={pathD}
            fill="none"
            stroke={selectionColor}
            strokeWidth={10}
            strokeOpacity={0.22}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none"
          />
          {/* Inner crisp selection contour */}
          <path
            d={pathD}
            fill="none"
            stroke={selectionColor}
            strokeWidth={4.5}
            strokeOpacity={0.65}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none"
          />

          {/* Interactive Source Anchor Node Handle */}
          <g
            className="cursor-crosshair pointer-events-auto"
            onPointerDown={(e) => handleAnchorDrag(e, "from")}
          >
            <circle cx={fromPt.x} cy={fromPt.y} r={14} fill="transparent" />
            <circle
              cx={fromPt.x}
              cy={fromPt.y}
              r={6.5}
              fill="#ffffff"
              stroke={selectionColor}
              strokeWidth={2.5}
              className="drop-shadow-sm hover:scale-125 transition-transform"
            />
            <title>Drag to change source anchor side (Top / Right / Bottom / Left)</title>
          </g>

          {/* Interactive Destination Anchor Node Handle */}
          <g
            className="cursor-crosshair pointer-events-auto"
            onPointerDown={(e) => handleAnchorDrag(e, "to")}
          >
            <circle cx={toPt.x} cy={toPt.y} r={14} fill="transparent" />
            <circle
              cx={toPt.x}
              cy={toPt.y}
              r={6.5}
              fill="#ffffff"
              stroke={selectionColor}
              strokeWidth={2.5}
              className="drop-shadow-sm hover:scale-125 transition-transform"
            />
            <title>Drag to change destination anchor side (Top / Right / Bottom / Left)</title>
          </g>

          {/* Interactive Arrow Flow Bend / Edge Controller Handle */}
          <g
            className="cursor-move pointer-events-auto"
            onPointerDown={handleBendPointerDown}
            onDoubleClick={(e) => {
              e.stopPropagation()
              updateControlOffset({ x: 0, y: 0 })
            }}
          >
            {/* Wide touch target */}
            <circle cx={mid.x} cy={mid.y} r={16} fill="transparent" />
            {/* Outer ring */}
            <circle
              cx={mid.x}
              cy={mid.y}
              r={8}
              fill="#ffffff"
              stroke={selectionColor}
              strokeWidth={2.5}
              className="drop-shadow-md hover:scale-125 transition-transform"
            />
            {/* Center dot */}
            <circle
              cx={mid.x}
              cy={mid.y}
              r={3.5}
              fill={selectionColor}
            />
            <title>Drag to reshape arrow flow · Double-click to reset</title>
          </g>
        </g>
      )}

      {/* Visible line / curve */}
      <path
        d={pathD}
        fill="none"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={
          layer.strokePattern === "dotted"
            ? "3 4"
            : layer.strokePattern === "dashed"
            ? "7 5"
            : undefined
        }
      />

      {/* Destination Arrowhead (never overlapped: tip is outside on the boundary) */}
      {layer.direction !== "none" && (
        <>
          {selectionColor && (
            <polygon
              points={arrowPts}
              fill="none"
              stroke={selectionColor}
              strokeWidth={5}
              strokeLinejoin="round"
              opacity={0.35}
              className="pointer-events-none"
            />
          )}
          <polygon
            points={arrowPts}
            fill={stroke}
            stroke={stroke}
            strokeWidth={1}
          />
        </>
      )}

      {/* Source Arrowhead for Bidirectional (never overlapped: tip is outside on the boundary) */}
      {layer.direction === "bidirectional" && (
        <polygon
          points={arrowheadPoints(
            fromPt,
            layer.fromAnchor
          )}
          fill={stroke}
          stroke={stroke}
          strokeWidth={1}
        />
      )}

      {/* ── Causal Sequential Request Propagation ── */}
      {isSimulating && (
        <g style={{ pointerEvents: "none" }}>
          {/* Energy trace pulse active only during this arrow's hop stage */}
          <path
            d={pathD}
            fill="none"
            stroke="#06b6d4"
            strokeWidth={3}
            strokeDasharray="8 12"
            strokeLinecap="round"
          >
            <animate
              attributeName="opacity"
              dur={`${totalDur}s`}
              repeatCount="indefinite"
              values={normalOpacityValues}
              keyTimes={normalOpacityKeyTimes}
            />
            <animate
              attributeName="stroke-dashoffset"
              from="40"
              to="0"
              dur={`${stageDur}s`}
              repeatCount="indefinite"
            />
          </path>

          {/* Sequential Packet with Synchronized Traveling Window */}
          <g>
            <animate
              attributeName="opacity"
              dur={`${totalDur}s`}
              repeatCount="indefinite"
              values={normalOpacityValues}
              keyTimes={normalOpacityKeyTimes}
            />

            {/* Glowing Packet Aura */}
            <circle r={8} fill="none" stroke="#06b6d4" strokeWidth={1.5} opacity={0.5}>
              <animateMotion
                dur={`${totalDur}s`}
                repeatCount="indefinite"
                path={pathD}
                rotate="auto"
                keyPoints={normalKeyPoints}
                keyTimes={normalKeyTimes}
                calcMode="linear"
              />
            </circle>

            {/* Solid Packet Core */}
            <circle r={4.5} fill="#06b6d4" opacity={0.95}>
              <animateMotion
                dur={`${totalDur}s`}
                repeatCount="indefinite"
                path={pathD}
                rotate="auto"
                keyPoints={normalKeyPoints}
                keyTimes={normalKeyTimes}
                calcMode="linear"
              />
            </circle>
          </g>

          {/* Bidirectional Response ACK Traveling Back */}
          {layer.direction === "bidirectional" && (
            <g>
              <animate
                attributeName="opacity"
                dur={`${totalDur}s`}
                repeatCount="indefinite"
                values={ackOpacityValues}
                keyTimes={ackOpacityKeyTimes}
              />
              <circle r={4} fill="#10b981" opacity={0.95}>
                <animateMotion
                  dur={`${totalDur}s`}
                  repeatCount="indefinite"
                  path={pathD}
                  rotate="auto"
                  keyPoints={ackKeyPoints}
                  keyTimes={ackKeyTimes}
                  calcMode="linear"
                />
              </circle>
            </g>
          )}
        </g>
      )}

      {/* ── Midpoint label pill & Sequence Flow Badge (view mode) ── */}
      {hasLabel && !editing && (
        <g style={{ pointerEvents: "all" }}>
          {isStepOnly ? (
            /* Standalone Circular Numbered Sequence Badge */
            <g>
              <circle cx={mid.x} cy={mid.y + 1.5} r={13} fill="rgba(0,0,0,0.15)" />
              <circle
                cx={mid.x}
                cy={mid.y}
                r={12}
                fill="#4f46e5"
                stroke={selectionColor ? "#a5b4fc" : "#ffffff"}
                strokeWidth={2}
              />
              <text
                x={mid.x}
                y={mid.y + 4}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={11}
                fontWeight={700}
                fontFamily="JetBrains Mono, monospace"
                style={{ userSelect: "none" }}
              >
                {sequenceStep}
              </text>
            </g>
          ) : (
            /* Label pill with optional embedded sequence badge */
            <g>
              {/* Pill drop shadow */}
              <rect
                x={mid.x - pillW / 2 + 1}
                y={mid.y - pillH / 2 + 2}
                width={pillW}
                height={pillH}
                rx={pillH / 2}
                fill="rgba(0,0,0,0.12)"
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
              {/* Embedded step circle if step present */}
              {hasStep && (
                <g>
                  <circle
                    cx={mid.x - pillW / 2 + 12}
                    cy={mid.y}
                    r={8.5}
                    fill="#4f46e5"
                  />
                  <text
                    x={mid.x - pillW / 2 + 12}
                    y={mid.y + 3.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={9.5}
                    fontWeight={700}
                    fontFamily="JetBrains Mono, monospace"
                    style={{ userSelect: "none" }}
                  >
                    {sequenceStep}
                  </text>
                </g>
              )}
              {/* Pill text */}
              <text
                x={hasStep ? mid.x + 8 : mid.x}
                y={mid.y + 4}
                textAnchor="middle"
                fill="#1e1b4b"
                fontSize={11}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
                style={{ userSelect: "none" }}
              >
                {labelText}
              </text>
            </g>
          )}
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
