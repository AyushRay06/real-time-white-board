"use client"
import { useState } from "react"
import { CanvasMode, CanvasState } from "@/types/canvas"

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { useCanRedo, useHistory } from "@liveblocks/react/suspense"
// import { useSelf } from "@liveblocks/react/suspense"

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  // const info = useSelf((me) => me.info)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanRedo()

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
    </main>
  )
}
