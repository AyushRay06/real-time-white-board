"use client"

import React, { memo } from "react"
import {
  Cpu,
  TableProperties,
  CheckSquare2,
  LayoutTemplate,
  Sparkles,
  BookOpen,
  History,
  Command,
  Shapes,
} from "lucide-react"
import { ToolButton } from "./tool-button"
import { useCanvasTheme } from "./canvas-theme-context"

export type ArchitectureSpace = "components" | "excalidraw" | "tables" | "specs" | "templates"

interface RightToolbarProps {
  activeSpace: ArchitectureSpace
  isOpen: boolean
  onToggleSpace: (space: ArchitectureSpace) => void
  onAutoLayout?: () => void
  onOpenNotes?: () => void
  onOpenCheckpoints?: () => void
  onOpenCommandPalette?: () => void
}

export const RightToolbar = memo(function RightToolbar({
  activeSpace,
  isOpen,
  onToggleSpace,
  onAutoLayout,
  onOpenNotes,
  onOpenCheckpoints,
  onOpenCommandPalette,
}: RightToolbarProps) {
  const { theme } = useCanvasTheme()

  const groupClass =
    theme === "dark"
      ? "bg-slate-900/90 backdrop-blur-md rounded-xl p-1 flex flex-col gap-y-0.5 items-center shadow-lg border border-slate-800/80"
      : "bg-white/90 backdrop-blur-md rounded-xl p-1 flex flex-col gap-y-0.5 items-center shadow-md border border-neutral-200/80"

  return (
    <div className="absolute top-[50%] -translate-y-[50%] right-3 flex flex-col gap-y-2 z-40 select-none">
      <div className={groupClass}>
        <ToolButton
          label="Architecture Components (1)"
          icon={Cpu}
          side="left"
          onClick={() => onToggleSpace("components")}
          isActive={isOpen && activeSpace === "components"}
        />
        <ToolButton
          label="Excalidraw / Draw.io Icons (2)"
          icon={Shapes}
          side="left"
          onClick={() => onToggleSpace("excalidraw")}
          isActive={isOpen && activeSpace === "excalidraw"}
        />
        <ToolButton
          label="Data Modeling & Tables (3)"
          icon={TableProperties}
          side="left"
          onClick={() => onToggleSpace("tables")}
          isActive={isOpen && activeSpace === "tables"}
        />
        <ToolButton
          label="Architecture Specs & Calculations (4)"
          icon={CheckSquare2}
          side="left"
          onClick={() => onToggleSpace("specs")}
          isActive={isOpen && activeSpace === "specs"}
        />
        <ToolButton
          label="Architecture Templates & Blueprints (5)"
          icon={LayoutTemplate}
          side="left"
          onClick={() => onToggleSpace("templates")}
          isActive={isOpen && activeSpace === "templates"}
        />
      </div>

      <div className={groupClass}>
        {onAutoLayout && (
          <ToolButton
            label="Auto-Layout Architecture"
            icon={Sparkles}
            side="left"
            onClick={onAutoLayout}
          />
        )}
        {onOpenCommandPalette && (
          <ToolButton
            label="Command Palette (Cmd+K)"
            icon={Command}
            side="left"
            onClick={onOpenCommandPalette}
          />
        )}
        {onOpenNotes && (
          <ToolButton
            label="Architecture Notes & ADR (N)"
            icon={BookOpen}
            side="left"
            onClick={onOpenNotes}
          />
        )}
        {onOpenCheckpoints && (
          <ToolButton
            label="Version Snapshots & Checkpoints"
            icon={History}
            side="left"
            onClick={onOpenCheckpoints}
          />
        )}
      </div>
    </div>
  )
})
