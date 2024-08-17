"use-client"

import Image from "next/image"
import Link from "next/link"
import { Overlay } from "./overlay"

interface BoardCardProps {
  id: string
  title: string
  imageUrl: string
  authorId: string
  authorName: string
  createdAt: number
  orgId: string
  isFavourite: boolean
}

export const Boardcard = ({
  id,
  title,
  authorId,
  authorName,
  orgId,
  isFavourite,
  createdAt,
  imageUrl,
}: BoardCardProps) => {
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-purple-50">
          <Image src={imageUrl} fill alt={title} />
          <Overlay />
        </div>
      </div>
    </Link>
  )
}
