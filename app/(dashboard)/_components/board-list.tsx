"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { EmptySearch } from "./empty-search"
import { BoardCard } from "./board-card"
import { NewBoardButton } from "./new-boardbutton"

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favourites?: string
  }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId, favourites: query.favourites })

  if (data === undefined) {
    return (
      <div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {query.favourites ? "Favourite Boards" : "Team Boards"}
          </h2>
          <div className="h-5 w-14 rounded-full bg-slate-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6 pb-12">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    )
  }

  if (!data.length && query.search) {
    return (
      <EmptySearch
        src="/search.png"
        alt="Empty-search"
        desc1="No Results Found"
        desc2="Try searching for something else."
      />
    )
  }

  if (!data.length && query.favourites) {
    return (
      <div className="h-full flex items-center justify-center">
        <EmptySearch
          src="/fav.png"
          alt="no favourites"
          desc1="No Favourite Boards"
          desc2="Click the star on any board to add it to your favourites."
        />
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="h-full w-full">
        <EmptySearch
          src="/boardlist.png"
          alt="no Board list"
          desc1="Create your first Board"
          desc2="Start by creating a canvas for your team."
        />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {query.favourites ? "Favourite Boards" : "Team Boards"}
          </h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/80">
            {data.length} {data.length === 1 ? "board" : "boards"}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6 pb-12">
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavourite={board.isFavourite}
          />
        ))}
      </div>
    </div>
  )
}
