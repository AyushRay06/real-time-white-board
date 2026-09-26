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
  History,
} from "lucide-react"
import {
  AwsLambdaIcon,
  AmazonS3Icon,
  AmazonDynamoDBIcon,
  AmazonApiGatewayIcon,
  AmazonCloudWatchIcon,
  AmazonCognitoIcon,
  PostgresIcon,
  RedisIcon,
} from "@/components/icons/tool-icons"

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
      // Smooth finish
      "C 30 4880, 30 4980, 30 5100",
    ].join(" ")
  }, [])

  // ─── SECTION 1: CREATE (UI Layout Design) ───
  const [selectedWireframeEl, setSelectedWireframeEl] = useState<string>("hero-cta")

  // ─── SECTION 2: COLLABORATE (Multiplayer Team Sync) ───
  const [copiedLink, setCopiedLink] = useState(false)

  // ─── SECTION 3A: SYSTEM ARCHITECTURE (Interactive Nodes & Component Library) ───
  const [selectedCloudNode, setSelectedCloudNode] = useState<string>("lambda")
  const [archNodes, setArchNodes] = useState<Array<{
    id: string
    name: string
    type: string
    icon: any
    isToolIcon?: boolean
    iconBg?: string
    iconColor?: string
    x: number
    y: number
  }>>([
    { id: "client", name: "Web Client", type: "React Ingress", icon: Monitor, iconBg: "bg-blue-100", iconColor: "text-blue-600", x: 25, y: 110 },
    { id: "gateway", name: "Amazon API Gateway", type: "API Ingress", icon: AmazonApiGatewayIcon, isToolIcon: true, x: 165, y: 110 },
    { id: "lambda", name: "AWS Lambda", type: "Serverless", icon: AwsLambdaIcon, isToolIcon: true, x: 310, y: 35 },
    { id: "cognito", name: "Amazon Cognito", type: "Auth / IAM", icon: AmazonCognitoIcon, isToolIcon: true, x: 310, y: 185 },
    { id: "dynamo", name: "Amazon DynamoDB", type: "NoSQL DB", icon: AmazonDynamoDBIcon, isToolIcon: true, x: 460, y: 35 },
    { id: "s3", name: "Amazon S3", type: "Object Store", icon: AmazonS3Icon, isToolIcon: true, x: 460, y: 185 },
    { id: "cloudwatch", name: "CloudWatch", type: "Telemetry", icon: AmazonCloudWatchIcon, isToolIcon: true, x: 605, y: 110 },
  ])

  const [archArrows, setArchArrows] = useState<Array<{
    from: string
    to: string
    label: string
    dashed?: boolean
  }>>([
    { from: "client", to: "gateway", label: "HTTPS" },
    { from: "gateway", to: "lambda", label: "Invoke" },
    { from: "gateway", to: "cognito", label: "Auth" },
    { from: "lambda", to: "dynamo", label: "PutItem" },
    { from: "lambda", to: "s3", label: "Upload" },
    { from: "cognito", to: "cloudwatch", label: "Logs" },
  ])

  const handleAddArchComponent = (comp: { name: string; icon: any; isToolIcon?: boolean; iconBg?: string; iconColor?: string }) => {
    const newId = `node-${Date.now()}`
    const offsetX = 250 + ((archNodes.length % 5) * 55)
    const offsetY = 70 + ((archNodes.length % 3) * 60)
    const newNode = {
      id: newId,
      name: comp.name,
      type: "Cloud Tool Primitive",
      icon: comp.icon,
      isToolIcon: comp.isToolIcon,
      iconBg: comp.iconBg,
      iconColor: comp.iconColor,
      x: Math.min(offsetX, 580),
      y: Math.min(offsetY, 220),
    }
    setArchNodes((prev) => [...prev, newNode])
    setSelectedCloudNode(newId)
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
    }, 1100)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* ─── SCROLL PATH RIBBON CURLING DOWN THE LEFT-HAND SIDE ─── */}
      <div className="hidden lg:block absolute left-1 xl:left-3 top-8 bottom-16 w-11 xl:w-13 pointer-events-none z-10 overflow-visible">
        <svg
          viewBox="0 0 60 5100"
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

      {/* ─── MAIN FEATURES STORYLINE HEADER ─── */}
      <div className="relative mb-20 text-center max-w-3xl mx-auto pt-6 lg:pl-16 xl:pl-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700 shadow-2xs mb-4">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Interactive Feature Tour</span>
        </div>
        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          Built for how engineering teams actually work
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Explore the workspace: from rapid UI wireframing and multiplayer team sessions to real-time cloud architecture modeling and sequence trace simulation.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-indigo-300 to-transparent mx-auto mt-8 rounded-none" />
      </div>

      {/* =========================================================================
          FEATURE 1: CREATE (UI Layout Wireframe Design)
         ========================================================================= */}
      <div id="create" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Create
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          From quick UI wireframe sketches to full production layouts. Two designers, one shared infinite canvas, and real-time tactile editing without friction.
        </p>

        {/* BROWSER WINDOW MOCKUP: UI LAYOUT WIREFRAME */}
        <div className="rounded-none border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-none bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
              <span>UI Layout Wireframe</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[440px] sm:min-h-[480px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 overflow-hidden flex flex-col justify-center">
            {/* LIVE WEBSITE WIREFRAME BEING DESIGNED BY 2 PEOPLE */}
            <div className="relative my-auto flex items-center justify-center py-3">
              {/* Outer Website Canvas Artboard */}
              <div className="w-full max-w-2xl bg-white rounded-none border-2 border-dashed border-slate-300 shadow-lg p-5 relative transition-all">
                {/* Artboard Header Label */}
                <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-none bg-slate-800 text-white font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-xs">
                  <span>Layout Wireframe</span>
                  <span className="opacity-60">• Desktop 1200px Grid</span>
                </div>

                {/* 1. Wireframe Navbar */}
                <div className="w-full pb-3 border-b border-slate-100 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-none bg-indigo-600" />
                    <div className="w-20 h-3 rounded-none bg-slate-200" />
                  </div>
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="w-12 h-2.5 rounded-none bg-slate-100" />
                    <div className="w-14 h-2.5 rounded-none bg-slate-100" />
                    <div className="w-12 h-2.5 rounded-none bg-slate-100" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-5 rounded-none bg-slate-100" />
                    <div className="px-2.5 py-1 rounded-none text-[10px] font-bold text-white bg-indigo-600">
                      Get Started
                    </div>
                  </div>
                </div>

                {/* 2. Wireframe Hero Section */}
                <div className="text-center py-3.5 px-2 mb-3 bg-slate-50/70 rounded-none border border-slate-100 relative">
                  <span className="inline-block px-2.5 py-0.5 rounded-none text-[9px] font-mono font-bold bg-white text-slate-600 border border-slate-200 mb-2">
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
                      className={`px-4 py-1.5 rounded-none text-xs font-bold text-white shadow-sm transition-all cursor-pointer relative bg-indigo-600 ${
                        selectedWireframeEl === "hero-cta" ? "ring-2 ring-indigo-400 ring-offset-2 scale-105" : ""
                      }`}
                    >
                      <span>Explore Whiteboard</span>
                      {selectedWireframeEl === "hero-cta" && (
                        <span className="absolute -top-2.5 -right-2 w-2 h-2 bg-indigo-500 rounded-none animate-ping" />
                      )}
                    </button>
                    <button className="px-3 py-1.5 rounded-none text-xs font-medium text-slate-600 bg-white border border-slate-200">
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
                      className={`p-2.5 rounded-none border transition-all cursor-pointer text-left ${
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
                  <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-none shadow-xs font-mono">
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
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-none shadow-xs font-mono">
                    Alex (Frontend)
                  </span>
                </motion.div>
              </div>

              {/* 3D Sticky Note from Designer Sarah with authentic flying corner */}
              <div className="absolute right-0 sm:-right-4 top-2 sm:top-6 w-44 select-none hidden md:block rotate-[3deg] z-20">
                <div
                  className="absolute -bottom-2 -right-1 w-3/4 h-8 pointer-events-none rounded-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.1) 55%, transparent 75%)",
                    transform: "rotate(6deg) skewX(8deg)",
                    filter: "blur(4px)",
                  }}
                />
                <div
                  className="relative p-3.5 pt-2 pb-5 pr-5 bg-amber-100 border border-amber-300/80 rounded-none"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 25%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.08) 100%)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 6px 14px -2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0% 100%)",
                  }}
                >
                  <div className="w-full h-3 -mt-2 -mx-3.5 mb-2 px-3.5 bg-black/[0.04] border-b border-black/[0.06] flex items-center">
                    <div className="w-full h-[1px] bg-white/30 rounded-none" />
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
          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🎨
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Rapid UI Wireframing</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Fluid responsive artboards.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🧲
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Smart Grid Alignment</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Auto-snaps to 8px grids.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              📝
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Tactile 3D Annotations</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Curled notes for reviews.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FEATURE 2: COLLABORATE (Multiplayer Session & Team Presence)
         ========================================================================= */}
      <div id="collaborate" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Collaborate
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Share a room link, jump on the same canvas, and brainstorm sprint plans or review architectures with live cursor presence and instant reaction bursts.
        </p>

        {/* BROWSER WINDOW MOCKUP: MULTIPLAYER COLLABORATION */}
        <div className="rounded-none border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-none bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sprint 14 Retrospective</span>
            </div>
            <div className="w-12" />
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
                className="px-3 py-1.5 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
              </button>
            </div>

            {/* Collaborative Session Cards on Canvas */}
            <div className="relative my-auto flex flex-col sm:flex-row items-center justify-center gap-6 py-3">
              {/* Card 1: Sprint Retrospective Column */}
              <div className="w-64 p-4 rounded-none bg-white border-2 border-indigo-400 shadow-lg relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-none bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
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
              <div className="w-72 rounded-none bg-white border border-slate-200 shadow-xl overflow-hidden relative">
                <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Canvas Comment Thread</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="p-3.5 space-y-2.5">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-none bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
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

                  <div className="flex items-start gap-2 bg-indigo-50/60 p-2 rounded-none border border-indigo-100/60">
                    <span className="w-5 h-5 rounded-none bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
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
                <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-none shadow-xs font-mono">
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
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-none shadow-xs font-mono">
                  Marcus (Security)
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* COMPACT COLLABORATE FEATURE CHIPS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              ⚡️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Live Multiplayer</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Sub-15ms canvas state sync.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🔗
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Instant Room Link</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Zero login hurdles for guests.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              💬
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Pinned Discussions</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Pin notes directly to nodes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 1: SYSTEM ARCHITECTURE
         ========================================================================= */}
      <div id="usecases" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          System Architecture
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Design resilient cloud infrastructures with ready-made components, 1-click architecture templates, and VPC networking boundaries built for engineering RFCs.
        </p>

        {/* BROWSER WINDOW MOCKUP: SYSTEM ARCHITECTURE */}
        <div className="rounded-none border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-9 bg-slate-50 border-b border-slate-200 flex items-center px-4 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
          </div>

          {/* Whiteboard Workspace: Tool Toolbar + Component Library Drawer + Canvas */}
          <div className="flex h-[420px] bg-[#FAFBFD] overflow-hidden relative select-none">
            {/* 1. ACTUAL CANVAS TOOLBAR (Left vertical dock) */}
            <div className="w-11 bg-white border-r border-slate-200/80 p-1 flex flex-col items-center gap-1 shrink-0 z-20">
              <button className="p-2 rounded-none text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Select Tool">
                <MousePointer2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-none text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Text Tool">
                <Type className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-none text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Sticky Note">
                <StickyNote className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-none text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Container Box">
                <Square className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-none text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Directional Arrow">
                <ArrowRight className="w-4 h-4" />
              </button>
              {/* Active Component Library Tool Icon */}
              <button className="p-2 rounded-none bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-2xs relative" title="Component Library (Active)">
                <Box className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-none bg-indigo-600" />
              </button>
              <button className="p-2 rounded-none text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Prebuilt Layouts">
                <LayoutTemplate className="w-4 h-4" />
              </button>
            </div>

            {/* 2. ACTUAL COMPONENT LIBRARY DRAWER */}
            <div className="w-48 bg-white border-r border-slate-200/80 flex flex-col shrink-0 z-20 hidden md:flex">
              {/* Library Header */}
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Components</span>
              </div>

              {/* Search Bar */}
              <div className="p-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-none bg-slate-50 border border-slate-200/80 text-[11px] text-slate-400">
                  <Search className="w-3 h-3 text-slate-400" />
                  <span className="truncate">Search components...</span>
                </div>
              </div>

              {/* Clean Component List - No scrollbars */}
              <div className="p-2 space-y-1.5 overflow-hidden">
                {[
                  { name: "AWS Lambda", icon: AwsLambdaIcon, isToolIcon: true },
                  { name: "Amazon S3", icon: AmazonS3Icon, isToolIcon: true },
                  { name: "Amazon DynamoDB", icon: AmazonDynamoDBIcon, isToolIcon: true },
                  { name: "API Gateway", icon: AmazonApiGatewayIcon, isToolIcon: true },
                  { name: "CloudWatch", icon: AmazonCloudWatchIcon, isToolIcon: true },
                  { name: "Amazon Cognito", icon: AmazonCognitoIcon, isToolIcon: true },
                  { name: "PostgreSQL 16", icon: PostgresIcon, isToolIcon: true },
                  { name: "Redis Cache", icon: RedisIcon, isToolIcon: true },
                ].map((comp) => {
                  const CompIcon = comp.icon
                  return (
                    <div
                      key={comp.name}
                      onClick={() => handleAddArchComponent(comp)}
                      title="Click to drop on canvas"
                      className="flex items-center justify-between p-1.5 rounded-none border border-slate-200/60 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-2xs transition-all cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2">
                        {comp.isToolIcon ? (
                          <CompIcon size={22} showBadge={true} badgeClassName="rounded-none shadow-2xs" />
                        ) : (
                          <span className="w-5.5 h-5.5 rounded-none flex items-center justify-center bg-slate-100">
                            <CompIcon className="w-3.5 h-3.5 text-slate-700" strokeWidth={1.8} />
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-slate-700">{comp.name}</span>
                      </div>
                      <span className="text-[10px] text-indigo-600 opacity-0 group-hover:opacity-100 font-bold pr-1">+</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 3. INFINITE CANVAS VIEWPORT WITH INTERACTIVE NODES */}
            <div className="flex-1 relative overflow-hidden bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px]">
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
                    {archArrows.map((arr, i) => {
                      const fromNode = archNodes.find((n) => n.id === arr.from)
                      const toNode = archNodes.find((n) => n.id === arr.to)
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
                            <rect x="-26" y="-8" width="52" height="16" rx="0" fill="white" stroke="#CBD5E1" strokeWidth="1" className="shadow-2xs" />
                            <text x="0" y="1.5" fill="#475569" fontSize="7.5" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" className="font-mono">
                              {arr.label}
                            </text>
                          </g>
                        </g>
                      )
                    })}
                  </svg>

                  {/* Actual Canvas Component Nodes (Draggable) */}
                  {archNodes.map((node) => {
                    const Icon = node.icon
                    const isSelected = selectedCloudNode === node.id
                    return (
                      <motion.div
                        key={node.id}
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        onDrag={(_event, info) => {
                          setArchNodes((prev) =>
                            prev.map((n) =>
                              n.id === node.id
                                ? { ...n, x: n.x + info.delta.x, y: n.y + info.delta.y }
                                : n
                            )
                          )
                        }}
                        onClick={() => setSelectedCloudNode(node.id)}
                        style={{
                          position: "absolute",
                          left: `${node.x}px`,
                          top: `${node.y}px`,
                          width: "110px",
                          height: "86px",
                        }}
                        className={`rounded-none bg-white border p-2 flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing select-none transition-shadow z-20 ${
                          isSelected
                            ? "border-indigo-600 ring-2 ring-indigo-400 shadow-md"
                            : "border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs"
                        }`}
                      >
                        {/* Online Status Pill */}
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1 py-0.5 rounded-none bg-emerald-50 border border-emerald-200/80 text-[7px] font-bold text-emerald-700 font-mono">
                          <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse" />
                          <span>ONLINE</span>
                        </div>

                        {/* Tool Icon / Icon container */}
                        <div className="mb-1 flex items-center justify-center">
                          {node.isToolIcon ? (
                            <Icon size={32} showBadge={true} badgeClassName="rounded-none shadow-2xs" />
                          ) : (
                            <div className={`w-8 h-8 rounded-none flex items-center justify-center shadow-2xs ${node.iconBg || "bg-blue-100"}`}>
                              <Icon className={`w-4 h-4 ${node.iconColor || "text-blue-600"}`} strokeWidth={1.8} />
                            </div>
                          )}
                        </div>

                        {/* Label */}
                        <span className="text-[10px] font-bold text-slate-800 leading-tight tracking-tight line-clamp-1">
                          {node.name}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPACT SYSTEM DESIGN CHIPS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🏛️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Ready-Made Primitives</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Gateways, queues & DBs.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              ⚡️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">1-Click System Templates</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Instant cloud architectures.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🛡️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">VPC Auto-Containment</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Subnets move child nodes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 2: DATABASE & ERD SCHEMAS
         ========================================================================= */}
      <div id="database-erd" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Database & ERD Schemas
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Model relational schemas visually with dedicated table components, Primary & Foreign Key indicators, and automatic relational connector lines.
        </p>

        {/* BROWSER WINDOW MOCKUP: DATABASE ERD */}
        <div className="rounded-none border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-none bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Database Schema & ERD</span>
            </div>
            <div className="w-12" />
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
                    className={`px-3 py-1 rounded-none text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedTable === tab
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    public.{tab}
                  </button>
                ))}
              </div>
            </div>

            {/* ERD DIAGRAM VIEW WITH 3 RELATIONAL TABLES & SVG CONNECTORS */}
            <div className="relative my-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 py-3">
              {/* Table 1: USERS */}
              <div
                onClick={() => setSelectedTable("users")}
                className={`w-60 rounded-none bg-white border shadow-md overflow-hidden transition-all cursor-pointer ${
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
                  <div className="flex items-center justify-between text-slate-800 font-bold bg-emerald-50/80 px-2 py-1 rounded-none">
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
                <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-200 mb-1">
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
                className={`w-60 rounded-none bg-white border shadow-md overflow-hidden transition-all cursor-pointer ${
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
                  <div className="flex items-center justify-between text-slate-800 font-bold px-2 py-1 rounded-none bg-slate-50">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Key className="w-3 h-3 text-amber-500" /> id
                    </span>
                    <span className="text-[10px] text-slate-500">UUID [PK]</span>
                  </div>
                  <div className={`flex items-center justify-between px-2 py-1 rounded-none transition-colors ${
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
                <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-200 mb-1">
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
                className={`w-60 rounded-none bg-white border shadow-md overflow-hidden transition-all cursor-pointer ${
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
                  <div className="flex items-center justify-between text-slate-800 font-bold px-2 py-1 rounded-none bg-slate-50">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Key className="w-3 h-3 text-amber-500" /> id
                    </span>
                    <span className="text-[10px] text-slate-500">UUID [PK]</span>
                  </div>
                  <div className={`flex items-center justify-between px-2 py-1 rounded-none transition-colors ${
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
          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              📋
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Visual Table Builder</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Define PK and FK schemas.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🔗
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Smart Foreign Key Routing</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Visual relation connectors.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              💾
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">SQL Migration Export</h4>
              <p className="text-[11px] text-slate-500 leading-tight">1-click DDL script export.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMON USE CASES — STORYTELLING CHAPTER 3: SEQUENCE FLOW TRACE
         ========================================================================= */}
      <div id="sequence-flow" className="relative mb-28 lg:pl-16 xl:pl-20 scroll-mt-24">
        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          Sequence Flow Trace
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
          Simulate the exact lifecycle of network requests through gateways, caches, and databases. Click "Simulate Flow Trace" to watch animated execution packets pulse step by step.
        </p>

        {/* BROWSER WINDOW MOCKUP: SEQUENCE FLOW TRACE */}
        <div className="rounded-none border border-slate-200/90 shadow-xl bg-white overflow-hidden mb-5">
          {/* Chrome top bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-none bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Sequence Flow & Trace</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Whiteboard Canvas Area */}
          <div className="relative min-h-[420px] bg-[#FAFBFD] bg-[radial-gradient(#CBD5E1_1.25px,transparent_1.25px)] [background-size:20px_20px] p-6 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Trace Controls & Interactive Simulation Trigger */}
            <div className="flex items-center justify-between mb-4 z-20 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateTrace}
                  disabled={isTracingFlow}
                  className="px-4 py-2 rounded-none bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isTracingFlow ? "animate-pulse" : ""}`} />
                  <span>{isTracingFlow ? "Simulating Request..." : "Simulate Flow Trace"}</span>
                </button>

                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-none p-1">
                  {[1, 2, 3, 4].map((step) => (
                    <button
                      key={step}
                      onClick={() => setFlowStep(step)}
                      className={`w-7 h-7 rounded-none text-xs font-mono font-bold transition-all cursor-pointer ${
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

              {/* Step info pill */}
              <div className="text-xs font-mono text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-none shadow-2xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>
                  {flowStep === 1 && "Step 1: Client → API Gateway"}
                  {flowStep === 2 && "Step 2: Gateway → Auth Server"}
                  {flowStep === 3 && "Step 3: Gateway → Order Server"}
                  {flowStep === 4 && "Step 4: Order Server → Database"}
                </span>
              </div>
            </div>

            {/* VISUAL ARCHITECTURE FLOW DIAGRAM (Client -> Gateway -> 2 Servers -> DB) */}
            <div className="relative my-auto w-full max-w-3xl mx-auto py-2">
              <div className="relative w-[680px] h-[280px] mx-auto shrink-0">
                {/* SVG Connecting Flow Lines with Animated Pulse */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                  <defs>
                    <marker
                      id="flowArrowHead"
                      markerWidth="8"
                      markerHeight="8"
                      refX="7"
                      refY="4"
                      orient="auto"
                    >
                      <path d="M 0 1 L 7 4 L 0 7 z" fill="#3B82F6" />
                    </marker>
                    <marker
                      id="flowArrowMuted"
                      markerWidth="8"
                      markerHeight="8"
                      refX="7"
                      refY="4"
                      orient="auto"
                    >
                      <path d="M 0 1 L 7 4 L 0 7 z" fill="#94A3B8" />
                    </marker>
                    <filter id="packetGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#3B82F6" floodOpacity="0.8" />
                    </filter>
                  </defs>

                  {/* 1. Client -> Gateway */}
                  <g>
                    <path
                      d="M 125 149 L 180 149"
                      fill="none"
                      stroke={flowStep === 1 ? "#3B82F6" : "#CBD5E1"}
                      strokeWidth={flowStep === 1 ? "2.5" : "1.5"}
                      markerEnd={flowStep === 1 ? "url(#flowArrowHead)" : "url(#flowArrowMuted)"}
                      strokeLinecap="round"
                    />
                    <g transform="translate(152, 137)">
                      <rect x="-24" y="-8" width="48" height="16" rx="0" fill="white" stroke={flowStep === 1 ? "#93C5FD" : "#E2E8F0"} strokeWidth="1" className="shadow-2xs" />
                      <text x="0" y="1" fill={flowStep === 1 ? "#1D4ED8" : "#64748B"} fontSize="7.5" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" className="font-mono">
                        POST
                      </text>
                    </g>
                    {flowStep === 1 && (
                      <circle cx="152" cy="149" r="4.5" fill="#3B82F6" filter="url(#packetGlow)" className="animate-pulse" />
                    )}
                  </g>

                  {/* 2. Gateway -> Auth Server */}
                  <g>
                    <path
                      d="M 290 135 C 325 135, 325 74, 360 74"
                      fill="none"
                      stroke={flowStep === 2 ? "#3B82F6" : "#CBD5E1"}
                      strokeWidth={flowStep === 2 ? "2.5" : "1.5"}
                      markerEnd={flowStep === 2 ? "url(#flowArrowHead)" : "url(#flowArrowMuted)"}
                      strokeLinecap="round"
                    />
                    <g transform="translate(325, 95)">
                      <rect x="-26" y="-8" width="52" height="16" rx="0" fill="white" stroke={flowStep === 2 ? "#93C5FD" : "#E2E8F0"} strokeWidth="1" className="shadow-2xs" />
                      <text x="0" y="1" fill={flowStep === 2 ? "#1D4ED8" : "#64748B"} fontSize="7.5" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" className="font-mono">
                        Auth JWT
                      </text>
                    </g>
                    {flowStep === 2 && (
                      <circle cx="325" cy="95" r="4.5" fill="#3B82F6" filter="url(#packetGlow)" className="animate-pulse" />
                    )}
                  </g>

                  {/* 3. Gateway -> Order Server */}
                  <g>
                    <path
                      d="M 290 163 C 325 163, 325 224, 360 224"
                      fill="none"
                      stroke={flowStep === 3 ? "#3B82F6" : "#CBD5E1"}
                      strokeWidth={flowStep === 3 ? "2.5" : "1.5"}
                      markerEnd={flowStep === 3 ? "url(#flowArrowHead)" : "url(#flowArrowMuted)"}
                      strokeLinecap="round"
                    />
                    <g transform="translate(325, 203)">
                      <rect x="-24" y="-8" width="48" height="16" rx="0" fill="white" stroke={flowStep === 3 ? "#93C5FD" : "#E2E8F0"} strokeWidth="1" className="shadow-2xs" />
                      <text x="0" y="1" fill={flowStep === 3 ? "#1D4ED8" : "#64748B"} fontSize="7.5" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" className="font-mono">
                        gRPC
                      </text>
                    </g>
                    {flowStep === 3 && (
                      <circle cx="325" cy="203" r="4.5" fill="#3B82F6" filter="url(#packetGlow)" className="animate-pulse" />
                    )}
                  </g>

                  {/* 4. Order Server -> Database */}
                  <g>
                    <path
                      d="M 475 224 C 510 224, 510 149, 550 149"
                      fill="none"
                      stroke={flowStep === 4 ? "#3B82F6" : "#CBD5E1"}
                      strokeWidth={flowStep === 4 ? "2.5" : "1.5"}
                      markerEnd={flowStep === 4 ? "url(#flowArrowHead)" : "url(#flowArrowMuted)"}
                      strokeLinecap="round"
                    />
                    <g transform="translate(512, 192)">
                      <rect x="-26" y="-8" width="52" height="16" rx="0" fill="white" stroke={flowStep === 4 ? "#93C5FD" : "#E2E8F0"} strokeWidth="1" className="shadow-2xs" />
                      <text x="0" y="1" fill={flowStep === 4 ? "#1D4ED8" : "#64748B"} fontSize="7.5" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" className="font-mono">
                        Commit
                      </text>
                    </g>
                    {flowStep === 4 && (
                      <circle cx="512" cy="192" r="4.5" fill="#3B82F6" filter="url(#packetGlow)" className="animate-pulse" />
                    )}
                  </g>
                </svg>

                {/* 5 Diagram Nodes */}
                {[
                  {
                    id: "client",
                    name: "Web Client",
                    sub: "Browser Ingress",
                    icon: Monitor,
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    x: 20,
                    y: 110,
                    isActive: flowStep === 1,
                  },
                  {
                    id: "gateway",
                    name: "API Gateway",
                    sub: "Rate Limiter",
                    icon: Network,
                    iconBg: "bg-indigo-100",
                    iconColor: "text-indigo-600",
                    x: 180,
                    y: 110,
                    isActive: flowStep === 1 || flowStep === 2 || flowStep === 3,
                  },
                  {
                    id: "auth",
                    name: "Auth Server",
                    sub: "JWT Validation",
                    icon: Shield,
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    x: 360,
                    y: 35,
                    isActive: flowStep === 2,
                  },
                  {
                    id: "orders",
                    name: "Order Server",
                    sub: "RPC Execution",
                    icon: Server,
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    x: 360,
                    y: 185,
                    isActive: flowStep === 3 || flowStep === 4,
                  },
                  {
                    id: "database",
                    name: "Database",
                    sub: "PostgreSQL 16",
                    icon: Database,
                    iconBg: "bg-sky-100",
                    iconColor: "text-sky-600",
                    x: 550,
                    y: 110,
                    isActive: flowStep === 4,
                  },
                ].map((node) => {
                  const Icon = node.icon
                  return (
                    <div
                      key={node.id}
                      style={{
                        position: "absolute",
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: "110px",
                        height: "78px",
                      }}
                      className={`rounded-none bg-white border p-2 flex flex-col items-center justify-center text-center select-none transition-all z-20 ${
                        node.isActive
                          ? "border-blue-500 ring-2 ring-blue-400/80 shadow-md scale-103 bg-blue-50/20"
                          : "border-slate-200/90 shadow-2xs hover:border-slate-300"
                      }`}
                    >
                      {/* Active beacon */}
                      {node.isActive && (
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                          <span className="text-[7px] font-mono font-bold text-blue-600">LIVE</span>
                        </div>
                      )}

                      <div className={`w-7 h-7 rounded-none flex items-center justify-center mb-1 shadow-2xs ${node.iconBg}`}>
                        <Icon className={`w-3.5 h-3.5 ${node.iconColor}`} strokeWidth={1.8} />
                      </div>

                      <span className="text-[10px] font-bold text-slate-800 leading-tight">
                        {node.name}
                      </span>
                      <span className="text-[8.5px] font-mono text-slate-400 mt-0.5">
                        {node.sub}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* COMPACT SEQUENCE FLOW CHIPS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🚦
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Live Request Simulation</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Step-by-step packet journeys.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              ⏱️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Latency Budgeting</h4>
              <p className="text-[11px] text-slate-500 leading-tight">P95 and P99 hop timings.</p>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-none bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              🛡️
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-xs">Circuit Breaker Modeling</h4>
              <p className="text-[11px] text-slate-500 leading-tight">Circuit breaker fallbacks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4: THE EASIEST WAY TO GET YOUR THOUGHTS ON SCREEN (MINIMALIST CORE FEATURES)
          ========================================================================= */}
      <div id="features" className="relative mb-20 lg:pl-16 xl:pl-20 scroll-mt-24">
        <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          The easiest way to get your thoughts on screen
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mb-10 leading-relaxed">
          Quick sketches, system architectures, and engineering diagrams with a clean minimalist aesthetic and zero fluff.
        </p>

        {/* 4-CARD MINIMALIST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Cloud Auto-Save & Version History */}
          <div className="p-5 rounded-none bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-none bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 font-bold">
                <History className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Cloud Auto-Save & Version History
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Every stroke and layout change automatically syncs to the cloud in real time. Switch back to any previous version or snapshot of your whiteboard whenever you need.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-none border border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-blue-700">Real-time Cloud Sync</span>
              <span className="font-bold text-slate-600">Version History Rollback</span>
            </div>
          </div>

          {/* Card 2: Download as PNG, Mermaid & SVG */}
          <div className="p-5 rounded-none bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-none bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 font-bold">
                <Download className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Download as PNG, Mermaid & SVG
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Download your diagrams as high-resolution PNGs, standard Mermaid code, or crisp SVGs ready for documentation, RFCs, and READMEs.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-none border border-slate-200 flex items-center justify-around text-xs font-mono">
              <span className="font-bold text-emerald-700">PNG</span>
              <span className="text-slate-300">•</span>
              <span className="font-bold text-indigo-700">Mermaid</span>
              <span className="text-slate-300">•</span>
              <span className="font-bold text-slate-700">SVG</span>
            </div>
          </div>

          {/* Card 3: Smart Alignment & Snapping */}
          <div className="p-5 rounded-none bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-none bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-3 font-bold">
                <Magnet className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Smart Alignment & Snapping
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Zero-jitter magnetic snapping with dynamic guidelines keeps system architectures, wireframes, and tables cleanly aligned.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-none border border-slate-200 flex items-center justify-between text-xs font-mono text-purple-700 font-bold">
              <span>Smart Guidelines</span>
              <span className="text-[10px] text-slate-400">Auto-align</span>
            </div>
          </div>

          {/* Card 4: Diagonal Shortcuts */}
          <div className="p-5 rounded-none bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-none bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-3 font-bold text-base">
                ⌨️
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Diagonal Hotkeys
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                Ergonomic keyboard shortcuts for rapid tool switching: V (Select), S (Sticky), T (Text), R (Rectangle), and D (Database).
              </p>
            </div>
            <div className="p-2.5 bg-white rounded-none border border-slate-200 flex items-center justify-around font-mono text-xs font-bold text-slate-700">
              <span className="px-2 py-0.5 bg-slate-100 rounded-none">V</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded-none">S</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded-none">T</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded-none">R</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded-none">D</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
