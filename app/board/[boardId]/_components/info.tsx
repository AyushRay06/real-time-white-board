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

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>
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

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  })

  if (!data) return <InfoSkeleton />
  return (
    //need to fix the logo|board name| menu bar width for now w-[300px]
    <div className="absolute  top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={12}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />

            <span
              className={cn(
                "font-semibold ml-2 text-xl text-black",
                font.className
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
          className="text-base font-mono px-8"
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
