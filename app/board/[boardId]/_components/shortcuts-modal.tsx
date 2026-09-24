"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

const SHORTCUT_GROUPS = [
  {
    category: "Tools & Insertion",
    items: [
      { key: "V", desc: "Select tool" },
      { key: "H", desc: "Hand / Pan canvas tool" },
      { key: "C", desc: "Connect arrow tool" },
      { key: "P", desc: "Pen / Pencil draw" },
      { key: "E", desc: "Eraser (click or drag to erase)" },
      { key: "T", desc: "Text note" },
      { key: "N", desc: "Sticky note" },
      { key: "R", desc: "Rectangle shape" },
      { key: "O", desc: "Ellipse / Circle" },
      { key: "S", desc: "Architecture section / zone box" },
      { key: "L", desc: "System component library" },
    ],
  },
  {
    category: "Editing & Layout Selection",
    items: [
      { key: "Ctrl + Shift + A", desc: "Select entire connected architecture" },
      { key: "Ctrl + A", desc: "Select all layers on canvas" },
      { key: "Shift + Click", desc: "Add / remove layer from selection" },
      { key: "Ctrl + D", desc: "Duplicate selected layer(s)" },
      { key: "Ctrl + C / V", desc: "Copy and paste layer(s)" },
      { key: "Del / Backspace", desc: "Delete selected layer(s)" },
      { key: "Ctrl + Z / Shift+Z", desc: "Undo / Redo action" },
      { key: "Double-click arrow", desc: "Edit arrow label (e.g. Read/Write)" },
    ],
  },
  {
    category: "Navigation & View",
    items: [
      { key: "Space + Drag", desc: "Hold Space & drag to move canvas anywhere" },
      { key: "Shift + Scroll", desc: "Scroll horizontally (left / right)" },
      { key: "Arrow keys", desc: "Move canvas left/right/up/down" },
      { key: "Ctrl + Scroll", desc: "Zoom in / out towards cursor" },
      { key: "Ctrl + 0", desc: "Reset zoom to 100%" },
      { key: "Shift + 1", desc: "Fit diagram to screen" },
      { key: "G", desc: "Toggle background grid" },
      { key: "M", desc: "Toggle minimap navigator" },
      { key: "Esc", desc: "Deselect / Cancel active tool / Exit tour" },
    ],
  },
  {
    category: "Simulation & Architecture Presentation",
    items: [
      { key: "Simulate Flow (▶)", desc: "Play live animated data packet traffic along arrows" },
      { key: "Traffic Modes", desc: "Normal (cyan), Spike (amber), Chaos (red alerts)" },
      { key: "Speed (0.5x-2x)", desc: "Adjust data packet travel speed" },
      { key: "Telemetry HUD", desc: "Toggle live QPS, latency, IOPS, and pod metrics" },
      { key: "Tour Mode (🧭)", desc: "Step-by-step architecture presentation walkthrough" },
      { key: "Chaos Monkey (🔥)", desc: "Simulate node outage & test resilience" },
      { key: "Energy Arrow (✨)", desc: "Toggle live laser data stream on selected arrow" },
    ],
  },
]

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-neutral-200">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-bold text-neutral-800 flex items-center justify-between">
            <span>Keyboard Shortcuts & Gestures</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.category}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2.5">
                {group.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between bg-neutral-50 px-2.5 py-1.5 rounded-lg border border-neutral-100 text-xs"
                  >
                    <span className="text-neutral-600 truncate mr-2">{item.desc}</span>
                    <kbd className="px-1.5 py-0.5 text-[11px] font-mono font-semibold text-neutral-800 bg-white border border-neutral-200 rounded shadow-xs shrink-0">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
