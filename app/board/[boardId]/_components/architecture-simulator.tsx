"use client"

import React, { memo, useCallback } from "react"
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react"
import { Hint } from "@/components/hint"
import { useSimulation } from "./simulation-context"
import { SimulationSpeed } from "@/types/canvas"

export const ArchitectureSimulator = memo(function ArchitectureSimulator() {
  const {
    isSimulating,
    toggleSimulate,
    stopSimulate,
    simSpeed,
    setSimSpeed,
    graph,
    activeStage,
    activeHop,
    stepForward,
    stepBackward,
  } = useSimulation()

  // Cycle speed: 0.5x -> 1x -> 2x
  const cycleSpeed = useCallback(() => {
    setSimSpeed((simSpeed === 0.5 ? 1 : simSpeed === 1 ? 2 : 0.5) as SimulationSpeed)
  }, [simSpeed, setSimSpeed])

  // If simulation is not running, take 0 space on the screen!
  if (!isSimulating) {
    return null
  }

  const totalStages = Math.max(1, graph.totalStages)

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-2xl border border-neutral-700/60 select-none text-white text-xs transition-all animate-in fade-in slide-in-from-top-2">
      {/* Active Stage Indicator */}
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />

      <span className="font-mono text-cyan-300 font-medium truncate max-w-[200px] sm:max-w-[320px]">
        {activeHop ? `Hop ${activeStage + 1}/${totalStages}: ${activeHop.label}` : "Tracing Request Flow..."}
      </span>

      <div className="h-3.5 w-px bg-neutral-700/80 mx-0.5" />

      {/* Step Backward */}
      <Hint label="Previous Hop">
        <button
          onClick={stepBackward}
          className="p-1 hover:text-cyan-300 rounded hover:bg-neutral-800 transition"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </Hint>

      {/* Pause / Resume */}
      <Hint label={isSimulating ? "Pause Trace" : "Resume Trace"}>
        <button
          onClick={toggleSimulate}
          className="p-1 hover:text-cyan-300 rounded hover:bg-neutral-800 transition"
        >
          {isSimulating ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
        </button>
      </Hint>

      {/* Step Forward */}
      <Hint label="Next Hop">
        <button
          onClick={stepForward}
          className="p-1 hover:text-cyan-300 rounded hover:bg-neutral-800 transition"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </Hint>

      {/* Playback Speed */}
      <Hint label={`Speed: ${simSpeed}x (Click to cycle)`}>
        <button
          onClick={cycleSpeed}
          className="px-1.5 py-0.5 font-mono text-[11px] font-bold rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
        >
          {simSpeed}x
        </button>
      </Hint>

      <div className="h-3.5 w-px bg-neutral-700/80 mx-0.5" />

      {/* Close / Stop Trace */}
      <Hint label="Stop & Close Trace">
        <button
          onClick={stopSimulate}
          className="p-1 text-neutral-400 hover:text-rose-400 rounded hover:bg-neutral-800 transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </Hint>
    </div>
  )
})
