import { v } from "convex/values"
import { getAllOrThrow } from "convex-helpers/server/relationships"

import { query } from "./_generated/server"
import { favourite } from "./board"

export const get = query({
  args: {
    orgId: v.optional(v.string()),
    favourites: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const userId = identity.subject

    if (args.favourites) {
      const favouritedBoards = await ctx.db
        .query("userFavourites")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .order("desc")
        .collect()

      const ids = favouritedBoards.map((b) => b.boardId)
      const boards = await getAllOrThrow(ctx.db, ids)

      return boards.map((board) => ({
        ...board,
        isFavourite: true,
      }))
    }

    const title = args.search as string
    let boards = []

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("authorId", userId)
        )
        .collect()
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_author", (q) => q.eq("authorId", userId))
        .order("desc")
        .collect()
    }
    const boardsWithFavouriteRelation = boards.map((board) => {
      return ctx.db
        .query("userFavourites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favourite) => {
          return {
            ...board,
            isFavourite: !!favourite,
          }
        })
    })

    const boardsWithFavouriteBooloean = Promise.all(boardsWithFavouriteRelation)
    return boardsWithFavouriteBooloean
  },
})
