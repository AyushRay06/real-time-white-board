"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { useOthers, useSelf } from "@liveblocks/react/suspense"

import { UserAvatar } from "./user-avater"
import { connectionIdToColor } from "@/lib/utils"
import { useCanvasTheme } from "./canvas-theme-context"
import { cn } from "@/lib/utils"

const MAX_SHOWN_USERS = 4

export const Participants = () => {
  const users = useOthers()
  const currentUsers = useSelf()
  const { theme } = useCanvasTheme()
  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  return (
    <div
      className={cn(
        "h-12 rounded-md p-3 flex items-center shadow-md transition-colors",
        theme === "dark" ? "bg-slate-900 border border-slate-800 text-white" : "bg-white"
      )}
    >
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name || "Teammate"}
              fallback={info?.name?.[0] || "T"}
            />
          )
        })}
        {currentUsers && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUsers.connectionId)}
            src={currentUsers.info?.picture}
            name={`${currentUsers.info?.name || "You"} (You)`}
            fallback={currentUsers.info?.name?.[0] || "Y"}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`+${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
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
