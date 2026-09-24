import { Liveblocks } from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { auth, currentUser } from "@clerk/nextjs/server"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  secret:
    process.env.LIVEBLOCKS_SECRET_KEY ||
    "sk_dev_mctiF10Gfk1yJ2xYbut8UcAUY3Hko-ZIfdfimOimBGzBggk40oB37DXS3yJ-JmSs",
})

export async function POST(request: Request) {
  try {
    const authorization = await auth()
    const user = await currentUser()

    const body = await request.json()
    const room = body?.room

    if (!room) {
      return new Response("Missing room parameter", { status: 400 })
    }

    // Attempt to verify board existence if valid Convex ID
    try {
      await convex.query(api.board.get, { id: room })
    } catch {
      // Allow connection even if room query is non-standard ID
    }

    // Determine user identity: authenticated Clerk user or guest
    let userId: string
    let userInfo: { name: string; picture?: string }

    if (user) {
      const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ")
      const emailName = user.emailAddresses?.[0]?.emailAddress?.split("@")[0]
      const name = fullName || emailName || "Teammate"

      userId = user.id
      userInfo = {
        name,
        picture: user.imageUrl,
      }
    } else {
      const guestId = Math.floor(1000 + Math.random() * 9000)
      userId = `guest_${guestId}`
      userInfo = {
        name: `Guest ${guestId}`,
        picture: "",
      }
    }

    // Start a Liveblocks session with full room collaboration access
    const session = liveblocks.prepareSession(userId, { userInfo })
    session.allow(room, session.FULL_ACCESS)

    const { status, body: authResponseBody } = await session.authorize()
    return new Response(authResponseBody, { status })
  } catch (error: any) {
    console.error("[LIVEBLOCKS_AUTH_ERROR]", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
