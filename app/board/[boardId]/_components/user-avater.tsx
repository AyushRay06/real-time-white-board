import { Hint } from "@/components/hint"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  src?: string
  name?: string
  fallback?: string
  borderColor?: string
  className?: string
}

export const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor,
  className,
}: UserAvatarProps) => {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffset={10}>
      <Avatar
        className={cn(
          "h-7 w-7 border-2 ring-2 ring-white dark:ring-slate-900 transition-all hover:scale-110 hover:z-20 cursor-pointer shadow-xs",
          className
        )}
        style={{ borderColor }}
      >
        <AvatarImage src={src} />
        <AvatarFallback className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  )
}
