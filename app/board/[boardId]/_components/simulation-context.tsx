"use client"

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react"
import { useStorage } from "@liveblocks/react/suspense"
import { SimulationMode, SimulationSpeed } from "@/types/canvas"
import { sfx } from "@/lib/sfx"
import {
  analyzeArchitectureGraph,
  ArchitectureGraphAnalysis,
  StageDescription,
} from "./architecture-graph"

interface SimulationContextType {
  simMode: SimulationMode
  setSimMode: (mode: SimulationMode) => void
  simSpeed: SimulationSpeed
  setSimSpeed: (speed: SimulationSpeed) => void
  showMetrics: boolean
  setShowMetrics: (v: boolean | ((prev: boolean) => boolean)) => void
  soundEnabled: boolean
  setSoundEnabled: (v: boolean | ((prev: boolean) => boolean)) => void

  // Architecture Graph & Causal Flow
  graph: ArchitectureGraphAnalysis
  activeStage: number
  stageProgress: number
  activeHop: StageDescription | null
  stepForward: () => void
  stepBackward: () => void

  // Tour / Presentation Mode
  isTourActive: boolean
  tourStepIndex: number
  tourSteps: string[]
  focusedLayerId: string | null
  startTour: (steps: string[]) => void
  stopTour: () => void
  nextTourStep: () => void
  prevTourStep: () => void
  isTourAutoPlaying: boolean
  setIsTourAutoPlaying: (v: boolean | ((prev: boolean) => boolean)) => void
}

const SimulationContext = createContext<SimulationContextType | null>(null)

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [simMode, setSimModeState] = useState<SimulationMode>("idle")
  const [simSpeed, setSimSpeed] = useState<SimulationSpeed>(1)
  const [showMetrics, setShowMetrics] = useState<boolean>(false)
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true)

  // Live storage of layers to build the DAG
  const layers = useStorage((root) => root.layers)

  // Compute topological architecture graph
  const graph = useMemo(() => {
    return analyzeArchitectureGraph(layers || new Map())
  }, [layers])

  // Active causal stage index and progress
  const [activeStage, setActiveStage] = useState<number>(0)
  const [stageProgress, setStageProgress] = useState<number>(0)

  // Tour mode state
  const [isTourActive, setIsTourActive] = useState(false)
  const [tourSteps, setTourSteps] = useState<string[]>([])
  const [tourStepIndex, setTourStepIndex] = useState(0)
  const [isTourAutoPlaying, setIsTourAutoPlaying] = useState(false)

  const activeStageRef = useRef(0)
  activeStageRef.current = activeStage

  // Sound effects & state changes on mode switch
  const setSimMode = useCallback((mode: SimulationMode) => {
    setSimModeState(mode)
    if (mode === "playing") {
      sfx.playSimulateStart()
      setActiveStage(0)
      setStageProgress(0)
    } else if (mode === "spike") {
      sfx.playSimulateStart()
    } else if (mode === "chaos") {
      sfx.playChaos()
    }
  }, [])

  const setSoundEnabled = useCallback((action: boolean | ((prev: boolean) => boolean)) => {
    setSoundEnabledState((prev) => {
      const next = typeof action === "function" ? action(prev) : action
      sfx.setMuted(!next)
      return next
    })
  }, [])

  // Causal simulation clock: drives sequential stages in Normal mode and syncs activeHop
  useEffect(() => {
    if (simMode === "idle" || graph.totalStages === 0) {
      return
    }

    const stageDurMs = (1.4 / simSpeed) * 1000
    const pauseDurMs = (0.5 / simSpeed) * 1000
    const totalCycleMs = graph.totalStages * stageDurMs + pauseDurMs

    const startTime = Date.now()
    let animId: number

    const tick = () => {
      const elapsed = Date.now() - startTime
      const cycleElapsed = elapsed % totalCycleMs

      if (cycleElapsed < graph.totalStages * stageDurMs) {
        const stageIdx = Math.min(
          graph.totalStages - 1,
          Math.floor(cycleElapsed / stageDurMs)
        )
        const progress = (cycleElapsed % stageDurMs) / stageDurMs

        if (stageIdx !== activeStageRef.current) {
          setActiveStage(stageIdx)
          // Soft audio tick on stage advance in single-trace mode
          if (soundEnabled && simMode === "playing") {
            sfx.playStep()
          }
        }
        setStageProgress(progress)
      } else {
        // In pause gap between request cycles
        const progress =
          (cycleElapsed - graph.totalStages * stageDurMs) / pauseDurMs
        setStageProgress(progress)
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [simMode, simSpeed, graph.totalStages, soundEnabled])

  // Manual stepping forward/backward in pipeline
  const stepForward = useCallback(() => {
    setActiveStage((curr) => (curr + 1) % Math.max(1, graph.totalStages))
    sfx.playStep()
  }, [graph.totalStages])

  const stepBackward = useCallback(() => {
    setActiveStage((curr) =>
      curr > 0 ? curr - 1 : Math.max(0, graph.totalStages - 1)
    )
    sfx.playStep()
  }, [graph.totalStages])

  // Active Hop description
  const activeHop = useMemo(() => {
    if (graph.stageDescriptions.length === 0) return null
    return graph.stageDescriptions[activeStage] || graph.stageDescriptions[0] || null
  }, [graph.stageDescriptions, activeStage])

  // Presentation Tour controls
  const startTour = useCallback((steps: string[]) => {
    if (steps.length === 0) return
    setTourSteps(steps)
    setTourStepIndex(0)
    setIsTourActive(true)
    setIsTourAutoPlaying(false)
    sfx.playStep()
  }, [])

  const stopTour = useCallback(() => {
    setIsTourActive(false)
    setIsTourAutoPlaying(false)
    setTourStepIndex(0)
  }, [])

  const nextTourStep = useCallback(() => {
    setTourStepIndex((curr) => {
      if (curr < tourSteps.length - 1) {
        sfx.playStep()
        return curr + 1
      }
      return 0
    })
  }, [tourSteps.length])

  const prevTourStep = useCallback(() => {
    setTourStepIndex((curr) => {
      if (curr > 0) {
        sfx.playStep()
        return curr - 1
      }
      return tourSteps.length - 1
    })
  }, [tourSteps.length])

  const focusedLayerId = isTourActive && tourSteps.length > 0 ? tourSteps[tourStepIndex] : null

  const value = useMemo(
    () => ({
      simMode,
      setSimMode,
      simSpeed,
      setSimSpeed,
      showMetrics,
      setShowMetrics,
      soundEnabled,
      setSoundEnabled,
      graph,
      activeStage,
      stageProgress,
      activeHop,
      stepForward,
      stepBackward,
      isTourActive,
      tourStepIndex,
      tourSteps,
      focusedLayerId,
      startTour,
      stopTour,
      nextTourStep,
      prevTourStep,
      isTourAutoPlaying,
      setIsTourAutoPlaying,
    }),
    [
      simMode,
      setSimMode,
      simSpeed,
      setSimSpeed,
      showMetrics,
      setShowMetrics,
      soundEnabled,
      setSoundEnabled,
      graph,
      activeStage,
      stageProgress,
      activeHop,
      stepForward,
      stepBackward,
      isTourActive,
      tourStepIndex,
      tourSteps,
      focusedLayerId,
      startTour,
      stopTour,
      nextTourStep,
      prevTourStep,
      isTourAutoPlaying,
      setIsTourAutoPlaying,
    ]
  )

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>
}

export function useSimulation() {
  const ctx = useContext(SimulationContext)
  if (!ctx) {
    throw new Error("useSimulation must be used within SimulationProvider")
  }
  return ctx
}
