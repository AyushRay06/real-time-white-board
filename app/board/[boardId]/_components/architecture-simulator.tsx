"use client"

import React, { memo, useCallback } from "react"
import {
  Play,
  Pause,
  Zap,
  Activity,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Gauge,
  Compass,
  CheckCircle2,
  RefreshCw,
} from "lucide-react"
import { Hint } from "@/components/hint"
import { useSimulation } from "./simulation-context"
import { SimulationSpeed, LayerType, ComponentLayer } from "@/types/canvas"
import { useMutation, useStorage } from "@liveblocks/react/suspense"

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
    graph,
    activeStage,
    activeHop,
    stepForward,
    stepBackward,
    isTourActive,
  } = useSimulation()

  const isPlaying = simMode !== "idle"
  const layers = useStorage((root) => root.layers)

  // Toggle play / pause
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

  // Fault Injection: toggles outage on a candidate node
  const toggleFault = useMutation(({ storage }) => {
    const liveLayers = storage.get("layers")
    const liveLayerIds = storage.get("layerIds")

    const candidateIds: string[] = []
    let failedId: string | null = null

    liveLayerIds.forEach((id) => {
      const l = liveLayers.get(id) as any
      if (l && l.get("type") === LayerType.Component) {
        candidateIds.push(id)
        if (l.get("status") === "error") {
          failedId = id
        }
      }
    })

    if (candidateIds.length === 0) return

    // If a node is already failed, recover it
    if (failedId) {
      const target = liveLayers.get(failedId) as any
      if (target) {
        target.set("status", "healthy")
        target.set("statusText", "HEALTHY")
      }
    } else {
      // Pick a downstream component (DB, Server, etc.) or random
      const targetId = candidateIds[candidateIds.length > 2 ? 2 : candidateIds.length - 1]
      const target = liveLayers.get(targetId) as any
      if (target) {
        target.set("status", "error")
        target.set("statusText", "OUTAGE")
      }
      setSimMode("chaos")
    }
  }, [setSimMode])

  const hasFailedNode = graph.failedNodeIds.size > 0
  const totalStages = graph.totalStages || 1

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-neutral-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-2xl border border-neutral-700/60 select-none text-white transition-all">
      {/* ── Play / Pause Primary Action ── */}
      <Hint label={isPlaying ? "Pause Flow Simulator" : "Play Sequential Request Flow (▶)"}>
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

      {/* ── Mode Switcher with Distinct Production Utilities ── */}
      <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-xl border border-neutral-700/50">
        <Hint label="Trace Mode: Causal, hop-by-hop single request lifecycle">
          <button
            onClick={() => setSimMode("playing")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              simMode === "playing"
                ? "bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Trace</span>
          </button>
        </Hint>

        <Hint label="Spike Mode: High-concurrency pipelined traffic & buffer surge">
          <button
            onClick={() => setSimMode("spike")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              simMode === "spike"
                ? "bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Spike</span>
          </button>
        </Hint>

        <Hint label="Chaos Mode: Fault injection, packet drop & cascading outage test">
          <button
            onClick={() => setSimMode("chaos")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              simMode === "chaos"
                ? "bg-rose-500/25 text-rose-300 border border-rose-500/50 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Chaos</span>
          </button>
        </Hint>
      </div>

      {/* ── Speed Cycler ── */}
      <Hint label={`Playback Speed: ${simSpeed}x (Click to cycle)`}>
        <button
          onClick={cycleSpeed}
          className="px-2 py-1 text-xs font-mono font-bold text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg border border-neutral-700/50 transition-all min-w-[34px] text-center"
        >
          {simSpeed}x
        </button>
      </Hint>

      <div className="h-4 w-px bg-neutral-700/80 mx-0.5" />

      {/* ── Live Causal Pipeline Stage Breadcrumb ── */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-950/60 rounded-xl border border-neutral-800 text-xs">
        {simMode === "playing" && (
          <>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            {activeHop ? (
              <span className="font-mono text-cyan-300 font-medium truncate max-w-[200px] sm:max-w-[280px]">
                Hop {activeStage + 1}/{totalStages}: {activeHop.label}
              </span>
            ) : (
              <span className="text-neutral-400">Connect components to trace</span>
            )}
            {/* Step navigation buttons */}
            <div className="flex items-center ml-1 gap-0.5">
              <Hint label="Previous Hop">
                <button
                  onClick={stepBackward}
                  className="p-0.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </Hint>
              <Hint label="Next Hop">
                <button
                  onClick={stepForward}
                  className="p-0.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </Hint>
            </div>
          </>
        )}

        {simMode === "spike" && (
          <>
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-amber-300 font-medium">
              Surge: {Math.round(48000 * simSpeed).toLocaleString()} req/s · Pipelined
            </span>
          </>
        )}

        {simMode === "chaos" && (
          <>
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {hasFailedNode ? (
              <span className="font-mono text-rose-300 font-medium">
                Fault Injected: Packet Dropped · Branch Stalled
              </span>
            ) : (
              <span className="font-mono text-neutral-300 font-medium">
                Resilience Test Ready
              </span>
            )}
            <button
              onClick={toggleFault}
              className="ml-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition"
            >
              {hasFailedNode ? "Recover Node" : "Inject Outage"}
            </button>
          </>
        )}

        {simMode === "idle" && (
          <span className="text-neutral-400 font-mono text-[11px]">
            Ready to simulate architecture
          </span>
        )}
      </div>

      <div className="h-4 w-px bg-neutral-700/80 mx-0.5" />

      {/* ── Live Telemetry Metrics HUD Toggle ── */}
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

      {/* ── Step-by-Step Architecture Tour Mode ── */}
      <Hint label="Architecture Presentation Tour">
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
    </div>
  )
})
