import { Layer, LayerType, Color, Camera, SysComponent, ComponentLayer, ArrowLayer, SectionLayer, DocLayer } from "@/types/canvas"
import { colorToCss, getFontFamilyCss, getContrastingTextColor } from "@/lib/utils"
import { COMPONENT_LABELS, getComponentTheme } from "./sys-component-layer"
import { toast } from "sonner"

interface ExportOptions {
  format: "png" | "svg" | "json" | "mermaid"
  boardId: string
  layers: ReadonlyMap<string, Layer>
  layerIds: readonly string[]
  theme: "dark" | "light"
  svgElement: SVGSVGElement | null
  camera: Camera
}

/**
 * Downloads a Blob as a file with the given filename
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * Downloads a data URL as a file with the given filename
 */
function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a")
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * Computes the diagram bounding box across all active layers
 */
function computeDiagramBounds(layers: ReadonlyMap<string, Layer>, layerIds: readonly string[]) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let count = 0

  layerIds.forEach((id) => {
    const l = layers.get(id)
    if (!l) return
    count++
    minX = Math.min(minX, l.x)
    minY = Math.min(minY, l.y)
    maxX = Math.max(maxX, l.x + (l.width || 100))
    maxY = Math.max(maxY, l.y + (l.height || 100))
  })

  if (count === 0 || minX === Infinity) {
    return { x: 0, y: 0, width: 1200, height: 800, isEmpty: true }
  }

  const padding = 60
  return {
    x: minX - padding,
    y: minY - padding,
    width: Math.max(400, maxX - minX + padding * 2),
    height: Math.max(300, maxY - minY + padding * 2),
    isEmpty: false,
  }
}

/**
 * Exports diagram as Mermaid.js flowchart markdown
 */
