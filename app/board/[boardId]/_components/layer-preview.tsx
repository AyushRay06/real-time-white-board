"use client"

import { LayerType, CanvasMode, CanvasState } from "@/types/canvas"
import { useStorage } from "@liveblocks/react/suspense"
import { memo } from "react"
import { Rectangle } from "./rectangle"
import { Ellipse } from "./ellipse"
import { Text } from "./text"
import { Note } from "./note"
import { Path } from "./path"
import { colorToCss } from "@/lib/utils"
import { SysComponentLayer } from "./sys-component-layer"
import { ArrowLayerComponent } from "./arrow-layer"
import { SectionLayerComponent } from "./section-layer"
import { SysDocLayer } from "./sys-doc-layer"

interface LayerPreviewProps {
  id: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
  onLayerDoubleClick?: (layerId: string) => void
  selectionColor?: string
  canvasState?: CanvasState
  connectingFromId?: string | null
  onConnectClick?: (layerId: string) => void
  onStartRelationConnect?: (layerId: string, fieldName: string) => void
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, onLayerDoubleClick, selectionColor, canvasState, connectingFromId, onConnectClick, onStartRelationConnect }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))

    if (!layer) return null

    const isConnecting = canvasState?.mode === CanvasMode.Connecting

    switch (layer.type) {
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={selectionColor}
          />
        )
      case LayerType.Note:
        return <Note id={id} layer={layer} onPointDown={onLayerPointerDown} selectionColor={selectionColor} />
      case LayerType.Text:
        return <Text id={id} layer={layer} onPointDown={onLayerPointerDown} selectionColor={selectionColor} />
      case LayerType.Rectangle:
        return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
      case LayerType.Ellipse:
        return <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
      case LayerType.Doc:
        return (
          <SysDocLayer
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            onDoubleClick={onLayerDoubleClick}
            isConnecting={isConnecting}
            isConnectingFrom={connectingFromId === id}
            onConnectClick={onConnectClick}
            onStartRelationConnect={onStartRelationConnect}
          />
        )
      case LayerType.Component:
        return (
          <SysComponentLayer
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            isConnecting={isConnecting}
            isConnectingFrom={connectingFromId === id}
            onConnectClick={onConnectClick}
            onDoubleClick={onLayerDoubleClick}
          />
        )
      case LayerType.Arrow:
        return (
          <ArrowLayerComponent
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        )
      case LayerType.Section:
        return (
          <SectionLayerComponent
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            onDoubleClick={onLayerDoubleClick}
          />
        )
      default:
        console.warn("Unknown layer type")
        return null
    }
  }
)

LayerPreview.displayName = "LayerPreview"
