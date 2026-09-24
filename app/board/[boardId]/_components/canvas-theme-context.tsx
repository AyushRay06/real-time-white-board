"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type CanvasTheme = "light" | "dark"

interface CanvasThemeContextType {
  theme: CanvasTheme
  toggleTheme: () => void
  setTheme: (theme: CanvasTheme) => void
}

const CanvasThemeContext = createContext<CanvasThemeContextType | null>(null)

export function CanvasThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<CanvasTheme>("light")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("canvas-theme") as CanvasTheme | null
      if (saved === "dark" || saved === "light") {
        setThemeState(saved)
      }
    } catch {
      // LocalStorage unavailable in SSR
    }
  }, [])

  const setTheme = (t: CanvasTheme) => {
    setThemeState(t)
    try {
      localStorage.setItem("canvas-theme", t)
    } catch {}
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <CanvasThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </CanvasThemeContext.Provider>
  )
}

export function useCanvasTheme() {
  const context = useContext(CanvasThemeContext)
  if (!context) {
    return {
      theme: "light" as CanvasTheme,
      toggleTheme: () => {},
      setTheme: () => {},
    }
  }
  return context
}
