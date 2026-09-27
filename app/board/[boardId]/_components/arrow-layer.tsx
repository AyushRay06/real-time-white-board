"use client"

import { memo, useState, useRef, useEffect, useCallback } from "react"
import { useStorage, useMutation } from "@liveblocks/react/suspense"
import { ArrowLayer, AnchorSide, Point, ArrowStyle, Camera } from "@/types/canvas"
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
  handlePt: Point
  handleType: HandleType
  labelPt: Point
}

// ─────────────────────────────────────────────────────────────────────────────
// PATH BUILDERS — all now accept waypoints[] (intermediate control points)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a polyline through all points: from → ...waypoints → to
 */
function buildPolylinePath(pts: Point[]): string {
  if (pts.length < 2) return ""
  const [first, ...rest] = pts
  return `M ${first.x} ${first.y} ` + rest.map(p => `L ${p.x} ${p.y}`).join(" ")
}

/**
 * Build a smooth cubic catmull-rom–like path through waypoints.
 * Uses Bezier approximation for smooth curves through each waypoint.
 */
function buildSmoothPath(pts: Point[]): string {
  if (pts.length < 2) return ""
  if (pts.length === 2) {
    const dx = pts[1].x - pts[0].x
    const dy = pts[1].y - pts[0].y
    const dist = Math.hypot(dx, dy)
    const t = Math.min(Math.max(50, dist * 0.45), 260)
    // Simple S-curve for 2 points — uses first/last anchor implicitly
    return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`
  }

  // Catmull-Rom to Bezier conversion for smooth interpolation
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]

    const alpha = 0.5 // Centripetal Catmull-Rom
    const cp1x = p1.x + (p2.x - p0.x) / 6 * alpha * 2
    const cp1y = p1.y + (p2.y - p0.y) / 6 * alpha * 2
    const cp2x = p2.x - (p3.x - p1.x) / 6 * alpha * 2
    const cp2y = p2.y - (p3.y - p1.y) / 6 * alpha * 2

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`
  }
  return d
}

function buildStraightPath(
  from: Point,
  to: Point,
  waypoints: Point[]
): PathResult {
  const allPts = [from, ...waypoints, to]
  const mid = waypoints.length > 0
    ? waypoints[Math.floor(waypoints.length / 2)]
    : { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }

  return {
    d: buildPolylinePath(allPts),
    handlePt: mid,
    handleType: "point",
    labelPt: mid,
  }
}

function buildCubicPath(
  from: Point,
  to: Point,
  fromAnchor: AnchorSide,
  toAnchor: AnchorSide,
  waypoints: Point[]
): PathResult {
  const mid = waypoints.length > 0
    ? waypoints[Math.floor(waypoints.length / 2)]
    : bezierMidpoint(from, computeCP1(from, fromAnchor, to), computeCP2(to, toAnchor, from), to)

  if (waypoints.length === 0) {
    // Original cubic bezier with no waypoints
    const cp1 = computeCP1(from, fromAnchor, to)
    const cp2 = computeCP2(to, toAnchor, from)
    return {
      d: `M ${from.x} ${from.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${to.x} ${to.y}`,
      handlePt: bezierMidpoint(from, cp1, cp2, to),
      handleType: "point",
      labelPt: bezierMidpoint(from, cp1, cp2, to),
    }
  }

  // With waypoints: build smooth path through from → ...waypoints → to
  const allPts = [from, ...waypoints, to]
  const d = buildSmoothPath(allPts)

  return {
    d,
    handlePt: mid,
    handleType: "point",
    labelPt: mid,
  }
}

function computeCP1(from: Point, fromAnchor: AnchorSide, to: Point): Point {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const dist = Math.hypot(dx, dy)
  const tension = Math.min(Math.max(50, dist * 0.45), 260)
  switch (fromAnchor) {
    case "right":  return { x: from.x + tension, y: from.y }
    case "left":   return { x: from.x - tension, y: from.y }
    case "bottom": return { x: from.x, y: from.y + tension }
    case "top":    return { x: from.x, y: from.y - tension }
  }
}

