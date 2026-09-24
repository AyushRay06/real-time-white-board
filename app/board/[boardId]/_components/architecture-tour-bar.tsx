"use client"

import React, { memo, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  Compass,
} from "lucide-react"
import { Hint } from "@/components/hint"
import { useSimulation } from "./simulation-context"
import { useStorage } from "@liveblocks/react/suspense"
import { COMPONENT_LABELS } from "./sys-component-layer"
import { SysComponent } from "@/types/canvas"

interface ArchitectureTourBarProps {
  onFocusLayer: (layerId: string) => void
}

export const ArchitectureTourBar = memo(function ArchitectureTourBar({
  onFocusLayer,
}: ArchitectureTourBarProps) {
  const {
    isTourActive,
    tourStepIndex,
    tourSteps,
    stopTour,
    nextTourStep,
    prevTourStep,
    isTourAutoPlaying,
    setIsTourAutoPlaying,
  } = useSimulation()

  const currentLayerId = tourSteps[tourStepIndex]
  const currentLayer = useStorage((root) =>
    currentLayerId ? root.layers.get(currentLayerId) : null
  )

  // Focus on current layer whenever step index changes
  useEffect(() => {
    if (isTourActive && currentLayerId) {
      onFocusLayer(currentLayerId)
    }
  }, [isTourActive, currentLayerId, onFocusLayer])

  // Auto-play timer: advances step every 3.5 seconds
  useEffect(() => {
    if (!isTourActive || !isTourAutoPlaying) return
    const timer = setInterval(() => {
      nextTourStep()
    }, 3500)
    return () => clearInterval(timer)
  }, [isTourActive, isTourAutoPlaying, nextTourStep])

  if (!isTourActive || tourSteps.length === 0) return null

  const compType = (currentLayer as any)?.componentType as SysComponent | undefined
  const defaultLabel = compType ? COMPONENT_LABELS[compType] || compType : "Architecture Component"
  const title = (currentLayer as any)?.value || defaultLabel

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-neutral-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl border border-neutral-700/70 select-none text-white animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Step Badge */}
      <div className="flex items-center gap-1.5 bg-purple-950/60 px-2.5 py-1 rounded-xl border border-purple-800/60 text-purple-300 text-xs font-bold font-mono">
        <Compass className="w-3.5 h-3.5 text-purple-400" />
        <span>
          Step {tourStepIndex + 1}/{tourSteps.length}
        </span>
      </div>

      {/* Component Title & Type */}
      <div className="flex flex-col min-w-[140px] max-w-[260px]">
        <span className="text-xs font-bold text-white truncate">{title}</span>
        <span className="text-[10px] text-neutral-400 truncate">
          {compType ? `Role: ${compType}` : "Component Node"}
        </span>
      </div>

      <div className="h-5 w-px bg-neutral-700/60" />

      {/* Controls: Prev, AutoPlay/Pause, Next */}
      <div className="flex items-center gap-1">
        <Hint label="Previous Component (Left Arrow)">
          <button
            onClick={prevTourStep}
            className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </Hint>

        <Hint label={isTourAutoPlaying ? "Pause Auto-Tour" : "Auto-Play Tour (3.5s per step)"}>
          <button
            onClick={() => setIsTourAutoPlaying((v) => !v)}
            className={`p-1.5 rounded-lg transition-all ${
              isTourAutoPlaying
                ? "bg-purple-600 text-white shadow-sm shadow-purple-500/40"
                : "text-neutral-300 hover:text-white hover:bg-neutral-800"
            }`}
          >
            {isTourAutoPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
          </button>
        </Hint>

        <Hint label="Next Component (Right Arrow)">
          <button
            onClick={nextTourStep}
            className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </Hint>
      </div>

      <div className="h-5 w-px bg-neutral-700/60" />

      {/* Exit Button */}
      <Hint label="Exit Presentation Mode (Esc)">
        <button
          onClick={stopTour}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-950/30 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </Hint>
    </div>
  )
})
