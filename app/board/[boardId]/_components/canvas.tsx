"use client"
import { useCallback, useState } from "react"
import { Camera, CanvasMode, CanvasState } from "@/types/canvas"

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import {
  useCanRedo,
  useHistory,
  useCanUndo,
  useMutation,
} from "@liveblocks/react/suspense"
import { CursorsPresence } from "./cursors-presence"
import { pointerEventToCanvasPoint } from "@/lib/utils"
// import { useSelf } from "@liveblocks/react/suspense"

const MAX_LAYERS = 100

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  // const info = useSelf((me) => me.info)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

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
      // console.log({ current })

      setMyPresence({ cursor: current })
    },
    []
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

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
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g
          style={{
            transform: `translate(${camera.x}px,${camera.y}px)`,
          }}
        >
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
