"use client"

import Image from "next/image"
import Link from "next/link"
import { Overlay } from "./overlay"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs"
import { Footer } from "./footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Actions } from "@/components/actions"
import { MoreHorizontal } from "lucide-react"
import { useApiMutation } from "@/hooks/use-api-mutaion"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

interface BoardCardProps {
  id: string
  title: string
  imageUrl: string
  authorId: string
  authorName: string
  createdAt: number
  orgId?: string
  isFavourite: boolean
}

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  orgId,
  isFavourite,
  createdAt,
  imageUrl,
}: BoardCardProps) => {
  const { userId, orgId: clerkOrgId } = useAuth()
  const effectiveOrgId = orgId || clerkOrgId || userId || "personal"

  const authorLabel = userId === authorId ? "You" : authorName

  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  })

  const { mutate: onFavourite, pending: pendingFavourite } = useApiMutation(
    api.board.favourite
  )

  const { mutate: onUnfavourite, pending: pendingUnfavourite } = useApiMutation(
    api.board.unfavourite
  )

  const toggleFavourite = () => {
    if (isFavourite) {
      onUnfavourite({ id }).catch(() => toast.error("Failed to unfavourite"))
    } else {
      onFavourite({ id, orgId: effectiveOrgId }).catch(() => toast.error("Failed to favourite"))
    }
  }

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] rounded-2xl border border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative cursor-pointer">
        <div className="relative flex-1 bg-gradient-to-br from-slate-50 to-indigo-50/30 overflow-hidden">
          <Image
            src={imageUrl}
            fill
            alt={title}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Overlay />
          <Actions id={id} title={title} side="right" sideOffset={8}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-150 p-1.5 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-slate-900 shadow-xs outline-none cursor-pointer"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavourite={isFavourite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavourite}
          disabled={pendingFavourite || pendingUnfavourite}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs">
      <Skeleton className="h-full w-full" />
    </div>
  )
}
