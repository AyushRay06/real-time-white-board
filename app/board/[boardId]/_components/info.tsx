"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { Poppins } from "next/font/google"
import { Hint } from "@/components/hint"
import { useRenameModal } from "@/store/use-rename-modal"
import { Actions } from "@/components/actions"
import { Menu } from "lucide-react"

import { useCanvasTheme } from "./canvas-theme-context"

const TabSeparator = () => {
  const { theme } = useCanvasTheme()
  return <div className={cn("px-1.5", theme === "dark" ? "text-neutral-700" : "text-neutral-300")}>|</div>
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

interface InfoProps {
  boardId: string
}

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal()
  const { theme } = useCanvasTheme()

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  })

  if (!data) return <InfoSkeleton />
  return (
    //need to fix the logo|board name| menu bar width for now w-[300px]
    <div
      className={cn(
        "absolute top-2 left-2 rounded-md px-1.5 h-12 flex items-center shadow-md transition-colors",
        theme === "dark" ? "bg-slate-900 border border-slate-800 text-white" : "bg-white text-black"
      )}
    >
      <Hint label="Go to boards" side="bottom" sideOffset={12}>
        <Button asChild variant="board" className={cn("px-2", theme === "dark" && "hover:bg-slate-800 text-white")}>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />

            <span
              className={cn(
                "font-semibold ml-2 text-xl",
                font.className,
                theme === "dark" ? "text-white" : "text-black"
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit Board name" side="bottom" sideOffset={10}>
        <Button
          onClick={() => onOpen(data._id, data.title)}
          variant="board"
          className={cn("text-base font-mono px-8", theme === "dark" && "text-slate-200 hover:text-white hover:bg-slate-800")}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />

      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board" className="mx-4">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px] "></div>
  )
}