function exportMermaid(boardId: string, layers: ReadonlyMap<string, Layer>, layerIds: readonly string[]) {
  let mmd = "flowchart LR\n"
  layerIds.forEach((id) => {
    const l = layers.get(id)
    if (!l) return
    const safeId = `node_${id.replace(/[^a-zA-Z0-9_]/g, "_")}`
    if (l.type === LayerType.Component) {
      const comp = l as any
      const label = (comp.value || comp.label || COMPONENT_LABELS[comp.componentType as SysComponent] || "Node").replace(/["\n]/g, " ")
      mmd += `  ${safeId}["${label}"]\n`
    } else if (l.type === LayerType.Rectangle || l.type === LayerType.Note) {
      const shape = l as any
      const label = (shape.value || shape.label || (l.type === LayerType.Note ? "Note" : "Box")).replace(/["\n]/g, " ")
      mmd += `  ${safeId}["${label || "Box"}"]\n`
    }
  })

  layerIds.forEach((id) => {
    const l = layers.get(id)
    if (!l || l.type !== LayerType.Arrow) return
    const arrow = l as any
    const fromId = arrow.fromLayerId
    const toId = arrow.toLayerId
    if (!fromId || !toId) return
    const fromSafe = `node_${fromId.replace(/[^a-zA-Z0-9_]/g, "_")}`
    const toSafe = `node_${toId.replace(/[^a-zA-Z0-9_]/g, "_")}`
    const label = arrow.label ? `|"${arrow.label.replace(/["\n]/g, " ")}"|` : ""
    const isDotted = arrow.strokePattern === "dotted" || arrow.strokePattern === "dashed"
    const isBi = arrow.direction === "bidirectional"

    let connector = "-->"
    if (isDotted && isBi) connector = "<-.->"
    else if (isDotted) connector = "-.->"
    else if (isBi) connector = "<-->"

    mmd += `  ${fromSafe} ${connector}${label} ${toSafe}\n`
  })

  if (navigator.clipboard) {
    navigator.clipboard.writeText(mmd)
  }
  const blob = new Blob([mmd], { type: "text/plain;charset=utf-8" })
  downloadBlob(blob, `architecture-flowchart-${boardId}.mmd`)
  toast.success("Mermaid diagram copied to clipboard & downloaded!")
}

/**
 * Exports diagram as JSON schema
 */
function exportJson(boardId: string, layers: ReadonlyMap<string, Layer>, layerIds: readonly string[]) {
  const data: Record<string, any> = {}
  layerIds.forEach((id) => {
    const l = layers.get(id)
    if (l) data[id] = l
  })
  const blob = new Blob([JSON.stringify({ layerIds, layers: data }, null, 2)], {
    type: "application/json",
  })
  downloadBlob(blob, `architecture-diagram-${boardId}.json`)
  toast.success("Diagram JSON exported successfully!")
}

/**
 * Builds a clean, pure-SVG element where all foreignObjects are replaced
 * with native SVG elements, removing canvas-tainting security violations.
 */
function buildPureSvgClone({
  svgElement,
  bounds,
  theme,
  layers,
  layerIds,
}: {
  svgElement: SVGSVGElement
  bounds: { x: number; y: number; width: number; height: number }
  theme: "dark" | "light"
  layers: ReadonlyMap<string, Layer>
  layerIds: readonly string[]
}): SVGSVGElement {
  const clone = svgElement.cloneNode(true) as SVGSVGElement

  // Set standard SVG namespace and dimensions
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg")
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
  clone.setAttribute("width", `${bounds.width}`)
  clone.setAttribute("height", `${bounds.height}`)
  clone.setAttribute("viewBox", `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`)

  // Remove UI helpers, overlays, cursor elements
  const uiSelectors = [
    ".selection-element",
    "g[data-selection-net]",
    ".animate-pulse",
    ".animate-bounce",
    "rect[fillOpacity='0.001']",
  ]
  uiSelectors.forEach((sel) => {
    clone.querySelectorAll(sel).forEach((el) => el.remove())
  })

  // Insert background rect if not present
  const isDark = theme === "dark"
  const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  bgRect.setAttribute("x", `${bounds.x}`)
  bgRect.setAttribute("y", `${bounds.y}`)
  bgRect.setAttribute("width", `${bounds.width}`)
  bgRect.setAttribute("height", `${bounds.height}`)
  bgRect.setAttribute("fill", isDark ? "#0b0f19" : "#f8fafc")

  // Reset top g transform so elements render at their natural canvas coordinates
  const topG = clone.querySelector("g")
  if (topG) {
    topG.removeAttribute("style")
    topG.removeAttribute("transform")
    topG.insertBefore(bgRect, topG.firstChild)
  } else {
    clone.insertBefore(bgRect, clone.firstChild)
  }

  // Convert each foreignObject into pure SVG elements to avoid canvas tainting
  const foreignObjects = Array.from(clone.querySelectorAll("foreignObject"))
  foreignObjects.forEach((fo) => {
    const parent = fo.parentNode
    if (!parent) return

    const foX = parseFloat(fo.getAttribute("x") || "0")
    const foY = parseFloat(fo.getAttribute("y") || "0")
    const foW = parseFloat(fo.getAttribute("width") || "100")
    const foH = parseFloat(fo.getAttribute("height") || "100")

    // Check if this foreignObject belongs to a SysComponentLayer
    const lucideSvg = fo.querySelector("svg")
    const textSpan = fo.querySelector("span:not([style*='borderRadius'])")
    const labelText = textSpan?.textContent?.trim() || ""

    // Check for status badge inside foreignObject
    const statusDiv = fo.querySelector("div[style*='borderRadius: 9999px']")
    const statusText = statusDiv?.textContent?.trim() || ""

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")

    if (lucideSvg) {
      // It's a SysComponentLayer!
      // Draw icon badge box
      const badgeRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      badgeRect.setAttribute("x", `${foX + (foW - 44) / 2}`)
      badgeRect.setAttribute("y", `${foY + 12}`)
      badgeRect.setAttribute("width", "44")
      badgeRect.setAttribute("height", "44")
      badgeRect.setAttribute("rx", "10")
      badgeRect.setAttribute("fill", isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)")
      g.appendChild(badgeRect)

      // Clone the lucide icon into an SVG group
      const iconGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
      iconGroup.setAttribute("transform", `translate(${foX + (foW - 24) / 2}, ${foY + 22})`)
      Array.from(lucideSvg.childNodes).forEach((child) => {
        const clonedChild = child.cloneNode(true)
        iconGroup.appendChild(clonedChild)
      })
      // Copy stroke/fill attributes from lucide svg
      const strokeAttr = lucideSvg.getAttribute("stroke") || lucideSvg.style.color || (isDark ? "#93C5FD" : "#2563EB")
      iconGroup.setAttribute("stroke", strokeAttr)
      iconGroup.setAttribute("stroke-width", lucideSvg.getAttribute("stroke-width") || "2")
      iconGroup.setAttribute("fill", "none")
      iconGroup.setAttribute("stroke-linecap", "round")
      iconGroup.setAttribute("stroke-linejoin", "round")
      g.appendChild(iconGroup)

      // Add label text
      if (labelText) {
        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text")
        textEl.setAttribute("x", `${foX + foW / 2}`)
        textEl.setAttribute("y", `${foY + foH - 12}`)
        textEl.setAttribute("text-anchor", "middle")
        textEl.setAttribute("font-family", "Inter, system-ui, -apple-system, sans-serif")
        textEl.setAttribute("font-size", "10")
        textEl.setAttribute("font-weight", "700")
        textEl.setAttribute("fill", isDark ? "#f1f5f9" : "#1e293b")
        textEl.textContent = labelText
        g.appendChild(textEl)
      }

      // Add status badge if present
      if (statusText) {
        const badgeBg = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        badgeBg.setAttribute("x", `${foX + foW - 55}`)
        badgeBg.setAttribute("y", `${foY + 4}`)
        badgeBg.setAttribute("width", "50")
        badgeBg.setAttribute("height", "14")
        badgeBg.setAttribute("rx", "7")
        badgeBg.setAttribute("fill", isDark ? "rgba(34, 197, 94, 0.25)" : "#DCFCE7")
        badgeBg.setAttribute("stroke", isDark ? "rgba(74, 222, 128, 0.4)" : "#86EFAC")
        badgeBg.setAttribute("stroke-width", "1")
        g.appendChild(badgeBg)

        const badgeTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text")
        badgeTextEl.setAttribute("x", `${foX + foW - 30}`)
        badgeTextEl.setAttribute("y", `${foY + 14}`)
        badgeTextEl.setAttribute("text-anchor", "middle")
        badgeTextEl.setAttribute("font-family", "Inter, system-ui, sans-serif")
        badgeTextEl.setAttribute("font-size", "8")
        badgeTextEl.setAttribute("font-weight", "700")
        badgeTextEl.setAttribute("fill", isDark ? "#4ADE80" : "#15803D")
        badgeTextEl.textContent = statusText
        g.appendChild(badgeTextEl)
      }
    } else {
      // It's a text/note/shape embedded foreignObject
      const editable = (fo.querySelector("[contenteditable]") || fo.firstElementChild) as HTMLElement | null
      const rawText = editable?.textContent?.trim() || fo.textContent?.trim() || ""
      if (rawText) {
        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text")
        const align = editable?.style.textAlign || "center"
        const anchor = align === "left" ? "start" : align === "right" ? "end" : "middle"
        const tx = align === "left" ? foX + 8 : align === "right" ? foX + foW - 8 : foX + foW / 2
        textEl.setAttribute("x", `${tx}`)
        textEl.setAttribute("y", `${foY + foH / 2 + 5}`)
        textEl.setAttribute("text-anchor", anchor)
        textEl.setAttribute("font-family", editable?.style.fontFamily || "Inter, system-ui, -apple-system, sans-serif")
        textEl.setAttribute("font-size", editable?.style.fontSize || "16px")
        textEl.setAttribute("font-weight", editable?.style.fontWeight || "600")
        textEl.setAttribute("fill", editable?.style.color || (isDark ? "#f1f5f9" : "#1e293b"))
        textEl.textContent = rawText
        g.appendChild(textEl)
      }
    }

    parent.replaceChild(g, fo)
  })

  return clone
}

/**
 * Direct Canvas Fallback Renderer:
 * If SVG rasterization ever encounters an issue, this renders all layers
 * directly to a 2D canvas with 100% reliability.
 */
function renderDiagramDirectToCanvas({
  layers,
  layerIds,
  bounds,
  theme,
}: {
  layers: ReadonlyMap<string, Layer>
  layerIds: readonly string[]
  bounds: { x: number; y: number; width: number; height: number }
  theme: "dark" | "light"
}): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  const scale = 2
  canvas.width = bounds.width * scale
  canvas.height = bounds.height * scale

  const ctx = canvas.getContext("2d")
  if (!ctx) return canvas

  ctx.scale(scale, scale)
  ctx.translate(-bounds.x, -bounds.y)

  const isDark = theme === "dark"

  // 1. Background
  ctx.fillStyle = isDark ? "#0b0f19" : "#f8fafc"
  ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height)

  // 2. Render each layer in z-index order
  layerIds.forEach((id) => {
    const layer = layers.get(id)
    if (!layer) return

    ctx.save()

    switch (layer.type) {
      case LayerType.Section: {
        const sec = layer as SectionLayer
        const r = sec.fill?.r ?? 99
        const g = sec.fill?.g ?? 102
        const b = sec.fill?.b ?? 241
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${isDark ? 0.12 : 0.07})`
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.5)`
        ctx.lineWidth = 2
        if (sec.strokePattern === "dashed") ctx.setLineDash([8, 6])
        else if (sec.strokePattern === "dotted") ctx.setLineDash([3, 4])

        // Round rect
        ctx.beginPath()
        ctx.roundRect(sec.x, sec.y, sec.width, sec.height, 16)
        ctx.fill()
        ctx.stroke()

        // Header badge
        ctx.setLineDash([])
        ctx.fillStyle = isDark ? "#1e293b" : "#ffffff"
        ctx.strokeStyle = isDark ? "#475569" : "#cbd5e1"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(sec.x + 12, sec.y + 12, 160, 26, 6)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = isDark ? "#f1f5f9" : "#1e293b"
        ctx.font = "600 11px Inter, system-ui, sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(sec.value || "Architecture Zone", sec.x + 24, sec.y + 25)
        break
      }

      case LayerType.Doc: {
        const doc = layer as DocLayer
        const docType = doc.docType || "requirements"

        // Drop shadow
        ctx.fillStyle = isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.08)"
        ctx.beginPath()
        ctx.roundRect(doc.x + 2, doc.y + 4, doc.width, doc.height, 16)
        ctx.fill()

        // Card body
        ctx.fillStyle = isDark ? "#0f172a" : "#ffffff"
        ctx.strokeStyle = isDark ? "#334155" : "#e2e8f0"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.roundRect(doc.x, doc.y, doc.width, doc.height, 16)
        ctx.fill()
        ctx.stroke()

        // Header bar
        ctx.fillStyle = isDark ? "#1e293b" : "#f8fafc"
        ctx.beginPath()
        ctx.roundRect(doc.x, doc.y, doc.width, 42, [16, 16, 0, 0])
        ctx.fill()

        // Header bottom border
        ctx.strokeStyle = isDark ? "#334155" : "#e2e8f0"
        ctx.beginPath()
        ctx.moveTo(doc.x, doc.y + 42)
        ctx.lineTo(doc.x + doc.width, doc.y + 42)
        ctx.stroke()

        // Header title
        ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a"
        ctx.font = "bold 12px Inter, system-ui, sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(doc.title || "System Design Specification", doc.x + 16, doc.y + 21)

        // Parse items
        let items: any[] = []
        try {
          items = doc.itemsJson ? JSON.parse(doc.itemsJson) : []
        } catch {}

        // Render rows
        let rowY = doc.y + 54
        items.slice(0, 8).forEach((item) => {
          if (rowY + 28 > doc.y + doc.height) return

          if (docType === "requirements") {
            const isFunc = item.type === "functional"
            ctx.fillStyle = isFunc ? "#6366f1" : "#a855f7"
            ctx.font = "bold 9px Inter, sans-serif"
            ctx.fillText(isFunc ? "FUNC" : "NON-FUNC", doc.x + 16, rowY + 10)

            ctx.fillStyle = item.priority === "P0" ? "#f43f5e" : "#f59e0b"
            ctx.fillText(item.priority || "P0", doc.x + 80, rowY + 10)

            ctx.fillStyle = isDark ? "#cbd5e1" : "#334155"
            ctx.font = "11px Inter, sans-serif"
            ctx.fillText(item.text || "", doc.x + 110, rowY + 10, doc.width - 125)
          } else if (docType === "api") {
            ctx.fillStyle = item.method === "GET" ? "#10b981" : item.method === "POST" ? "#3b82f6" : item.method === "DELETE" ? "#f43f5e" : "#f59e0b"
            ctx.font = "bold 10px monospace"
            ctx.fillText(item.method || "GET", doc.x + 16, rowY + 10)

            ctx.fillStyle = isDark ? "#93c5fd" : "#1d4ed8"
            ctx.fillText(item.path || "", doc.x + 75, rowY + 10, 160)

            ctx.fillStyle = isDark ? "#cbd5e1" : "#334155"
            ctx.font = "11px Inter, sans-serif"
            ctx.fillText(item.description || "", doc.x + 245, rowY + 10, doc.width - 260)
          } else if (docType === "estimation") {
            ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a"
            ctx.font = "bold 11px Inter, sans-serif"
            ctx.fillText(item.metric || "", doc.x + 16, rowY + 10, 140)

            ctx.fillStyle = "#f59e0b"
            ctx.font = "bold 11px monospace"
            ctx.fillText(item.value || "", doc.x + 165, rowY + 10, 90)

            ctx.fillStyle = isDark ? "#94a3b8" : "#64748b"
            ctx.font = "10px Inter, sans-serif"
            ctx.fillText(item.notes || "", doc.x + 265, rowY + 10, doc.width - 280)
          } else if (docType === "bottlenecks") {
            ctx.fillStyle = item.severity === "Critical" ? "#f43f5e" : "#f59e0b"
            ctx.font = "bold 10px Inter, sans-serif"
            ctx.fillText(`[${item.severity || "Risk"}]`, doc.x + 16, rowY + 10)

            ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a"
            ctx.fillText(item.component || "", doc.x + 80, rowY + 10, 160)

            ctx.fillStyle = isDark ? "#818cf8" : "#4f46e5"
            ctx.font = "10px Inter, sans-serif"
            ctx.fillText(`→ ${item.mitigation || ""}`, doc.x + 250, rowY + 10, doc.width - 265)
          }

          rowY += 28
        })

        break
      }

      case LayerType.Component: {
        const comp = layer as ComponentLayer
        const t = getComponentTheme(comp.componentType, comp.customColor, isDark)
        const label = comp.value || COMPONENT_LABELS[comp.componentType] || comp.componentType

        // Card Drop Shadow
        ctx.fillStyle = isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.06)"
        ctx.beginPath()
        ctx.roundRect(comp.x + 2, comp.y + 4, comp.width, comp.height, 12)
        ctx.fill()

        // Card Body
        ctx.fillStyle = isDark ? "#0f172a" : (t.bg || "#ffffff")
        ctx.strokeStyle = t.border || "#93c5fd"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.roundRect(comp.x, comp.y, comp.width, comp.height, 12)
        ctx.fill()
        ctx.stroke()

        // Luminous gradient tint inside card for dark mode
        if (isDark) {
          ctx.fillStyle = t.bg || "rgba(99, 102, 241, 0.18)"
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, comp.width, comp.height, 12)
          ctx.fill()
        }

        // Icon badge container
        ctx.fillStyle = t.badge || (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)")
        ctx.beginPath()
        ctx.roundRect(comp.x + (comp.width - 44) / 2, comp.y + 12, 44, 44, 10)
        ctx.fill()

        // Icon representation (central geometric accent)
        ctx.fillStyle = t.icon || (isDark ? "#818cf8" : "#4f46e5")
        ctx.beginPath()
        ctx.arc(comp.x + comp.width / 2, comp.y + 34, 10, 0, Math.PI * 2)
        ctx.fill()

        // Component Label
        ctx.fillStyle = t.text || (isDark ? "#f8fafc" : "#1e40af")
        ctx.font = "bold 10px Inter, system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(label, comp.x + comp.width / 2, comp.y + comp.height - 12, comp.width - 12)
        break
      }

      case LayerType.Rectangle: {
        const rect = layer as any
        const fillStyle = rect.fillStyle || "solid"
        const strokeWidth = rect.strokeWidth || 2
        const strokePattern = rect.strokePattern || "solid"
        const roundness = rect.roundness || "rounded"
        const radius = roundness === "sharp" ? 0 : 12

        ctx.lineWidth = strokeWidth
        if (strokePattern === "dashed") ctx.setLineDash([8, 6])
        else if (strokePattern === "dotted") ctx.setLineDash([3, 4])
        else ctx.setLineDash([])

        const baseColor = rect.fill ? colorToCss(rect.fill) : "#3b82f6"
        if (fillStyle === "transparent") {
          ctx.fillStyle = "transparent"
        } else if (fillStyle === "semi") {
          const r = rect.fill?.r ?? 59
          const g = rect.fill?.g ?? 130
          const b = rect.fill?.b ?? 246
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${isDark ? 0.22 : 0.15})`
        } else {
          ctx.fillStyle = baseColor
        }

        ctx.beginPath()
        ctx.roundRect(rect.x, rect.y, rect.width, rect.height, radius)
        if (fillStyle !== "transparent") ctx.fill()

        if (fillStyle !== "solid" || strokePattern !== "solid") {
          ctx.strokeStyle = baseColor
          ctx.stroke()
        }

        // Embedded text inside rectangle
        if (rect.value) {
          let textColor = isDark ? "#f8fafc" : "#0f172a"
          if (fillStyle === "solid" && rect.fill) {
            textColor = getContrastingTextColor(rect.fill)
          }
          ctx.fillStyle = textColor
          const fontSize = rect.fontSize || 18
          const fontWeight = rect.fontWeight === "bold" ? "bold " : ""
          ctx.font = `${fontWeight}${fontSize}px ${getFontFamilyCss(rect.fontFamily)}`
          ctx.textAlign = rect.textAlign || "center"
          ctx.textBaseline = "middle"
          const tx = rect.textAlign === "left" ? rect.x + 12 : rect.textAlign === "right" ? rect.x + rect.width - 12 : rect.x + rect.width / 2
          ctx.fillText(rect.value, tx, rect.y + rect.height / 2, rect.width - 24)
        }
        break
      }

      case LayerType.Ellipse: {
        const ell = layer as any
        const fillStyle = ell.fillStyle || "solid"
        const strokeWidth = ell.strokeWidth || 2
        const strokePattern = ell.strokePattern || "solid"

        ctx.lineWidth = strokeWidth
        if (strokePattern === "dashed") ctx.setLineDash([8, 6])
        else if (strokePattern === "dotted") ctx.setLineDash([3, 4])
        else ctx.setLineDash([])

        const baseColor = ell.fill ? colorToCss(ell.fill) : "#3b82f6"
        if (fillStyle === "transparent") {
          ctx.fillStyle = "transparent"
        } else if (fillStyle === "semi") {
          const r = ell.fill?.r ?? 59
          const g = ell.fill?.g ?? 130
          const b = ell.fill?.b ?? 246
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${isDark ? 0.22 : 0.15})`
        } else {
          ctx.fillStyle = baseColor
        }

        ctx.beginPath()
        ctx.ellipse(
          ell.x + ell.width / 2,
          ell.y + ell.height / 2,
          ell.width / 2,
          ell.height / 2,
          0,
          0,
          Math.PI * 2
        )
        if (fillStyle !== "transparent") ctx.fill()

        if (fillStyle !== "solid" || strokePattern !== "solid") {
          ctx.strokeStyle = baseColor
          ctx.stroke()
        }

        // Embedded text inside ellipse
        if (ell.value) {
          let textColor = isDark ? "#f8fafc" : "#0f172a"
          if (fillStyle === "solid" && ell.fill) {
            textColor = getContrastingTextColor(ell.fill)
          }
          ctx.fillStyle = textColor
          const fontSize = ell.fontSize || 18
          const fontWeight = ell.fontWeight === "bold" ? "bold " : ""
          ctx.font = `${fontWeight}${fontSize}px ${getFontFamilyCss(ell.fontFamily)}`
          ctx.textAlign = ell.textAlign || "center"
          ctx.textBaseline = "middle"
          ctx.fillText(ell.value, ell.x + ell.width / 2, ell.y + ell.height / 2, ell.width * 0.7)
        }
        break
      }

      case LayerType.Note: {
        const note = layer as any
        ctx.fillStyle = note.fill ? colorToCss(note.fill) : "#fef08a"
        ctx.beginPath()
        ctx.roundRect(note.x, note.y, note.width, note.height, 8)
        ctx.fill()
        if (note.value) {
          ctx.fillStyle = note.fill ? getContrastingTextColor(note.fill) : "#1c1917"
          const fontSize = note.fontSize || 20
          const fontWeight = note.fontWeight === "bold" ? "bold " : ""
          ctx.font = `${fontWeight}${fontSize}px ${getFontFamilyCss(note.fontFamily || "handwriting")}`
          ctx.textAlign = note.textAlign || "center"
          ctx.textBaseline = "middle"
          const tx = note.textAlign === "left" ? note.x + 12 : note.textAlign === "right" ? note.x + note.width - 12 : note.x + note.width / 2
          ctx.fillText(note.value, tx, note.y + note.height / 2, note.width - 24)
        }
        break
      }

      case LayerType.Text: {
        const textLayer = layer as any
        let textColor = isDark ? "#f8fafc" : "#0f172a"
        if (textLayer.fill) {
          const isDefaultBlack = textLayer.fill.r <= 25 && textLayer.fill.g <= 25 && textLayer.fill.b <= 25
          if (isDark && isDefaultBlack) {
            textColor = "#f8fafc"
          } else {
            textColor = colorToCss(textLayer.fill)
          }
        }
        ctx.fillStyle = textColor
        const fontSize = textLayer.fontSize || 24
        const fontWeight = textLayer.fontWeight === "bold" ? "bold " : ""
        const fontStyle = textLayer.fontStyle === "italic" ? "italic " : ""
        ctx.font = `${fontStyle}${fontWeight}${fontSize}px ${getFontFamilyCss(textLayer.fontFamily)}`
        const textAlign = textLayer.textAlign || "left"
        ctx.textAlign = textAlign
        ctx.textBaseline = "middle"
        const tx = textAlign === "center" ? textLayer.x + textLayer.width / 2 : textAlign === "right" ? textLayer.x + textLayer.width - 8 : textLayer.x + 8
        ctx.fillText(textLayer.value || "Text", tx, textLayer.y + textLayer.height / 2, textLayer.width)
        break
      }

      case LayerType.Arrow: {
        const arrow = layer as ArrowLayer
        const fromL = layers.get(arrow.fromLayerId)
        const toL = layers.get(arrow.toLayerId)
        if (!fromL || !toL) break

        const fx = fromL.x + fromL.width / 2
        const fy = fromL.y + fromL.height / 2
        const tx = toL.x + toL.width / 2
        const ty = toL.y + toL.height / 2

        ctx.strokeStyle = arrow.fill ? colorToCss(arrow.fill) : (isDark ? "#818cf8" : "#4f46e5")
        ctx.lineWidth = 2.5
        if (arrow.strokePattern === "dashed") ctx.setLineDash([8, 6])
        else if (arrow.strokePattern === "dotted") ctx.setLineDash([3, 4])

        ctx.beginPath()
        ctx.moveTo(fx, fy)
        ctx.lineTo(tx, ty)
        ctx.stroke()
        break
      }
    }

    ctx.restore()
  })

  return canvas
}

