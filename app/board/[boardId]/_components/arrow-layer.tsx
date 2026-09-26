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

function getCanvasPointFromClient(clientX: number, clientY: number, element: SVGElement): Point {
  const g = (element.closest("svg > g") as SVGGraphicsElement) ||
            (element.closest("g[style*='transform']") as SVGGraphicsElement) ||
            (element as unknown as SVGGraphicsElement)
  const ctm = g.getScreenCTM()
  if (!ctm) return { x: clientX, y: clientY }
  const svg = element.ownerSVGElement || (element as unknown as SVGSVGElement)
  const pt = svg.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const transformed = pt.matrixTransform(ctm.inverse())
  return { x: transformed.x, y: transformed.y }
}

export type HandleType = "vertical-segment" | "horizontal-segment" | "point"

export interface PathResult {
  d: string
  handlePt: Point
  handleType: HandleType
  labelPt: Point
}

function buildStraightPath(
  from: Point,
  to: Point,
  controlOffset?: Point
): PathResult {
  const ox = controlOffset?.x ?? 0
  const oy = controlOffset?.y ?? 0
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2

  if (Math.abs(ox) < 2 && Math.abs(oy) < 2) {
    return {
      d: `M ${from.x} ${from.y} L ${to.x} ${to.y}`,
      handlePt: { x: midX, y: midY },
      handleType: "point",
      labelPt: { x: midX, y: midY },
    }
  }

  const elbow = { x: Math.round(midX + ox), y: Math.round(midY + oy) }
  return {
    d: `M ${from.x} ${from.y} L ${elbow.x} ${elbow.y} L ${to.x} ${to.y}`,
    handlePt: elbow,
    handleType: "point",
    labelPt: elbow,
  }
}

function buildCubicPath(
  from: Point,
  to: Point,
  fromAnchor: AnchorSide,
  toAnchor: AnchorSide,
  controlOffset?: Point
): PathResult {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const dist = Math.hypot(dx, dy)
  const tension = Math.min(Math.max(50, dist * 0.45), 260)

  let v1 = { x: 0, y: 0 }
  switch (fromAnchor) {
    case "right":  v1 = { x: 1,  y: 0  }; break
    case "left":   v1 = { x: -1, y: 0  }; break
    case "bottom": v1 = { x: 0,  y: 1  }; break
    case "top":    v1 = { x: 0,  y: -1 }; break
  }

  let v2 = { x: 0, y: 0 }
  switch (toAnchor) {
    case "right":  v2 = { x: 1,  y: 0  }; break
    case "left":   v2 = { x: -1, y: 0  }; break
    case "bottom": v2 = { x: 0,  y: 1  }; break
    case "top":    v2 = { x: 0,  y: -1 }; break
  }

  const cp1_0 = { x: from.x + v1.x * tension, y: from.y + v1.y * tension }
  const cp2_0 = { x: to.x + v2.x * tension,   y: to.y + v2.y * tension }

  const defaultMid = bezierMidpoint(from, cp1_0, cp2_0, to)

  const ox = controlOffset?.x ?? 0
  const oy = controlOffset?.y ?? 0

  // 4/3 shift factor ensures that the cubic curve's midpoint at t=0.5 exactly matches defaultMid + (ox, oy)
  const shiftX = ox * (4 / 3)
  const shiftY = oy * (4 / 3)

  const cp1 = { x: cp1_0.x + shiftX, y: cp1_0.y + shiftY }
  const cp2 = { x: cp2_0.x + shiftX, y: cp2_0.y + shiftY }

  const apex = { x: defaultMid.x + ox, y: defaultMid.y + oy }

  return {
    d: `M ${from.x} ${from.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${to.x} ${to.y}`,
    handlePt: apex,
    handleType: "point",
    labelPt: apex,
  }
}

