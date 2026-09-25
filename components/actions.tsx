"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Delete, Edit, Link, Pencil, Trash } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/use-api-mutaion"
import { api } from "@/convex/_generated/api"
import { ConfirmAlert } from "./confirm-alert"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/use-rename-modal"

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps["side"]
  sideOffset?: DropdownMenuContentProps["sideOffset"]
  id: string
  title: string
  className?: string
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
  className,
}: ActionsProps) => {
  //for deletion of board
  const { onOpen } = useRenameModal()
  const { mutate, pending } = useApiMutation(api.board.remove)

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete"))
  }

  //this is how we copy link
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"))
  }
  return (
    <div className={className ?? "absolute z-50 top-1 right-1"}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          side={side}
          sideOffset={sideOffset}
          className="w-56 p-1.5 shadow-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem onClick={onCopyLink} className="p-2.5 rounded-lg cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
            <Link className="h-3.5 w-3.5 mr-2 text-indigo-500" />
            Copy Board Link
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onOpen(id, title)}
            className="p-2.5 rounded-lg cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800"
          >
            <Pencil className="h-3.5 w-3.5 mr-2 text-amber-500" />
            Rename Canvas
          </DropdownMenuItem>
          <ConfirmAlert
            header="Delete Board?"
            description="If you delete all the data related to this Board will be permanently removed!"
            onConfirm={onDelete}
            disabled={pending}
          >
            <Button
              variant="ghost"
              className="p-2.5 h-auto rounded-lg cursor-pointer text-xs w-full justify-start font-medium text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              <Trash className="h-3.5 w-3.5 mr-2" />
              Delete Board
            </Button>
          </ConfirmAlert>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
