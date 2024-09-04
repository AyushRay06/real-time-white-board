"use client"
import React, { useCallback, useMemo, useState } from "react"
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas"

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import {
  useCanRedo,
  useHistory,
  useCanUndo,
  useMutation,
  useStorage,
  useOthers,
  useOthersMapped,
} from "@liveblocks/react/suspense"
import { CursorsPresence } from "./cursors-presence"
import {
  connectionIdToColor,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils"
import { nanoid } from "nanoid"
import { LiveObject } from "@liveblocks/client"
import { LayerPreview } from "./layer-preview"
import { SelectionBox } from "./selection-box"
import { SelectionTools } from "./selection-tools"
// import { useSelf } from "@liveblocks/react/suspense"

const MAX_LAYERS = 100

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  // const info = useSelf((me) => me.info)

  const layerIds = useStorage((root) => root.layerIds)

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [lastUsedColour, setLastUsedColor] = useState<Color>({
    r: 255,
    g: 0,
    b: 0,
  })

  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

  //FUNCTION TO INSERT LAYERS TO THE CANVAS

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Rectangle
        | LayerType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get("layers")
      if (liveLayers.size >= MAX_LAYERS) {
        return
      }

      const liveLayerIds = storage.get("layerIds")
      const layerId = nanoid()
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColour,
      })
      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer)
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvasState({ mode: CanvasMode.None })
    },
    [lastUsedColour]
  )

  //function for translating(moving) the layer
  const translateSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating || !canvasState.current) {
        return
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      }

      const liveLayers = storage.get("layers")

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id)

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          })
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [canvasState]
  )

  //function for deselecting layer
  const unselectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }
  }, [])

  //function for resizing layer
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return
      }
      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      )

      const liveLayers = storage.get("layers")
      const layer = liveLayers.get(self.presence.selection[0])

      if (layer) {
        layer.update(bounds)
      }
    },
    [canvasState]
  )

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause()
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      })
    },
    [history]
  )

  //scrolll movement
  const onWheel = useCallback((e: React.WheelEvent) => {
    //console.log({ x: e.deltaX, y: e.deltaY })
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])

  //cursor movement
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()
      const current = pointerEventToCanvasPoint(e, camera)

      //for moving the layer
      if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayer(current)
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current)
      }
      setMyPresence({ cursor: current })
    },
    [camera, canvasState, resizeSelectedLayer, translateSelectedLayer]
  )

  const onPointerLeave = useMutation(
    ({ setMyPresence }) => {
      setMyPresence({ cursor: null })
    },
    [canvasState]
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera)

      if (canvasState.mode === CanvasMode.Inserting) {
        return
      }

      setCanvasState({ origin: point, mode: CanvasMode.Pressing })
    },
    [camera, canvasState.mode, setCanvasState]
  )

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera)
      console.log({
        point,
        mode: canvasState.mode,
      })

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayer()
        setCanvasState({
          mode: CanvasMode.None,
        })
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point)
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        })
      }
      history.resume()
    },
    [camera, canvasState, history, insertLayer, unselectLayer]
  )

  const selections = useOthersMapped((other) => other.presence.selection)

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return
      }

      history.pause()
      e.stopPropagation()

      const point = pointerEventToCanvasPoint(e, camera)

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true })
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [setCanvasState, camera, history, canvasState.mode]
  )

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {}

    for (const user of selections) {
      const [connectionId, selection] = user
      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
      }
    }
    return layerIdsToColorSelection
  }, [selections])

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canRedo={canRedo}
        canUndo={canUndo}
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px,${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
