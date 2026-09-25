"use client"

import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { Hint } from "@/components/hint"
import { useCanvasTheme } from "./canvas-theme-context"
import { cn } from "@/lib/utils"

interface ToolButtonProps {
  label: string
  icon: LucideIcon
  onClick: () => void
  isActive?: boolean
  isDisabled?: boolean
  side?: "top" | "bottom" | "left" | "right"
  className?: string
  shortcut?: string
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
  side = "right",
  className,
  shortcut,
}: ToolButtonProps) => {
  const { theme } = useCanvasTheme()
  const fullLabel = shortcut ? `${label} (${shortcut})` : label

  return (
    <Hint label={fullLabel} side={side} sideOffset={12}>
      <Button
        onClick={onClick}
        disabled={isDisabled}
        variant={isActive ? "boardActive" : "board"}
        size="icon"
        className={cn(
          "h-8 w-8 p-1.5 rounded-xl transition-all relative flex items-center justify-center group",
          theme === "dark" && !isActive && "text-slate-300 hover:text-white hover:bg-slate-800/80",
          theme === "dark" && isActive && "bg-indigo-500/25 text-indigo-400 hover:bg-indigo-500/30 ring-1 ring-indigo-500/40",
          theme !== "dark" && isActive && "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-300",
          className
        )}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        {shortcut && (
          <span
            className={cn(
              "absolute bottom-0.5 right-0.5 text-[7px] font-mono leading-none tracking-tighter select-none font-bold pointer-events-none px-0.5 rounded transition-opacity",
              isActive
                ? "text-indigo-600 dark:text-indigo-400 font-extrabold opacity-95"
                : "text-slate-400 dark:text-slate-500 opacity-60 group-hover:opacity-100"
            )}
          >
            {shortcut}
          </span>
        )}
      </Button>
    </Hint>
  )
}
