"use client"

import React, { createContext, useContext, useState, useCallback, useMemo } from "react"
import { SimulationMode, SimulationSpeed } from "@/types/canvas"
import { sfx } from "@/lib/sfx"

interface SimulationContextType {
  simMode: SimulationMode
  setSimMode: (mode: SimulationMode) => void
  simSpeed: SimulationSpeed
  setSimSpeed: (speed: SimulationSpeed) => void
  showMetrics: boolean
  setShowMetrics: (v: boolean | ((prev: boolean) => boolean)) => void
  soundEnabled: boolean
  setSoundEnabled: (v: boolean | ((prev: boolean) => boolean)) => void
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

  // Tour mode state
  const [isTourActive, setIsTourActive] = useState(false)
  const [tourSteps, setTourSteps] = useState<string[]>([])
  const [tourStepIndex, setTourStepIndex] = useState(0)
  const [isTourAutoPlaying, setIsTourAutoPlaying] = useState(false)

  const setSimMode = useCallback((mode: SimulationMode) => {
    setSimModeState(mode)
    if (mode === "playing" || mode === "spike") {
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
      return 0 // loop or stay
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
      showMetrics,
      soundEnabled,
      setSoundEnabled,
      isTourActive,
      tourStepIndex,
      tourSteps,
      focusedLayerId,
      startTour,
      stopTour,
      nextTourStep,
      prevTourStep,
      isTourAutoPlaying,
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
