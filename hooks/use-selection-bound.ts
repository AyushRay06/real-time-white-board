import { shallow } from "@liveblocks/client"

import { LayerType, XYWH } from "@/types/canvas"
import { useStorage, useSelf } from "@liveblocks/react/suspense"
import { getAnchorPoint } from "@/app/board/[boardId]/_components/sys-component-layer"

interface LayerBounds {
  x: number
  y: number
  width: number
  height: number
}

const boundingBox = (boundsList: LayerBounds[]): XYWH | null => {
  const first = boundsList[0]

  if (!first) {
    return null
  }

  let left = first.x
  let right = first.x + first.width
  let top = first.y
  let bottom = first.y + first.height

  for (let i = 1; i < boundsList.length; i++) {
    const { x, y, width, height } = boundsList[i]

    if (left > x) {
      left = x
    }

    if (right < x + width) {
      right = x + width
    }

    if (top > y) {
      top = y
    }

    if (bottom < y + height) {
      bottom = y + height
    }
  }
  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  }
}

export const useSelectionBounds = () => {
  const selection = useSelf((me) => me.presence.selection)

  return useStorage((root) => {
    const boundsList: LayerBounds[] = []

    for (const layerId of selection) {
      const layer = root.layers.get(layerId)
      if (!layer) continue

      if (layer.type === LayerType.Arrow) {
        const arrow = layer as any
        const fromLayer = arrow.fromLayerId ? root.layers.get(arrow.fromLayerId) : null
        const toLayer = arrow.toLayerId ? root.layers.get(arrow.toLayerId) : null

        if (fromLayer && toLayer) {
          const fromPt = getAnchorPoint(
            fromLayer.x,
            fromLayer.y,
            fromLayer.width,
            fromLayer.height,
            arrow.fromAnchor || "right"
          )
          const toPt = getAnchorPoint(
            toLayer.x,
            toLayer.y,
            toLayer.width,
            toLayer.height,
            arrow.toAnchor || "left"
          )

          const minX = Math.min(fromPt.x, toPt.x)
          const maxX = Math.max(fromPt.x, toPt.x)
          const minY = Math.min(fromPt.y, toPt.y)
          const maxY = Math.max(fromPt.y, toPt.y)

          boundsList.push({
            x: minX,
            y: minY,
            width: Math.max(24, maxX - minX),
            height: Math.max(24, maxY - minY),
          })
          continue
        }
      }

      boundsList.push({
        x: layer.x,
        y: layer.y,
        width: layer.width,
        height: layer.height,
      })
    }

    return boundingBox(boundsList)
  }, shallow)
}
