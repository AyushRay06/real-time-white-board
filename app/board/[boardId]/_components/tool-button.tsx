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
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
  side = "right",
  className,
}: ToolButtonProps) => {
  const { theme } = useCanvasTheme()
  return (
    <Hint label={label} side={side} sideOffset={12}>
      <Button
        onClick={onClick}
        disabled={isDisabled}
        variant={isActive ? "boardActive" : "board"}
        size="icon"
        className={cn(
          "h-8 w-8 p-1.5 rounded-xl transition-all",
          theme === "dark" && !isActive && "text-slate-300 hover:text-white hover:bg-slate-800/80",
          theme === "dark" && isActive && "bg-indigo-500/25 text-indigo-400 hover:bg-indigo-500/30 ring-1 ring-indigo-500/40",
          theme !== "dark" && isActive && "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-300",
          className
        )}
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  )
}
