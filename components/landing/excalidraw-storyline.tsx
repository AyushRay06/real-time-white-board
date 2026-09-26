"use client"

import React, { useState, useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  MousePointer2,
  Database,
  Server,
  Calculator,
  Play,
  Check,
  Shield,
  Download,
  Moon,
  Magnet,
  LayoutGrid,
  Sparkles,
  FolderKanban,
  Share2,
  Sliders,
  Cpu,
  Table,
  Key,
  Radio,
  Activity,
  HardDrive,
  Network,
  CornerDownRight,
  MessageSquare,
  Users,
  Box,
  Zap,
  Cloud,
  Shuffle,
  Layers,
  Globe,
  Search,
  Type,
  Square,
  StickyNote,
  ArrowRight,
  LayoutTemplate,
  Monitor,
} from "lucide-react"

export function ExcalidrawStoryline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 90%"],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Elegant, clean cursive scroll ribbon with graceful loops at chapter transitions
  const springLoopPath = useMemo(() => {
    return [
      "M 30 0",
      // Gentle glide to Create
      "C 30 180, 26 380, 30 650",
      // Loop 1 (Right cursive loop at Create transition)
      "C 30 685, 48 690, 48 720",
      "C 48 750, 14 755, 14 720",
      "C 14 690, 44 695, 34 750",
      "C 26 780, 30 800, 30 820",
      // Smooth descent to Collaborate
      "C 30 1080, 34 1350, 30 1620",
      // Loop 2 (Left cursive loop at Collaborate transition)
      "C 30 1655, 12 1660, 12 1690",
      "C 12 1720, 46 1725, 46 1690",
      "C 46 1660, 16 1665, 26 1720",
      "C 34 1750, 30 1770, 30 1790",
      // Smooth descent to System Architecture
      "C 30 2050, 26 2350, 30 2620",
      // Loop 3 (Right cursive loop at Architecture transition)
      "C 30 2655, 48 2660, 48 2690",
      "C 48 2720, 14 2725, 14 2690",
      "C 14 2660, 44 2665, 34 2720",
      "C 26 2750, 30 2770, 30 2790",
      // Smooth descent to Database ERD
      "C 30 3050, 34 3350, 30 3620",
      // Loop 4 (Left cursive loop at Database ERD transition)
      "C 30 3655, 12 3660, 12 3690",
      "C 12 3720, 46 3725, 46 3690",
      "C 46 3660, 16 3665, 26 3720",
      "C 34 3750, 30 3770, 30 3790",
      // Smooth descent to Sequence Flow
      "C 30 4050, 26 4350, 30 4620",
      // Loop 5 (Right cursive loop at Sequence Flow transition)
      "C 30 4655, 48 4660, 48 4690",
      "C 48 4720, 14 4725, 14 4690",
      "C 14 4660, 44 4665, 34 4720",
      "C 26 4750, 30 4770, 30 4790",
      // Smooth descent to Capacity Estimator
      "C 30 5050, 34 5350, 30 5620",
      // Loop 6 (Left cursive loop at Capacity Estimator transition)
      "C 30 5655, 12 5660, 12 5690",
      "C 12 5720, 46 5725, 46 5690",
      "C 46 5660, 16 5665, 26 5720",
      "C 34 5750, 30 5770, 30 5790",
      // Smooth finish to bottom features
      "C 30 5920, 30 6080, 30 6200",
    ].join(" ")
  }, [])

  // ─── SECTION 1: CREATE (UI Layout Design) ───
  const [selectedWireframeEl, setSelectedWireframeEl] = useState<string>("hero-cta")

  // ─── SECTION 2: COLLABORATE (Multiplayer Team Sync) ───
  const [copiedLink, setCopiedLink] = useState(false)

  // ─── SECTION 3A: SYSTEM ARCHITECTURE ───
  type ArchTemplate = "microservices" | "three-tier" | "cdn-caching"
  const [selectedArchTemplate, setSelectedArchTemplate] = useState<ArchTemplate>("microservices")
  const [selectedCloudNode, setSelectedCloudNode] = useState<string>("orders")
  const [selectedComponentTab, setSelectedComponentTab] = useState<"components" | "layouts">("components")
  const [componentSearch, setComponentSearch] = useState<string>("")

  const ARCH_TEMPLATES: Record<ArchTemplate, {
    name: string
    badge: string
    desc: string
    nodes: Array<{
      id: string
      name: string
      type: string
      icon: any
      iconBg: string
      iconColor: string
      x: number
      y: number
    }>
    arrows: Array<{
      from: string
      to: string
      label: string
      dashed?: boolean
    }>
  }> = {
    microservices: {
      name: "Event-Driven Microservices",
      badge: "Kafka + gRPC",
      desc: "Decoupled microservices architecture with asynchronous Kafka event streaming and read-replica caching.",
      nodes: [
        { id: "client", name: "Web Client", type: "React Ingress", icon: Monitor, iconBg: "bg-blue-100", iconColor: "text-blue-600", x: 20, y: 110 },
        { id: "gateway", name: "API Gateway", type: "Envoy Proxy", icon: Network, iconBg: "bg-indigo-100", iconColor: "text-indigo-600", x: 155, y: 110 },
        { id: "orders", name: "Order Service", type: "Golang RPC", icon: Box, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", x: 295, y: 35 },
        { id: "auth", name: "Auth Service", type: "Node.js JWT", icon: Shield, iconBg: "bg-purple-100", iconColor: "text-purple-600", x: 295, y: 185 },
        { id: "kafka", name: "Kafka Stream", type: "Event Bus", icon: Layers, iconBg: "bg-amber-100", iconColor: "text-amber-600", x: 440, y: 35 },
        { id: "redis", name: "Redis Cache", type: "In-Memory TTL", icon: Radio, iconBg: "bg-rose-100", iconColor: "text-rose-600", x: 440, y: 185 },
        { id: "postgres", name: "PostgreSQL 16", type: "Primary Relational", icon: Database, iconBg: "bg-sky-100", iconColor: "text-sky-600", x: 585, y: 35 },
      ],
      arrows: [
        { from: "client", to: "gateway", label: "HTTPS" },
        { from: "gateway", to: "orders", label: "gRPC" },
        { from: "gateway", to: "auth", label: "REST" },
        { from: "orders", to: "kafka", label: "Produce" },
        { from: "auth", to: "redis", label: "Session" },
        { from: "kafka", to: "postgres", label: "Consume" },
      ],
    },
    "three-tier": {
      name: "Classic 3-Tier Web App",
      badge: "High Availability",
      desc: "Multi-AZ web architecture featuring redundant application servers, active/standby database, and cache tier.",
      nodes: [
        { id: "client", name: "Web Client", type: "Browser Ingress", icon: Monitor, iconBg: "bg-blue-100", iconColor: "text-blue-600", x: 20, y: 110 },
        { id: "lb", name: "Load Balancer", type: "ALB / NGINX", icon: Shuffle, iconBg: "bg-amber-100", iconColor: "text-amber-600", x: 155, y: 110 },
        { id: "app1", name: "App Node A", type: "Production Pod", icon: Server, iconBg: "bg-indigo-100", iconColor: "text-indigo-600", x: 295, y: 35 },
        { id: "app2", name: "App Node B", type: "Production Pod", icon: Server, iconBg: "bg-indigo-100", iconColor: "text-indigo-600", x: 295, y: 185 },
        { id: "primary", name: "Primary DB", type: "PostgreSQL 16", icon: Database, iconBg: "bg-sky-100", iconColor: "text-sky-600", x: 440, y: 35 },
        { id: "replica", name: "Read Replica", type: "Async Multi-AZ", icon: Database, iconBg: "bg-purple-100", iconColor: "text-purple-600", x: 440, y: 185 },
        { id: "redis", name: "Redis Cache", type: "LRU Cluster", icon: Radio, iconBg: "bg-rose-100", iconColor: "text-rose-600", x: 585, y: 110 },
      ],
      arrows: [
        { from: "client", to: "lb", label: "TLS 443" },
        { from: "lb", to: "app1", label: "Route" },
        { from: "lb", to: "app2", label: "Route" },
        { from: "app1", to: "primary", label: "Write" },
        { from: "app2", to: "replica", label: "Read" },
        { from: "primary", to: "replica", label: "Sync", dashed: true },
        { from: "app1", to: "redis", label: "Cache" },
      ],
    },
    "cdn-caching": {
      name: "CDN Edge & Multi-Region",
      badge: "Sub-10ms Global",
      desc: "Global edge computing network with distributed cache invalidation and geo-routed data persistence.",
      nodes: [
        { id: "users", name: "Global Users", type: "Worldwide Traffic", icon: Globe, iconBg: "bg-blue-100", iconColor: "text-blue-600", x: 20, y: 110 },
        { id: "cdn", name: "Cloudflare CDN", type: "Edge POPs", icon: Cloud, iconBg: "bg-purple-100", iconColor: "text-purple-600", x: 155, y: 110 },
        { id: "worker", name: "Edge Worker", type: "V8 Isolate", icon: Zap, iconBg: "bg-amber-100", iconColor: "text-amber-600", x: 295, y: 35 },
        { id: "origin", name: "Origin API", type: "Core Gateway", icon: Server, iconBg: "bg-indigo-100", iconColor: "text-indigo-600", x: 295, y: 185 },
        { id: "cache", name: "Redis Cluster", type: "Geo-Replicated", icon: Radio, iconBg: "bg-rose-100", iconColor: "text-rose-600", x: 440, y: 35 },
        { id: "globaldb", name: "Distributed DB", type: "CockroachDB", icon: Database, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", x: 440, y: 185 },
        { id: "storage", name: "S3 Object Store", type: "Media Blobs", icon: HardDrive, iconBg: "bg-sky-100", iconColor: "text-sky-600", x: 585, y: 110 },
      ],
      arrows: [
        { from: "users", to: "cdn", label: "Anycast" },
        { from: "cdn", to: "worker", label: "< 5ms" },
        { from: "cdn", to: "origin", label: "Miss Route" },
        { from: "worker", to: "cache", label: "Edge KV" },
        { from: "origin", to: "globaldb", label: "ACID Sync" },
        { from: "origin", to: "storage", label: "Assets" },
      ],
    },
  }

  // ─── SECTION 3B: DATABASE ERD ───
  const [selectedTable, setSelectedTable] = useState<string>("orders")
  const [activeForeignKey, setActiveForeignKey] = useState<string | null>("user_id")

  // ─── SECTION 3C: SEQUENCE FLOW TRACE ───
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
    }, 900)
  }

  // ─── SECTION 3D: CAPACITY ESTIMATOR ───
  const [dau, setDau] = useState<number>(15) // 15M DAU
  const readQps = Math.round((dau * 1_000_000 * 25) / 86400)
  const writeQps = Math.round((dau * 1_000_000 * 3) / 86400)
  const monthlyStorageGb = Math.round((dau * 1_000_000 * 3 * 1.8 * 30) / (1024 * 1024))
  const bandwidthMbps = Math.round((readQps * 2.5 * 8) / 1000)

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* ─── SCROLL PATH RIBBON CURLING DOWN THE LEFT-HAND SIDE ─── */}
      <div className="hidden lg:block absolute left-1 xl:left-3 top-8 bottom-16 w-11 xl:w-13 pointer-events-none z-10 overflow-visible">
        <svg
          viewBox="0 0 60 6200"
          fill="none"
          overflow="visible"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="featureLeftCurl" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="25%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="75%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="ribbonCleanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#8B5CF6" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Architectural guide track */}
          <path
            d={springLoopPath}
            stroke="#E2E8F0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 4"
            className="opacity-75"
          />

          {/* Active progressive scroll stroke */}
          <motion.path
            d={springLoopPath}
            stroke="url(#featureLeftCurl)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ribbonCleanGlow)"
            style={{
              pathLength,
              strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
            }}
          />
        </svg>
      </div>

      {/* =========================================================================
          FEATURE 1: CREATE (UI Layout Wireframe Design)
         ========================================================================= */}
      <div id="create" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-200/60 tracking-wide font-mono">
            interactive canvas • zero learning curve
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Create
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          From quick UI wireframe sketches to full production layouts. Two designers, one shared infinite canvas, and real-time tactile editing without friction.
        </p>

        {/* BROWSER WINDOW MOCKUP: UI LAYOUT WIREFRAME */}
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
              <span>UI Layout Wireframe</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <span className="hidden sm:inline">2 Collaborators Live</span>
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
            </div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[440px] sm:min-h-[480px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 overflow-hidden flex flex-col justify-center">
            {/* LIVE WEBSITE WIREFRAME BEING DESIGNED BY 2 PEOPLE */}
            <div className="relative my-auto flex items-center justify-center py-3">
              {/* Outer Website Canvas Artboard */}
              <div className="w-full max-w-2xl bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-lg p-5 relative transition-all">
                {/* Artboard Header Label */}
                <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded bg-slate-800 text-white font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-xs">
                  <span>Layout Wireframe</span>
                  <span className="opacity-60">• Desktop 1200px Grid</span>
                </div>

                {/* 1. Wireframe Navbar */}
                <div className="w-full pb-3 border-b border-slate-100 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-indigo-600" />
                    <div className="w-20 h-3 rounded bg-slate-200" />
                  </div>
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="w-12 h-2.5 rounded bg-slate-100" />
                    <div className="w-14 h-2.5 rounded bg-slate-100" />
                    <div className="w-12 h-2.5 rounded bg-slate-100" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-5 rounded bg-slate-100" />
                    <div className="px-2.5 py-1 rounded text-[10px] font-bold text-white bg-indigo-600">
                      Get Started
                    </div>
                  </div>
                </div>

                {/* 2. Wireframe Hero Section */}
                <div className="text-center py-3.5 px-2 mb-3 bg-slate-50/70 rounded-xl border border-slate-100 relative">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white text-slate-600 border border-slate-200 mb-2">
                    Sprint 14 • Prototype
                  </span>
                  <h3 className="font-comico font-bold text-slate-800 text-sm sm:text-base mb-1">
                    Visual Workspace for Fast Engineering Teams
                  </h3>
                  <p className="text-[11px] text-slate-500 max-w-md mx-auto mb-3">
                    Sketch cloud architectures, prototype UI components, and finalize specs together.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedWireframeEl("hero-cta")}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm transition-all cursor-pointer relative bg-indigo-600 ${
                        selectedWireframeEl === "hero-cta" ? "ring-2 ring-indigo-400 ring-offset-2 scale-105" : ""
                      }`}
                    >
                      <span>Explore Whiteboard</span>
                      {selectedWireframeEl === "hero-cta" && (
                        <span className="absolute -top-2.5 -right-2 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                      )}
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200">
                      Live Preview
                    </button>
                  </div>
                </div>

                {/* 3. Wireframe 3-Card Bento Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { title: "Multiplayer", icon: "👥", sub: "Sub-15ms sync" },
                    { title: "Vector SVG", icon: "📐", sub: "Lossless RFCs" },
                    { title: "Cloud Primitives", icon: "☁️", sub: "VPC & DB nodes" },
                  ].map((card, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedWireframeEl(`card-${i}`)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                        selectedWireframeEl === `card-${i}`
                          ? "bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-sm mb-1">{card.icon}</div>
                      <div className="font-bold text-[11px] text-slate-800">{card.title}</div>
                      <div className="text-[9px] text-slate-400 font-mono">{card.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Live Collaborator 1: Sarah (UI Lead) Cursor */}
                <motion.div
                  animate={{ x: [0, 25, -15, 0], y: [0, -18, 12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-28 right-24 pointer-events-none flex items-center gap-1 z-20"
                >
                  <MousePointer2 className="w-4 h-4 text-purple-600 fill-purple-600 -rotate-45" />
                  <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs font-mono">
                    Sarah (UI Lead)
                  </span>
                </motion.div>

                {/* Live Collaborator 2: Alex (Frontend) Cursor */}
                <motion.div
                  animate={{ x: [0, -20, 15, 0], y: [0, 20, -10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-12 left-28 pointer-events-none flex items-center gap-1 z-20"
                >
                  <MousePointer2 className="w-4 h-4 text-emerald-600 fill-emerald-600 -rotate-45" />
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs font-mono">
                    Alex (Frontend)
                  </span>
                </motion.div>
              </div>

              {/* 3D Sticky Note from Designer Sarah with authentic flying corner */}
              <div className="absolute right-0 sm:-right-4 top-2 sm:top-6 w-44 select-none hidden md:block rotate-[3deg] z-20">
                <div
                  className="absolute -bottom-2 -right-1 w-3/4 h-8 pointer-events-none rounded-full"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.1) 55%, transparent 75%)",
                    transform: "rotate(6deg) skewX(8deg)",
                    filter: "blur(4px)",
                  }}
                />
                <div
                  className="relative p-3.5 pt-2 pb-5 pr-5 bg-amber-100 border border-amber-300/80 rounded-[2px]"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 25%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.08) 100%)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 6px 14px -2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%)",
                  }}
                >
                  <div className="w-full h-3 -mt-2 -mx-3.5 mb-2 px-3.5 bg-black/[0.04] border-b border-black/[0.06] flex items-center">
                    <div className="w-full h-[1px] bg-white/30 rounded-full" />
                  </div>
                  <span className="block font-bold mb-1 text-[10px] text-amber-800">💡 Sarah's Note</span>
                  <p className="text-[11px] font-medium text-amber-950 leading-snug">
                    Ensure hero CTA button has 48px height for touch tap targets.
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none select-none overflow-visible">
                  <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible" style={{ filter: "drop-shadow(-2px -2px 2px rgba(0,0,0,0.25))" }}>
                    <defs>
                      <linearGradient id="create-curl" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="35%" stopColor="#ffffff" stopOpacity="0.65" />
                        <stop offset="65%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                      </linearGradient>
                      <radialGradient id="create-curl-shadow" cx="20%" cy="20%" r="80%">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
                      </radialGradient>
                    </defs>
                    <path d="M 0 24 Q 12 20 24 0 L 24 24 Z" fill="url(#create-curl-shadow)" />
                    <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill="#fef08a" />
                    <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill="url(#create-curl)" />
                    <path d="M 24 0 C 19 9 12 18 0 24" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="0.8" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPACT CREATE FEATURE CHIPS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🎨
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Rapid UI Wireframing</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Quick layout grids, navbars, and buttons in seconds.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🧲
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Smart Grid Alignment</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Auto-snaps to 8px/16px padding with zero jitter.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              📝
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Tactile 3D Annotations</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Curled paper sticky notes for actionable peer reviews.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FEATURE 2: COLLABORATE (Multiplayer Session & Team Presence)
         ========================================================================= */}
      <div id="collaborate" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 tracking-wide font-mono">
            live multiplayer • sub-15ms sync
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Collaborate
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Share a room link, jump on the same canvas, and brainstorm sprint plans or review architectures with live cursor presence and instant reaction bursts.
        </p>

        {/* BROWSER WINDOW MOCKUP: MULTIPLAYER COLLABORATION */}
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sprint 14 Retrospective</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">E</span>
              <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">M</span>
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">A</span>
              <span className="text-[10px] font-mono font-bold text-slate-500 ml-1">+4 online</span>
            </div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[420px] sm:min-h-[460px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 overflow-hidden flex flex-col justify-center">
            {/* Share Room Button Top-Right */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => {
                  setCopiedLink(true)
                  setTimeout(() => setCopiedLink(false), 2000)
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
              </button>
            </div>

            {/* Collaborative Session Cards on Canvas */}
            <div className="relative my-auto flex flex-col sm:flex-row items-center justify-center gap-6 py-3">
              {/* Card 1: Sprint Retrospective Column */}
              <div className="w-64 p-4 rounded-2xl bg-white border-2 border-indigo-400 shadow-lg relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                    Sprint Goals
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">● 4 of 5 Done</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1.5">
                  Real-time Canvas Sync Engine
                </h4>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Migrated cursor presence broadcasting to WebSocket broadcast channels for sub-15ms latency.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                  <span>Assigned: Elena, Ayush</span>
                  <span className="font-bold text-indigo-600">Sprint 14</span>
                </div>
              </div>

              {/* Card 2: Interactive Comment Thread Pinned to Element */}
              <div className="w-72 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden relative">
                <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Canvas Comment Thread</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="p-3.5 space-y-2.5">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                      M
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-800">Marcus (Security)</span>
                        <span className="text-[9px] text-slate-400">10m ago</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Should we add JWT token rotation fallback for guest whiteboards?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-indigo-50/60 p-2 rounded-xl border border-indigo-100/60">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                      A
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-indigo-900">Ayush (Lead)</span>
                        <span className="text-[9px] text-indigo-500 font-mono">Just now</span>
                      </div>
                      <p className="text-xs text-indigo-950 font-medium">
                        Implemented! Ephemeral anonymous tokens expire automatically after 24h.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cursor 1: Elena (Product) */}
              <motion.div
                animate={{ x: [0, 30, -20, 0], y: [0, -15, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 left-16 pointer-events-none flex items-center gap-1 z-20"
              >
                <MousePointer2 className="w-4 h-4 text-pink-600 fill-pink-600 -rotate-45" />
                <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs font-mono">
                  Elena (Product)
                </span>
              </motion.div>

              {/* Cursor 2: Marcus (Security) */}
              <motion.div
                animate={{ x: [0, -25, 15, 0], y: [0, 25, -15, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-2 right-12 pointer-events-none flex items-center gap-1 z-20"
              >
                <MousePointer2 className="w-4 h-4 text-purple-600 fill-purple-600 -rotate-45" />
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs font-mono">
                  Marcus (Security)
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* COMPACT COLLABORATE FEATURE CHIPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🔗
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">One-Click Instant Sharing</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Share a room link; zero login hurdles for guests.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              💬
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Contextual Pinned Discussions</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Pin comment threads directly to services and tickets.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 1: SYSTEM ARCHITECTURE
         ========================================================================= */}
      <div id="usecases" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-purple-100/90 text-purple-800 border border-purple-200/60 tracking-wide font-mono">
            storytelling chapter 1 • system architecture
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          System Architecture
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Design resilient cloud infrastructures with ready-made components, 1-click architecture templates, and VPC networking boundaries built for engineering RFCs.
        </p>

        {/* BROWSER WINDOW MOCKUP: SYSTEM ARCHITECTURE */}
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar with Prebuilt Layout Switcher */}
          <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs ml-1">
                <Network className="w-3.5 h-3.5 text-purple-600" />
                <span>System Architecture & Cloud Topology</span>
              </div>
            </div>

            {/* Prebuilt Layouts Switcher */}
            <div className="flex items-center gap-1.5">
              {(["microservices", "three-tier", "cdn-caching"] as const).map((tKey) => {
                const tmpl = ARCH_TEMPLATES[tKey]
                const isActive = selectedArchTemplate === tKey
                return (
                  <button
                    key={tKey}
                    onClick={() => {
                      setSelectedArchTemplate(tKey)
                      setSelectedCloudNode(tmpl.nodes[1].id)
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>{tmpl.name}</span>
                    <span className={`text-[9px] px-1 rounded font-mono ${isActive ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {tmpl.badge}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Whiteboard Workspace: Tool Toolbar + Component Library Drawer + Canvas */}
          <div className="flex h-[420px] bg-[#FAFBFD] overflow-hidden relative select-none">
            {/* 1. ACTUAL CANVAS TOOLBAR (Left vertical dock) */}
            <div className="w-11 bg-white border-r border-slate-200/80 p-1 flex flex-col items-center gap-1 shrink-0 z-20">
              <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Select Tool">
                <MousePointer2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Text Tool">
                <Type className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Sticky Note">
                <StickyNote className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Container Box">
                <Square className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Directional Arrow">
                <ArrowRight className="w-4 h-4" />
              </button>
              {/* Active Component Library Tool Icon */}
              <button className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-2xs relative" title="Component Library (Active)">
                <Box className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-600" />
              </button>
              <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Prebuilt Layouts">
                <LayoutTemplate className="w-4 h-4" />
              </button>
            </div>

            {/* 2. ACTUAL COMPONENT LIBRARY DRAWER */}
            <div className="w-48 bg-white border-r border-slate-200/80 flex flex-col shrink-0 z-20 hidden md:flex">
              {/* Library Header & Tabs */}
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Component Tab</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">30+ Primitives</span>
              </div>

              {/* Search Bar */}
              <div className="p-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] text-slate-400">
                  <Search className="w-3 h-3 text-slate-400" />
                  <span className="truncate">Search components...</span>
                </div>
              </div>

              {/* Categorized Component List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Compute & Services
                  </span>
                  <div className="space-y-1">
                    {[
                      { name: "API Gateway", icon: Network, iconBg: "bg-indigo-100", iconColor: "text-indigo-600" },
                      { name: "Microservice", icon: Box, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
                      { name: "Worker Service", icon: Cpu, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
                      { name: "Serverless", icon: Zap, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
                    ].map((comp) => (
                      <div
                        key={comp.name}
                        className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200/60 bg-white hover:border-slate-300 hover:shadow-2xs transition-all cursor-grab select-none"
                      >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center ${comp.iconBg}`}>
                          <comp.icon className={`w-3.5 h-3.5 ${comp.iconColor}`} strokeWidth={1.8} />
                        </span>
                        <span className="text-[11px] font-semibold text-slate-700">{comp.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Databases & Caching
                  </span>
                  <div className="space-y-1">
                    {[
                      { name: "PostgreSQL 16", icon: Database, iconBg: "bg-sky-100", iconColor: "text-sky-600" },
                      { name: "Redis Cache", icon: Radio, iconBg: "bg-rose-100", iconColor: "text-rose-600" },
                      { name: "Kafka Stream", icon: Layers, iconBg: "bg-purple-100", iconColor: "text-purple-600" },
                    ].map((comp) => (
                      <div
                        key={comp.name}
                        className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200/60 bg-white hover:border-slate-300 hover:shadow-2xs transition-all cursor-grab select-none"
                      >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center ${comp.iconBg}`}>
                          <comp.icon className={`w-3.5 h-3.5 ${comp.iconColor}`} strokeWidth={1.8} />
                        </span>
                        <span className="text-[11px] font-semibold text-slate-700">{comp.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. INFINITE CANVAS VIEWPORT WITH PREBUILT LAYOUT */}
            <div className="flex-1 relative overflow-hidden bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px]">
              {/* Active Layout Badge */}
              <div className="absolute top-3 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-slate-200 shadow-2xs backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-slate-700">
                  Active Layout: {ARCH_TEMPLATES[selectedArchTemplate].name}
                </span>
              </div>

              {/* Interactive Nodes & Connectors Container */}
              <div className="absolute inset-0 overflow-auto flex items-center justify-center p-4">
                <div className="relative w-[720px] h-[300px] shrink-0">
                  {/* SVG Connecting Arrows */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                    <defs>
                      <marker
                        id="archArrowStory"
                        markerWidth="8"
                        markerHeight="8"
                        refX="7"
                        refY="4"
                        orient="auto"
                      >
                        <path d="M 0 1 L 7 4 L 0 7 z" fill="#6366F1" />
                      </marker>
                    </defs>
                    {ARCH_TEMPLATES[selectedArchTemplate].arrows.map((arr, i) => {
                      const fromNode = ARCH_TEMPLATES[selectedArchTemplate].nodes.find((n) => n.id === arr.from)
                      const toNode = ARCH_TEMPLATES[selectedArchTemplate].nodes.find((n) => n.id === arr.to)
                      if (!fromNode || !toNode) return null

                      const x1 = fromNode.x + 105
                      const y1 = fromNode.y + 40
                      const x2 = toNode.x
                      const y2 = toNode.y + 40
                      const midX = (x1 + x2) / 2
                      const midY = (y1 + y2) / 2
                      const path = `M ${x1} ${y1} C ${x1 + (x2 - x1) * 0.45} ${y1}, ${x2 - (x2 - x1) * 0.45} ${y2}, ${x2} ${y2}`

                      return (
                        <g key={i}>
                          <path
                            d={path}
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="2"
                            strokeDasharray={arr.dashed ? "4 4" : undefined}
                            markerEnd="url(#archArrowStory)"
                            strokeLinecap="round"
                          />
                          <g transform={`translate(${midX}, ${midY})`}>
                            <rect x="-28" y="-9" width="56" height="18" rx="9" fill="white" stroke="#CBD5E1" strokeWidth="1" className="shadow-2xs" />
                            <text x="0" y="2" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" className="font-mono">
                              {arr.label}
                            </text>
                          </g>
                        </g>
                      )
                    })}
                  </svg>

                  {/* Actual Canvas Component Nodes */}
                  {ARCH_TEMPLATES[selectedArchTemplate].nodes.map((node) => {
                    const Icon = node.icon
                    const isSelected = selectedCloudNode === node.id
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedCloudNode(node.id)}
                        style={{
                          position: "absolute",
                          left: `${node.x}px`,
                          top: `${node.y}px`,
                          width: "105px",
                          height: "82px",
                        }}
                        className={`rounded-xl bg-white border p-2 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all z-20 ${
                          isSelected
                            ? "border-indigo-600 ring-2 ring-indigo-400 shadow-md scale-105"
                            : "border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs"
                        }`}
                      >
                        {/* Online Status Pill */}
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[7px] font-bold text-emerald-700 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>ONLINE</span>
                        </div>

                        {/* Icon container */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 shadow-2xs ${node.iconBg}`}>
                          <Icon className={`w-4 h-4 ${node.iconColor}`} strokeWidth={1.8} />
                        </div>

                        {/* Label */}
                        <span className="text-[10px] font-bold text-slate-800 leading-tight tracking-tight">
                          {node.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPACT SYSTEM DESIGN CHIPS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🏛️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Ready-Made Primitives</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Gateways, Kafka queues, and DBs ready to drop.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              ⚡️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">1-Click System Templates</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Instant architectures for Microservices, Chat & RAG.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🛡️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">VPC Auto-Containment</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Dragging the subnet boundary moves all child nodes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 2: DATABASE & ERD SCHEMAS
         ========================================================================= */}
      <div id="database-erd" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-200/60 tracking-wide font-mono">
            storytelling chapter 2 • relational erd
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Database & ERD Schemas
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Model relational schemas visually with dedicated table components, Primary & Foreign Key indicators, and automatic relational connector lines.
        </p>

        {/* BROWSER WINDOW MOCKUP: DATABASE ERD */}
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Database Schema & ERD</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-600 font-bold">PostgreSQL 16 Dialect</div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[440px] sm:min-h-[480px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Relational Table Controls Header */}
            <div className="flex items-center justify-between mb-4 z-20 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">Interactive Tables:</span>
                {["users", "orders", "payments"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setSelectedTable(tab)
                      if (tab === "orders") setActiveForeignKey("user_id")
                      else if (tab === "payments") setActiveForeignKey("order_id")
                      else setActiveForeignKey(null)
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedTable === tab
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    public.{tab}
                  </button>
                ))}
              </div>

              <div className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[11px] font-mono text-slate-600">
                Foreign Key Auto-Routing: <span className="font-bold text-emerald-600">Active</span>
              </div>
            </div>

            {/* ERD DIAGRAM VIEW WITH 3 RELATIONAL TABLES & SVG CONNECTORS */}
            <div className="relative my-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 py-3">
              {/* Table 1: USERS */}
              <div
                onClick={() => setSelectedTable("users")}
                className={`w-60 rounded-2xl bg-white border shadow-md overflow-hidden transition-all cursor-pointer ${
                  selectedTable === "users" ? "border-emerald-600 ring-2 ring-emerald-500/80 shadow-lg scale-102" : "border-slate-200"
                }`}
              >
                <div className="bg-emerald-600 text-white px-3.5 py-2 flex items-center justify-between font-mono text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5" />
                    <span>users</span>
                  </div>
                  <span className="text-[10px] opacity-80">PK: id</span>
                </div>
                <div className="p-3 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-slate-800 font-bold bg-emerald-50/80 px-2 py-1 rounded">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <Key className="w-3 h-3" /> id
                    </span>
                    <span className="text-[10px] text-slate-500">UUID [PK]</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-0.5 text-slate-600">
                    <span>email</span>
                    <span className="text-[10px] text-slate-400">VARCHAR(255)</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-0.5 text-slate-600">
                    <span>role</span>
                    <span className="text-[10px] text-slate-400">ENUM('user','admin')</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-0.5 text-slate-600">
                    <span>created_at</span>
                    <span className="text-[10px] text-slate-400">TIMESTAMP</span>
                  </div>
                </div>
              </div>

              {/* Relational Link 1 */}
              <div className="hidden lg:flex flex-col items-center">
                <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mb-1">
                  1 : N
                </span>
                <div className="w-8 h-[2px] bg-emerald-500 relative flex items-center justify-end" />
              </div>

              {/* Table 2: ORDERS */}
              <div
                onClick={() => {
                  setSelectedTable("orders")
                  setActiveForeignKey("user_id")
                }}
                className={`w-60 rounded-2xl bg-white border shadow-md overflow-hidden transition-all cursor-pointer ${
                  selectedTable === "orders" ? "border-emerald-600 ring-2 ring-emerald-500/80 shadow-lg scale-102" : "border-slate-200"
                }`}
              >
                <div className="bg-slate-800 text-white px-3.5 py-2 flex items-center justify-between font-mono text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5 text-emerald-400" />
                    <span>orders</span>
                  </div>
                  <span className="text-[10px] text-slate-300">PK: id</span>
                </div>
                <div className="p-3 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-slate-800 font-bold px-2 py-1 rounded bg-slate-50">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Key className="w-3 h-3 text-amber-500" /> id
                    </span>
                    <span className="text-[10px] text-slate-500">UUID [PK]</span>
                  </div>
                  <div className={`flex items-center justify-between px-2 py-1 rounded transition-colors ${
                    activeForeignKey === "user_id" ? "bg-emerald-100 text-emerald-900 font-bold" : "text-slate-600"
                  }`}>
                    <span className="flex items-center gap-1">
                      <CornerDownRight className="w-3 h-3 text-emerald-600" /> user_id
                    </span>
                    <span className="text-[10px] text-emerald-700">FK → users</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-0.5 text-slate-600">
                    <span>total_cents</span>
                    <span className="text-[10px] text-slate-400">INTEGER</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-0.5 text-slate-600">
                    <span>status</span>
                    <span className="text-[10px] text-slate-400">VARCHAR(50)</span>
                  </div>
                </div>
              </div>

              {/* Relational Link 2 */}
              <div className="hidden lg:flex flex-col items-center">
                <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mb-1">
                  1 : 1
                </span>
                <div className="w-8 h-[2px] bg-emerald-500 relative flex items-center justify-end" />
              </div>

              {/* Table 3: PAYMENTS */}
              <div
                onClick={() => {
                  setSelectedTable("payments")
                  setActiveForeignKey("order_id")
                }}
                className={`w-60 rounded-2xl bg-white border shadow-md overflow-hidden transition-all cursor-pointer ${
                  selectedTable === "payments" ? "border-emerald-600 ring-2 ring-emerald-500/80 shadow-lg scale-102" : "border-slate-200"
                }`}
              >
                <div className="bg-slate-800 text-white px-3.5 py-2 flex items-center justify-between font-mono text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5 text-emerald-400" />
                    <span>payments</span>
                  </div>
                  <span className="text-[10px] text-slate-300">PK: id</span>
                </div>
                <div className="p-3 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-slate-800 font-bold px-2 py-1 rounded bg-slate-50">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Key className="w-3 h-3 text-amber-500" /> id
                    </span>
                    <span className="text-[10px] text-slate-500">UUID [PK]</span>
                  </div>
                  <div className={`flex items-center justify-between px-2 py-1 rounded transition-colors ${
                    activeForeignKey === "order_id" ? "bg-emerald-100 text-emerald-900 font-bold" : "text-slate-600"
                  }`}>
                    <span className="flex items-center gap-1">
                      <CornerDownRight className="w-3 h-3 text-emerald-600" /> order_id
                    </span>
                    <span className="text-[10px] text-emerald-700">FK → orders</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-0.5 text-slate-600">
                    <span>provider</span>
                    <span className="text-[10px] text-slate-400">VARCHAR(50)</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-0.5 text-slate-600">
                    <span>charge_state</span>
                    <span className="text-[10px] text-slate-400">VARCHAR(50)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* COMPACT DATABASE FEATURE CHIPS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              📋
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Visual Table Builder</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Define PK/FK constraints and PostgreSQL data types.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🔗
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Smart Foreign Key Routing</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">1:N connectors anchored to specific foreign key rows.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              💾
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">SQL Migration Export</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Export ERD tables to executable PostgreSQL DDL.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 3: SEQUENCE FLOW TRACE
         ========================================================================= */}
      <div id="sequence-flow" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-blue-100/90 text-blue-800 border border-blue-200/60 tracking-wide font-mono">
            storytelling chapter 3 • sequence flow trace
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Sequence Flow Trace
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Simulate the exact lifecycle of network requests through gateways, caches, and databases. Click "Simulate Flow Trace" to watch animated execution packets pulse step by step.
        </p>

        {/* BROWSER WINDOW MOCKUP: SEQUENCE FLOW TRACE */}
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Sequence Flow & Trace</span>
            </div>
            <div className="text-[11px] font-mono text-blue-600 font-bold">Total P99: 68.4ms</div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[440px] sm:min-h-[480px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Top Trace Controls & Interactive Simulation Trigger */}
            <div className="flex items-center justify-between mb-3 z-20 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateTrace}
                  disabled={isTracingFlow}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isTracingFlow ? "animate-pulse" : ""}`} />
                  <span>{isTracingFlow ? "Simulating Request..." : "Simulate Flow Trace"}</span>
                </button>

                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
                  {[1, 2, 3, 4].map((step) => (
                    <button
                      key={step}
                      onClick={() => setFlowStep(step)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        flowStep === step
                          ? "bg-slate-900 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs font-mono text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
                Active Step: <strong className="text-blue-600">Step {flowStep} of 4</strong>
              </div>
            </div>

            {/* SEQUENCE FLOW LIFELINES & ANIMATED PACKET PULSE */}
            <div className="relative my-auto w-full max-w-4xl mx-auto py-4">
              {/* Actors Top Lifeline Headers */}
              <div className="grid grid-cols-4 gap-4 text-center mb-6">
                {[
                  { id: "client", name: "Client Browser", sub: "HTTPS / TLS", icon: MousePointer2, color: "text-slate-700 bg-slate-100" },
                  { id: "gateway", name: "API Gateway", sub: "Rate Limiting", icon: Server, color: "text-indigo-700 bg-indigo-50" },
                  { id: "orders", name: "Order Service", sub: "Go / gRPC", icon: Cpu, color: "text-blue-700 bg-blue-50" },
                  { id: "postgres", name: "PostgreSQL", sub: "ACID Storage", icon: Database, color: "text-emerald-700 bg-emerald-50" },
                ].map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center">
                    <div className={`p-2 rounded-2xl border border-slate-200 shadow-xs mb-1 ${actor.color}`}>
                      <actor.icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs sm:text-sm">{actor.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{actor.sub}</span>
                  </div>
                ))}
              </div>

              {/* 4 Sequential Flow Step Bars */}
              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    title: "Step 1: POST /v1/checkout",
                    desc: "Client transmits JSON payload over TLS 1.3 to Edge API Gateway",
                    latency: "14.2ms",
                    status: "200 Ingested",
                    activeColor: "border-indigo-500 bg-indigo-50/70 text-indigo-950",
                  },
                  {
                    step: 2,
                    title: "Step 2: Token Validation & Rate Check",
                    desc: "API Gateway verifies JWT cryptographic signature & Redis token bucket",
                    latency: "1.8ms",
                    status: "Redis Cache HIT",
                    activeColor: "border-blue-500 bg-blue-50/70 text-blue-950",
                  },
                  {
                    step: 3,
                    title: "Step 3: gRPC Order Allocation",
                    desc: "Order microservice allocates inventory and constructs invoice schema",
                    latency: "28.5ms",
                    status: "RPC OrderAllocated",
                    activeColor: "border-purple-500 bg-purple-50/70 text-purple-950",
                  },
                  {
                    step: 4,
                    title: "Step 4: Commit PostgreSQL ACID Transaction",
                    desc: "Orders table writes row to WAL log with foreign key integrity. Returns 201 Created",
                    latency: "23.9ms",
                    status: "201 Created Committed",
                    activeColor: "border-emerald-500 bg-emerald-50/70 text-emerald-950",
                  },
                ].map((item) => {
                  const isCurrent = flowStep === item.step
                  return (
                    <div
                      key={item.step}
                      onClick={() => setFlowStep(item.step)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative flex items-center justify-between ${
                        isCurrent
                          ? `${item.activeColor} ring-2 ring-blue-500 shadow-md scale-101`
                          : "border-slate-200 bg-white hover:bg-slate-50/70 opacity-75"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                          isCurrent ? "bg-slate-900 text-white shadow-xs" : "bg-slate-100 text-slate-600"
                        }`}>
                          {item.step}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm leading-tight mb-0.5">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-4 font-mono">
                        <span className="block font-bold text-xs text-slate-800">{item.latency}</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">{item.status}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* COMPACT SEQUENCE FLOW CHIPS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🚦
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Live Request Simulation</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Animated packet journeys through gateways and caches.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              ⏱️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Latency Budgeting</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Inspect P95/P99 latency breakdowns at each hop.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🛡️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Circuit Breaker Modeling</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Model fallback paths and DB exponential retries.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 4: CAPACITY ESTIMATOR
         ========================================================================= */}
      <div id="capacity-estimator" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-amber-100/90 text-amber-800 border border-amber-200/60 tracking-wide font-mono">
            storytelling chapter 4 • capacity & scale math
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Capacity Estimator
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Perform real-time back-of-the-envelope system design calculations on a tactile 3D sticky note. Slide the DAU range to calculate QPS, storage growth, and bandwidth dynamically.
        </p>

        {/* BROWSER WINDOW MOCKUP: CAPACITY ESTIMATOR */}
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>Capacity & Scale Estimator</span>
            </div>
            <div className="text-[11px] font-mono text-amber-600 font-bold">Live Calculator</div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[440px] sm:min-h-[480px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Presets Header */}
            <div className="flex items-center justify-between mb-4 z-20 flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase mr-1">Scale Presets:</span>
                {[
                  { name: "SaaS Starter (2M)", val: 2 },
                  { name: "FinTech Scale (15M)", val: 15 },
                  { name: "Social Feed (50M)", val: 50 },
                  { name: "Hyperscale (100M)", val: 100 },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setDau(preset.val)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      dau === preset.val
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* INTERACTIVE CAPACITY CANVAS WITH 3D CURLED STICKY NOTE */}
            <div className="relative my-auto flex flex-col md:flex-row items-center justify-center gap-8 py-3">
              {/* Left Column: Interactive Range Slider & Presets */}
              <div className="w-full max-w-md bg-white p-5 rounded-3xl border border-slate-200 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Daily Active Users (DAU)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-mono font-bold">
                    {dau} Million DAU
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="100"
                  value={dau}
                  onChange={(e) => setDau(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 mb-5"
                />

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">Read Ratio</span>
                    <span className="font-bold text-sm text-slate-800">25 queries / user</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">Write Ratio</span>
                    <span className="font-bold text-sm text-slate-800">3 writes / user</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Hand-drawn sticky note with real-time math & flying curled corner */}
              <div className="w-72 select-none rotate-[2deg] relative">
                {/* 3D Lifted Corner Shadow */}
                <div
                  className="absolute -bottom-2 -right-1 w-3/4 h-8 pointer-events-none rounded-full"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 55%, transparent 75%)",
                    transform: "rotate(6deg) skewX(8deg)",
                    filter: "blur(4px)",
                  }}
                />

                {/* Main Paper Body with clipped corner */}
                <div
                  className="relative p-5 pt-3 pb-6 pr-6 bg-amber-100 border border-amber-300/80 rounded-[2px]"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 25%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.08) 100%)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 6px 14px -2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%)",
                  }}
                >
                  {/* Top adhesive band */}
                  <div className="w-full h-3.5 -mt-3 -mx-5 mb-2.5 px-5 bg-black/[0.04] border-b border-black/[0.06] flex items-center">
                    <div className="w-full h-[1px] bg-white/30 rounded-full" />
                  </div>

                  <span className="block font-bold text-xs text-amber-800 mb-2">
                    🧮 Capacity Calculations
                  </span>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/80">
                      <span className="text-amber-900 font-medium">Read QPS:</span>
                      <strong className="text-amber-950 font-bold">{readQps.toLocaleString()} req/s</strong>
                    </div>

                    <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/80">
                      <span className="text-amber-900 font-medium">Write QPS:</span>
                      <strong className="text-amber-950 font-bold">{writeQps.toLocaleString()} req/s</strong>
                    </div>

                    <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/80">
                      <span className="text-amber-900 font-medium">DB Growth:</span>
                      <strong className="text-amber-950 font-bold">~{monthlyStorageGb.toLocaleString()} GB / mo</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-amber-900 font-medium">Bandwidth:</span>
                      <strong className="text-amber-950 font-bold">~{bandwidthMbps.toLocaleString()} Mbps</strong>
                    </div>
                  </div>
                </div>

                {/* 3D Flying / Curled Corner Flap */}
                <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none select-none overflow-visible">
                  <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible" style={{ filter: "drop-shadow(-2px -2px 2.5px rgba(0,0,0,0.22))" }}>
                    <defs>
                      <linearGradient id="cap-curl" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.6" />
                        <stop offset="60%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                      </linearGradient>
                      <radialGradient id="cap-shadow" cx="20%" cy="20%" r="80%">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
                      </radialGradient>
                    </defs>
                    <path d="M 0 24 Q 12 20 24 0 L 24 24 Z" fill="url(#cap-shadow)" />
                    <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill="#fef08a" />
                    <path d="M 0 24 Q 9 9 24 0 C 19 9 12 18 0 24 Z" fill="url(#cap-curl)" />
                    <path d="M 24 0 C 19 9 12 18 0 24" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="0.8" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* COMPACT CAPACITY FEATURE CHIPS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🧮
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Dynamic QPS Slider</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Real-time read/write calculations based on custom DAU.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              📐
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Interview Equations</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Back-of-the-envelope equations on 3D paper stickies.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              💾
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Storage Growth Math</h4>
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">Monthly and yearly database volume projections.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4: THE EASIEST WAY TO GET YOUR THOUGHTS ON SCREEN (SUPERPOWERS GRID)
         ========================================================================= */}
      <div id="features" className="relative mb-20 lg:pl-16 xl:pl-20 scroll-mt-24">
        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-200/60 tracking-wide font-mono">
            engineer-friendly productivity
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          The easiest way to get your thoughts on screen
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-10 leading-relaxed">
          Quick drawings, architectural mockups, and diagrams with a clean minimal aesthetic. Dead simple shortcuts and zero fluff.
        </p>

        {/* 6-CARD SUPERPOWERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Diagonal Shortcuts */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 font-bold text-base">
                ⌨️
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Diagonal Hotkeys
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Keystrokes positioned diagonally for instant muscle memory: V (Select), S (Sticky), T (Text), R (Rect), E (Ellipse), D (DB), Z (Zone).
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-around font-mono text-xs font-bold text-slate-700">
              <span className="px-2 py-0.5 bg-slate-100 rounded">V</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded">S</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded">R</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded">D</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded">Z</span>
            </div>
          </div>

          {/* Card 2: Lossless Vector Export */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 font-bold">
                <Download className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Lossless Vector Export
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Export whiteboards to pin-sharp SVG vectors or crisp PNGs. Perfectly sized for RFCs, Confluence, and GitHub READMEs.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-emerald-700">.SVG Lossless</span>
              <span className="font-bold text-slate-600">.PNG 2x Retina</span>
            </div>
          </div>

          {/* Card 3: Magnetic Snapping & Auto-Layout */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-3 font-bold">
                <Magnet className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Magnetic Snapping
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Zero jitter elastic snapping with alignment guidelines. Clean up microservice diagrams automatically with 1-click tier layout.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-purple-700 font-bold">
              <span>Tier 1 → 2 → 3</span>
              <span className="text-[10px] text-slate-400">Auto-align</span>
            </div>
          </div>

          {/* Card 4: Architecture Zones */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Container Boundaries
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Encapsulate multi-tier systems in VPC zones, subnets, and K8s clusters. Moving the container moves all children automatically.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-indigo-700 font-bold">
              <span>Auto-contain: ON</span>
              <span className="text-[10px] text-slate-400">VPC 10.0.0.0/16</span>
            </div>
          </div>

          {/* Card 5: Personal Boards Dashboard */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 font-bold">
                <FolderKanban className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Personal Dashboard
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Organize your private boards with instant search, starred favorites, tag filters, and clean trash recovery. Zero workspace hassle.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-blue-700 font-bold">
              <span>⭐ Favorites & Search</span>
              <span className="text-[10px] text-slate-400">Instant load</span>
            </div>
          </div>

          {/* Card 6: Light & Dark Modes */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-3 font-bold">
                <Moon className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Canvas Theme Toggle
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Toggle between light graph paper and dark mode grid canvas. High-contrast colors adapt dynamically for late-night reviews.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-amber-700 font-bold">
              <span>☀️ Light & 🌙 Dark</span>
              <span className="text-[10px] text-slate-400">1-click switch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
