"use client"

import React, { useEffect, useRef } from "react"
import {
  Copy,
  Files,
  Trash2,
  BringToFront,
  SendToBack,
  Edit3,
  Maximize2,
  LayoutGrid,
  Network,
  Spline,
  CornerDownRight,
} from "lucide-react"

interface ContextMenuProps {
  x: number
  y: number
  hasSelection: boolean
  hasClipboard: boolean
  onClose: () => void
  onCopy: () => void
  onPaste: () => void
  onDuplicate: () => void
  onDelete: () => void
  onBringToFront: () => void
  onSendToBack: () => void
  onEditLabel?: () => void
  onSelectConnected?: () => void
  onToggleArrowStyle?: () => void
  isArrow?: boolean
  currentArrowStyle?: "curvy" | "sharp"
  onSelectAll: () => void
  onFitToScreen: () => void
  onOpenLibrary: () => void
}

export function CanvasContextMenu({
  x,
  y,
  hasSelection,
  hasClipboard,
  onClose,
  onCopy,
  onPaste,
  onDuplicate,
  onDelete,
  onBringToFront,
  onSendToBack,
  onEditLabel,
  onSelectConnected,
  onToggleArrowStyle,
  isArrow,
  currentArrowStyle = "curvy",
  onSelectAll,
  onFitToScreen,
  onOpenLibrary,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("pointerdown", handleClickOutside)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("pointerdown", handleClickOutside)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  // Clamp within viewport
  const clampedX = Math.min(x, window.innerWidth - 200)
  const clampedY = Math.min(y, window.innerHeight - 300)

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-neutral-200 py-1.5 text-xs text-neutral-700 select-none animate-in fade-in zoom-in-95 duration-100"
      style={{ left: clampedX, top: clampedY }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {hasSelection ? (
        <>
          <button
            onClick={() => {
              onDuplicate()
              onClose()
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between font-medium"
          >
            <span className="flex items-center gap-2">
              <Files className="w-3.5 h-3.5 text-neutral-500" />
              Duplicate
            </span>
            <span className="text-[10px] text-neutral-400">Ctrl+D</span>
          </button>

          <button
            onClick={() => {
              onCopy()
              onClose()
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between font-medium"
          >
            <span className="flex items-center gap-2">
              <Copy className="w-3.5 h-3.5 text-neutral-500" />
              Copy
            </span>
            <span className="text-[10px] text-neutral-400">Ctrl+C</span>
          </button>

          {hasClipboard && (
            <button
              onClick={() => {
                onPaste()
                onClose()
              }}
              className="w-full px-3 py-1.5 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                Paste
              </span>
              <span className="text-[10px] text-neutral-400">Ctrl+V</span>
            </button>
          )}

          {onEditLabel && (
            <button
              onClick={() => {
                onEditLabel()
                onClose()
              }}
              className="w-full px-3 py-1.5 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
                Rename / Label
              </span>
            </button>
          )}

          {onSelectConnected && (
            <button
              onClick={() => {
                onSelectConnected()
                onClose()
              }}
              className="w-full px-3 py-1.5 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                <Network className="w-3.5 h-3.5 text-neutral-500" />
                Select Entire Layout
              </span>
            </button>
          )}

          {isArrow && onToggleArrowStyle && (
            <button
              onClick={() => {
                onToggleArrowStyle()
                onClose()
              }}
              className="w-full px-3 py-1.5 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                {currentArrowStyle === "sharp" ? (
                  <Spline className="w-3.5 h-3.5 text-neutral-500" />
                ) : (
                  <CornerDownRight className="w-3.5 h-3.5 text-neutral-500" />
                )}
                {currentArrowStyle === "sharp" ? "Switch to Curvy" : "Switch to Sharp"}
              </span>
            </button>
          )}

          <div className="my-1 border-t border-neutral-100" />

          <button
            onClick={() => {
              onBringToFront()
              onClose()
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-neutral-100 flex items-center gap-2 font-medium"
          >
            <BringToFront className="w-3.5 h-3.5 text-neutral-500" />
            Bring to front
          </button>

          <button
            onClick={() => {
              onSendToBack()
              onClose()
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-neutral-100 flex items-center gap-2 font-medium"
          >
            <SendToBack className="w-3.5 h-3.5 text-neutral-500" />
            Send to back
          </button>

          <div className="my-1 border-t border-neutral-100" />

          <button
            onClick={() => {
              onDelete()
              onClose()
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-red-50 text-red-600 flex items-center justify-between font-medium"
          >
            <span className="flex items-center gap-2">
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
              Delete
            </span>
            <span className="text-[10px] text-red-400">Del</span>
          </button>
        </>
      ) : (
        <>
          {hasClipboard && (
            <button
              onClick={() => {
                onPaste()
                onClose()
              }}
              className="w-full px-3 py-1.5 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                Paste
              </span>
              <span className="text-[10px] text-neutral-400">Ctrl+V</span>
            </button>
          )}

          <button
            onClick={() => {
              onOpenLibrary()
              onClose()
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 font-medium"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-neutral-500" />
            Add Component…
          </button>

          <button
            onClick={() => {
              onSelectAll()
              onClose()
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-neutral-100 flex items-center justify-between font-medium"
          >
            <span>Select All</span>
            <span className="text-[10px] text-neutral-400">Ctrl+A</span>
          </button>

          <div className="my-1 border-t border-neutral-100" />

          <button
            onClick={() => {
              onFitToScreen()
              onClose()
            }}
            className="w-full px-3 py-1.5 text-left hover:bg-neutral-100 flex items-center gap-2 font-medium"
          >
            <Maximize2 className="w-3.5 h-3.5 text-neutral-500" />
            Fit to Screen
          </button>
        </>
      )}
    </div>
  )
}
