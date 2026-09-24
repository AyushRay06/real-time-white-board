"use client"

import React, { memo, useCallback } from "react"
import {
  Play,
  Pause,
  Zap,
  Activity,
  AlertTriangle,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Gauge,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Hint } from "@/components/hint"
import { useSimulation } from "./simulation-context"
import { SimulationMode, SimulationSpeed, LayerType } from "@/types/canvas"
import { useStorage, useMutation } from "@liveblocks/react/suspense"

interface ArchitectureSimulatorProps {
  onStartTour: () => void
}

export const ArchitectureSimulator = memo(function ArchitectureSimulator({
  onStartTour,
}: ArchitectureSimulatorProps) {
  const {
    simMode,
    setSimMode,
    simSpeed,
    setSimSpeed,
    showMetrics,
    setShowMetrics,
    soundEnabled,
    setSoundEnabled,
    isTourActive,
  } = useSimulation()

  const layerIds = useStorage((root) => root.layerIds)
  const isPlaying = simMode !== "idle"

  // Quick toggle play / pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      setSimMode("idle")
    } else {
      setSimMode("playing")
    }
  }, [isPlaying, setSimMode])

  // Cycle speed: 0.5x -> 1x -> 2x
  const cycleSpeed = useCallback(() => {
    setSimSpeed((simSpeed === 0.5 ? 1 : simSpeed === 1 ? 2 : 0.5) as SimulationSpeed)
  }, [simSpeed, setSimSpeed])

  // Chaos Injection: pick a component and mark it with "error" status
  const injectChaos = useMutation(({ storage }) => {
    const liveLayers = storage.get("layers")
    const liveLayerIds = storage.get("layerIds")

    // Find candidate components (servers, databases, services)
    const candidateIds: string[] = []
    liveLayerIds.forEach((id) => {
      const l = liveLayers.get(id)
      if (l && l.get("type") === LayerType.Component) {
        candidateIds.push(id)
      }
    })

    if (candidateIds.length === 0) return

    // Pick a random component to fail
    const targetId = candidateIds[Math.floor(Math.random() * candidateIds.length)]
    const target = liveLayers.get(targetId) as any
    if (target) {
      const currentStatus = target.get("status") as string | undefined
      if (currentStatus === "error") {
        target.set("status", "healthy")
        target.set("statusText", "HEALTHY")
      } else {
        target.set("status", "error")
        target.set("statusText", "OUTAGE")
      }
    }

    setSimMode("chaos")
  }, [setSimMode])

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-2xl border border-neutral-700/60 select-none text-white transition-all hover:bg-neutral-900/95">
      {/* Play / Pause Simulator */}
      <Hint label={isPlaying ? "Pause Flow Simulator" : "Play Live Architecture Flow (▶)"}>
        <button
          onClick={togglePlay}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs transition-all shadow-sm ${
            isPlaying
              ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25"
              : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 animate-pulse"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Flow</span>
            </>
          )}
        </button>
      </Hint>

      {/* Mode Selectors */}
      <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-xl border border-neutral-700/50">
        <Hint label="Standard Traffic Flow">
          <button
            onClick={() => setSimMode("playing")}
            className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              simMode === "playing"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Activity className="w-3 h-3" />
            <span className="hidden sm:inline">Normal</span>
          </button>
        </Hint>

        <Hint label="High Traffic Spike">
          <button
            onClick={() => setSimMode("spike")}
            className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              simMode === "spike"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Zap className="w-3 h-3" />
            <span className="hidden sm:inline">Spike</span>
          </button>
        </Hint>

        <Hint label="Chaos / Fault Injection Test">
          <button
            onClick={() => setSimMode("chaos")}
            className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              simMode === "chaos"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Flame className="w-3 h-3" />
            <span className="hidden sm:inline">Chaos</span>
          </button>
        </Hint>
      </div>

      {/* Speed Cycler */}
      <Hint label={`Playback Speed: ${simSpeed}x (Click to cycle)`}>
        <button
          onClick={cycleSpeed}
          className="px-2 py-1 text-xs font-mono font-bold text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg border border-neutral-700/50 transition-all min-w-[34px] text-center"
        >
          {simSpeed}x
        </button>
      </Hint>

      <div className="h-4 w-px bg-neutral-700 mx-0.5" />

      {/* Telemetry Metrics HUD Toggle */}
      <Hint label={`Live Telemetry Metrics: ${showMetrics ? "ON" : "OFF"}`}>
        <button
          onClick={() => setShowMetrics((v) => !v)}
          className={`p-1.5 rounded-xl text-xs font-medium transition-all ${
            showMetrics
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Gauge className="w-4 h-4" />
        </button>
      </Hint>

      {/* Architecture Tour / Presentation Mode */}
      <Hint label="Step-by-Step Architecture Presentation / Tour">
        <button
          onClick={onStartTour}
          className={`p-1.5 rounded-xl text-xs font-medium transition-all ${
            isTourActive
              ? "bg-purple-600 text-white shadow-sm shadow-purple-500/30"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Compass className="w-4 h-4" />
        </button>
      </Hint>

      {/* Chaos Monkey Outage Trigger */}
      <Hint label="Chaos Monkey: Inject Outage into random server">
        <button
          onClick={injectChaos}
          className="p-1.5 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/40 transition-all"
        >
          <AlertTriangle className="w-4 h-4" />
        </button>
      </Hint>

      {/* SFX Audio Toggle */}
      <Hint label={`Sound Effects: ${soundEnabled ? "ON" : "OFF"}`}>
        <button
          onClick={() => setSoundEnabled((v) => !v)}
          className={`p-1.5 rounded-xl text-xs transition-all ${
            soundEnabled
              ? "text-neutral-300 hover:text-white hover:bg-neutral-800"
              : "text-neutral-600 hover:text-neutral-400"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </Hint>
    </div>
  )
})
