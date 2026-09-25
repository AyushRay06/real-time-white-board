"use client"

import { useAuth } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { EmptySearch } from "./empty-search"
import { BoardCard } from "./board-card"
import { NewBoardButton } from "./new-boardbutton"

interface BoardListProps {
  orgId?: string
  query: {
    search?: string
    favourites?: string
  }
}

export const BoardList = ({ query, orgId: propOrgId }: BoardListProps) => {
  const { isLoaded, orgId: clerkOrgId, userId } = useAuth()
  const effectiveOrgId = propOrgId || clerkOrgId || userId || "personal"

  const data = useQuery(
    api.boards.get,
    isLoaded
      ? {
          orgId: effectiveOrgId,
          favourites: query.favourites,
          search: query.search,
        }
      : "skip"
  )

  if (!isLoaded || data === undefined) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {query.favourites ? "Favourite Boards" : "Your Boards"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {query.favourites
                ? "Quickly access your starred canvases"
                : "Manage and create your system design canvases"}
            </p>
          </div>
          <div className="h-6 w-14 rounded-full bg-slate-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-12">
          <NewBoardButton disabled />
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
          desc1="Create your first board"
          desc2="Start by creating a blank canvas to design, sketch, and plan."
        />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {query.favourites ? "Favourite Boards" : "Your Boards"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {query.favourites
              ? "Quickly access your starred canvases"
              : "Manage and create your system design canvases"}
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
          {data.length} {data.length === 1 ? "board" : "boards"}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-12">
        <NewBoardButton orgId={effectiveOrgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            isFavourite={board.isFavourite}
          />
        ))}
      </div>
    </div>
  )
}