function computeCP2(to: Point, toAnchor: AnchorSide, from: Point): Point {
  const dx = from.x - to.x
  const dy = from.y - to.y
  const dist = Math.hypot(dx, dy)
  const tension = Math.min(Math.max(50, dist * 0.45), 260)
  switch (toAnchor) {
    case "right":  return { x: to.x + tension, y: to.y }
    case "left":   return { x: to.x - tension, y: to.y }
    case "bottom": return { x: to.x, y: to.y + tension }
    case "top":    return { x: to.x, y: to.y - tension }
  }
}

/** Crisp orthogonal right-angle routing with waypoints support */
function buildOrthogonalPath(
  from: Point,
  to: Point,
  fromAnchor: AnchorSide,
  toAnchor: AnchorSide,
  waypoints: Point[]
): PathResult {
  // With waypoints: just connect them as a polyline
  if (waypoints.length > 0) {
    const allPts = [from, ...waypoints, to]
    const mid = waypoints[Math.floor(waypoints.length / 2)]
    return {
      d: buildPolylinePath(allPts),
      handlePt: mid,
      handleType: "point",
      labelPt: mid,
    }
  }

  // No waypoints — default orthogonal routing
  const isFromHorizontal = fromAnchor === "left" || fromAnchor === "right"
  const isToHorizontal   = toAnchor === "left" || toAnchor === "right"

  if (isFromHorizontal && isToHorizontal) {
    let defaultSplitX: number
    if (fromAnchor === "right" && toAnchor === "right") {
      defaultSplitX = Math.max(from.x, to.x) + 40
    } else if (fromAnchor === "left" && toAnchor === "left") {
      defaultSplitX = Math.min(from.x, to.x) - 40
    } else {
      defaultSplitX = (from.x + to.x) / 2
    }
    const midY = (from.y + to.y) / 2
    return {
      d: `M ${from.x} ${from.y} L ${defaultSplitX} ${from.y} L ${defaultSplitX} ${to.y} L ${to.x} ${to.y}`,
      handlePt: { x: defaultSplitX, y: midY },
      handleType: "vertical-segment",
      labelPt: { x: defaultSplitX, y: midY },
    }
  }

  if (!isFromHorizontal && !isToHorizontal) {
    let defaultSplitY: number
    if (fromAnchor === "bottom" && toAnchor === "bottom") {
      defaultSplitY = Math.max(from.y, to.y) + 40
    } else if (fromAnchor === "top" && toAnchor === "top") {
      defaultSplitY = Math.min(from.y, to.y) - 40
    } else {
      defaultSplitY = (from.y + to.y) / 2
    }
    const midX = (from.x + to.x) / 2
    return {
      d: `M ${from.x} ${from.y} L ${from.x} ${defaultSplitY} L ${to.x} ${defaultSplitY} L ${to.x} ${to.y}`,
      handlePt: { x: midX, y: defaultSplitY },
      handleType: "horizontal-segment",
      labelPt: { x: midX, y: defaultSplitY },
    }
  }

  if (isFromHorizontal && !isToHorizontal) {
    return {
      d: `M ${from.x} ${from.y} L ${to.x} ${from.y} L ${to.x} ${to.y}`,
      handlePt: { x: to.x, y: from.y },
      handleType: "point",
      labelPt: { x: (from.x + to.x) / 2, y: from.y },
    }
  }

  return {
    d: `M ${from.x} ${from.y} L ${from.x} ${to.y} L ${to.x} ${to.y}`,
    handlePt: { x: from.x, y: to.y },
    handleType: "point",
    labelPt: { x: from.x, y: (from.y + to.y) / 2 },
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
 * Given a path `d` string and a click position, return a rough parameter t
 * and the closest point on the path as a canvas-space Point.
 * Used for inserting new waypoints at click location.
 */
function findClosestPointOnPath(
  pathEl: SVGPathElement,
  clientX: number,
  clientY: number,
  camera: Camera
): { pt: Point; insertAfterIndex: number } | null {
  try {
    const totalLen = pathEl.getTotalLength()
    let best = Infinity
    let bestPt: Point = { x: 0, y: 0 }
    let bestLen = 0
    const steps = 200

    for (let i = 0; i <= steps; i++) {
      const len = (i / steps) * totalLen
      const svgPt = pathEl.getPointAtLength(len)
      const canvasPt = {
        x: (clientX - camera.x) / camera.zoom,
        y: (clientY - camera.y) / camera.zoom,
      }
      const dx = svgPt.x - canvasPt.x
      const dy = svgPt.y - canvasPt.y
      const dist2 = dx * dx + dy * dy
      if (dist2 < best) {
        best = dist2
        bestPt = { x: Math.round(svgPt.x), y: Math.round(svgPt.y) }
        bestLen = len
      }
    }

    // Determine insert-after index: proportion along full length → waypoint index
    const t = bestLen / totalLen
    const insertAfterIndex = Math.floor(t * 1000) // will be resolved in the caller
    return { pt: bestPt, insertAfterIndex: Math.round(t * 100) }
  } catch {
    return null
  }
}

/**
 * Computes arrowhead polygon points such that the tip touches the component edge
 */
function arrowheadPoints(tip: Point, toAnchor: AnchorSide, size: number = 10): string {
  const half = size * 0.58
  let p1: Point, p2: Point, p3: Point

  switch (toAnchor) {
    case "left":
      p1 = { x: tip.x, y: tip.y }
      p2 = { x: tip.x - size, y: tip.y - half }
      p3 = { x: tip.x - size, y: tip.y + half }
      break
    case "right":
      p1 = { x: tip.x, y: tip.y }
      p2 = { x: tip.x + size, y: tip.y - half }
      p3 = { x: tip.x + size, y: tip.y + half }
      break
    case "top":
      p1 = { x: tip.x, y: tip.y }
      p2 = { x: tip.x - half, y: tip.y - size }
      p3 = { x: tip.x + half, y: tip.y - size }
      break
    case "bottom":
    default:
      p1 = { x: tip.x, y: tip.y }
      p2 = { x: tip.x - half, y: tip.y + size }
      p3 = { x: tip.x + half, y: tip.y + size }
      break
  }
  return `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
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
  const pathRef = useRef<SVGPathElement>(null)

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

  // ── Waypoint mutations ──

  const updateWaypoints = useMutation(({ storage }, pts: Point[]) => {
    ;(storage.get("layers").get(id) as any)?.set("waypoints", pts)
  }, [id])

  const updateFromAnchor = useMutation(({ storage }, anchor: AnchorSide) => {
    ;(storage.get("layers").get(id) as any)?.set("fromAnchor", anchor)
  }, [id])

  const updateToAnchor = useMutation(({ storage }, anchor: AnchorSide) => {
    ;(storage.get("layers").get(id) as any)?.set("toAnchor", anchor)
  }, [id])

  const [isHovered, setIsHovered] = useState(false)

  // ── Drag a single waypoint ──
  const handleWaypointDrag = useCallback((
    e: React.PointerEvent,
    index: number,
    currentWaypoints: Point[]
  ) => {
    e.stopPropagation()
    e.preventDefault()

    const startClientX = e.clientX
    const startClientY = e.clientY
    const startPt = currentWaypoints[index]
    const zoom = camera?.zoom || 1

    const onPointerMove = (ev: PointerEvent) => {
      ev.stopPropagation()
      ev.preventDefault()
      const dx = (ev.clientX - startClientX) / zoom
      const dy = (ev.clientY - startClientY) / zoom
      const newWps = [...currentWaypoints]
      newWps[index] = {
        x: Math.round(startPt.x + dx),
        y: Math.round(startPt.y + dy),
      }
      updateWaypoints(newWps)
    }

    const onPointerUp = (ev: PointerEvent) => {
      ev.stopPropagation()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
  }, [camera?.zoom, updateWaypoints])

  // ── Add waypoint by clicking path ──
  const handlePathClick = useCallback((e: React.MouseEvent) => {
    // Only add waypoint when arrow is selected (selectionColor present)
    if (!selectionColor) return
    if (!camera) return
    e.stopPropagation()

    const pathEl = pathRef.current
    if (!pathEl) return

    const result = findClosestPointOnPath(pathEl, e.clientX, e.clientY, camera)
    if (!result) return

    const currentWaypoints = layer.waypoints ?? []
    const totalPts = currentWaypoints.length + 2 // from + waypoints + to
    // t is 0–100 relative, map to waypoint insertion index
    const relT = result.insertAfterIndex / 100
    const rawInsert = Math.round(relT * (totalPts - 1)) - 1 // index in waypoints[]
    const insertAt = Math.max(0, Math.min(currentWaypoints.length, rawInsert))

    const newWps = [...currentWaypoints]
    newWps.splice(insertAt, 0, result.pt)
    updateWaypoints(newWps)
  }, [selectionColor, camera, layer.waypoints, updateWaypoints])

  // ── Remove waypoint on double-click ──
  const handleWaypointRemove = useCallback((
    e: React.MouseEvent,
    index: number,
    currentWaypoints: Point[]
  ) => {
    e.stopPropagation()
    const newWps = currentWaypoints.filter((_, i) => i !== index)
    updateWaypoints(newWps)
  }, [updateWaypoints])

  // ── Drag endpoint anchors ──
  const handleAnchorDrag = useCallback((e: React.PointerEvent, type: "from" | "to") => {
    e.stopPropagation()
    e.preventDefault()

    const targetLayer = type === "from" ? fromLayer : toLayer
    if (!targetLayer) return

    const centerX = targetLayer.x + targetLayer.width / 2
    const centerY = targetLayer.y + targetLayer.height / 2
    const zoom = camera?.zoom || 1
    const camX = camera?.x || 0
    const camY = camera?.y || 0

    const onPointerMove = (ev: PointerEvent) => {
      ev.stopPropagation()
      const canvasPt = {
        x: (ev.clientX - camX) / zoom,
        y: (ev.clientY - camY) / zoom,
      }
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

    const onPointerUp = (ev: PointerEvent) => {
      ev.stopPropagation()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
  }, [fromLayer, toLayer, layer.fromAnchor, layer.toAnchor, updateFromAnchor, updateToAnchor, camera?.x, camera?.y, camera?.zoom])

  // ── Early return after all hooks ──
  if (!fromLayer || !toLayer) return null

  const fromPt = getAnchorPoint(fromLayer.x, fromLayer.y, fromLayer.width, fromLayer.height, layer.fromAnchor)
  const toPt   = getAnchorPoint(toLayer.x,   toLayer.y,   toLayer.width,   toLayer.height,   layer.toAnchor)

  const isSharp    = layer.arrowStyle === "sharp" || layer.arrowStyle === "orthogonal"
  const isStraight = layer.arrowStyle === "straight"

  // Use waypoints; fall back to converting legacy controlOffset → single waypoint
  let waypoints: Point[] = layer.waypoints ?? []
  if (waypoints.length === 0 && layer.controlOffset) {
    const ox = layer.controlOffset.x
    const oy = layer.controlOffset.y
    if (Math.abs(ox) > 2 || Math.abs(oy) > 2) {
      const midX = (fromPt.x + toPt.x) / 2
      const midY = (fromPt.y + toPt.y) / 2
      waypoints = [{ x: Math.round(midX + ox), y: Math.round(midY + oy) }]
    }
  }

  let pathResult: PathResult
  if (isSharp) {
    pathResult = buildOrthogonalPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor, waypoints)
  } else if (isStraight) {
    pathResult = buildStraightPath(fromPt, toPt, waypoints)
  } else {
    pathResult = buildCubicPath(fromPt, toPt, layer.fromAnchor, layer.toAnchor, waypoints)
  }

  const pathD    = pathResult.d
  const mid      = pathResult.labelPt
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

      {/* ── SELECTION HIGHLIGHT ── */}
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

          {/* Source Anchor Handle */}
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
            <title>Drag to change source anchor side</title>
          </g>

          {/* Destination Anchor Handle */}
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
            <title>Drag to change destination anchor side</title>
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
          layer.strokePattern === "dotted"
            ? "3 4"
            : layer.strokePattern === "dashed"
            ? "7 5"
            : undefined
        }
        // When selected, clicking on the path line inserts a new waypoint
        onClick={selectionColor ? handlePathClick : undefined}
        style={selectionColor ? { cursor: "crosshair" } : undefined}
      />

      {/* Destination Arrowhead */}
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

      {/* Source Arrowhead for Bidirectional */}
      {layer.direction === "bidirectional" && (
        <polygon
          points={arrowheadPoints(fromPt, layer.fromAnchor)}
          fill={stroke}
          stroke={stroke}
          strokeWidth={1}
        />
      )}

      {/* ── Causal Sequential Request Propagation ── */}
      {isSimulating && (
        <g style={{ pointerEvents: "none" }}>
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

          <g>
            <animate
              attributeName="opacity"
              dur={`${totalDur}s`}
              repeatCount="indefinite"
              values={normalOpacityValues}
              keyTimes={normalOpacityKeyTimes}
            />
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

      {/* ── Midpoint label pill & Sequence Flow Badge ── */}
      {hasLabel && !editing && (
        <g style={{ pointerEvents: "all" }}>
          {isStepOnly ? (
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
            <g>
              <rect
                x={mid.x - pillW / 2 + 1}
                y={mid.y - pillH / 2 + 2}
                width={pillW}
                height={pillH}
                rx={pillH / 2}
                fill="rgba(0,0,0,0.12)"
              />
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

      {/* ── Inline editor ── */}
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

      {/* ── MULTI-WAYPOINT HANDLES (shown when selected or hovered) ── */}
      {(selectionColor || isHovered) && (
        <g className="pointer-events-auto">
          {/* "+" hint label on path when selected and no waypoints yet */}
          {selectionColor && waypoints.length === 0 && (
            <g className="pointer-events-none" opacity={0.55}>
              <text
                x={mid.x}
                y={mid.y - 18}
                textAnchor="middle"
                fill={selectionColor}
                fontSize={10}
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight={600}
              >
                Click path to add points
              </text>
            </g>
          )}

          {/* Render each waypoint as a draggable diamond handle */}
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
              {/* Large invisible hit area */}
              <circle cx={wp.x} cy={wp.y} r={18} fill="transparent" />

              {/* Glow aura */}
              <circle
                cx={wp.x}
                cy={wp.y}
                r={12}
                fill={selectionColor ? `${selectionColor}28` : "rgba(99,102,241,0.2)"}
                className="pointer-events-none"
              />

              {/* Diamond shape */}
              <polygon
                points={`${wp.x},${wp.y - 9} ${wp.x + 9},${wp.y} ${wp.x},${wp.y + 9} ${wp.x - 9},${wp.y}`}
                fill="#ffffff"
                stroke={selectionColor || stroke}
                strokeWidth={2}
                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.25))" }}
                className="pointer-events-none"
              />

              {/* Center dot */}
              <circle
                cx={wp.x}
                cy={wp.y}
                r={2.5}
                fill={selectionColor || stroke}
                className="pointer-events-none"
              />

              {/* Index badge for multi-waypoint clarity */}
              {waypoints.length > 1 && (
                <text
                  x={wp.x}
                  y={wp.y + 3.5}
                  textAnchor="middle"
                  fill={selectionColor || stroke}
                  fontSize={8}
                  fontWeight={700}
                  fontFamily="JetBrains Mono, monospace"
                  style={{ userSelect: "none" }}
                  className="pointer-events-none"
                >
                  {i + 1}
                </text>
              )}

              <title>Drag to move · Double-click to remove</title>
            </g>
          ))}

          {/* "Clear all waypoints" button — shown when 2+ waypoints exist */}
          {selectionColor && waypoints.length >= 2 && (
            <g
              className="cursor-pointer pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation()
                updateWaypoints([])
              }}
            >
              <rect
                x={mid.x - 36}
                y={mid.y + 18}
                width={72}
                height={18}
                rx={9}
                fill="rgba(239,68,68,0.12)"
                stroke="#ef4444"
                strokeWidth={1}
              />
              <text
                x={mid.x}
                y={mid.y + 30}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={9}
                fontWeight={700}
                fontFamily="Inter, system-ui, sans-serif"
                style={{ userSelect: "none" }}
              >
                Clear path
              </text>
            </g>
          )}
        </g>
      )}
    </g>
  )
})
