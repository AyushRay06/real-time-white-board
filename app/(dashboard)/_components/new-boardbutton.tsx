"use client"
import { useApiMutation } from "@/hooks/use-api-mutaion"
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface NewBoardButtonProps {
  orgId?: string
  disabled?: boolean
}

export const NewBoardButton = ({ disabled, orgId }: NewBoardButtonProps) => {
  const router = useRouter()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    mutate({
      title: "Untitled",
      orgId: orgId || "",
    })
      .then((id) => {
        toast.success("Board created")
        if (id) {
          router.push(`/board/${id}`)
        }
      })
      .catch(() => toast.error("Failed to create board"))
  }

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "group relative col-span-1 aspect-[100/127] rounded-2xl border-2 border-dashed border-slate-200/90 hover:border-indigo-400 bg-white hover:bg-indigo-50/20 p-6 flex flex-col items-center justify-center text-slate-600 hover:text-indigo-600 transition-all duration-200 cursor-pointer text-center",
        (pending || disabled) &&
          "opacity-50 cursor-not-allowed hover:border-slate-200 hover:bg-white"
      )}
    >
      <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-indigo-100/70 text-slate-500 group-hover:text-indigo-600 flex items-center justify-center mb-3 transition-colors duration-200">
        <Plus className="h-5 w-5 stroke-[2.2]" />
      </div>

      <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
        New Board
      </p>
      <p className="text-[11px] text-slate-400 mt-0.5">
        Blank canvas
      </p>
    </button>
  )
}
