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
          "h-8 w-8 p-1 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5",
          theme === "dark" && !isActive && "text-slate-300 hover:text-white hover:bg-slate-800/80",
          theme === "dark" && isActive && "bg-indigo-500/25 text-indigo-400 hover:bg-indigo-500/30 ring-1 ring-indigo-500/40",
          theme !== "dark" && isActive && "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-300",
          className
        )}
      >
        <Icon className={cn("flex-shrink-0", shortcut ? "w-3.5 h-3.5" : "w-4 h-4")} />
        {shortcut && (
          <span className="text-[7.5px] font-mono leading-none tracking-tight opacity-70 font-semibold select-none">
            {shortcut}
          </span>
        )}
      </Button>
    </Hint>
  )
}
