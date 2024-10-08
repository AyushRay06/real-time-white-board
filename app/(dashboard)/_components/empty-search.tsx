"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useMutation } from "convex/react"

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
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={src} alt={alt} width={300} height={300} />
      <h2 className="text-3xl font-semibold my-4">{desc1}</h2>
      <p className="text-lg text-muted-foreground">{desc2}</p>
      <div className="pt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create Board
        </Button>
      </div>
    </div>
  )
}
