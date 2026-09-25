"use client"

import React, { useState, useEffect } from "react"
import { History, X, Plus, Trash2, RotateCcw, Clock } from "lucide-react"
import { useCanvasTheme } from "./canvas-theme-context"

interface Checkpoint {
  id: string
  name: string
  timestamp: number
  layerCount: number
  dataJson: string
}

interface CheckpointsModalProps {
  boardId: string
  isOpen: boolean
  onClose: () => void
  onSaveCurrentState: (name: string) => void
  onRestoreState: (dataJson: string) => void
  currentLayerCount: number
}

export function CheckpointsModal({
  boardId,
  isOpen,
  onClose,
  onSaveCurrentState,
  onRestoreState,
  currentLayerCount,
}: CheckpointsModalProps) {
  const { theme } = useCanvasTheme()
  const isDark = theme === "dark"
  const storageKey = `whiteboard_checkpoints_${boardId}`

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([])
  const [newCheckpointName, setNewCheckpointName] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        try {
          setCheckpoints(JSON.parse(raw))
        } catch {
          setCheckpoints([])
        }
      }
    }
  }, [storageKey, isOpen])

  const saveCheckpointsToStorage = (updated: Checkpoint[]) => {
    setCheckpoints(updated)
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(updated))
    }
  }

  const handleCreate = () => {
    const name = newCheckpointName.trim() || `Snapshot #${checkpoints.length + 1}`
    onSaveCurrentState(name)
    setNewCheckpointName("")
    onClose()
  }

  const handleDelete = (id: string) => {
    const updated = checkpoints.filter((c) => c.id !== id)
    saveCheckpointsToStorage(updated)
  }

  const handleRestore = (dataJson: string) => {
    onRestoreState(dataJson)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none p-4"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 ${
          isDark ? "bg-slate-900/95 border-slate-800 text-white" : "bg-white/95 border-neutral-200 text-slate-800"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-slate-800" : "border-neutral-200"}`}>
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold tracking-wide">Version Snapshots & Checkpoints</span>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-md transition-colors ${
              isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Create New Checkpoint input */}
        <div className="p-3 border-b border-dashed border-neutral-200 dark:border-slate-800 flex items-center gap-2">
          <input
            value={newCheckpointName}
            onChange={(e) => setNewCheckpointName(e.target.value)}
            placeholder={`Save checkpoint (e.g. V1 Microservices)...`}
            className={`flex-1 px-3 py-1.5 text-xs rounded-xl border outline-none ${
              isDark
                ? "bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-400 focus:border-indigo-500"
                : "bg-neutral-50 border-neutral-200 text-slate-800 placeholder:text-neutral-400 focus:border-indigo-400"
            }`}
          />
          <button
            onClick={handleCreate}
            className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Save ({currentLayerCount})</span>
          </button>
        </div>

        {/* List of past checkpoints */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1.5 [scrollbar-width:none]">
          {checkpoints.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No saved snapshots yet. Create one above!
            </div>
          ) : (
            checkpoints.map((cp) => {
              const dateStr = new Date(cp.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                month: "short",
                day: "numeric",
              })

              return (
                <div
                  key={cp.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-colors ${
                    isDark ? "border-slate-800 bg-slate-800/40 hover:bg-slate-800/70" : "border-neutral-200 bg-neutral-50/70 hover:bg-neutral-100"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-semibold block truncate">{cp.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {dateStr}
                      </span>
                      <span>·</span>
                      <span>{cp.layerCount} components/layers</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleRestore(cp.dataJson)}
                      className="px-2 py-1 text-[11px] font-semibold text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore</span>
                    </button>
                    <button
                      onClick={() => handleDelete(cp.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
