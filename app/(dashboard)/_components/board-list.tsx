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
          desc1="No Board List Found"
          desc2="Add Board to create and edit Stuff together."
        />
      </div>
    )
  }
  return <div>{JSON.stringify(query)}</div>
}
