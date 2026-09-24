import { Canvas } from "./_components/canvas"
import { Room } from "@/components/room"
import { Loading } from "./_components/loading"
import { CanvasThemeProvider } from "./_components/canvas-theme-context"

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <CanvasThemeProvider>
      <Room roomId={params.boardId} fallback={<Loading />}>
        <Canvas boardId={params.boardId} />
      </Room>
    </CanvasThemeProvider>
  )
}

export default BoardIdPage
