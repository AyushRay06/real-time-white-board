"use client"

import React, { useState, useEffect, useMemo, useRef } from "react"
import {
  Search,
  Cpu,
  TableProperties,
  LayoutTemplate,
  Download,
  Grid,
  Maximize2,
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { SysComponent, DocType } from "@/types/canvas"
import { COMPONENT_LABELS, ComponentIcon } from "./sys-component-layer"
import { useCanvasTheme } from "./canvas-theme-context"
import { isSoundEnabled, setSoundEnabled } from "./audio-feedback"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onInsertComponent: (type: SysComponent) => void
  onInsertDoc: (type: DocType) => void
  onInsertTemplate: (id: "three-tier" | "microservices" | "cdn-caching") => void
  onAutoLayout: () => void
  onExport: (format: "png" | "svg" | "json" | "mermaid") => void
  onFitToScreen: () => void
  onToggleGrid: () => void
  onToggleNotes: () => void
}

interface CommandItem {
  id: string
  title: string
  category: "Components" | "Tables" | "Templates" | "Actions"
  icon: React.ElementType
  action: () => void
}

export function CommandPalette({
  isOpen,
  onClose,
  onInsertComponent,
  onInsertDoc,
  onInsertTemplate,
  onAutoLayout,
  onExport,
  onFitToScreen,
  onToggleGrid,
  onToggleNotes,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme } = useCanvasTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const commands = useMemo<CommandItem[]>(() => {
    const list: CommandItem[] = []

    // Quick Actions
    list.push(
      {
        id: "action-auto-layout",
        title: "Auto-Layout Architecture (Tidy Up)",
        category: "Actions",
        icon: Sparkles,
        action: onAutoLayout,
      },
      {
        id: "action-notes",
        title: "Open Architecture Notes / ADR Scratchpad",
        category: "Actions",
        icon: BookOpen,
        action: onToggleNotes,
      },
      {
        id: "action-fit",
        title: "Fit Architecture to Screen",
        category: "Actions",
        icon: Maximize2,
        action: onFitToScreen,
      },
      {
        id: "action-grid",
        title: "Toggle Background Grid (Dots / Cross / Off)",
        category: "Actions",
        icon: Grid,
        action: onToggleGrid,
      },
      {
        id: "action-export-png",
        title: "Export Diagram as PNG",
        category: "Actions",
        icon: Download,
        action: () => onExport("png"),
      },
      {
        id: "action-export-svg",
        title: "Export Diagram as SVG",
        category: "Actions",
        icon: Download,
        action: () => onExport("svg"),
      },
      {
        id: "action-export-mermaid",
        title: "Export Diagram as Mermaid.js",
        category: "Actions",
        icon: Download,
        action: () => onExport("mermaid"),
      },
      {
        id: "action-sound",
        title: isSoundEnabled() ? "Mute Canvas Sound FX" : "Enable Canvas Sound FX",
        category: "Actions",
        icon: isSoundEnabled() ? VolumeX : Volume2,
        action: () => setSoundEnabled(!isSoundEnabled()),
      }
    )

    // Tables
    list.push(
      {
        id: "doc-schema",
        title: "Database Schema & ERD Table (SQL)",
        category: "Tables",
        icon: TableProperties,
        action: () => onInsertDoc("schema"),
      },
      {
        id: "doc-nosql",
        title: "Document Collection Schema (MongoDB)",
        category: "Tables",
        icon: TableProperties,
        action: () => onInsertDoc("nosql-schema"),
      },
      {
        id: "doc-func",
        title: "Functional Requirements Table",
        category: "Tables",
        icon: TableProperties,
        action: () => onInsertDoc("functional-requirements"),
      },
      {
        id: "doc-nonfunc",
        title: "Non-Functional Requirements Table",
        category: "Tables",
        icon: TableProperties,
        action: () => onInsertDoc("non-functional-requirements"),
      },
      {
        id: "doc-api",
        title: "API Endpoints Specification Table",
        category: "Tables",
        icon: TableProperties,
        action: () => onInsertDoc("api"),
      },
      {
        id: "doc-estimation",
        title: "Capacity & Estimation Table",
        category: "Tables",
        icon: TableProperties,
        action: () => onInsertDoc("estimation"),
      }
    )

    // Templates
    list.push(
      {
        id: "tpl-three-tier",
        title: "Load Template: Classic 3-Tier Web Application",
        category: "Templates",
        icon: LayoutTemplate,
        action: () => onInsertTemplate("three-tier"),
      },
      {
        id: "tpl-microservices",
        title: "Load Template: Event-Driven Microservices",
        category: "Templates",
        icon: LayoutTemplate,
        action: () => onInsertTemplate("microservices"),
      },
      {
        id: "tpl-cdn",
        title: "Load Template: Global CDN & Edge Compute",
        category: "Templates",
        icon: LayoutTemplate,
        action: () => onInsertTemplate("cdn-caching"),
      }
    )

    // Components
    Object.values(SysComponent).forEach((type) => {
      const label = COMPONENT_LABELS[type] || type
      list.push({
        id: `comp-${type}`,
        title: `Insert ${label}`,
        category: "Components",
        icon: Cpu,
        action: () => onInsertComponent(type),
      })
    })

    return list
  }, [
    onAutoLayout,
    onToggleNotes,
    onFitToScreen,
    onToggleGrid,
    onExport,
    onInsertDoc,
    onInsertTemplate,
    onInsertComponent,
  ])

  const filtered = useMemo(() => {
    if (!query.trim()) return commands.slice(0, 14)
    const q = query.toLowerCase()
    return commands.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 20)
  }, [commands, query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((idx) => (idx + 1) % filtered.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((idx) => (idx - 1 + filtered.length) % filtered.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = filtered[selectedIndex]
      if (item) {
        item.action()
        onClose()
      }
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/40 backdrop-blur-xs select-none"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 ${
          isDark ? "bg-slate-900/95 border-slate-800 text-white" : "bg-white/95 border-neutral-200 text-slate-800"
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className={`flex items-center gap-2.5 px-4 py-3 border-b ${isDark ? "border-slate-800" : "border-neutral-200"}`}>
          <Search className="w-4 h-4 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Type a component, table, template, or action..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
          <kbd className={`text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
            isDark ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-neutral-100 border-neutral-300 text-neutral-500"
          }`}>
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5 [scrollbar-width:none]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No matching components or actions found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon
              const isSelected = idx === selectedIndex

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action()
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? isDark
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-50 text-indigo-700"
                      : isDark
                      ? "hover:bg-slate-800 text-slate-200"
                      : "hover:bg-neutral-100 text-neutral-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    <span className="font-medium truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] uppercase font-mono tracking-wider opacity-60 ${
                      isSelected ? "text-current" : ""
                    }`}>
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3 h-3 opacity-80" />}
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className={`px-4 py-2 border-t text-[10px] flex items-center justify-between shrink-0 opacity-60 ${
          isDark ? "border-slate-800" : "border-neutral-100"
        }`}>
          <span>Navigate with ↑ ↓ · Select with ↵</span>
          <span>Cmd+K / Ctrl+K</span>
        </div>
      </div>
    </div>
  )
}
