/**
 * Image processing utilities for canvas upload & placement
 */

export interface LoadedImageInfo {
  src: string
  width: number
  height: number
  fileName: string
  aspectRatio: number
}

/**
 * Loads a File or Blob image and calculates natural dimensions and optimal whiteboard display size
 */
export async function processImageFile(file: File): Promise<LoadedImageInfo> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Failed to read image file"))
    reader.onload = () => {
      const src = reader.result as string
      const img = new Image()
      img.onerror = () => reject(new Error("Failed to load image"))
      img.onload = () => {
        const naturalWidth = img.naturalWidth || 400
        const naturalHeight = img.naturalHeight || 300
        const aspectRatio = naturalWidth / naturalHeight

        // Fit nicely on whiteboard (max dimension ~ 480px)
        let displayWidth = naturalWidth
        let displayHeight = naturalHeight

        const MAX_DIM = 480
        if (displayWidth > MAX_DIM || displayHeight > MAX_DIM) {
          if (displayWidth >= displayHeight) {
            displayWidth = MAX_DIM
            displayHeight = Math.round(MAX_DIM / aspectRatio)
          } else {
            displayHeight = MAX_DIM
            displayWidth = Math.round(MAX_DIM * aspectRatio)
          }
        }

        // Minimum bounds
        displayWidth = Math.max(120, displayWidth)
        displayHeight = Math.max(80, displayHeight)

        resolve({
          src,
          width: displayWidth,
          height: displayHeight,
          fileName: file.name,
          aspectRatio,
        })
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Processes an image from a Data URL or URL directly
 */
export async function processImageDataUrl(
  src: string,
  fileName: string = "Pasted-Image.png"
): Promise<LoadedImageInfo> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onerror = () => reject(new Error("Failed to load image from data URL"))
    img.onload = () => {
      const naturalWidth = img.naturalWidth || 400
      const naturalHeight = img.naturalHeight || 300
      const aspectRatio = naturalWidth / naturalHeight

      let displayWidth = naturalWidth
      let displayHeight = naturalHeight

      const MAX_DIM = 480
      if (displayWidth > MAX_DIM || displayHeight > MAX_DIM) {
        if (displayWidth >= displayHeight) {
          displayWidth = MAX_DIM
          displayHeight = Math.round(MAX_DIM / aspectRatio)
        } else {
          displayHeight = MAX_DIM
          displayWidth = Math.round(MAX_DIM * aspectRatio)
        }
      }

      displayWidth = Math.max(120, displayWidth)
      displayHeight = Math.max(80, displayHeight)

      resolve({
        src,
        width: displayWidth,
        height: displayHeight,
        fileName,
        aspectRatio,
      })
    }
    img.src = src
  })
}
