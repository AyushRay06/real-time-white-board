"use client"
import { useApiMutation } from "@/hooks/use-api-mutaion"
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { toast } from "sonner"

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}
export const NewBoardButton = ({ disabled, orgId }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create)
  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    }).then((id) => {
      toast.success("Board created.")
    })
  }
  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-slate-300 rounded-lg hover:bg-slate-400 flex flex-col items-center justify-center py-6",
        (pending || disabled) && "opacity-75"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-semibold">New Board</p>
    </button>
  )
}
