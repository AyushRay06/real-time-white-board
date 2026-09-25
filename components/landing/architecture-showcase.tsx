"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Shield,
  Database,
  Code2,
  Calculator,
  GitBranch,
  Layers,
  Server,
  Download,
  Moon,
  Magnet,
  LayoutGrid,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

export function ArchitectureShowcase() {
  const features = [
    {
      icon: Shield,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      title: "Architecture Zones & Boundary Presets",
      description:
        "Isolate workloads inside Virtual Private Clouds (VPC), Public/Private subnets, and Kubernetes clusters. Moving a zone smoothly moves all contained child services.",
      badge: "Boundary Presets",
      visual: (
        <div className="w-full h-36 rounded-xl border border-dashed border-indigo-400 bg-indigo-50/40 p-3 relative flex items-center justify-around">
          <div className="absolute -top-2.5 left-3 px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[9px] font-bold">
            VPC-EAST-1 (10.0.0.0/16)
          </div>
          <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs text-center w-24">
            <Server className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
            <span className="text-[10px] font-bold text-slate-800">Gateway</span>
          </div>
          <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs text-center w-24">
            <Database className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <span className="text-[10px] font-bold text-slate-800">Postgres</span>
          </div>
        </div>
      ),
    },
    {
      icon: Layers,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      title: "Cloud & Microservices Library",
      description:
        "1-click placement of standard cloud architectural components: API Gateways, Microservices, Kafka Message Queues, Redis Caches, MongoDB, and Vector Databases.",
      badge: "Component Library",
      visual: (
        <div className="w-full h-36 rounded-xl border border-slate-100 bg-slate-50/60 p-3 flex items-center justify-center gap-3">
          <div className="p-2.5 bg-white rounded-xl border border-purple-200 shadow-2xs flex flex-col items-center">
            <span className="text-sm mb-1">⚡️</span>
            <span className="text-[10px] font-bold text-slate-800">Redis</span>
            <span className="text-[8px] text-purple-600 font-mono">In-Memory</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-indigo-200 shadow-2xs flex flex-col items-center">
            <span className="text-sm mb-1">📬</span>
            <span className="text-[10px] font-bold text-slate-800">Kafka</span>
            <span className="text-[8px] text-indigo-600 font-mono">Pub/Sub</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-2xs flex flex-col items-center">
            <span className="text-sm mb-1">🧠</span>
            <span className="text-[10px] font-bold text-slate-800">VectorDB</span>
            <span className="text-[8px] text-emerald-600 font-mono">Embeddings</span>
          </div>
        </div>
      ),
    },
    {
      icon: Database,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      title: "Database Schema & ERD Cards",
      description:
        "Model relational database tables with Primary Key (PK) & Foreign Key (FK) indicators, SQL data types, relational connecting lines, and auto-hugging rows.",
      badge: "ERD Data Modeling",
      visual: (
        <div className="w-full h-36 rounded-xl border border-slate-200 bg-white p-2.5 font-mono text-[10px] flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="font-bold text-slate-900">users_table</span>
            <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 rounded">Postgres</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-amber-800 bg-amber-50/70 px-1.5 py-0.5 rounded">
              <span className="font-bold flex items-center gap-1">
                <span className="text-[7px] bg-amber-200 px-0.5 rounded">PK</span> id
              </span>
              <span className="text-slate-400">uuid</span>
            </div>
            <div className="flex items-center justify-between text-slate-700 px-1.5">
              <span>email</span>
              <span className="text-slate-400">varchar</span>
            </div>
          </div>
          <div className="text-[9px] text-emerald-600 font-sans font-semibold pt-1 border-t border-slate-100 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Foreign Key Connected
          </div>
        </div>
      ),
    },
    {
      icon: Code2,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      title: "RESTful API Endpoint Contracts",
      description:
        "Document contract specs with HTTP method badges (GET, POST, PUT, DELETE), request/response JSON payload schemas, status codes, and latency SLOs.",
      badge: "API Contracts",
      visual: (
        <div className="w-full h-36 rounded-xl border border-slate-200 bg-white p-3 flex flex-col justify-between shadow-2xs font-sans">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-100 text-indigo-700">
                POST
              </span>
              <span className="font-mono text-xs font-bold text-slate-800 truncate">
                /api/v1/auth/login
              </span>
            </div>
            <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              200 OK
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 text-indigo-300 font-mono text-[9px] truncate">
            &#123; &quot;token&quot;: &quot;jwt_token_here&quot; &#125;
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>Auth: Bearer JWT</span>
            <span className="font-mono text-indigo-600">P99 &lt; 20ms</span>
          </div>
        </div>
      ),
    },
    {
      icon: Calculator,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      title: "Back-of-the-Envelope Calculations",
      description:
        "Evaluate system scale like a Principal Architect. Compute Read/Write QPS, Daily Active Users (DAU), bandwidth, and annual storage estimates on the fly.",
      badge: "Scale Estimation",
      visual: (
        <div className="w-full h-36 rounded-xl border border-slate-100 bg-slate-50/70 p-3 grid grid-cols-2 gap-2 text-center font-sans">
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-center">
            <span className="text-[9px] font-bold uppercase text-slate-400">Peak QPS</span>
            <span className="text-base font-extrabold text-indigo-600 font-mono">14,200</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-center">
            <span className="text-[9px] font-bold uppercase text-slate-400">Storage / Mo</span>
            <span className="text-base font-extrabold text-purple-600 font-mono">3.8 TB</span>
          </div>
          <div className="col-span-2 text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            5M DAU with 10:1 Read/Write Ratio
          </div>
        </div>
      ),
    },
    {
      icon: Magnet,
      color: "text-rose-600 bg-rose-50 border-rose-200",
      title: "Subtle Elastic Magnetic Snapping",
      description:
        "Never struggle with messy diagrams. Smart magnetic guide lines subtly snap elements into perfect axial alignment with an elastic detent and zero glitching.",
      badge: "Precision Alignment",
      visual: (
        <div className="w-full h-36 rounded-xl border border-slate-100 bg-white p-3 relative flex items-center justify-center">
          {/* Snap Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-indigo-500 border-dashed" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-indigo-600 text-white text-[8px] font-bold font-mono">
            ALIGNED X
          </div>
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-16 h-12 rounded-lg bg-indigo-50 border-2 border-indigo-400 flex items-center justify-center text-[10px] font-bold text-indigo-900 shadow-xs">
              Box A
            </div>
            <div className="w-16 h-12 rounded-lg bg-indigo-50 border-2 border-indigo-400 flex items-center justify-center text-[10px] font-bold text-indigo-900 shadow-xs">
              Box B
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: GitBranch,
      color: "text-cyan-600 bg-cyan-50 border-cyan-200",
      title: "End-to-End Sequence Flow Step Markers",
      description:
        "Annotate complex user request flows across architecture tiers with sequential numbered badges (1, 2, 3...) to trace execution steps visually.",
      badge: "Flow Numbering",
      visual: (
        <div className="w-full h-36 rounded-xl border border-slate-100 bg-slate-50/60 p-3 flex items-center justify-between gap-1.5">
          <div className="flex-1 p-2 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
            <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-bold text-[9px] flex items-center justify-center mx-auto mb-1">1</span>
            <span className="text-[9px] font-bold text-slate-800">Client</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <div className="flex-1 p-2 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
            <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-bold text-[9px] flex items-center justify-center mx-auto mb-1">2</span>
            <span className="text-[9px] font-bold text-slate-800">Gateway</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <div className="flex-1 p-2 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
            <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-bold text-[9px] flex items-center justify-center mx-auto mb-1">3</span>
            <span className="text-[9px] font-bold text-slate-800">Database</span>
          </div>
        </div>
      ),
    },
    {
      icon: LayoutGrid,
      color: "text-teal-600 bg-teal-50 border-teal-200",
      title: "1-Click Topological Tier Auto-Layout",
      description:
        "Instantly organize messy diagrams into clean, logical architectural layers (Client Layer → API Gateway → Application Services → Cache → DB Tier).",
      badge: "Auto-Layout",
      visual: (
        <div className="w-full h-36 rounded-xl border border-slate-100 bg-white p-2.5 flex flex-col justify-between">
          <div className="h-6 rounded-lg bg-indigo-50 border border-indigo-200 text-[10px] font-bold text-indigo-700 flex items-center justify-center">
            Tier 1: Ingress & Edge
          </div>
          <div className="h-6 rounded-lg bg-purple-50 border border-purple-200 text-[10px] font-bold text-purple-700 flex items-center justify-center">
            Tier 2: Business Microservices
          </div>
          <div className="h-6 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 flex items-center justify-center">
            Tier 3: Persistence & Storage
          </div>
        </div>
      ),
    },
    {
      icon: Moon,
      color: "text-slate-700 bg-slate-100 border-slate-300",
      title: "Dark Mode Canvas & Keyboard Shortcuts",
      description:
        "Full midnight slate theme support tailored for low-light architecture reviews, paired with single-letter shortcuts (V, H, T, N, R, O, P, C, S, E) for speed.",
      badge: "Dark Theme & Hotkeys",
      visual: (
        <div className="w-full h-36 rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-indigo-400" /> Dark Canvas
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] font-mono text-slate-400">
              Active
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 font-mono text-xs">
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-indigo-300">V</span>
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-purple-300">T</span>
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-pink-300">R</span>
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-emerald-300">C</span>
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-amber-300">S</span>
          </div>
          <div className="text-[10px] text-slate-400 text-center font-mono">
            Zero-conflict single letter tool switches
          </div>
        </div>
      ),
    },
    {
      icon: Download,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      title: "Production Vector & PNG Export",
      description:
        "Export publication-ready vector SVGs and high-resolution PNGs directly from canvas layers, ready for technical design documents, RFCs, and GitHub READMEs.",
      badge: "SVG & PNG Export",
      visual: (
        <div className="w-full h-36 rounded-xl border border-slate-100 bg-white p-3 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-indigo-600" /> .PNG High-Res
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-indigo-600" /> .SVG Vector
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">
            Direct foreignObject to vector conversion
          </span>
        </div>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {features.map((feat, idx) => {
        const Icon = feat.icon
        return (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Visual Preview */}
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-center">
              {feat.visual}
            </div>

            {/* Description Info */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${feat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      {feat.badge}
                    </span>
                  </div>
                </div>

                <h3 className="font-comico text-lg font-bold text-slate-900 leading-snug mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
