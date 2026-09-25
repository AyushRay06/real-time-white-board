"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from "@/hooks/use-api-mutaion"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface EmptySearchProps {
  src: string
  alt: string
  desc1: string
  desc2: string
}

export const EmptySearch = ({ src, alt, desc1, desc2 }: EmptySearchProps) => {
  const router = useRouter()
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    if (!organization) return

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board Created")
        router.push(`/board/${id}`)
      })
      .catch(() => toast.error("Failed to create Board"))
  }

  return (
    <div className="h-full flex flex-col items-center justify-center py-12 text-center">
      <div className="relative mb-6">
        <Image
          src={src}
          alt={alt}
          width={220}
          height={220}
          className="drop-shadow-sm"
        />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-1.5">{desc1}</h2>
      <p className="text-sm text-slate-500 max-w-sm">{desc2}</p>
      <div className="mt-6">
        <Button
          disabled={pending}
          onClick={onClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-5 h-10 shadow-md shadow-indigo-600/20 transition-all hover:scale-105 cursor-pointer"
        >
          Create Board
        </Button>
      </div>
    </div>
  )
}
