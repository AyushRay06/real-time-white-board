import { Liveblocks } from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { auth, currentUser } from "@clerk/nextjs/server"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_mctiF10Gfk1yJ2xYbut8UcAUY3Hko-ZIfdfimOimBGzBggk40oB37DXS3yJ-JmSs",
})

export async function POST(request: Request) {
  // Get the current user from your database
  const authorization = await auth()
  const user = await currentUser()

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 })
  }

  const { room } = await request.json()
  const board = await convex.query(api.board.get, { id: room })

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 })
  }

  const userInfo = {
    name: user.firstName,
    picture: user.imageUrl,
  }

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id,
    { userInfo } // Optional
  )

  if (room) {
    session.allow(room, session.FULL_ACCESS)
  }

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  //   session.allow(`${user.organization}:*`, session.READ_ACCESS)
  //   session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS)

  // Authorize the user and return the result
  const { status, body } = await session.authorize()
  console.log({ status, body }, "Allowed")

  return new Response(body, { status })
}
