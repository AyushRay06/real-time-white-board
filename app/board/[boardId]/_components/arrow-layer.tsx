"use client"

import { memo, useState, useRef, useEffect, useCallback } from "react"
import { useStorage, useMutation } from "@liveblocks/react/suspense"
import { ArrowLayer, AnchorSide, Point, Camera } from "@/types/canvas"
import { getAnchorPoint } from "./sys-component-layer"
import { useSimulation } from "./simulation-context"
import { colorToCss } from "@/lib/utils"

interface ArrowLayerProps {
  id: string
  layer: ArrowLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
  camera?: Camera
}

export type HandleType = "vertical-segment" | "horizontal-segment" | "point"

export interface PathResult {
  d: string
  labelPt: Point
}

// ─────────────────────────────────────────────────────────────────────────────
// PATH BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

function buildPolylinePath(pts: Point[]): string {
  if (pts.length < 2) return ""
  return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
}

/** Catmull-Rom → Bezier smooth path through all points */
function buildSmoothPath(pts: Point[]): string {
  if (pts.length < 2) return ""
  if (pts.length === 2) return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const alpha = 1 / 3
    const cp1x = p1.x + (p2.x - p0.x) * alpha
    const cp1y = p1.y + (p2.y - p0.y) * alpha
    const cp2x = p2.x - (p3.x - p1.x) * alpha
    const cp2y = p2.y - (p3.y - p1.y) * alpha
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`
  }
  return d
}

function midPt(pts: Point[]): Point {
  if (pts.length === 0) return { x: 0, y: 0 }
  return pts[Math.floor(pts.length / 2)]
}

function buildStraightPath(from: Point, to: Point, waypoints: Point[]): PathResult {
  const allPts = [from, ...waypoints, to]
  const label = waypoints.length > 0 ? midPt(waypoints) : { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }
  return { d: buildPolylinePath(allPts), labelPt: label }
}

function computeCP1(from: Point, fromAnchor: AnchorSide, to: Point): Point {
  const dist = Math.hypot(to.x - from.x, to.y - from.y)
  const tension = Math.min(Math.max(50, dist * 0.45), 260)
  switch (fromAnchor) {
    case "right":  return { x: from.x + tension, y: from.y }
    case "left":   return { x: from.x - tension, y: from.y }
    case "bottom": return { x: from.x, y: from.y + tension }
    case "top":    return { x: from.x, y: from.y - tension }
  }
}
function computeCP2(to: Point, toAnchor: AnchorSide, from: Point): Point {
  const dist = Math.hypot(from.x - to.x, from.y - to.y)
  const tension = Math.min(Math.max(50, dist * 0.45), 260)
  switch (toAnchor) {
    case "right":  return { x: to.x + tension, y: to.y }
    case "left":   return { x: to.x - tension, y: to.y }
    case "bottom": return { x: to.x, y: to.y + tension }
    case "top":    return { x: to.x, y: to.y - tension }
  }
}

function bezierMidpoint(p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const t = 0.5, mt = 0.5
  return {
    x: mt**3*p0.x + 3*mt**2*t*p1.x + 3*mt*t**2*p2.x + t**3*p3.x,
    y: mt**3*p0.y + 3*mt**2*t*p1.y + 3*mt*t**2*p2.y + t**3*p3.y,
  }
}

function buildCubicPath(from: Point, to: Point, fromAnchor: AnchorSide, toAnchor: AnchorSide, waypoints: Point[]): PathResult {
  if (waypoints.length === 0) {
    const cp1 = computeCP1(from, fromAnchor, to)
    const cp2 = computeCP2(to, toAnchor, from)
    const label = bezierMidpoint(from, cp1, cp2, to)
    return {
      d: `M ${from.x} ${from.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${to.x} ${to.y}`,
      labelPt: label,
    }
  }
  const allPts = [from, ...waypoints, to]
  return { d: buildSmoothPath(allPts), labelPt: midPt(waypoints) }
}

function buildOrthogonalPath(from: Point, to: Point, fromAnchor: AnchorSide, toAnchor: AnchorSide, waypoints: Point[]): PathResult {
  if (waypoints.length > 0) {
    const allPts = [from, ...waypoints, to]
    return { d: buildPolylinePath(allPts), labelPt: midPt(waypoints) }
  }
  const isFromH = fromAnchor === "left" || fromAnchor === "right"
  const isToH   = toAnchor === "left" || toAnchor === "right"

  if (isFromH && isToH) {
    const splitX = fromAnchor === "right" && toAnchor === "right"
      ? Math.max(from.x, to.x) + 40
      : fromAnchor === "left" && toAnchor === "left"
      ? Math.min(from.x, to.x) - 40
      : (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2
    return {
      d: `M ${from.x} ${from.y} L ${splitX} ${from.y} L ${splitX} ${to.y} L ${to.x} ${to.y}`,
      labelPt: { x: splitX, y: midY },
    }
  }
  if (!isFromH && !isToH) {
    const splitY = fromAnchor === "bottom" && toAnchor === "bottom"
      ? Math.max(from.y, to.y) + 40
      : fromAnchor === "top" && toAnchor === "top"
      ? Math.min(from.y, to.y) - 40
      : (from.y + to.y) / 2
    const midX = (from.x + to.x) / 2
    return {
      d: `M ${from.x} ${from.y} L ${from.x} ${splitY} L ${to.x} ${splitY} L ${to.x} ${to.y}`,
      labelPt: { x: midX, y: splitY },
    }
  }
  if (isFromH && !isToH) {
    return {
      d: `M ${from.x} ${from.y} L ${to.x} ${from.y} L ${to.x} ${to.y}`,
      labelPt: { x: (from.x + to.x) / 2, y: from.y },
    }
  }
  return {
    d: `M ${from.x} ${from.y} L ${from.x} ${to.y} L ${to.x} ${to.y}`,
    labelPt: { x: from.x, y: (from.y + to.y) / 2 },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ARROWHEAD
// ─────────────────────────────────────────────────────────────────────────────

function arrowheadPoints(tip: Point, toAnchor: AnchorSide, size: number = 10): string {
  const half = size * 0.58
  let p1: Point, p2: Point, p3: Point
  switch (toAnchor) {
    case "left":
      p1 = tip; p2 = { x: tip.x - size, y: tip.y - half }; p3 = { x: tip.x - size, y: tip.y + half }; break
    case "right":
      p1 = tip; p2 = { x: tip.x + size, y: tip.y - half }; p3 = { x: tip.x + size, y: tip.y + half }; break
    case "top":
      p1 = tip; p2 = { x: tip.x - half, y: tip.y - size }; p3 = { x: tip.x + half, y: tip.y - size }; break
    case "bottom":
    default:
      p1 = tip; p2 = { x: tip.x - half, y: tip.y + size }; p3 = { x: tip.x + half, y: tip.y + size }; break
  }
  return `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
}

// ─────────────────────────────────────────────────────────────────────────────
// ANCHOR DRAGGING — computes side + fractional t from cursor position
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Given a canvas-space cursor position and a layer bounding box,
 * return the closest side (AnchorSide) and the fraction t (0–1) along that side.
 *   top/bottom: t=0 is left, t=1 is right
 *   left/right: t=0 is top, t=1 is bottom
 */
function computeAnchorAndT(
  cursorX: number, cursorY: number,
  lx: number, ly: number, lw: number, lh: number
): { anchor: AnchorSide; t: number } {
  // Clamp cursor to the layer bounds (with a small margin)
  const cx = Math.max(lx, Math.min(lx + lw, cursorX))
  const cy = Math.max(ly, Math.min(ly + lh, cursorY))

  // Distance from each side
  const dTop    = Math.abs(cy - ly)
  const dBottom = Math.abs(cy - (ly + lh))
  const dLeft   = Math.abs(cx - lx)
  const dRight  = Math.abs(cx - (lx + lw))
  const minDist = Math.min(dTop, dBottom, dLeft, dRight)

  if (minDist === dTop) {
    const t = lw > 0 ? Math.max(0, Math.min(1, (cursorX - lx) / lw)) : 0.5
    return { anchor: "top", t }
  }
  if (minDist === dBottom) {
    const t = lw > 0 ? Math.max(0, Math.min(1, (cursorX - lx) / lw)) : 0.5
    return { anchor: "bottom", t }
  }
  if (minDist === dLeft) {
    const t = lh > 0 ? Math.max(0, Math.min(1, (cursorY - ly) / lh)) : 0.5
    return { anchor: "left", t }
  }
  const t = lh > 0 ? Math.max(0, Math.min(1, (cursorY - ly) / lh)) : 0.5
  return { anchor: "right", t }
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const ArrowLayerComponent = memo(function ArrowLayerComponent({
  id,
  layer,
  onPointerDown,
  selectionColor,
  camera,
}: ArrowLayerProps) {
  const fromLayer = useStorage((root) => root.layers.get(layer.fromLayerId))
  const toLayer   = useStorage((root) => root.layers.get(layer.toLayerId))
  const simContext = useSimulation()

  const [editing, setEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const pathRef  = useRef<SVGPathElement>(null)

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
    if (e.key === "Enter") commitEdit(e.currentTarget.value)
    else if (e.key === "Escape") setEditing(false)
    e.stopPropagation()
  }, [commitEdit])

  // ── Mutations ──
  const updateWaypoints = useMutation(({ storage }, pts: Point[]) => {
    ;(storage.get("layers").get(id) as any)?.set("waypoints", pts)
  }, [id])

  const updateFromAnchor = useMutation(({ storage }, anchor: AnchorSide, t: number) => {
    const l = storage.get("layers").get(id) as any
    l?.set("fromAnchor", anchor)
    l?.set("fromAnchorT", parseFloat(t.toFixed(3)))
  }, [id])

  const updateToAnchor = useMutation(({ storage }, anchor: AnchorSide, t: number) => {
    const l = storage.get("layers").get(id) as any
    l?.set("toAnchor", anchor)
    l?.set("toAnchorT", parseFloat(t.toFixed(3)))
  }, [id])

  const [isHovered, setIsHovered] = useState(false)

  // ── Drag a waypoint ──
  const handleWaypointDrag = useCallback((
    e: React.PointerEvent, index: number, currentWaypoints: Point[]
  ) => {
    e.stopPropagation()
    e.preventDefault()
    const startCX = e.clientX, startCY = e.clientY
    const startPt = currentWaypoints[index]
    const zoom = camera?.zoom || 1

    const onMove = (ev: PointerEvent) => {
      ev.stopPropagation()
      const newWps = [...currentWaypoints]
      newWps[index] = {
        x: Math.round(startPt.x + (ev.clientX - startCX) / zoom),
        y: Math.round(startPt.y + (ev.clientY - startCY) / zoom),
      }
      updateWaypoints(newWps)
    }
    const onUp = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }, [camera?.zoom, updateWaypoints])

  // ── Click on path → insert waypoint at that canvas position ──
  const handlePathAddPoint = useCallback((e: React.PointerEvent) => {
    if (!selectionColor || !camera) return
    e.stopPropagation()
    e.preventDefault()

    const pathEl = pathRef.current
    if (!pathEl) return

    // Convert click to canvas coords
    const clickCanvas = {
      x: (e.clientX - camera.x) / camera.zoom,
      y: (e.clientY - camera.y) / camera.zoom,
    }

    // Walk the path and find closest point
    const totalLen = pathEl.getTotalLength()
    let best = Infinity, bestPt: Point = clickCanvas, bestFrac = 0.5
    const steps = 300
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps
      const svgPt = pathEl.getPointAtLength(frac * totalLen)
      const dist2 = (svgPt.x - clickCanvas.x) ** 2 + (svgPt.y - clickCanvas.y) ** 2
      if (dist2 < best) {
        best = dist2
        bestPt = { x: Math.round(svgPt.x), y: Math.round(svgPt.y) }
        bestFrac = frac
      }
    }

    const currentWaypoints = layer.waypoints ?? []
    // Map frac (0–1 along full path) to insertion index in waypoints array
    const insertAt = Math.min(
      currentWaypoints.length,
      Math.max(0, Math.round(bestFrac * (currentWaypoints.length + 1)) - (bestFrac < 0.15 ? 0 : 0))
    )
    const newWps = [...currentWaypoints]
    newWps.splice(insertAt, 0, bestPt)
    updateWaypoints(newWps)
  }, [selectionColor, camera, layer.waypoints, updateWaypoints])

  // ── Remove waypoint ──
  const handleWaypointRemove = useCallback((
    e: React.MouseEvent, index: number, currentWaypoints: Point[]
  ) => {
    e.stopPropagation()
    updateWaypoints(currentWaypoints.filter((_, i) => i !== index))
  }, [updateWaypoints])

  // ── Drag endpoint anchors — free positioning along the border ──
  const handleAnchorDrag = useCallback((e: React.PointerEvent, type: "from" | "to") => {
    e.stopPropagation()
    e.preventDefault()

    const targetLayer = type === "from" ? fromLayer : toLayer
    if (!targetLayer) return

    const zoom = camera?.zoom || 1
    const camX = camera?.x || 0
    const camY = camera?.y || 0

    const onMove = (ev: PointerEvent) => {
      ev.stopPropagation()
      const cx = (ev.clientX - camX) / zoom
      const cy = (ev.clientY - camY) / zoom
      const { anchor, t } = computeAnchorAndT(cx, cy, targetLayer.x, targetLayer.y, targetLayer.width, targetLayer.height)
      if (type === "from") {
        updateFromAnchor(anchor, t)
      } else {
        updateToAnchor(anchor, t)
      }
    }
    const onUp = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }, [fromLayer, toLayer, updateFromAnchor, updateToAnchor, camera?.x, camera?.y, camera?.zoom])

  // ── Early return after all hooks ──
  if (!fromLayer || !toLayer) return null

  // Pass anchorT to getAnchorPoint for free-position support
  const fromPt = getAnchorPoint(fromLayer.x, fromLayer.y, fromLayer.width, fromLayer.height, layer.fromAnchor, layer.fromAnchorT ?? 0.5)
  const toPt   = getAnchorPoint(toLayer.x,   toLayer.y,   toLayer.width,   toLayer.height,   layer.toAnchor,   layer.toAnchorT   ?? 0.5)

  const isSharp    = layer.arrowStyle === "sharp" || layer.arrowStyle === "orthogonal"
  const isStraight = layer.arrowStyle === "straight"

  // Waypoints: fall back to legacy controlOffset for old arrows
  let waypoints: Point[] = layer.waypoints ?? []
  if (waypoints.length === 0 && layer.controlOffset) {
    const { x: ox, y: oy } = layer.controlOffset
    if (Math.abs(ox) > 2 || Math.abs(oy) > 2) {
      const mx = (fromPt.x + toPt.x) / 2, my = (fromPt.y + toPt.y) / 2
      waypoints = [{ x: Math.round(mx + ox), y: Math.round(my + oy) }]
    }
  }

  let pathResult: PathResult
  if (isSharp) pathResult = buildOrthogonalPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor, waypoints)
  else if (isStraight) pathResult = buildStraightPath(fromPt, toPt, waypoints)
  else pathResult = buildCubicPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor, waypoints)

  const pathD    = pathResult.d
  const mid      = pathResult.labelPt
  const arrowPts = arrowheadPoints(toPt, layer.toAnchor)
  const stroke   = selectionColor || (layer.fill ? colorToCss(layer.fill) : "#6366f1")

  // Label
  const protocolText = layer.protocol || ""
  const userText     = layer.value || layer.label || ""
  const hasProtocol  = Boolean(protocolText)
  const labelText    = hasProtocol ? (userText ? `${protocolText} • ${userText}` : protocolText) : userText
  const sequenceStep = layer.sequenceStep
  const hasStep      = typeof sequenceStep === "number" && sequenceStep > 0
  const hasLabel     = labelText.length > 0 || hasStep
  const pillH        = 24
  const charWidth    = 7.2
  const isStepOnly   = hasStep && labelText.length === 0
  const pillW        = isStepOnly ? 26 : Math.max(hasStep ? 76 : 56, labelText.length * charWidth + 20 + (hasStep ? 18 : 0))

  // Simulation
  const isSimulating = Boolean(simContext?.isSimulating) || layer.isAnimated
  const simSpeed = simContext?.simSpeed || 1
  const arrowStage = simContext?.graph?.arrowStages?.[id] ?? 0
  const totalStages = simContext?.graph?.totalStages || 1
  const stageDur = Math.max(0.6, 1.4 / simSpeed)
  const pauseDur = Math.max(0.2, 0.5 / simSpeed)
  const totalDur = totalStages * stageDur + pauseDur
  const pStart = Math.max(0, Math.min(0.99, (arrowStage * stageDur) / totalDur))
  const pEnd   = Math.max(pStart + 0.01, Math.min(1, ((arrowStage + 1) * stageDur) / totalDur))
  const normalKP = pStart === 0 ? "0;1;1" : "0;0;1;1"
  const normalKT = pStart === 0 ? `0;${pEnd.toFixed(4)};1` : `0;${pStart.toFixed(4)};${pEnd.toFixed(4)};1`
  const normalOV = pStart === 0 ? "1;1;0;0" : "0;0;1;1;0;0"
  const normalOT = pStart === 0
    ? `0;${Math.max(0, pEnd - 0.005).toFixed(4)};${pEnd.toFixed(4)};1`
    : `0;${Math.max(0, pStart - 0.002).toFixed(4)};${Math.min(1, pStart + 0.004).toFixed(4)};${Math.max(0, pEnd - 0.004).toFixed(4)};${Math.min(1, pEnd + 0.002).toFixed(4)};1`
  const pMid = (pStart + pEnd) / 2
  const ackKP = "1;1;0;0"
  const ackKT = `0;${pMid.toFixed(4)};${pEnd.toFixed(4)};1`
  const ackOV = "0;0;1;1;0;0"
  const ackOT = `0;${Math.max(0, pMid - 0.002).toFixed(4)};${Math.min(1, pMid + 0.004).toFixed(4)};${Math.max(0, pEnd - 0.004).toFixed(4)};${Math.min(1, pEnd + 0.002).toFixed(4)};1`

  return (
    <g
      onPointerDown={(e) => onPointerDown(e, id)}
      onDoubleClick={handleDblClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Wide invisible hit area */}
      <path d={pathD} fill="none" stroke="transparent" strokeWidth={26} />

      {/* ── SELECTION HIGHLIGHT ── */}
      {selectionColor && (
        <g>
          <path d={pathD} fill="none" stroke={selectionColor} strokeWidth={10} strokeOpacity={0.22} strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none" />
          <path d={pathD} fill="none" stroke={selectionColor} strokeWidth={4.5} strokeOpacity={0.65} strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none" />

          {/* Source endpoint handle — drag to reposition anywhere on border */}
          <g className="cursor-crosshair pointer-events-auto" onPointerDown={(e) => handleAnchorDrag(e, "from")}>
            <circle cx={fromPt.x} cy={fromPt.y} r={14} fill="transparent" />
            {/* Outer ring */}
            <circle cx={fromPt.x} cy={fromPt.y} r={9} fill={selectionColor} opacity={0.18} className="pointer-events-none" />
            {/* Inner dot */}
            <circle cx={fromPt.x} cy={fromPt.y} r={5} fill="#ffffff" stroke={selectionColor} strokeWidth={2} className="pointer-events-none" />
            <title>Drag to move connection point anywhere on border</title>
          </g>

          {/* Destination endpoint handle */}
          <g className="cursor-crosshair pointer-events-auto" onPointerDown={(e) => handleAnchorDrag(e, "to")}>
            <circle cx={toPt.x} cy={toPt.y} r={14} fill="transparent" />
            {/* Outer ring */}
            <circle cx={toPt.x} cy={toPt.y} r={9} fill={selectionColor} opacity={0.18} className="pointer-events-none" />
            {/* Inner dot */}
            <circle cx={toPt.x} cy={toPt.y} r={5} fill="#ffffff" stroke={selectionColor} strokeWidth={2} className="pointer-events-none" />
            <title>Drag to move connection point anywhere on border</title>
          </g>
        </g>
      )}

      {/* Visible line / curve */}
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={
          layer.strokePattern === "dotted" ? "3 4"
          : layer.strokePattern === "dashed" ? "7 5"
          : undefined
        }
      />

      {/* ── Click-to-add-waypoint overlay (always present when selected, sits on top of visible path) ── */}
      {selectionColor && (
        <path
          d={pathD}
          fill="none"
          stroke="transparent"
          strokeWidth={20}
          className="pointer-events-auto"
          style={{ cursor: "crosshair" }}
          onPointerDown={(e) => {
            // Only handle if not clicking an existing waypoint handle (those stop propagation)
            handlePathAddPoint(e)
          }}
        />
      )}

      {/* Destination Arrowhead */}
      {layer.direction !== "none" && (
        <>
          {selectionColor && (
            <polygon points={arrowPts} fill="none" stroke={selectionColor} strokeWidth={5} strokeLinejoin="round" opacity={0.35} className="pointer-events-none" />
          )}
          <polygon points={arrowPts} fill={stroke} stroke={stroke} strokeWidth={1} />
        </>
      )}

      {/* Source Arrowhead for Bidirectional */}
      {layer.direction === "bidirectional" && (
        <polygon points={arrowheadPoints(fromPt, layer.fromAnchor)} fill={stroke} stroke={stroke} strokeWidth={1} />
      )}

      {/* ── Simulation Packets ── */}
      {isSimulating && (
        <g style={{ pointerEvents: "none" }}>
          <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth={3} strokeDasharray="8 12" strokeLinecap="round">
            <animate attributeName="opacity" dur={`${totalDur}s`} repeatCount="indefinite" values={normalOV} keyTimes={normalOT} />
            <animate attributeName="stroke-dashoffset" from="40" to="0" dur={`${stageDur}s`} repeatCount="indefinite" />
          </path>
          <g>
            <animate attributeName="opacity" dur={`${totalDur}s`} repeatCount="indefinite" values={normalOV} keyTimes={normalOT} />
            <circle r={8} fill="none" stroke="#06b6d4" strokeWidth={1.5} opacity={0.5}>
              <animateMotion dur={`${totalDur}s`} repeatCount="indefinite" path={pathD} rotate="auto" keyPoints={normalKP} keyTimes={normalKT} calcMode="linear" />
            </circle>
            <circle r={4.5} fill="#06b6d4" opacity={0.95}>
              <animateMotion dur={`${totalDur}s`} repeatCount="indefinite" path={pathD} rotate="auto" keyPoints={normalKP} keyTimes={normalKT} calcMode="linear" />
            </circle>
          </g>
          {layer.direction === "bidirectional" && (
            <g>
              <animate attributeName="opacity" dur={`${totalDur}s`} repeatCount="indefinite" values={ackOV} keyTimes={ackOT} />
              <circle r={4} fill="#10b981" opacity={0.95}>
                <animateMotion dur={`${totalDur}s`} repeatCount="indefinite" path={pathD} rotate="auto" keyPoints={ackKP} keyTimes={ackKT} calcMode="linear" />
              </circle>
            </g>
          )}
        </g>
      )}

      {/* ── Label Pill ── */}
      {hasLabel && !editing && (
        <g style={{ pointerEvents: "all" }}>
          {isStepOnly ? (
            <g>
              <circle cx={mid.x} cy={mid.y + 1.5} r={13} fill="rgba(0,0,0,0.15)" />
              <circle cx={mid.x} cy={mid.y} r={12} fill="#4f46e5" stroke={selectionColor ? "#a5b4fc" : "#ffffff"} strokeWidth={2} />
              <text x={mid.x} y={mid.y + 4} textAnchor="middle" fill="#ffffff" fontSize={11} fontWeight={700} fontFamily="JetBrains Mono, monospace" style={{ userSelect: "none" }}>{sequenceStep}</text>
            </g>
          ) : (
            <g>
              <rect x={mid.x - pillW/2 + 1} y={mid.y - pillH/2 + 2} width={pillW} height={pillH} rx={pillH/2} fill="rgba(0,0,0,0.12)" />
              <rect x={mid.x - pillW/2} y={mid.y - pillH/2} width={pillW} height={pillH} rx={pillH/2} fill="#ffffff" stroke={selectionColor ? "#6366f1" : "#c7d2fe"} strokeWidth={1.5} />
              {hasStep && (
                <g>
                  <circle cx={mid.x - pillW/2 + 12} cy={mid.y} r={8.5} fill="#4f46e5" />
                  <text x={mid.x - pillW/2 + 12} y={mid.y + 3.5} textAnchor="middle" fill="#ffffff" fontSize={9.5} fontWeight={700} fontFamily="JetBrains Mono, monospace" style={{ userSelect: "none" }}>{sequenceStep}</text>
                </g>
              )}
              <text x={hasStep ? mid.x + 8 : mid.x} y={mid.y + 4} textAnchor="middle" fill="#1e1b4b" fontSize={11} fontWeight={600} fontFamily="Inter, system-ui, sans-serif" style={{ userSelect: "none" }}>{labelText}</text>
            </g>
          )}
        </g>
      )}

      {/* ── Inline Editor ── */}
      {editing && (
        <foreignObject x={mid.x - 70} y={mid.y - 15} width={140} height={30} style={{ overflow: "visible" }}>
          {/* @ts-ignore */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            <input
              ref={inputRef}
              defaultValue={labelText}
              placeholder="e.g. Read / Write"
              onKeyDown={handleKeyDown}
              onBlur={(e) => commitEdit(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{ width: 130, height: 26, padding: "0 8px", fontSize: 11, fontWeight: 600, color: "#1e1b4b", background: "#ffffff", border: "2px solid #6366f1", borderRadius: 9999, outline: "none", boxShadow: "0 2px 8px rgba(99,102,241,0.25)", textAlign: "center", fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box" }}
            />
          </div>
        </foreignObject>
      )}

      {/* ── WAYPOINT HANDLES + PATH EDITING UI ── */}
      {/* Always shown when selected OR hovered so it's discoverable on all arrow types */}
      {(selectionColor || isHovered) && (
        <g className="pointer-events-auto">
          {/* Hint text: only when selected and no waypoints yet */}
          {selectionColor && waypoints.length === 0 && (
            <g className="pointer-events-none">
              {/* Small + badge at midpoint */}
              <circle cx={mid.x} cy={mid.y} r={10} fill={`${selectionColor}22`} stroke={selectionColor} strokeWidth={1} strokeDasharray="3 2" />
              <text x={mid.x} y={mid.y + 4} textAnchor="middle" fill={selectionColor} fontSize={12} fontWeight={700} fontFamily="Inter, sans-serif" style={{ userSelect: "none" }}>+</text>
            </g>
          )}

          {/* Waypoint diamond handles */}
          {waypoints.map((wp, i) => (
            <g
              key={i}
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                e.stopPropagation()
                handleWaypointDrag(e, i, waypoints)
              }}
              onDoubleClick={(e) => handleWaypointRemove(e, i, waypoints)}
            >
              {/* Large transparent hit area — must stop propagation to prevent path click */}
              <circle cx={wp.x} cy={wp.y} r={16} fill="transparent" />
              {/* Glow */}
              <circle cx={wp.x} cy={wp.y} r={12} fill={selectionColor ? `${selectionColor}22` : "rgba(99,102,241,0.15)"} className="pointer-events-none" />
              {/* Diamond */}
              <polygon
                points={`${wp.x},${wp.y - 10} ${wp.x + 10},${wp.y} ${wp.x},${wp.y + 10} ${wp.x - 10},${wp.y}`}
                fill="#ffffff"
                stroke={selectionColor || stroke}
                strokeWidth={2}
                style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.22))" }}
                className="pointer-events-none"
              />
              {/* Center dot */}
              <circle cx={wp.x} cy={wp.y} r={2.5} fill={selectionColor || stroke} className="pointer-events-none" />
              {/* Number badge when multiple waypoints */}
              {waypoints.length > 1 && (
                <text x={wp.x} y={wp.y + 3.5} textAnchor="middle" fill={selectionColor || stroke} fontSize={8} fontWeight={700} fontFamily="JetBrains Mono, monospace" style={{ userSelect: "none" }} className="pointer-events-none">
                  {i + 1}
                </text>
              )}
              <title>Drag to move · Double-click to remove</title>
            </g>
          ))}

          {/* Clear all waypoints — shown when 1+ waypoints exist */}
          {selectionColor && waypoints.length >= 1 && (
            <g
              className="cursor-pointer pointer-events-auto"
              onClick={(e) => { e.stopPropagation(); updateWaypoints([]) }}
            >
              <rect x={mid.x - 30} y={mid.y + 16} width={60} height={16} rx={8} fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth={1} />
              <text x={mid.x} y={mid.y + 27} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight={700} fontFamily="Inter, system-ui, sans-serif" style={{ userSelect: "none" }}>
                Clear path
              </text>
            </g>
          )}
        </g>
      )}
    </g>
  )
})
