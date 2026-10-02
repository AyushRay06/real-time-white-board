/**
 * PDF processing and rendering utilities for whiteboard canvas.
 * Renders multi-page PDF documents into individual high-resolution page layers
 * with full text extraction for readability and interaction.
 */

export interface RenderedPdfPage {
  pageNumber: number
  totalPages: number
  src: string
  width: number
  height: number
  extractedText: string
  aspectRatio: number
}

let pdfjsLibPromise: Promise<any> | null = null

async function getPdfJs() {
  if (typeof window === "undefined") {
    throw new Error("PDF processing can only run in the browser")
  }

  if (!pdfjsLibPromise) {
    pdfjsLibPromise = (async () => {
      // Import the main pdf.js build
      // @ts-ignore
      const pdfjs = await import("pdfjs-dist/build/pdf")
      
      // Point to local public worker for fast offline execution
      const workerUrl = `${window.location.origin}/pdf.worker.min.js`
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
      
      return pdfjs
    })()
  }

  return pdfjsLibPromise
}

/**
 * Extracts and renders each page of a PDF file to high-resolution images.
 */
export async function renderPdfPages(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<RenderedPdfPage[]> {
  const pdfjs = await getPdfJs()
  const arrayBuffer = await file.arrayBuffer()

  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(arrayBuffer),
    cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/",
    cMapPacked: true,
  })

  const pdf = await loadingTask.promise
  const numPages = pdf.numPages
  const results: RenderedPdfPage[] = []

  // High-DPI scale for crystal clear text and diagrams
  const RENDER_SCALE = 2.0
  const DEFAULT_DISPLAY_WIDTH = 520

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    if (onProgress) {
      onProgress(pageNum, numPages)
    }

    const page = await pdf.getPage(pageNum)
    const viewport = page.getViewport({ scale: RENDER_SCALE })

    // Create an offscreen canvas
    const canvas = document.createElement("canvas")
    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    const ctx = canvas.getContext("2d", { alpha: false })

    if (ctx) {
      // Fill crisp white page background (prevents dark or transparent PDF backgrounds)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Render page
    const renderContext = {
      canvasContext: ctx!,
      viewport: viewport,
    }

    await page.render(renderContext).promise

    // Extract text content from the PDF page
    let extractedText = ""
    try {
      const textContent = await page.getTextContent()
      extractedText = textContent.items
        .map((item: any) => item.str || "")
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()
    } catch (e) {
      console.warn(`Could not extract text for page ${pageNum}:`, e)
    }

    // High quality JPEG for memory & network efficiency across Liveblocks
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92)

    const aspectRatio = viewport.width / viewport.height
    const displayWidth = DEFAULT_DISPLAY_WIDTH
    const displayHeight = Math.round(displayWidth / aspectRatio)

    results.push({
      pageNumber: pageNum,
      totalPages: numPages,
      src: dataUrl,
      width: displayWidth,
      height: displayHeight,
      extractedText,
      aspectRatio,
    })

    // Clean up canvas
    canvas.width = 0
    canvas.height = 0
  }

  return results
}
