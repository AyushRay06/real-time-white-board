"use client"
import { useApiMutation } from "@/hooks/use-api-mutaion"
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}
export const NewBoardButton = ({ disabled, orgId }: NewBoardButtonProps) => {
  const router = useRouter()
  const { mutate, pending } = useApiMutation(api.board.create)
  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created.")
        router.push(`/board/${id}`)
      })
      .catch(() => toast.error("Failed To Create Board"))
  }
  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "group relative col-span-1 aspect-[100/127] rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 p-6 flex flex-col items-center justify-center text-white overflow-hidden shadow-md shadow-indigo-500/15 hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-1 transition-all duration-200 active:scale-[0.98] text-center cursor-pointer",
        (pending || disabled) &&
          "opacity-70 hover:translate-y-0 cursor-not-allowed hover:shadow-md"
      )}
    >
      {/* Ambient gradient highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-200 shadow-sm">
        <Plus className="h-6 w-6 text-white stroke-[2.5]" />
      </div>

      <div className="relative z-10">
        <p className="text-sm font-bold text-white tracking-tight">New Board</p>
        <p className="text-[11px] text-indigo-100/80 mt-0.5 font-medium">Create a blank canvas</p>
      </div>
    </button>
  )
}
