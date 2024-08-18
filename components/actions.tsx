"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Delete, Edit, Link, Trash } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/use-api-mutaion"
import { api } from "@/convex/_generated/api"
import { ConfirmAlert } from "./confirm-alert"
import { Button } from "./ui/button"

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps["side"]
  sideOffset?: DropdownMenuContentProps["sideOffset"]
  id: string
  title: string
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  //for deletion of board
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
    <div className="absolute z-50 top-1 right-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          side={side}
          sideOffset={sideOffset}
          className="W-60"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
            <Link className="h-4 w-4 mr-2" />
            Copy Board Link
          </DropdownMenuItem>
          <ConfirmAlert
            header="Delete Board?"
            description="If you delete all the data related to the Board will get deleted!"
            onConfirm={onDelete}
            disabled={pending}
          >
            <Button
              variant="ghost"
              //onClick={onDelete}
              className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </ConfirmAlert>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