/**
 * Main export handler
 */
export async function exportDiagram({
  format,
  boardId,
  layers,
  layerIds,
  theme,
  svgElement,
  camera,
}: ExportOptions): Promise<void> {
  // 1. Mermaid Export
  if (format === "mermaid") {
    exportMermaid(boardId, layers, layerIds)
    return
  }

  // 2. JSON Export
  if (format === "json") {
    exportJson(boardId, layers, layerIds)
    return
  }

  const bounds = computeDiagramBounds(layers, layerIds)

  // 3. SVG Vector Export
  if (format === "svg") {
    if (!svgElement) {
      toast.error("SVG canvas not ready for export")
      return
    }
    try {
      const pureSvg = buildPureSvgClone({ svgElement, bounds, theme, layers, layerIds })
      const svgStr = new XMLSerializer().serializeToString(pureSvg)
      const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" })
      downloadBlob(blob, `architecture-diagram-${boardId}.svg`)
      toast.success("Vector SVG downloaded successfully!")
    } catch (err) {
      console.error("SVG export error:", err)
      toast.error("Failed to export SVG diagram")
    }
    return
  }

  // 4. PNG Export
  if (format === "png") {
    const loadingToast = toast.loading("Generating high-resolution PNG...")

    const tryDirectCanvasExport = () => {
      try {
        const canvas = renderDiagramDirectToCanvas({ layers, layerIds, bounds, theme })
        const pngUrl = canvas.toDataURL("image/png")
        downloadDataUrl(pngUrl, `architecture-diagram-${boardId}.png`)
        toast.dismiss(loadingToast)
        toast.success("PNG exported successfully!")
      } catch (err) {
        console.error("Direct canvas export failed:", err)
        toast.dismiss(loadingToast)
        toast.error("Failed to generate PNG image")
      }
    }

    if (!svgElement) {
      tryDirectCanvasExport()
      return
    }

    try {
      const pureSvg = buildPureSvgClone({ svgElement, bounds, theme, layers, layerIds })
      const svgStr = new XMLSerializer().serializeToString(pureSvg)
      const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" })
      const blobUrl = URL.createObjectURL(svgBlob)

      const img = new Image()
      img.crossOrigin = "anonymous"

      const timeoutId = setTimeout(() => {
        // If image loading takes longer than 1.5s, fall back to direct canvas
        tryDirectCanvasExport()
        URL.revokeObjectURL(blobUrl)
      }, 1500)

      img.onload = () => {
        clearTimeout(timeoutId)
        try {
          const scale = 2
          const canvas = document.createElement("canvas")
          canvas.width = bounds.width * scale
          canvas.height = bounds.height * scale

          const ctx = canvas.getContext("2d")
          if (!ctx) {
            tryDirectCanvasExport()
            URL.revokeObjectURL(blobUrl)
            return
          }

          ctx.scale(scale, scale)
          ctx.drawImage(img, 0, 0, bounds.width, bounds.height)

          const pngUrl = canvas.toDataURL("image/png")
          downloadDataUrl(pngUrl, `architecture-diagram-${boardId}.png`)
          URL.revokeObjectURL(blobUrl)
          toast.dismiss(loadingToast)
          toast.success("PNG exported successfully!")
        } catch (canvasErr) {
          console.warn("Canvas rasterization fallback:", canvasErr)
          tryDirectCanvasExport()
          URL.revokeObjectURL(blobUrl)
        }
      }

      img.onerror = (err) => {
        clearTimeout(timeoutId)
        console.warn("Image load failed, using direct canvas renderer:", err)
        URL.revokeObjectURL(blobUrl)
        tryDirectCanvasExport()
      }

      img.src = blobUrl
    } catch (err) {
      console.warn("Pure SVG conversion error, using direct canvas fallback:", err)
      tryDirectCanvasExport()
    }
  }
}
