"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lightbulb,
  Users,
  Compass,
  Zap,
  MousePointer2,
  Database,
  Server,
  Calculator,
  Play,
  RotateCcw,
  Check,
  Shield,
  Download,
  Moon,
  Magnet,
  LayoutGrid,
  Sparkles,
  ArrowRight,
  FolderKanban,
  Star,
  Search,
  Share2,
  Copy,
  Sliders,
  Cpu,
} from "lucide-react"

// Types for the interactive architecture use-cases
type UseCaseTab = "architecture" | "erd" | "flow" | "estimator" | "retro"

export function ExcalidrawStoryline() {
  // --- Create section interactive state ---
  const [selectedTool, setSelectedTool] = useState<string>("rect")
  const [selectedColor, setSelectedColor] = useState<string>("#6366F1")

  // --- Collaborate section interactive state ---
  const [copiedLink, setCopiedLink] = useState(false)

  // --- Use Cases interactive state ---
  const [activeTab, setActiveTab] = useState<UseCaseTab>("architecture")

  // Architecture tab interactive selection
  const [selectedArchNode, setSelectedArchNode] = useState<string | null>("gateway")

  // Sequence Flow interactive trace
  const [flowStep, setFlowStep] = useState<number>(1)
  const [isTracingFlow, setIsTracingFlow] = useState<boolean>(false)

  const handleSimulateTrace = () => {
    if (isTracingFlow) return
    setIsTracingFlow(true)
    setFlowStep(1)
    let s = 1
    const timer = setInterval(() => {
      s++
      if (s > 4) {
        clearInterval(timer)
        setIsTracingFlow(false)
        setFlowStep(4)
      } else {
        setFlowStep(s)
      }
    }, 750)
  }

  // Capacity Estimator state
  const [dau, setDau] = useState<number>(10) // 10M DAU
  const readQps = Math.round((dau * 1_000_000 * 25) / 86400)
  const writeQps = Math.round((dau * 1_000_000 * 3) / 86400)
  const monthlyStorageGb = Math.round((dau * 1_000_000 * 3 * 1.8 * 30) / (1024 * 1024))

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* CONTINUOUS VERTICAL TIMELINE LINE (Excalidraw style) */}
      <div className="hidden lg:block absolute left-8 top-12 bottom-24 w-[2px] bg-gradient-to-b from-indigo-200 via-purple-200 to-indigo-100" />

      {/* =========================================================================
          SECTION 1: CREATE (Excalidraw style)
         ========================================================================= */}
      <div id="create" className="relative mb-32 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-amber-500 z-10">
          <Lightbulb className="w-5 h-5 fill-amber-400 text-amber-500" />
        </div>

        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-200/60 tracking-wide">
            zero learning curve
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Create
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Simply designed to create perfect results fast. Elementary tools, advanced cloud architecture primitives, and unlimited canvas freedom.
        </p>

        {/* BROWSER WINDOW MOCKUP: CREATE */}
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-8">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="px-6 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              planningportal.com/canvas/new-idea
            </div>
            <div className="text-[11px] font-medium text-slate-400 font-mono">100%</div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative h-[420px] sm:h-[460px] bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] p-6 overflow-hidden flex flex-col justify-between">
            {/* FLOATING TOP TOOLBAR WITH DIAGONAL KEY BADGES */}
            <div className="mx-auto bg-white/95 backdrop-blur-md border border-slate-200 shadow-md rounded-2xl p-1.5 flex items-center gap-1 sm:gap-2 z-20">
              {[
                { id: "select", icon: MousePointer2, label: "Select", key: "V" },
                { id: "sticky", icon: Sliders, label: "Note", key: "S" },
                { id: "rect", icon: LayoutGrid, label: "Box", key: "R" },
                { id: "circle", icon: Cpu, label: "Service", key: "E" },
                { id: "db", icon: Database, label: "Database", key: "D" },
                { id: "zone", icon: Shield, label: "VPC Zone", key: "Z" },
              ].map((tool) => {
                const Icon = tool.icon
                const isActive = selectedTool === tool.id
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`relative p-2.5 rounded-xl transition-all flex items-center justify-center ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span
                      className={`absolute bottom-0.5 right-1 text-[8px] font-mono font-bold leading-none ${
                        isActive ? "text-indigo-200" : "text-slate-400"
                      }`}
                    >
                      {tool.key}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* FLOATING PROPERTIES PALETTE (Excalidraw style) */}
            <div className="absolute top-16 left-6 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-xl p-3 w-44 z-10 hidden sm:block">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                Stroke Color
              </span>
              <div className="flex items-center gap-1.5 mb-3">
                {["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#0F172A"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-lg transition-transform ${
                      selectedColor === c ? "scale-110 ring-2 ring-offset-1 ring-indigo-500" : "opacity-80 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
              <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[11px] text-slate-600">
                <span>Magnetic Snap</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* CANVAS ELEMENTS MOCKUP */}
            <div className="relative flex-1 flex items-center justify-center">
              {/* Architecture VPC Boundary Zone */}
              <div className="w-[320px] sm:w-[480px] h-[210px] sm:h-[230px] rounded-2xl border-2 border-dashed border-indigo-400/80 bg-indigo-50/30 p-4 relative flex flex-col justify-between transition-all">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600 text-white font-mono text-[10px] font-bold shadow-xs">
                    <Shield className="w-3 h-3" />
                    VPC Boundary (10.0.0.0/16)
                  </div>
                  <span className="text-[10px] font-mono text-indigo-700 font-medium">
                    Auto-containment: On
                  </span>
                </div>

                {/* Subnet Nodes Inside VPC */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs text-center flex flex-col items-center">
                    <Server className="w-5 h-5 text-indigo-600 mb-1" />
                    <span className="text-xs font-bold text-slate-800">API Gateway</span>
                    <span className="text-[9px] font-mono text-indigo-600 mt-0.5">Edge Route</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs text-center flex flex-col items-center">
                    <Cpu className="w-5 h-5 text-purple-600 mb-1" />
                    <span className="text-xs font-bold text-slate-800">Auth Service</span>
                    <span className="text-[9px] font-mono text-purple-600 mt-0.5">JWT / OAuth</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs text-center flex flex-col items-center col-span-2 sm:col-span-1">
                    <Database className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="text-xs font-bold text-slate-800">PostgreSQL</span>
                    <span className="text-[9px] font-mono text-emerald-600 mt-0.5">Read Replica</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 text-right">
                  // Move VPC to drag all child services
                </div>
              </div>

              {/* 3D Hand-drawn sticky note with flying curled corner */}
              <div className="absolute right-4 top-4 w-48 select-none hidden md:block rotate-[2.5deg]">
                {/* 3D Lifted Corner Shadow */}
                <div
                  className="absolute -bottom-2 -right-1 w-3/4 h-8 pointer-events-none rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 55%, transparent 75%)",
                    transform: "rotate(6deg) skewX(8deg)",
                    filter: "blur(4px)",
                  }}
                />

                {/* Main Paper Body with clipped corner */}
                <div
                  className="relative p-3.5 pt-2 pb-5 pr-6 bg-amber-100 border border-amber-300/80 rounded-[2px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 25%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.08) 100%)",
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.08), 0 6px 14px -2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%)",
                  }}
                >
                  {/* Top adhesive band */}
                  <div className="w-full h-3.5 -mt-2 -mx-3.5 mb-2 px-3.5 bg-black/[0.04] border-b border-black/[0.06] flex items-center">
                    <div className="w-full h-[1px] bg-white/30 rounded-full" />
                  </div>
                  <span className="block font-bold mb-1 text-[11px] text-amber-800">⚡️ RFC Decision</span>
                  <p className="text-xs font-medium text-amber-950 leading-snug">
                    Add Redis cluster in private subnet for sub-2ms caching.
                  </p>
                </div>

                {/* 3D Flying / Curled Corner Flap */}
                <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none select-none overflow-visible">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full overflow-visible"
                    style={{ filter: "drop-shadow(-2px -2px 2.5px rgba(0,0,0,0.22))" }}
                  >
                    <defs>
                      <linearGradient id="lp-curl-1" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.6" />
                        <stop offset="60%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                      </linearGradient>
                      <radialGradient id="lp-curl-shadow-1" cx="20%" cy="20%" r="80%">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <path d="M 0 24 Q 12 20 24 0 L 24 24 Z" fill="url(#lp-curl-shadow-1)" />
                    <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill="#fef08a" />
                    <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill="url(#lp-curl-1)" />
                    <path
                      d="M 24 0 C 19 9 12 18 0 24"
                      stroke="rgba(255, 255, 255, 0.75)"
                      strokeWidth="0.8"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom mini status */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-100">
              <span>Press [V] for Select, [R] for Box, [D] for Database</span>
              <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                Ready to whiteboard →
              </span>
            </div>
          </div>
        </div>

        {/* 3 CREATE FEATURE CARDS (Excalidraw style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">✏️</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Zero Learning Curve
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Elementary whiteboard tools with intuitive diagonal hotkeys. Start sketching without any manuals or onboarding walls.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🏛️</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Architecture Library
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Drop production-grade VPC zones, K8s subnets, Kafka queues, and databases directly onto your whiteboard canvas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🧲</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Magnetic Alignment
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Snap components to clean grid intervals with zero jitter. Clean up messy whiteboard sketches with 1-click tier auto-layout.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: COLLABORATE (Excalidraw style)
         ========================================================================= */}
      <div id="collaborate" className="relative mb-32 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-indigo-600 z-10">
          <Users className="w-5 h-5" />
        </div>

        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 tracking-wide">
            real-time collaboration
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Collaborate
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Send a link, get feedback, and finalize system architectures together in real time.
        </p>

        {/* BROWSER WINDOW MOCKUP: COLLABORATE */}
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-8">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="px-6 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              planningportal.com/board/live-team-sync
            </div>
            <div className="flex items-center gap-2">
              {/* Teammate Avatars */}
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                  A
                </span>
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                  S
                </span>
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                  D
                </span>
              </div>
            </div>
          </div>

          {/* Whiteboard Canvas with Live Multiplayer Cursors */}
          <div className="relative h-[400px] sm:h-[440px] bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] p-6 overflow-hidden flex items-center justify-center">
            {/* Animated Cursor 1: Ayush */}
            <motion.div
              animate={{ x: [0, 40, -20, 0], y: [0, -25, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 left-24 flex items-center gap-1 z-20 pointer-events-none"
            >
              <MousePointer2 className="w-4 h-4 text-indigo-600 fill-indigo-600 -rotate-45" />
              <span className="bg-indigo-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm font-mono">
                Ayush (Host)
              </span>
            </motion.div>

            {/* Animated Cursor 2: Sarah */}
            <motion.div
              animate={{ x: [0, -35, 20, 0], y: [0, 30, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute bottom-20 right-28 flex items-center gap-1 z-20 pointer-events-none"
            >
              <MousePointer2 className="w-4 h-4 text-pink-600 fill-pink-600 -rotate-45" />
              <span className="bg-pink-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm font-mono">
                Sarah
              </span>
            </motion.div>

            {/* Animated Cursor 3: Dave */}
            <motion.div
              animate={{ x: [0, 25, -30, 0], y: [0, 20, 10, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-28 right-44 flex items-center gap-1 z-20 pointer-events-none hidden sm:flex"
            >
              <MousePointer2 className="w-4 h-4 text-emerald-600 fill-emerald-600 -rotate-45" />
              <span className="bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm font-mono">
                Dave
              </span>
            </motion.div>

            {/* Collaborative Whiteboard Artifacts */}
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              {/* Active Diagram Block */}
              <div className="w-64 p-4 rounded-2xl bg-white border-2 border-indigo-500 shadow-lg relative">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[9px] font-bold">
                  Editing with Sarah
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Payment Microservice</h4>
                    <span className="text-[10px] text-slate-500 font-mono">v2.4.0 • Node.js</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono">
                  POST /api/v1/checkout → 201
                </div>
              </div>

              {/* 3D Collaborative Sticky Note with flying corner */}
              <div className="relative w-52 select-none rotate-[-2deg]">
                {/* 3D Lifted Shadow */}
                <div
                  className="absolute -bottom-2 -right-1 w-3/4 h-8 pointer-events-none rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 55%, transparent 75%)",
                    transform: "rotate(6deg) skewX(8deg)",
                    filter: "blur(4px)",
                  }}
                />

                {/* Main Paper Body with clipped corner */}
                <div
                  className="relative p-3.5 pt-2 pb-5 pr-6 bg-amber-100 border border-amber-300/80 rounded-[2px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 25%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.08) 100%)",
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.08), 0 6px 14px -2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%)",
                  }}
                >
                  {/* Top adhesive band */}
                  <div className="w-full h-3.5 -mt-2 -mx-3.5 mb-2 px-3.5 bg-black/[0.04] border-b border-black/[0.06] flex items-center">
                    <div className="w-full h-[1px] bg-white/30 rounded-full" />
                  </div>
                  <span className="font-bold text-[11px] text-amber-800 block mb-1">
                    💬 Dave commented:
                  </span>
                  <p className="text-xs text-amber-950 font-medium leading-snug">
                    We should queue webhook events via Kafka before hitting the database.
                  </p>
                </div>

                {/* 3D Flying / Curled Corner Flap */}
                <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none select-none overflow-visible">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full overflow-visible"
                    style={{ filter: "drop-shadow(-2px -2px 2.5px rgba(0,0,0,0.22))" }}
                  >
                    <defs>
                      <linearGradient id="lp-curl-2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.6" />
                        <stop offset="60%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                      </linearGradient>
                      <radialGradient id="lp-curl-shadow-2" cx="20%" cy="20%" r="80%">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <path d="M 0 24 Q 12 20 24 0 L 24 24 Z" fill="url(#lp-curl-shadow-2)" />
                    <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill="#fef08a" />
                    <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill="url(#lp-curl-2)" />
                    <path
                      d="M 24 0 C 19 9 12 18 0 24"
                      stroke="rgba(255, 255, 255, 0.75)"
                      strokeWidth="0.8"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Interactive Share Link Card */}
            <div className="absolute bottom-4 left-6 bg-white/95 backdrop-blur-md border border-slate-200 shadow-md rounded-xl p-3 flex items-center gap-3 z-10">
              <Share2 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-mono text-slate-600">planningportal.com/join/7b90f7</span>
              <button
                onClick={() => {
                  setCopiedLink(true)
                  setTimeout(() => setCopiedLink(false), 2000)
                }}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold flex items-center gap-1 transition-all"
              >
                {copiedLink ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedLink ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* 2 COLLABORATE CARDS (Excalidraw style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Frictionless Shareable Links
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Anyone with the link can join your canvas instantly. No forced sign-ups or complex workspace permissions required.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">☁️</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Sub-second Cloud Sync
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every stroke, sticky note move, and boundary resize is persisted instantly. Never lose a whiteboard brainstorming session.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: COMMON USE CASES & ARCHITECTURE SUITE (Interactive Excalidraw Style)
         ========================================================================= */}
      <div id="usecases" className="relative mb-32 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-purple-600 z-10">
          <Compass className="w-5 h-5" />
        </div>

        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-purple-100/90 text-purple-800 border border-purple-200/60 tracking-wide">
            interactive canvas showcase
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Common usecases
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          System Architecture, Database ERDs, Sequence Flows, Capacity Calculations, and Team Retrospectives on one unified canvas.
        </p>

        {/* INTERACTIVE USE-CASES PILL SWITCHER (Excalidraw style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {[
            { id: "architecture", label: "🏗 System Architecture", badge: "Cloud & VPC" },
            { id: "erd", label: "🗄 Database ERD", badge: "PK / FK Relations" },
            { id: "flow", label: "🚦 Sequence Flow Trace", badge: "Animated" },
            { id: "estimator", label: "🧮 Capacity Estimator", badge: "Interactive Slider" },
            { id: "retro", label: "📝 Brainstorming & Retro", badge: "Sticky Notes" },
          ].map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as UseCaseTab)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md scale-102"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? "bg-indigo-500 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            )
          })}
        </div>

        {/* BROWSER WINDOW MOCKUP: DYNAMIC USE-CASE CANVASES */}
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-8">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="px-6 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <span>use-case:</span>
              <span className="font-bold text-slate-800">{activeTab}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">Click elements to interact</div>
          </div>

          {/* DYNAMIC WHITEBOARD CANVAS VIEWPORT */}
          <div className="relative min-h-[460px] bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] p-6 sm:p-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {/* 1. CLOUD ARCHITECTURE CANVAS */}
              {activeTab === "architecture" && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-2xl flex flex-col items-center"
                >
                  {/* Outer Cloud Boundary */}
                  <div className="w-full rounded-3xl border-2 border-dashed border-indigo-400/90 bg-indigo-50/20 p-5 sm:p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-600 text-white font-mono text-xs font-bold shadow-xs">
                        <Shield className="w-3.5 h-3.5" />
                        AWS VPC Production (10.0.0.0/16)
                      </div>
                      <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        us-east-1a • High Availability
                      </span>
                    </div>

                    {/* Architectural Components Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* API Gateway Node */}
                      <button
                        onClick={() => setSelectedArchNode("gateway")}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedArchNode === "gateway"
                            ? "bg-white border-indigo-500 shadow-md ring-2 ring-indigo-400/30"
                            : "bg-white/80 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                          <Server className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">API Gateway</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Rate limiting & TLS</p>
                        <span className="inline-block mt-2 text-[9px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          Route 53 DNS
                        </span>
                      </button>

                      {/* Redis In-Memory Cache Node */}
                      <button
                        onClick={() => setSelectedArchNode("redis")}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedArchNode === "redis"
                            ? "bg-white border-purple-500 shadow-md ring-2 ring-purple-400/30"
                            : "bg-white/80 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
                          <Zap className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">Redis Cluster</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Session & Hot Data</p>
                        <span className="inline-block mt-2 text-[9px] font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                          &lt; 2ms latency
                        </span>
                      </button>

                      {/* PostgreSQL Primary DB Node */}
                      <button
                        onClick={() => setSelectedArchNode("postgres")}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedArchNode === "postgres"
                            ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30"
                            : "bg-white/80 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                          <Database className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">Postgres DB</h4>
                        <p className="text-[11px] text-slate-500 mt-1">ACID Relational Core</p>
                        <span className="inline-block mt-2 text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          Multi-AZ Sync
                        </span>
                      </button>
                    </div>

                    {/* Interactive Annotation */}
                    <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 font-mono flex items-center justify-between">
                      <span>
                        Active Inspection:{" "}
                        <strong className="text-slate-900">{selectedArchNode?.toUpperCase()}</strong>
                      </span>
                      <span className="text-indigo-600 font-bold">
                        Child service linked to VPC parent boundary
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. DATABASE ERD SCHEMA CANVAS */}
              {activeTab === "erd" && (
                <motion.div
                  key="erd"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                  {/* Users Table */}
                  <div className="w-72 bg-white rounded-2xl border-2 border-slate-800 shadow-lg overflow-hidden">
                    <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between font-mono">
                      <span className="font-bold text-xs flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-indigo-400" />
                        users
                      </span>
                      <span className="text-[10px] text-slate-400">table</span>
                    </div>
                    <div className="p-3 divide-y divide-slate-100 font-mono text-xs">
                      <div className="py-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-bold text-slate-900">
                          <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px]">
                            PK
                          </span>
                          id
                        </span>
                        <span className="text-slate-400 text-[11px]">uuid</span>
                      </div>
                      <div className="py-1.5 flex items-center justify-between">
                        <span className="text-slate-700">email</span>
                        <span className="text-slate-400 text-[11px]">varchar(255)</span>
                      </div>
                      <div className="py-1.5 flex items-center justify-between">
                        <span className="text-slate-700">created_at</span>
                        <span className="text-slate-400 text-[11px]">timestamp</span>
                      </div>
                    </div>
                  </div>

                  {/* Relational Connector Badge */}
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full shadow-2xs">
                      1 : N Relation
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">
                      Foreign Key linked
                    </span>
                  </div>

                  {/* Orders Table */}
                  <div className="w-72 bg-white rounded-2xl border-2 border-indigo-600 shadow-lg overflow-hidden">
                    <div className="bg-indigo-600 text-white px-4 py-2.5 flex items-center justify-between font-mono">
                      <span className="font-bold text-xs flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-indigo-200" />
                        orders
                      </span>
                      <span className="text-[10px] text-indigo-200">table</span>
                    </div>
                    <div className="p-3 divide-y divide-slate-100 font-mono text-xs">
                      <div className="py-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-bold text-slate-900">
                          <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px]">
                            PK
                          </span>
                          id
                        </span>
                        <span className="text-slate-400 text-[11px]">uuid</span>
                      </div>
                      <div className="py-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-bold text-indigo-600">
                          <span className="px-1 py-0.2 rounded bg-purple-100 text-purple-800 text-[9px]">
                            FK
                          </span>
                          user_id
                        </span>
                        <span className="text-slate-400 text-[11px]">uuid</span>
                      </div>
                      <div className="py-1.5 flex items-center justify-between">
                        <span className="text-slate-700">amount_cents</span>
                        <span className="text-slate-400 text-[11px]">integer</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. SEQUENCE FLOW TRACE CANVAS */}
              {activeTab === "flow" && (
                <motion.div
                  key="flow"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-2xl flex flex-col items-center"
                >
                  <div className="w-full flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-slate-600">
                      Step {flowStep} of 4:{" "}
                      <strong className="text-indigo-600">
                        {flowStep === 1 && "Client initiates HTTPS request"}
                        {flowStep === 2 && "API Gateway validates JWT and decrypts"}
                        {flowStep === 3 && "Redis checks cache (HIT: 1.8ms)"}
                        {flowStep === 4 && "PostgreSQL completes write query"}
                      </strong>
                    </span>
                    <button
                      onClick={handleSimulateTrace}
                      disabled={isTracingFlow}
                      className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {isTracingFlow ? "Tracing..." : "Simulate Flow Trace"}
                    </button>
                  </div>

                  {/* Flow Steps Horizontal Sequence */}
                  <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { step: 1, name: "1. Web Client", icon: MousePointer2, color: "indigo" },
                      { step: 2, name: "2. Edge Gateway", icon: Server, color: "purple" },
                      { step: 3, name: "3. Redis Cache", icon: Zap, color: "amber" },
                      { step: 4, name: "4. Database", icon: Database, color: "emerald" },
                    ].map((s) => {
                      const Icon = s.icon
                      const isCurrent = flowStep === s.step
                      const isPast = flowStep >= s.step
                      return (
                        <div
                          key={s.step}
                          className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center ${
                            isCurrent
                              ? "bg-white border-indigo-600 shadow-lg scale-105 ring-2 ring-indigo-400/30"
                              : isPast
                              ? "bg-slate-50 border-slate-300 text-slate-800"
                              : "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-mono text-xs font-bold ${
                              isCurrent
                                ? "bg-indigo-600 text-white animate-pulse"
                                : isPast
                                ? "bg-slate-200 text-slate-800"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold">{s.name}</span>
                          <span className="text-[10px] font-mono mt-1 text-slate-500">
                            {isCurrent ? "Active Step" : isPast ? "Complete" : "Pending"}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* 4. CAPACITY ESTIMATOR CANVAS */}
              {activeTab === "estimator" && (
                <motion.div
                  key="estimator"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-xl"
                >
                  {/* Interactive Whiteboard Sticky Card */}
                  <div className="bg-amber-50 border-2 border-amber-300 shadow-xl rounded-3xl p-6 sm:p-8 rotate-[-1deg]">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-amber-700" />
                        <h4 className="font-bold text-amber-950 text-base">
                          Back-of-the-Envelope Capacity Estimator
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-amber-200 text-amber-900">
                        Interactive Calculator
                      </span>
                    </div>

                    {/* DAU Range Slider */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-mono font-bold text-amber-900 mb-2">
                        <span>Daily Active Users (DAU):</span>
                        <span className="text-base text-indigo-700">{dau} Million Users</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={dau}
                        onChange={(e) => setDau(Number(e.target.value))}
                        className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-amber-700 mt-1">
                        <span>1M</span>
                        <span>25M</span>
                        <span>50M DAU</span>
                      </div>
                    </div>

                    {/* Calculated Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-white/90 rounded-2xl border border-amber-200 text-center">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                          Read QPS
                        </span>
                        <span className="font-zodiak text-xl sm:text-2xl font-bold text-indigo-600">
                          {readQps.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                          ~25 reads / user
                        </span>
                      </div>

                      <div className="p-3 bg-white/90 rounded-2xl border border-amber-200 text-center">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                          Write QPS
                        </span>
                        <span className="font-zodiak text-xl sm:text-2xl font-bold text-purple-600">
                          {writeQps.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                          ~3 writes / user
                        </span>
                      </div>

                      <div className="p-3 bg-white/90 rounded-2xl border border-amber-200 text-center">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                          Storage / Mo
                        </span>
                        <span className="font-zodiak text-xl sm:text-2xl font-bold text-emerald-600">
                          {monthlyStorageGb} GB
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                          1.8 KB avg payload
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 5. BRAINSTORMING & RETROS CANVAS */}
              {activeTab === "retro" && (
                <motion.div
                  key="retro"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-5"
                >
                  <div className="p-4 bg-emerald-100 border border-emerald-300 shadow-md rounded-2xl rotate-[-2deg]">
                    <span className="font-bold text-xs text-emerald-900 block mb-2">
                      🟢 What went well
                    </span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      Microservices latency reduced by 45% following Redis cache layer rollout.
                    </p>
                    <span className="inline-block mt-3 px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold">
                      +4 votes
                    </span>
                  </div>

                  <div className="p-4 bg-amber-100 border border-amber-300 shadow-md rounded-2xl rotate-[1.5deg]">
                    <span className="font-bold text-xs text-amber-900 block mb-2">
                      🟡 To improve
                    </span>
                    <p className="text-xs text-amber-950 font-medium leading-relaxed">
                      Need tighter rate-limiting rules on public unauthenticated endpoints.
                    </p>
                    <span className="inline-block mt-3 px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
                      +6 votes
                    </span>
                  </div>

                  <div className="p-4 bg-indigo-100 border border-indigo-300 shadow-md rounded-2xl rotate-[-1deg]">
                    <span className="font-bold text-xs text-indigo-900 block mb-2">
                      🟣 Action Items
                    </span>
                    <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                      Export complete architecture diagram to lossless SVG for security review.
                    </p>
                    <span className="inline-block mt-3 px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-bold">
                      Assigned to RFC
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3 USE CASE CARDS (Excalidraw style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">📐</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              RFCs & Technical Diagrams
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Design complete end-to-end cloud architectures with clear network boundaries, VPCs, and database relations ready for peer review.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              System Design Interviews
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ace live whiteboard interviews. Calculate real-time read/write QPS and draw clean request sequences in seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">💡</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Team Brainstorming
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              From colorful sticky note sprint retros to product roadmap planning, organize thoughts on an expansive infinite canvas.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4: THE EASIEST WAY TO GET YOUR THOUGHTS ON SCREEN (Excalidraw style)
         ========================================================================= */}
      <div id="features" className="relative mb-24 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-emerald-600 z-10">
          <Zap className="w-5 h-5" />
        </div>

        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-200/60 tracking-wide">
            engineer-friendly productivity
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          The easiest way to get your thoughts on screen
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-12 leading-relaxed">
          Quick drawings, architectural mockups, and diagrams with a clean minimal aesthetic. Dead simple shortcuts and zero fluff.
        </p>

        {/* 6-CARD SUPERPOWERS GRID (Excalidraw style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Diagonal Shortcuts */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 font-bold">
                ⌨️
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Diagonal Hotkeys
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Keystrokes positioned diagonally for instant muscle memory: V (Select), S (Sticky), T (Text), R (Rect), E (Ellipse), D (DB), Z (Zone).
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-around font-mono text-xs font-bold text-slate-700">
              <span className="px-2 py-1 bg-slate-100 rounded">V</span>
              <span className="px-2 py-1 bg-slate-100 rounded">S</span>
              <span className="px-2 py-1 bg-slate-100 rounded">R</span>
              <span className="px-2 py-1 bg-slate-100 rounded">D</span>
              <span className="px-2 py-1 bg-slate-100 rounded">Z</span>
            </div>
          </div>

          {/* Card 2: Lossless Vector Export */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 font-bold">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Lossless Vector Export
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Export your whiteboards to pin-sharp SVG vectors or crisp PNGs. Perfectly sized for engineering RFCs, Confluence, and GitHub READMEs.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-emerald-700">.SVG Lossless</span>
              <span className="font-bold text-slate-600">.PNG 2x Retina</span>
            </div>
          </div>

          {/* Card 3: Magnetic Snapping & Auto-Layout */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4 font-bold">
                <Magnet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Magnetic Snapping
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Zero jitter elastic snapping with dynamic alignment guidelines. Align microservices and databases automatically with 1-click tier layout.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-purple-700 font-bold">
              <span>Tier 1 → Tier 2 → Tier 3</span>
              <span className="text-[10px] text-slate-400">Auto-align</span>
            </div>
          </div>

          {/* Card 4: Architecture Zones */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Smart Architecture Zones
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                VPC and Subnet boundaries with auto-containment. Moving the zone smoothly moves all contained microservices and databases together.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-indigo-700 font-bold">
              <span>VPC (10.0.0.0/16)</span>
              <span className="text-[10px] text-emerald-600">Contained: 4</span>
            </div>
          </div>

          {/* Card 5: Dark Mode Architecture Canvas */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4 font-bold">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Dark Mode Studio
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Switch effortlessly between sleek light mode and dark mode for late-night architecture reviews and high-contrast presentations.
              </p>
            </div>
            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span>#0F172A Studio</span>
              <span className="text-[10px] text-indigo-400 font-bold">Dark Canvas</span>
            </div>
          </div>

          {/* Card 6: Clean Personal Cloud Workspace */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4 font-bold">
                <FolderKanban className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Minimalist Dashboard
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                A clean personal workspace. Zero team friction, no confusing organization switches. Instant board search, starring, and 1-click creation.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
              <span className="flex items-center gap-1 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                Starred Boards
              </span>
              <span className="text-[10px] text-slate-400">Personal Cloud</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
