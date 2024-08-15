"use client"

import { EmptySearch } from "./empty-search"

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favourites?: string
  }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = [] //Todo: Chaneg to api call

  if (!data.length && query.search) {
    return (
      <div>
        <EmptySearch src="/search.png" alt="Empty-search" />
      </div>
    )
  }

  if (!data.length && query.favourites) {
    return (
      <div>
        <EmptySearch src="/fav.png" alt="no favourites" />
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="h-full w-full">
        <EmptySearch src="/boardlist.png" alt="no Board list" />
      </div>
    )
  }
  return <div>{JSON.stringify(query)}</div>
}
