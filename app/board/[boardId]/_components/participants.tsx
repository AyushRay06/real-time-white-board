"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { useOthers, useSelf } from "@liveblocks/react/suspense"

import { UserAvatar } from "./user-avater"

const MAX_SHOWN_USERS = 2

export const Participants = () => {
  const users = useOthers()
  const currentUsers = useSelf()
  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          )
        })}
        {currentUsers && (
          <UserAvatar
            src={currentUsers.info?.picture}
            name={`${currentUsers.info?.name} (You)`}
            fallback={currentUsers.info?.name?.[0]}
          />
        )}
      </div>
    </div>
  )
}

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]">
      <Skeleton className="h-full w-full bg-muted-400 " />
    </div>
  )
}