/** Crisp orthogonal right-angle routing with adjustable segment / elbow bus */
function buildOrthogonalPath(
  from: Point,
  to: Point,
  fromAnchor: AnchorSide,
  toAnchor: AnchorSide,
  controlOffset?: Point
): PathResult {
  const ox = controlOffset?.x ?? 0
  const oy = controlOffset?.y ?? 0

  const isFromHorizontal = fromAnchor === "left" || fromAnchor === "right"
  const isToHorizontal   = toAnchor === "left" || toAnchor === "right"

  if (isFromHorizontal && isToHorizontal) {
    let defaultSplitX: number
    if (fromAnchor === "right" && toAnchor === "left") {
      defaultSplitX = (from.x + to.x) / 2
    } else if (fromAnchor === "left" && toAnchor === "right") {
      defaultSplitX = (from.x + to.x) / 2
    } else if (fromAnchor === "right" && toAnchor === "right") {
      defaultSplitX = Math.max(from.x, to.x) + 40
    } else {
      defaultSplitX = Math.min(from.x, to.x) - 40
    }

    const splitX = Math.round(defaultSplitX + ox)
    const midY = (from.y + to.y) / 2

    return {
      d: `M ${from.x} ${from.y} L ${splitX} ${from.y} L ${splitX} ${to.y} L ${to.x} ${to.y}`,
      handlePt: { x: splitX, y: midY },
      handleType: "vertical-segment",
      labelPt: { x: splitX, y: midY },
    }
  }

  if (!isFromHorizontal && !isToHorizontal) {
    let defaultSplitY: number
    if (fromAnchor === "bottom" && toAnchor === "top") {
      defaultSplitY = (from.y + to.y) / 2
    } else if (fromAnchor === "top" && toAnchor === "bottom") {
      defaultSplitY = (from.y + to.y) / 2
    } else if (fromAnchor === "bottom" && toAnchor === "bottom") {
      defaultSplitY = Math.max(from.y, to.y) + 40
    } else {
      defaultSplitY = Math.min(from.y, to.y) - 40
    }

    const splitY = Math.round(defaultSplitY + oy)
    const midX = (from.x + to.x) / 2

    return {
      d: `M ${from.x} ${from.y} L ${from.x} ${splitY} L ${to.x} ${splitY} L ${to.x} ${to.y}`,
      handlePt: { x: midX, y: splitY },
      handleType: "horizontal-segment",
      labelPt: { x: midX, y: splitY },
    }
  }

  // Mixed: One horizontal, one vertical
  if (isFromHorizontal && !isToHorizontal) {
    const defaultCornerX = to.x
    const splitX = Math.round(defaultCornerX + ox)

    if (Math.abs(ox) < 2) {
      return {
        d: `M ${from.x} ${from.y} L ${to.x} ${from.y} L ${to.x} ${to.y}`,
        handlePt: { x: to.x, y: from.y },
        handleType: "point",
        labelPt: { x: (from.x + to.x) / 2, y: from.y },
      }
    } else {
      return {
        d: `M ${from.x} ${from.y} L ${splitX} ${from.y} L ${splitX} ${to.y} L ${to.x} ${to.y}`,
        handlePt: { x: splitX, y: (from.y + to.y) / 2 },
        handleType: "vertical-segment",
        labelPt: { x: splitX, y: (from.y + to.y) / 2 },
      }
    }
  } else {
    const defaultCornerY = to.y
    const splitY = Math.round(defaultCornerY + oy)

    if (Math.abs(oy) < 2) {
      return {
        d: `M ${from.x} ${from.y} L ${from.x} ${to.y} L ${to.x} ${to.y}`,
        handlePt: { x: from.x, y: to.y },
        handleType: "point",
        labelPt: { x: from.x, y: (from.y + to.y) / 2 },
      }
    } else {
      return {
        d: `M ${from.x} ${from.y} L ${from.x} ${splitY} L ${to.x} ${splitY} L ${to.x} ${to.y}`,
        handlePt: { x: (from.x + to.x) / 2, y: splitY },
        handleType: "horizontal-segment",
        labelPt: { x: (from.x + to.x) / 2, y: splitY },
      }
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

  // Mutations to edit arrow flow and anchors (declared before any early returns)
  const updateControlOffset = useMutation(({ storage }, offset: Point) => {
    ;(storage.get("layers").get(id) as any)?.set("controlOffset", offset)
  }, [id])

  const updateFromAnchor = useMutation(({ storage }, anchor: AnchorSide) => {
    ;(storage.get("layers").get(id) as any)?.set("fromAnchor", anchor)
  }, [id])

  const updateToAnchor = useMutation(({ storage }, anchor: AnchorSide) => {
    ;(storage.get("layers").get(id) as any)?.set("toAnchor", anchor)
  }, [id])

  const [isHovered, setIsHovered] = useState(false)

  // Drag the arrow bend / flow controller handle
  const handleBendPointerDown = useCallback((e: React.PointerEvent, axis: "x" | "y" | "both" = "both") => {
    e.stopPropagation()
    e.preventDefault()

    const targetEl = e.currentTarget as SVGElement
    const startPt = getCanvasPointFromClient(e.clientX, e.clientY, targetEl)
    const startOffset = layer.controlOffset || { x: 0, y: 0 }

    const onPointerMove = (ev: PointerEvent) => {
      const curPt = getCanvasPointFromClient(ev.clientX, ev.clientY, targetEl)
      const dx = curPt.x - startPt.x
      const dy = curPt.y - startPt.y

      updateControlOffset({
        x: axis === "y" ? 0 : Math.round(startOffset.x + dx),
        y: axis === "x" ? 0 : Math.round(startOffset.y + dy),
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

    const targetEl = e.currentTarget as SVGElement
    const centerX = targetLayer.x + targetLayer.width / 2
    const centerY = targetLayer.y + targetLayer.height / 2

    const onPointerMove = (ev: PointerEvent) => {
      const canvasPt = getCanvasPointFromClient(ev.clientX, ev.clientY, targetEl)
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

  // If either connected layer is gone, don't render (now strictly after ALL hooks)
  if (!fromLayer || !toLayer) return null

  const fromPt = getAnchorPoint(fromLayer.x, fromLayer.y, fromLayer.width, fromLayer.height, layer.fromAnchor)
  const toPt   = getAnchorPoint(toLayer.x,   toLayer.y,   toLayer.width,   toLayer.height,   layer.toAnchor)

  const isSharp = layer.arrowStyle === "sharp" || layer.arrowStyle === "orthogonal"
  const isStraight = layer.arrowStyle === "straight"
  const controlOffset = layer.controlOffset

  let pathResult: PathResult
  if (isSharp) {
    pathResult = buildOrthogonalPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor, controlOffset)
  } else if (isStraight) {
    pathResult = buildStraightPath(fromPt, toPt, controlOffset)
  } else {
    pathResult = buildCubicPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor, controlOffset)
  }

  const pathD = pathResult.d
  const handlePt = pathResult.handlePt
  const mid = pathResult.labelPt

  const arrowPts = arrowheadPoints(toPt, layer.toAnchor)
  const stroke   = selectionColor || (layer.fill ? colorToCss(layer.fill) : "#6366f1")

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      {/* ── ARROW PATH EDITING CONTROLLER HANDLE (Visible when selected or hovered) ── */}
      {(selectionColor || isHovered) && (
        <g className="pointer-events-auto">
          {pathResult.handleType === "vertical-segment" ? (
            <g
              className="cursor-col-resize group"
              onPointerDown={(e) => handleBendPointerDown(e, "x")}
              onDoubleClick={(e) => {
                e.stopPropagation()
                updateControlOffset({ x: 0, y: 0 })
              }}
            >
              {/* Wide touch/click target area */}
              <rect
                x={handlePt.x - 16}
                y={handlePt.y - 20}
                width={32}
                height={40}
                fill="transparent"
              />
              {/* Glow aura */}
              <rect
                x={handlePt.x - 5.5}
                y={handlePt.y - 14}
                width={11}
                height={28}
                rx={5.5}
                fill={selectionColor ? `${selectionColor}35` : "rgba(99, 102, 241, 0.25)"}
                className="pointer-events-none"
              />
              {/* Vertical pill bar */}
              <rect
                x={handlePt.x - 3.5}
                y={handlePt.y - 12}
                width={7}
                height={24}
                rx={3.5}
                fill="#ffffff"
                stroke={selectionColor || stroke}
                strokeWidth={2}
                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.25))" }}
              />
              {/* Grip notches inside pill */}
              <line
                x1={handlePt.x}
                y1={handlePt.y - 5}
                x2={handlePt.x}
                y2={handlePt.y + 5}
                stroke={selectionColor || stroke}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              <title>Drag left/right to move segment · Double-click to center</title>
            </g>
          ) : pathResult.handleType === "horizontal-segment" ? (
            <g
              className="cursor-row-resize group"
              onPointerDown={(e) => handleBendPointerDown(e, "y")}
              onDoubleClick={(e) => {
                e.stopPropagation()
                updateControlOffset({ x: 0, y: 0 })
              }}
            >
              {/* Wide touch/click target area */}
              <rect
                x={handlePt.x - 20}
                y={handlePt.y - 16}
                width={40}
                height={32}
                fill="transparent"
              />
              {/* Glow aura */}
              <rect
                x={handlePt.x - 14}
                y={handlePt.y - 5.5}
                width={28}
                height={11}
                rx={5.5}
                fill={selectionColor ? `${selectionColor}35` : "rgba(99, 102, 241, 0.25)"}
                className="pointer-events-none"
              />
              {/* Horizontal pill bar */}
              <rect
                x={handlePt.x - 12}
                y={handlePt.y - 3.5}
                width={24}
                height={7}
                rx={3.5}
                fill="#ffffff"
                stroke={selectionColor || stroke}
                strokeWidth={2}
                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.25))" }}
              />
              {/* Grip notches inside pill */}
              <line
                x1={handlePt.x - 5}
                y1={handlePt.y}
                x2={handlePt.x + 5}
                y2={handlePt.y}
                stroke={selectionColor || stroke}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              <title>Drag up/down to move segment · Double-click to center</title>
            </g>
          ) : (
            <g
              className="cursor-grab active:cursor-grabbing group"
              onPointerDown={(e) => handleBendPointerDown(e, "both")}
              onDoubleClick={(e) => {
                e.stopPropagation()
                updateControlOffset({ x: 0, y: 0 })
              }}
            >
              {/* Wide touch/click target area */}
              <circle cx={handlePt.x} cy={handlePt.y} r={18} fill="transparent" />
              {/* Glow aura */}
              <circle
                cx={handlePt.x}
                cy={handlePt.y}
                r={11}
                fill={selectionColor ? `${selectionColor}35` : "rgba(99, 102, 241, 0.25)"}
                className="pointer-events-none"
              />
              {/* Sleek round node badge directly on the curve or joint */}
              <circle
                cx={handlePt.x}
                cy={handlePt.y}
                r={7.5}
                fill="#ffffff"
                stroke={selectionColor || stroke}
                strokeWidth={2.5}
                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.25))" }}
              />
              {/* Center pointer dot */}
              <circle
                cx={handlePt.x}
                cy={handlePt.y}
                r={3}
                fill={selectionColor || stroke}
              />
              <title>
                {isStraight
                  ? "Drag to bend arrow · Double-click to straighten"
                  : isSharp
                  ? "Drag to adjust corner · Double-click to reset"
                  : "Drag to adjust curve · Double-click to reset"}
              </title>
            </g>
          )}
        </g>
      )}
    </g>
  )
})
