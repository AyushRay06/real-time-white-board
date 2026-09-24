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
  isSimulating: boolean
  toggleSimulate: () => void
  startSimulate: () => void
  stopSimulate: () => void
  simMode: SimulationMode
  setSimMode: (mode: SimulationMode) => void
  simSpeed: SimulationSpeed
  setSimSpeed: (speed: SimulationSpeed) => void

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
  const [isSimulating, setIsSimulating] = useState<boolean>(false)
  const [simSpeed, setSimSpeed] = useState<SimulationSpeed>(1)

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

  const startSimulate = useCallback(() => {
    setIsSimulating(true)
    setActiveStage(0)
    setStageProgress(0)
    sfx.playSimulateStart()
  }, [])

  const stopSimulate = useCallback(() => {
    setIsSimulating(false)
    setActiveStage(0)
    setStageProgress(0)
  }, [])

  const toggleSimulate = useCallback(() => {
    setIsSimulating((prev) => {
      const next = !prev
      if (next) {
        setActiveStage(0)
        setStageProgress(0)
        sfx.playSimulateStart()
      }
      return next
    })
  }, [])

  // Backward compatibility for simMode
  const simMode: SimulationMode = isSimulating ? "playing" : "idle"
  const setSimMode = useCallback(
    (mode: SimulationMode) => {
      if (mode === "idle") {
        stopSimulate()
      } else {
        startSimulate()
      }
    },
    [startSimulate, stopSimulate]
  )

  // Causal simulation clock: drives sequential stages
  useEffect(() => {
    if (!isSimulating || graph.totalStages === 0) {
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
          sfx.playStep()
        }
        setStageProgress(progress)
      } else {
        // Pause gap between request cycles
        const progress =
          (cycleElapsed - graph.totalStages * stageDurMs) / pauseDurMs
        setStageProgress(progress)
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [isSimulating, simSpeed, graph.totalStages])

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
      isSimulating,
      toggleSimulate,
      startSimulate,
      stopSimulate,
      simMode,
      setSimMode,
      simSpeed,
      setSimSpeed,
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
      isSimulating,
      toggleSimulate,
      startSimulate,
      stopSimulate,
      simMode,
      setSimMode,
      simSpeed,
      setSimSpeed,
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
