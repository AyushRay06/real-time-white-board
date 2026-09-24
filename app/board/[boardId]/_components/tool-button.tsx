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
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  const { theme } = useCanvasTheme()
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        onClick={onClick}
        disabled={isDisabled}
        variant={isActive ? "boardActive" : "board"}
        className={cn(
          theme === "dark" && !isActive && "text-slate-300 hover:text-white hover:bg-slate-800",
          theme === "dark" && isActive && "bg-indigo-500/25 text-indigo-400 hover:bg-indigo-500/30"
        )}
      >
        <Icon />
      </Button>
    </Hint>
  )
}
