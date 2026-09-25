"use client"

import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { UserAvatar } from "./user-avater"
import { connectionIdToColor } from "@/lib/utils"
import { useCanvasTheme } from "./canvas-theme-context"
import { cn } from "@/lib/utils"
import { Share2 } from "lucide-react"
import { Hint } from "@/components/hint"
import { toast } from "sonner"

const MAX_SHOWN_USERS = 4

export const Participants = () => {
  const users = useOthers()
  const currentUsers = useSelf()
  const { theme } = useCanvasTheme()
  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  const onShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Board link copied to clipboard")
    }
  }

  return (
    <div
      className={cn(
        "absolute top-3 right-3 z-30 h-11 px-2.5 flex items-center gap-2 rounded-xl backdrop-blur-md shadow-sm border transition-all duration-200",
        theme === "dark"
          ? "bg-slate-900/85 border-slate-800/80 text-white shadow-slate-950/20"
          : "bg-white/85 border-slate-200/80 text-slate-900 shadow-slate-900/5"
      )}
    >
      {/* Live Sync Status Indicator */}
      <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold tracking-wide uppercase select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Live</span>
      </div>

      {/* Collaborator Avatars (Overlapping Figma-style) */}
      <div className="flex items-center -space-x-1.5">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            borderColor={connectionIdToColor(connectionId)}
            key={connectionId}
            src={info?.picture}
            name={info?.name || "Teammate"}
            fallback={info?.name?.[0] || "T"}
          />
        ))}

        {currentUsers && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUsers.connectionId)}
            src={currentUsers.info?.picture}
            name={`${currentUsers.info?.name || "You"} (You)`}
            fallback={currentUsers.info?.name?.[0] || "Y"}
          />
        )}

        {hasMoreUsers && (
          <Hint label={`+${users.length - MAX_SHOWN_USERS} more`} side="bottom" sideOffset={10}>
            <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300 ring-2 ring-white dark:ring-slate-900 shadow-xs cursor-pointer">
              +{users.length - MAX_SHOWN_USERS}
            </div>
          </Hint>
        )}
      </div>

      {/* Quick Share Link Button */}
      <Hint label="Copy invite link" side="bottom" sideOffset={10}>
        <button
          onClick={onShare}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs shadow-indigo-600/25 transition-all active:scale-95 ml-0.5 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Share</span>
        </button>
      </Hint>
    </div>
  )
}

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute top-3 right-3 z-30 h-11 w-32 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm animate-pulse" />
  )
}
