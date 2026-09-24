"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Kanban,
  Network,
  Lightbulb,
  Layout,
  MousePointer2,
  Layers,
  Database,
  Sparkles,
} from "lucide-react"

export function WorkflowCanvases() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 1. Sprint Planning & Retrospectives */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Surface */}
        <div className="h-64 sm:h-72 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] p-6 overflow-hidden flex items-center justify-center border-b border-slate-100">
          {/* Columns Container */}
          <div className="w-full grid grid-cols-2 gap-4 max-w-sm">
            {/* Column 1: Went Well */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                Went Well
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl shadow-xs text-xs font-medium text-emerald-950 rotate-[-1deg]">
                Shipped multiplayer sync 🚀
                <div className="mt-1 flex items-center justify-between text-[10px] text-emerald-600 font-semibold">
                  <span>+5 upvotes</span>
                  <span>👍</span>
                </div>
              </div>
              <div className="p-2.5 bg-yellow-50 border border-yellow-200/80 rounded-xl shadow-xs text-xs font-medium text-yellow-950 rotate-[1deg]">
                Zero dropped frames
              </div>
            </div>

            {/* Column 2: To Improve */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                To Improve
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl shadow-xs text-xs font-medium text-amber-950 rotate-[2deg]">
                Batch export to SVG & PDF
                <div className="mt-1 text-[10px] text-amber-600 font-semibold">
                  Assigned: Design
                </div>
              </div>
            </div>
          </div>

          {/* Live Collaborator Cursor Dragging Item */}
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 right-10 flex items-center gap-1.5 pointer-events-none z-10"
          >
            <MousePointer2 className="w-4 h-4 text-indigo-600 fill-indigo-600 -rotate-45" />
            <span className="bg-indigo-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md font-sans">
              Ayush
            </span>
          </motion.div>
        </div>

        {/* Content Info */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Kanban className="w-5 h-5" />
              </div>
              <h3 className="font-comico text-xl font-bold text-slate-900">
                Sprint Planning & Retrospectives
              </h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Facilitate agile team ceremonies. Collect feedback on color-coded sticky notes, group similar items, and align on upcoming sprint deliverables together.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. System Architecture & Flowcharts */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Surface */}
        <div className="h-64 sm:h-72 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] p-6 overflow-hidden flex items-center justify-center border-b border-slate-100">
          {/* Architecture Diagram Nodes */}
          <div className="w-full max-w-sm flex items-center justify-between relative">
            {/* SVG Connecting Wire */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-0">
              <line
                x1="25%"
                y1="50%"
                x2="75%"
                y2="50%"
                stroke="#A855F7"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            </svg>

            {/* Node 1: Client */}
            <div className="relative z-10 p-3 bg-white border border-indigo-200 rounded-2xl shadow-sm text-center">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-1.5">
                <Layers className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-800">Next.js Client</p>
              <span className="text-[10px] text-indigo-600 font-medium font-sans">Multiplayer</span>
            </div>

            {/* Center Flow Indicator */}
            <div className="relative z-10 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[10px] font-semibold text-purple-700 shadow-xs font-sans">
              Realtime Sync
            </div>

            {/* Node 2: Database / Backend */}
            <div className="relative z-10 p-3 bg-white border border-emerald-200 rounded-2xl shadow-sm text-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-1.5">
                <Database className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-800">Convex DB</p>
              <span className="text-[10px] text-emerald-600 font-medium font-sans">Live State</span>
            </div>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-comico text-xl font-bold text-slate-900">
                System Architecture & Flowcharts
              </h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Map backend services, data pipelines, and database models. Sketch connections and walk teammates through complex technical workflows visually.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3. Brainstorming & Mind Mapping */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Surface */}
        <div className="h-64 sm:h-72 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] p-6 overflow-hidden flex items-center justify-center border-b border-slate-100">
          {/* Mind Map Nodes */}
          <div className="relative w-full max-w-sm h-full flex items-center justify-center">
            {/* SVG Connecting Branches */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 190 120 Q 120 70 80 50"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <path
                d="M 190 120 Q 280 60 310 50"
                fill="none"
                stroke="#A855F7"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <path
                d="M 190 120 Q 250 180 290 190"
                fill="none"
                stroke="#EC4899"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>

            {/* Central Node */}
            <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-lg text-center z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span className="font-comico font-bold text-xs">Planning Portal</span>
            </div>

            {/* Branch 1 */}
            <div className="absolute top-3 left-4 p-2 bg-amber-100 border border-amber-300 rounded-xl text-[11px] font-semibold text-amber-950 shadow-xs rotate-[-3deg]">
              Infinite Zoom 🔍
            </div>

            {/* Branch 2 */}
            <div className="absolute top-3 right-4 p-2 bg-purple-100 border border-purple-300 rounded-xl text-[11px] font-semibold text-purple-950 shadow-xs rotate-[3deg]">
              Vector Shapes 📐
            </div>

            {/* Branch 3 */}
            <div className="absolute bottom-4 right-6 p-2 bg-pink-100 border border-pink-300 rounded-xl text-[11px] font-semibold text-pink-950 shadow-xs rotate-[-2deg]">
              Live Org Invites 👥
            </div>

            {/* Collaborator Cursor */}
            <motion.div
              animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 right-20 flex items-center gap-1 z-20 pointer-events-none"
            >
              <MousePointer2 className="w-4 h-4 text-purple-600 fill-purple-600 -rotate-45" />
              <span className="bg-purple-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm font-sans">
                Sarah
              </span>
            </motion.div>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-comico text-xl font-bold text-slate-900">
                Brainstorming & Mind Mapping
              </h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Drop loose ideas onto an infinite surface without borders. Connect concepts, vote with sticky notes, and turn unstructured thoughts into clear roadmaps.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 4. UI Wireframing & Concept Sketching */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Surface */}
        <div className="h-64 sm:h-72 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] p-6 overflow-hidden flex items-center justify-center border-b border-slate-100">
          {/* Wireframe Mockup */}
          <div className="w-full max-w-xs bg-white border border-slate-300 rounded-xl shadow-md p-3">
            {/* Topbar */}
            <div className="h-4 border-b border-slate-200 pb-2 mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-12 h-1.5 rounded-full bg-slate-200" />
              </div>
              <span className="w-3 h-3 rounded-full bg-indigo-500" />
            </div>

            {/* Layout Body */}
            <div className="flex gap-2">
              {/* Sidebar */}
              <div className="w-12 h-20 bg-slate-50 border border-slate-200 rounded p-1 space-y-1">
                <div className="w-full h-1.5 bg-slate-200 rounded" />
                <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
                <div className="w-1/2 h-1.5 bg-slate-200 rounded" />
              </div>

              {/* Main Canvas Area */}
              <div className="flex-1 space-y-1.5">
                <div className="w-full h-9 bg-indigo-50/50 border border-indigo-200 border-dashed rounded flex items-center justify-center text-[10px] text-indigo-600 font-sans font-medium">
                  Board Canvas View
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="h-9 bg-slate-50 border border-slate-200 rounded" />
                  <div className="h-9 bg-slate-50 border border-slate-200 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Marker Annotation Callout */}
          <div className="absolute bottom-3 left-6 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-sans font-medium shadow-xs rotate-[-3deg] flex items-center gap-1">
            <span>✏️ Sticky Header (60px)</span>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="font-comico text-xl font-bold text-slate-900">
                UI Wireframing & Concept Sketching
              </h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Quickly block out screen layouts, modal interactions, and component structures with freehand drawing and basic shapes before implementation.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
