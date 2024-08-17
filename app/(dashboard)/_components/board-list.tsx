"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { EmptySearch } from "./empty-search"
import { Boardcard } from "./board-card"

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favourites?: string
  }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId })

  if (data === undefined) {
    return <div>Loading...</div>
  }

  if (!data.length && query.search) {
    return (
      <EmptySearch
        src="/search.png"
        alt="Empty-search"
        desc1="No Result Found"
        desc2="Try searching something revelent."
      />
    )
  }

  if (!data.length && query.favourites) {
    return (
      <div className="h-full flex items-center justify-center">
        <EmptySearch
          src="/fav.png"
          alt="no favourites"
          desc1="No favourites Board Found"
          desc2="Try adding organizations to favourites if not."
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
          desc2="Start by creating a board for your organization."
        />
      </div>
    )
  }
  return (
    <div>
      <h2>{query.favourites ? "Favourite Boards" : "Team Boards"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-4 lg:grid-col-4 xl:grid-col-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        {data?.map((board) => (
          <Boardcard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavourite={false}
          />
        ))}
      </div>
    </div>
  )
}
