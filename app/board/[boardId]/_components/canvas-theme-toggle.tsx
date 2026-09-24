"use client"

import { useCanvasTheme } from "./canvas-theme-context"
import { Hint } from "@/components/hint"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export const CanvasThemeToggle = () => {
  const { theme, toggleTheme } = useCanvasTheme()

  return (
    <Hint
      label={theme === "dark" ? "Switch to Light Canvas" : "Switch to Dark Canvas"}
      side="bottom"
      sideOffset={10}
    >
      <button
        onClick={toggleTheme}
        className={cn(
          "h-12 w-12 rounded-md flex items-center justify-center shadow-md transition-all duration-200 outline-none select-none",
          theme === "dark"
            ? "bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 hover:text-amber-300"
            : "bg-white border border-neutral-200 text-slate-700 hover:bg-neutral-50 hover:text-indigo-600"
        )}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 transition-transform duration-200 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-200 hover:-rotate-12" />
        )}
      </button>
    </Hint>
  )
}
