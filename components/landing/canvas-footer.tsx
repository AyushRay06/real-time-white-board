"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import {
  MousePointer2,
  Pencil,
  StickyNote,
  Square,
  Circle,
  Type,
  Github,
} from "lucide-react"

type WhiteboardTool = "select" | "pencil" | "note" | "rectangle" | "circle" | "text"

export function CanvasFooter() {
  const [activeTool, setActiveTool] = useState<WhiteboardTool>("pencil")

  const tools = [
    { id: "select" as WhiteboardTool, label: "Select", icon: MousePointer2 },
    { id: "pencil" as WhiteboardTool, label: "Pen", icon: Pencil },
    { id: "note" as WhiteboardTool, label: "Sticky Note", icon: StickyNote },
    { id: "rectangle" as WhiteboardTool, label: "Rectangle", icon: Square },
    { id: "circle" as WhiteboardTool, label: "Circle", icon: Circle },
    { id: "text" as WhiteboardTool, label: "Text", icon: Type },
  ]

  return (
    <footer className="relative w-full bg-white text-slate-700 font-sans overflow-hidden border-t border-slate-200/80">
      {/* Infinite Canvas Subtle Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        {/* SIMPLE CALL TO ACTION */}
        <section className="pt-20 sm:pt-28 pb-16 sm:pb-20 text-center flex flex-col items-center relative">
          {/* Simulated Multiplayer Cursor near CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:flex items-center gap-1.5 absolute -top-4 sm:top-14 left-8 lg:left-24 pointer-events-none select-none z-20"
          >
            <MousePointer2 className="w-4 h-4 fill-indigo-500 text-indigo-500 transform -rotate-12" />
            <span className="px-2 py-0.5 rounded-none text-[11px] font-semibold text-white bg-indigo-600 shadow-xs">
              Ayush (you)
            </span>
          </motion.div>

          <h2 className="font-zodiak text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight max-w-3xl leading-[1.12] mb-4">
            Ready to start planning on an infinite canvas?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8">
            Collaborate with your team in real time. Free forever.
          </p>

          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none text-base font-semibold shadow-md shadow-indigo-600/20 transition-all hover:scale-105 border-none cursor-pointer"
            >
              Get Started Free
            </Button>
          </SignUpButton>
        </section>

        {/* WHITEBOARD RELEVANT FOOTER CONTENT */}
        <div className="pt-12 pb-12 border-t border-slate-200/90 grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
          
          {/* Left: Brand & Sticky Note */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-none bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-xs flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Planning Portal logo"
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
              </div>
              <span className="font-comico text-lg font-bold text-slate-900 tracking-tight">
                Planning Portal
              </span>
            </Link>

            <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-xs">
              A real-time collaborative whiteboard built for distributed software and design teams.
            </p>

            {/* Creative Canvas Sticky Note */}
            <div className="relative mt-2 p-3.5 bg-amber-50 border border-amber-200/80 rounded-none shadow-xs max-w-[240px] transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-1.5 mb-1 text-[11px] font-semibold text-amber-800">
                <span>📌</span>
                <span>Team Board Note</span>
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed font-normal">
                Everything starts with a simple sketch. Invite teammates and turn ideas into architecture.
              </p>
            </div>
          </div>

          {/* Center: Interactive Whiteboard Toolbar Widget */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start justify-center gap-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Canvas Tools
            </div>
            
            {/* Toolbar Dock */}
            <div className="inline-flex items-center gap-1 bg-white border border-slate-200 p-1.5 rounded-none shadow-xs">
              {tools.map((tool) => {
                const Icon = tool.icon
                const isSelected = activeTool === tool.id
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    title={tool.label}
                    className={`w-9 h-9 rounded-none flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 text-indigo-600 shadow-xs border border-indigo-200/80"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              })}
            </div>

            {/* Live Multiplayer Status */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Multiplayer sync active</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">Sub-second latency</span>
            </div>
          </div>

          {/* Right: Clean Navigation Links with Simulated Teammate Cursor */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3 relative">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            
            <nav className="flex flex-col items-start md:items-end gap-2 text-sm text-slate-600 font-medium">
              <a href="#features" className="hover:text-indigo-600 transition-colors">
                Features
              </a>
              <a href="#demo" className="hover:text-indigo-600 transition-colors">
                Sandbox
              </a>
              <a href="#use-cases" className="hover:text-indigo-600 transition-colors">
                Use Cases
              </a>
              <a href="#testimonials" className="hover:text-indigo-600 transition-colors">
                Testimonials
              </a>
              <a href="#faq" className="hover:text-indigo-600 transition-colors">
                FAQ
              </a>
            </nav>

            {/* Simulated Teammate Cursor near Nav */}
            <div className="hidden lg:flex items-center gap-1.5 absolute -bottom-1 -left-12 pointer-events-none select-none">
              <MousePointer2 className="w-4 h-4 fill-emerald-500 text-emerald-500 transform -rotate-12" />
              <span className="px-2 py-0.5 rounded-none text-[11px] font-semibold text-white bg-emerald-600 shadow-xs">
                Sarah
              </span>
            </div>
          </div>

        </div>

        {/* MINIMAL BOTTOM BAR */}
        <div className="py-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Planning Portal. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/AyushRay06/real-time-white-board"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </Link>
            <a href="#faq" className="hover:text-slate-700 transition-colors">
              Privacy
            </a>
            <a href="#faq" className="hover:text-slate-700 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
