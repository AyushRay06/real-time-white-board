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
import { MoreHorizontal, Pencil, ChevronRight } from "lucide-react"
import { useCanvasTheme } from "./canvas-theme-context"

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
    <div
      className={cn(
        "absolute top-3 left-3 z-30 h-11 px-2.5 flex items-center gap-1.5 rounded-xl backdrop-blur-md shadow-sm border transition-all duration-200",
        theme === "dark"
          ? "bg-slate-900/85 border-slate-800/80 text-white shadow-slate-950/20"
          : "bg-white/85 border-slate-200/80 text-slate-900 shadow-slate-900/5"
      )}
    >
      {/* Brand Logo & Name */}
      <Hint label="All boards" side="bottom" sideOffset={10}>
        <Link
          href="/"
          className="group flex items-center gap-2 px-1 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
        >
          <Image
            src="/logo.svg"
            alt="Board"
            height={28}
            width={28}
            className="group-hover:scale-105 transition-transform flex-shrink-0"
          />
          <span
            className={cn(
              "font-bold text-sm tracking-tight",
              font.className,
              theme === "dark" ? "text-white" : "text-slate-900"
            )}
          >
            Board
          </span>
        </Link>
      </Hint>

      {/* Breadcrumb Divider */}
      <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0 mx-0.5" />

      {/* Canvas Title */}
      <Hint label="Rename canvas" side="bottom" sideOffset={10}>
        <button
          onClick={() => onOpen(data._id, data.title)}
          className={cn(
            "group flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs md:text-sm font-medium tracking-tight transition-all",
            theme === "dark"
              ? "text-slate-200 hover:text-white hover:bg-slate-800/80"
              : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          <span className="max-w-[130px] sm:max-w-[200px] md:max-w-[280px] truncate select-none">
            {data.title}
          </span>
          <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-60 text-slate-400 transition-opacity" />
        </button>
      </Hint>

      {/* Canvas Options Dropdown */}
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10} className="relative ml-0.5">
        <Hint label="Canvas menu" side="bottom" sideOffset={10}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "h-7 w-7 rounded-lg transition-colors",
              theme === "dark"
                ? "text-slate-400 hover:text-white hover:bg-slate-800/80"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </Hint>
      </Actions>
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-3 left-3 z-30 h-11 w-64 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm animate-pulse" />
  )
}
