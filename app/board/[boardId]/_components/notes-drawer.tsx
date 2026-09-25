"use client"

import React, { useState, useEffect } from "react"
import { X, FileText, Check, Copy, BookOpen } from "lucide-react"
import { useCanvasTheme } from "./canvas-theme-context"

interface NotesDrawerProps {
  boardId: string
  isOpen: boolean
  onClose: () => void
}

const ADR_TEMPLATE = `# Architecture Decision Record (ADR)

## Status: Proposed / Accepted
**Date:** ${new Date().toISOString().split("T")[0]}

## Context & Problem Statement
Describe the problem context and architectural trade-offs here.

## Decision Drivers
- Read throughput: >100k QPS
- Eventual consistency acceptable for feeds
- P99 latency: < 50ms

## Considered Options
1. Option 1: Monolithic SQL DB with read replicas
2. Option 2: Event-driven Microservices with Redis cache & Kafka (Chosen)

## Decision & Rationale
We chose Option 2 because it decouples write path from timeline read path.

## Consequences & Trade-offs
- Positive: High scalability and isolated failure domains
- Negative: Eventual consistency delay (~50-100ms)
`

export function NotesDrawer({ boardId, isOpen, onClose }: NotesDrawerProps) {
  const { theme } = useCanvasTheme()
  const isDark = theme === "dark"
  const storageKey = `whiteboard_adr_notes_${boardId}`

  const [content, setContent] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        setContent(saved)
      } else {
        setContent(ADR_TEMPLATE)
      }
    }
  }, [storageKey])

  const handleSave = (val: string) => {
    setContent(val)
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, val)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed left-4 bottom-16 z-50 w-96 rounded-2xl border shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-150 ${
        isDark ? "bg-slate-900/95 border-slate-800 text-white" : "bg-white/95 border-neutral-200 text-slate-800"
      }`}
      style={{ height: "480px" }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-3.5 py-2.5 border-b shrink-0 ${isDark ? "border-slate-800 bg-slate-900/90" : "border-neutral-100 bg-neutral-50/80"}`}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold tracking-wide">Architecture Notes & ADR</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Copy Markdown"
            className={`p-1 rounded-md text-xs transition-colors flex items-center gap-1 ${
              isDark ? "hover:bg-slate-800 text-slate-300" : "hover:bg-neutral-100 text-neutral-600"
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className={`p-1 rounded-md transition-colors ${
              isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-2 flex flex-col">
        <textarea
          value={content}
          onChange={(e) => handleSave(e.target.value)}
          placeholder="Write architecture decision records, trade-offs, constraints..."
          className={`flex-1 w-full p-2.5 text-xs font-mono rounded-xl resize-none outline-none border transition-colors leading-relaxed ${
            isDark
              ? "bg-slate-950/60 border-slate-800 text-slate-200 focus:border-indigo-500"
              : "bg-neutral-50 border-neutral-200 text-neutral-800 focus:border-indigo-400"
          }`}
        />
      </div>

      {/* Footer */}
      <div className={`px-3 py-1.5 border-t text-[10px] flex items-center justify-between shrink-0 ${
        isDark ? "border-slate-800 text-slate-400 bg-slate-900/60" : "border-neutral-100 text-neutral-500 bg-neutral-50/50"
      }`}>
        <span>Auto-saved to board storage</span>
        <button
          onClick={() => handleSave(ADR_TEMPLATE)}
          className="text-indigo-500 hover:underline font-semibold"
        >
          Reset ADR Template
        </button>
      </div>
    </div>
  )
}
