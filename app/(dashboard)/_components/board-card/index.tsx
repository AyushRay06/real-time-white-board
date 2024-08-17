"use-client"

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
}: BoardCardProps) => {
  return <div>Board Card</div>
}
