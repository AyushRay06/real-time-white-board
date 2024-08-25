"use client"

import { ReactNode } from "react"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense"

interface RoomProps {
  children: ReactNode
  roomId: string
}

export function Room({ children, roomId }: RoomProps) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_02ccbRpacCXMTYQxZi9V00UhF2m6hNa2_LYTfYsNT45Jdlvua4aRQPuieD1Gvfjk"
      }
    >
      <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
