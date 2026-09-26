"use client"

import React, { useState, useEffect } from "react"
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
  Pause,
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
  Layers,
  Table,
  Key,
  Radio,
  Activity,
  HardDrive,
  Network,
  CornerDownRight,
  MessageSquare,
  Flame,
  Heart,
  Plus,
} from "lucide-react"

export function ExcalidrawStoryline() {
  // ─── SECTION 1: CREATE (UI Layout Design) ───
  const [activeUiDevice, setActiveUiDevice] = useState<"desktop" | "mobile">("desktop")
  const [selectedWireframeEl, setSelectedWireframeEl] = useState<string>("hero-cta")
  const [wireframeTheme, setWireframeTheme] = useState<"indigo" | "purple" | "emerald">("indigo")

  // ─── SECTION 2: COLLABORATE (Multiplayer Team Sync) ───
  const [copiedLink, setCopiedLink] = useState(false)
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number; y: number }[]>([])
  const [commentOpen, setCommentOpen] = useState(true)

  const triggerReaction = (emoji: string) => {
    const id = Date.now() + Math.random()
    const x = 120 + Math.random() * 260
    const y = 80 + Math.random() * 140
    setReactions((prev) => [...prev.slice(-15), { id, emoji, x, y }])
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id))
    }, 2000)
  }

  // ─── SECTION 3A: SYSTEM ARCHITECTURE ───
  type ArchTemplate = "ecommerce" | "chat" | "rag"
  const [selectedArchTemplate, setSelectedArchTemplate] = useState<ArchTemplate>("ecommerce")
  const [selectedCloudNode, setSelectedCloudNode] = useState<string>("gateway")

  const ARCH_TEMPLATES: Record<ArchTemplate, {
    name: string
    badge: string
    desc: string
    nodes: Array<{ id: string; name: string; type: string; tier: string; sub: string; icon: any; color: string }>
  }> = {
    ecommerce: {
      name: "E-Commerce Microservices",
      badge: "Production Ready",
      desc: "High-throughput checkout pipeline with asynchronous event queuing and read-replica caching.",
      nodes: [
        { id: "edge", name: "Cloudflare Edge", type: "CDN / WAF", tier: "Tier 1: Edge", sub: "Global Anycast", icon: Shield, color: "text-amber-600 bg-amber-50 border-amber-200" },
        { id: "gateway", name: "Envoy API Gateway", type: "Reverse Proxy", tier: "Tier 1: Edge", sub: "Rate Limiting & Auth", icon: Server, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
        { id: "orders", name: "Order Microservice", type: "Golang RPC", tier: "Tier 2: Service", sub: "gRPC & REST /v1", icon: Cpu, color: "text-blue-600 bg-blue-50 border-blue-200" },
        { id: "kafka", name: "Apache Kafka", type: "Event Streaming", tier: "Tier 2: Queue", sub: "Partitioned Topics", icon: Network, color: "text-purple-600 bg-purple-50 border-purple-200" },
        { id: "redis", name: "Redis Cluster", type: "In-Memory Cache", tier: "Tier 3: Data", sub: "Sub-2ms Session TTL", icon: Radio, color: "text-rose-600 bg-rose-50 border-rose-200" },
        { id: "postgres", name: "PostgreSQL 16", type: "Primary Relational", tier: "Tier 3: Data", sub: "Multi-AZ ACID Storage", icon: Database, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
      ],
    },
    chat: {
      name: "Real-time PubSub & Chat",
      badge: "WebSockets",
      desc: "Bi-directional WebSocket streaming architecture backed by Redis Pub/Sub cluster.",
      nodes: [
        { id: "edge", name: "NLB Load Balancer", type: "Network LB", tier: "Tier 1: Edge", sub: "TLS Termination", icon: Shield, color: "text-amber-600 bg-amber-50 border-amber-200" },
        { id: "gateway", name: "Socket.IO Gateway", type: "WS Cluster", tier: "Tier 1: Edge", sub: "100k Concurrent Conns", icon: Server, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
        { id: "presence", name: "Presence Worker", type: "Node.js Service", tier: "Tier 2: Service", sub: "Heartbeat & Typing", icon: Cpu, color: "text-blue-600 bg-blue-50 border-blue-200" },
        { id: "redis", name: "Redis Pub/Sub", type: "Message Bus", tier: "Tier 2: Queue", sub: "Instant Fanout", icon: Radio, color: "text-rose-600 bg-rose-50 border-rose-200" },
        { id: "messages", name: "Cassandra DB", type: "Time-series Store", tier: "Tier 3: Data", sub: "LSM Message Log", icon: Database, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
        { id: "s3", name: "S3 Object Store", type: "Blob Storage", tier: "Tier 3: Data", sub: "Media Attachments", icon: HardDrive, color: "text-purple-600 bg-purple-50 border-purple-200" },
      ],
    },
    rag: {
      name: "AI RAG & Vector Pipeline",
      badge: "LLM Systems",
      desc: "Document ingestion, embeddings generator, and semantic vector search gateway.",
      nodes: [
        { id: "edge", name: "API Gateway", type: "FastAPI / Py", tier: "Tier 1: Edge", sub: "Semantic Routing", icon: Server, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
        { id: "embed", name: "Embedding Worker", type: "Python Service", tier: "Tier 2: Service", sub: "text-embedding-3", icon: Cpu, color: "text-blue-600 bg-blue-50 border-blue-200" },
        { id: "queue", name: "Celery / SQS", type: "Task Queue", tier: "Tier 2: Queue", sub: "Async Chunking", icon: Network, color: "text-purple-600 bg-purple-50 border-purple-200" },
        { id: "vector", name: "Pinecone / pgvector", type: "Vector Database", tier: "Tier 3: Data", sub: "HNSW Cosine Index", icon: Radio, color: "text-rose-600 bg-rose-50 border-rose-200" },
        { id: "postgres", name: "PostgreSQL", type: "Metadata DB", tier: "Tier 3: Data", sub: "User Auth & Quotas", icon: Database, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
        { id: "llm", name: "Anthropic / OpenAI", type: "LLM Inference", tier: "External", sub: "Streaming Token Gen", icon: Sparkles, color: "text-amber-600 bg-amber-50 border-amber-200" },
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
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* CONTINUOUS VERTICAL TIMELINE RAIL */}
      <div className="hidden lg:block absolute left-8 top-12 bottom-24 w-[2px] bg-gradient-to-b from-indigo-200 via-purple-200 to-indigo-100" />

      {/* =========================================================================
          FEATURE 1: CREATE (UI Layout Wireframe Design)
         ========================================================================= */}
      <div id="create" className="relative mb-32 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-amber-500 z-10">
          <Lightbulb className="w-5 h-5 fill-amber-400 text-amber-500" />
        </div>

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
              whiteboard.design/team/ui-wireframe-layout
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <span className="hidden sm:inline">2 Collaborators Live</span>
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
            </div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[460px] sm:min-h-[500px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 overflow-hidden flex flex-col justify-between">
            {/* FLOATING TOP WIREFRAME CONTROLS */}
            <div className="flex items-center justify-between z-20 gap-3 flex-wrap">
              {/* Elementary tools pill */}
              <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs rounded-xl p-1.5 flex items-center gap-1">
                {[
                  { id: "select", label: "Select", icon: MousePointer2 },
                  { id: "box", label: "Wireframe Box", icon: LayoutGrid },
                  { id: "text", label: "Text", icon: LayoutGrid },
                  { id: "note", label: "Sticky", icon: Sliders },
                ].map((t) => (
                  <button
                    key={t.id}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Wireframe theme palette */}
              <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs text-slate-600">
                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">Accent</span>
                {(["indigo", "purple", "emerald"] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setWireframeTheme(theme)}
                    className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                      wireframeTheme === theme ? "scale-125 ring-2 ring-slate-800 ring-offset-1" : "opacity-75 hover:opacity-100"
                    } ${
                      theme === "indigo" ? "bg-indigo-600" : theme === "purple" ? "bg-purple-600" : "bg-emerald-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* LIVE WEBSITE WIREFRAME BEING DESIGNED BY 2 PEOPLE */}
            <div className="relative my-auto flex items-center justify-center py-4">
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
                    <div className={`w-5 h-5 rounded-md ${
                      wireframeTheme === "indigo" ? "bg-indigo-600" : wireframeTheme === "purple" ? "bg-purple-600" : "bg-emerald-600"
                    }`} />
                    <div className="w-20 h-3 rounded bg-slate-200" />
                  </div>
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="w-12 h-2.5 rounded bg-slate-100" />
                    <div className="w-14 h-2.5 rounded bg-slate-100" />
                    <div className="w-12 h-2.5 rounded bg-slate-100" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-5 rounded bg-slate-100" />
                    <div className={`px-2.5 py-1 rounded text-[10px] font-bold text-white ${
                      wireframeTheme === "indigo" ? "bg-indigo-600" : wireframeTheme === "purple" ? "bg-purple-600" : "bg-emerald-600"
                    }`}>
                      Get Started
                    </div>
                  </div>
                </div>

                {/* 2. Wireframe Hero Section */}
                <div className="text-center py-4 px-2 mb-4 bg-slate-50/70 rounded-xl border border-slate-100 relative">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white text-slate-600 border border-slate-200 mb-2">
                    Sprint 14 • Prototype
                  </span>
                  <h3 className="font-comico font-bold text-slate-800 text-base sm:text-lg mb-1">
                    Visual Workspace for Fast Engineering Teams
                  </h3>
                  <p className="text-[11px] text-slate-500 max-w-md mx-auto mb-3">
                    Sketch cloud architectures, prototype UI components, and finalize specs together.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedWireframeEl("hero-cta")}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm transition-all cursor-pointer relative ${
                        wireframeTheme === "indigo" ? "bg-indigo-600" : wireframeTheme === "purple" ? "bg-purple-600" : "bg-emerald-600"
                      } ${selectedWireframeEl === "hero-cta" ? "ring-2 ring-indigo-400 ring-offset-2 scale-105" : ""}`}
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

            {/* Bottom mini status bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-100">
              <span>Selected Element: <strong className="text-slate-700">{selectedWireframeEl}</strong></span>
              <span className="text-indigo-600 font-semibold">12-column flex grid active</span>
            </div>
          </div>
        </div>

        {/* 3 CREATE FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🎨</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Rapid UI Wireframing
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Drop wireframe containers, navbars, buttons, and bento cards onto canvas in seconds without complicated design software.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🧲</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Smart Alignment Snapping
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Auto-snap to standard 8px/16px padding intervals and symmetrical column boundaries with zero jitter.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">📝</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Tactile 3D Annotations
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pin realistic 3D curled sticky notes to any design element to give actionable peer review feedback inline.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FEATURE 2: COLLABORATE (Multiplayer Session & Team Presence)
         ========================================================================= */}
      <div id="collaborate" className="relative mb-32 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-indigo-600 z-10">
          <Users className="w-5 h-5" />
        </div>

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
              whiteboard.design/room/sprint-14-retro
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">E</span>
              <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">M</span>
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">A</span>
              <span className="text-[10px] font-mono font-bold text-slate-500 ml-1">+4 online</span>
            </div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[440px] sm:min-h-[480px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 overflow-hidden flex flex-col justify-between">
            {/* Top Interactive Reaction Controls */}
            <div className="flex items-center justify-between z-20 gap-3">
              <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs rounded-xl px-3 py-1.5 flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">Send Live Reaction:</span>
                {["🚀", "🔥", "❤️", "💡", "👏"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => triggerReaction(emoji)}
                    className="p-1 hover:scale-125 transition-transform text-sm cursor-pointer rounded hover:bg-slate-100"
                    title={`Send ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Share Room Button */}
              <div className="flex items-center gap-2">
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
            </div>

            {/* Dynamic Reaction Particles Floating Across Screen */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
              {reactions.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 1, scale: 0.5, y: r.y, x: r.x }}
                  animate={{ opacity: 0, scale: 1.5, y: r.y - 120 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  className="absolute text-2xl select-none"
                >
                  {r.emoji}
                </motion.div>
              ))}
            </div>

            {/* Collaborative Session Cards on Canvas */}
            <div className="relative my-auto flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
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

            {/* Bottom mini status */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-100">
              <span>Rooms require zero sign-in for guests</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                WebSocket Latency: 12ms
              </span>
            </div>
          </div>
        </div>

        {/* 2 COLLABORATE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              One-Click Instant Sharing
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Anyone with the link can join your canvas instantly. No forced sign-ups or complex workspace permissions required.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">💬</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Contextual Pinned Discussions
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pin comment threads directly to microservices, tables, or sprint tickets to resolve architecture decisions where they live.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 1: SYSTEM ARCHITECTURE
         ========================================================================= */}
      <div id="usecases" className="relative mb-32 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-purple-600 z-10">
          <Compass className="w-5 h-5" />
        </div>

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
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-8">
          {/* Chrome top bar with 1-Click Template Selector */}
          <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
              <span className="text-xs font-mono font-bold text-slate-700 ml-2">Architecture Templates:</span>
            </div>

            {/* 1-Click Architecture Templates Switcher */}
            <div className="flex items-center gap-1.5">
              {(["ecommerce", "chat", "rag"] as const).map((tKey) => {
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

          {/* Whiteboard Canvas Viewport */}
          <div className="relative min-h-[460px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Ready-Made Built Components Tray */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2 z-20">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-mono text-slate-500 font-bold uppercase mr-1">Ready-Made:</span>
                {[
                  { name: "API Gateway", icon: Server },
                  { name: "Kafka Queue", icon: Network },
                  { name: "Redis Cache", icon: Radio },
                  { name: "PostgreSQL", icon: Database },
                ].map((c) => (
                  <span
                    key={c.name}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-medium shadow-2xs"
                  >
                    <c.icon className="w-3 h-3 text-indigo-600" />
                    <span>{c.name}</span>
                  </span>
                ))}
              </div>

              <div className="text-[11px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg font-semibold">
                VPC Boundary: 10.0.0.0/16 Active
              </div>
            </div>

            {/* VPC BOUNDARY WITH READY-MADE CLOUD NODES */}
            <div className="relative w-full my-auto rounded-3xl border-2 border-dashed border-indigo-400 bg-indigo-50/25 p-6 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-600 text-white font-mono text-xs font-bold shadow-xs">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Production VPC Boundary</span>
                </div>
                <span className="text-xs font-mono text-indigo-700">Multi-tier Auto-layout</span>
              </div>

              {/* Dynamic Grid of Cloud Primitive Nodes */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                {ARCH_TEMPLATES[selectedArchTemplate].nodes.map((node) => {
                  const Icon = node.icon
                  const isSelected = selectedCloudNode === node.id
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedCloudNode(node.id)}
                      className={`p-3.5 rounded-2xl bg-white border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? "border-indigo-600 ring-2 ring-indigo-500 shadow-md scale-102"
                          : "border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`p-1.5 rounded-xl border ${node.color}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 font-bold">
                          {node.tier}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight mb-0.5">
                        {node.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {node.type}
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-indigo-600">
                        <span>{node.sub}</span>
                        {isSelected && <span className="font-bold">Active</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Template Description Footer */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{ARCH_TEMPLATES[selectedArchTemplate].desc}</span>
              <span className="text-indigo-600 font-bold hover:underline cursor-pointer">
                Export to Architecture RFC →
              </span>
            </div>
          </div>
        </div>

        {/* 3 SYSTEM DESIGN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🏛️</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Ready-Made Cloud Primitives
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Drop API Gateways, Kafka clusters, Redis caches, and PostgreSQL nodes with pre-configured networking metadata.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">⚡️</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              1-Click System Templates
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Instantly bootstrap verified architectures for E-Commerce, Real-time WebSockets, and AI RAG embedding pipelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🛡️</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              VPC Containment Boundaries
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Group microservices into public, private, and database subnets. Dragging the VPC boundary moves all internal components synchronously.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 2: DATABASE & ERD SCHEMAS
         ========================================================================= */}
      <div id="database-erd" className="relative mb-32 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-emerald-600 z-10">
          <Database className="w-5 h-5" />
        </div>

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
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-8">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="px-6 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <Database className="w-3 h-3 text-emerald-600" />
              schema-designer.sql/public/erd-model
            </div>
            <div className="text-[11px] font-mono text-emerald-600 font-bold">PostgreSQL 16 Dialect</div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[460px] sm:min-h-[500px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
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
            <div className="relative my-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 py-4">
              {/* Table 1: USERS */}
              <div
                onClick={() => setSelectedTable("users")}
                className={`w-64 rounded-2xl bg-white border shadow-md overflow-hidden transition-all cursor-pointer ${
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

              {/* Dynamic Relational Arrow 1: users (1) -> orders (N) */}
              <div className="hidden lg:flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mb-1">
                  1 : N Relation
                </span>
                <div className="w-12 h-[2px] bg-emerald-500 relative flex items-center justify-end">
                  <ArrowRight className="w-4 h-4 text-emerald-500 -mr-2" />
                </div>
              </div>

              {/* Table 2: ORDERS */}
              <div
                onClick={() => {
                  setSelectedTable("orders")
                  setActiveForeignKey("user_id")
                }}
                className={`w-64 rounded-2xl bg-white border shadow-md overflow-hidden transition-all cursor-pointer ${
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
                    <span className="text-[10px] text-emerald-700">UUID [FK → users.id]</span>
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

              {/* Dynamic Relational Arrow 2: orders (1) -> payments (N) */}
              <div className="hidden lg:flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mb-1">
                  1 : 1 Relation
                </span>
                <div className="w-12 h-[2px] bg-emerald-500 relative flex items-center justify-end">
                  <ArrowRight className="w-4 h-4 text-emerald-500 -mr-2" />
                </div>
              </div>

              {/* Table 3: PAYMENTS */}
              <div
                onClick={() => {
                  setSelectedTable("payments")
                  setActiveForeignKey("order_id")
                }}
                className={`w-64 rounded-2xl bg-white border shadow-md overflow-hidden transition-all cursor-pointer ${
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
                    <span className="text-[10px] text-emerald-700">UUID [FK → orders.id]</span>
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

            {/* Bottom mini status bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-100">
              <span>Selected Table: <strong className="text-emerald-700">public.{selectedTable}</strong></span>
              <span className="text-slate-600 font-semibold">1-Click SQL Migration Generation Ready</span>
            </div>
          </div>
        </div>

        {/* 3 DATABASE FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">📋</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Visual Table Builder
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Design database schemas with primary keys, unique constraints, and PostgreSQL data types in a clean tabular view.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Smart Foreign Key Routing
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Connect tables with 1-to-Many and Many-to-Many relational arrows that snap directly to foreign key row items.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">💾</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              SQL Migration Export
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Export completed ERD schemas directly to executable PostgreSQL DDL script files with indexes and foreign keys intact.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 3: SEQUENCE FLOW TRACE
         ========================================================================= */}
      <div id="sequence-flow" className="relative mb-32 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-blue-600 z-10">
          <Activity className="w-5 h-5" />
        </div>

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
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-8">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="px-6 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <Activity className="w-3 h-3 text-blue-600" />
              trace.request/orders/checkout-sequence
            </div>
            <div className="text-[11px] font-mono text-blue-600 font-bold">Total P99: 68.4ms</div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[460px] sm:min-h-[500px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Top Trace Controls & Interactive Simulation Trigger */}
            <div className="flex items-center justify-between mb-4 z-20 flex-wrap gap-2">
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
            <div className="relative my-auto w-full max-w-4xl mx-auto py-6">
              {/* Actors Top Lifeline Headers */}
              <div className="grid grid-cols-4 gap-4 text-center mb-8">
                {[
                  { id: "client", name: "Client Browser", sub: "HTTPS / TLS", icon: MousePointer2, color: "text-slate-700 bg-slate-100" },
                  { id: "gateway", name: "API Gateway", sub: "Rate Limiting", icon: Server, color: "text-indigo-700 bg-indigo-50" },
                  { id: "orders", name: "Order Service", sub: "Go / gRPC", icon: Cpu, color: "text-blue-700 bg-blue-50" },
                  { id: "postgres", name: "PostgreSQL", sub: "ACID Storage", icon: Database, color: "text-emerald-700 bg-emerald-50" },
                ].map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center">
                    <div className={`p-2.5 rounded-2xl border border-slate-200 shadow-xs mb-1.5 ${actor.color}`}>
                      <actor.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs sm:text-sm">{actor.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{actor.sub}</span>
                  </div>
                ))}
              </div>

              {/* 4 Sequential Flow Step Bars */}
              <div className="space-y-4">
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
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative flex items-center justify-between ${
                        isCurrent
                          ? `${item.activeColor} ring-2 ring-blue-500 shadow-md scale-101`
                          : "border-slate-200 bg-white hover:bg-slate-50/70 opacity-75"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center ${
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

            {/* Bottom mini status bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-100">
              <span>Interactive Step-by-Step Sequence Execution</span>
              <span className="text-blue-600 font-semibold">Simulate Flow Mode: Enabled</span>
            </div>
          </div>
        </div>

        {/* 3 SEQUENCE FLOW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🚦</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Live Flow Simulation
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Execute animated request traces step-by-step to visualize how network calls route through services and caches.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">⏱️</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Latency Budget Breakdowns
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Profile P95 and P99 response times at each hop before implementation to identify bottlenecks upfront.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🛡️</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Circuit Breaker Modeling
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Simulate fallback paths and database retry exponential backoffs directly on your whiteboard sequence diagrams.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 4: CAPACITY ESTIMATOR
         ========================================================================= */}
      <div id="capacity-estimator" className="relative mb-32 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-amber-600 z-10">
          <Calculator className="w-5 h-5" />
        </div>

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
        <div className="rounded-2xl border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-8">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="px-6 py-1 rounded-full bg-white border border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <Calculator className="w-3 h-3 text-amber-600" />
              system-design.estimator/scale-equations
            </div>
            <div className="text-[11px] font-mono text-amber-600 font-bold">Live Calculator</div>
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[460px] sm:min-h-[500px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
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
            <div className="relative my-auto flex flex-col md:flex-row items-center justify-center gap-8 py-4">
              {/* Left Column: Interactive Range Slider & Presets */}
              <div className="w-full max-w-md bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
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
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 mb-6"
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
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
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

            {/* Bottom mini status bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-100">
              <span>Automatic Back-of-the-Envelope Math</span>
              <span className="text-amber-700 font-semibold">Live System Interview Mode</span>
            </div>
          </div>
        </div>

        {/* 3 CAPACITY FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">🧮</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Dynamic QPS Estimator
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Calculate read/write queries per second and network throughput on the fly with customizable read:write ratios.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">📐</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Interview-Ready Formulas
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Format back-of-the-envelope estimations directly on 3D paper stickies to ace senior engineering system design interviews.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all">
            <div className="text-2xl mb-3">💾</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Storage Growth Forecasting
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Forecast 1-year and 5-year relational database capacity requirements to properly size disk volumes and cache TTLs.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4: THE EASIEST WAY TO GET YOUR THOUGHTS ON SCREEN (SUPERPOWERS GRID)
         ========================================================================= */}
      <div id="features" className="relative mb-24 lg:pl-16 scroll-mt-24">
        {/* Timeline circular node */}
        <div className="hidden lg:flex absolute -left-[54px] top-0 w-11 h-11 rounded-full bg-white border-2 border-indigo-300 shadow-md items-center justify-center text-emerald-600 z-10">
          <Zap className="w-5 h-5" />
        </div>

        {/* Header Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-200/60 tracking-wide font-mono">
            engineer-friendly productivity
          </span>
        </div>

        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          The easiest way to get your thoughts on screen
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-12 leading-relaxed">
          Quick drawings, architectural mockups, and diagrams with a clean minimal aesthetic. Dead simple shortcuts and zero fluff.
        </p>

        {/* 6-CARD SUPERPOWERS GRID */}
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
                Container Boundaries
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Encapsulate multi-tier systems in VPC zones, subnets, and K8s clusters. Moving the container boundary moves all children automatically.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-indigo-700 font-bold">
              <span>Auto-containment: ON</span>
              <span className="text-[10px] text-slate-400">VPC 10.0.0.0/16</span>
            </div>
          </div>

          {/* Card 5: Personal Boards Dashboard */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 font-bold">
                <FolderKanban className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Personal Dashboard
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Organize your private boards with instant search, starred favorites, tag filters, and clean trash recovery. Zero complicated workspace setup.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-blue-700 font-bold">
              <span>⭐ Favorites & Search</span>
              <span className="text-[10px] text-slate-400">Instant load</span>
            </div>
          </div>

          {/* Card 6: Light & Dark Modes */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4 font-bold">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Canvas Theme Toggle
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Toggle between light graph paper and dark mode grid canvas. High-contrast colors adapt dynamically for late-night architecture reviews.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-amber-700 font-bold">
              <span>☀️ Light & 🌙 Dark</span>
              <span className="text-[10px] text-slate-400">1-click switch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
