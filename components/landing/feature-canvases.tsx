"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Users,
  PenTool,
  Move,
  Cloud,
  MousePointer2,
  Check,
  RotateCw,
} from "lucide-react"

export function FeatureCanvases() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* 1. Real-Time Collaboration */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Viewport */}
        <div className="h-60 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:14px_14px] p-4 overflow-hidden flex items-center justify-center border-b border-slate-100">
          {/* Sticky note */}
          <div className="w-40 p-3 bg-amber-100 border border-amber-200 shadow-md rounded-xl rotate-[-2deg] text-xs font-medium text-amber-950">
            Sync architecture RFC with backend team ⚡️
          </div>

          {/* Cursor 1: Ayush */}
          <motion.div
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-12 flex items-center gap-1 z-10 pointer-events-none"
          >
            <MousePointer2 className="w-4 h-4 text-indigo-600 fill-indigo-600 -rotate-45" />
            <span className="bg-indigo-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
              Ayush
            </span>
          </motion.div>

          {/* Cursor 2: Sarah */}
          <motion.div
            animate={{ x: [0, -25, 15, 0], y: [0, 20, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-8 right-16 flex items-center gap-1 z-10 pointer-events-none"
          >
            <MousePointer2 className="w-4 h-4 text-pink-600 fill-pink-600 -rotate-45" />
            <span className="bg-pink-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
              Sarah
            </span>
          </motion.div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-comico text-lg font-bold text-slate-900">
                Real-Time Collaboration
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Work simultaneously with teammates on the exact same board with sub-second cursor updates and instant multiplayer edits.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. Whiteboard Drawing & Shapes */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Viewport */}
        <div className="h-60 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:14px_14px] p-4 overflow-hidden flex items-center justify-center border-b border-slate-100">
          {/* SVG Strokes & Shapes */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
            {/* Freehand scribble */}
            <path
              d="M 50 140 Q 90 60 140 100 T 230 80"
              fill="none"
              stroke="#A855F7"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Geometric Rectangle */}
            <rect
              x="60"
              y="50"
              width="80"
              height="60"
              rx="8"
              fill="rgba(99, 102, 241, 0.08)"
              stroke="#6366F1"
              strokeWidth="2"
            />
            {/* Circle */}
            <circle
              cx="195"
              cy="125"
              r="35"
              fill="rgba(236, 72, 153, 0.08)"
              stroke="#EC4899"
              strokeWidth="2"
            />
          </svg>

          {/* Floating Color Palette */}
          <div className="absolute bottom-3 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-md flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 ring-2 ring-indigo-200" />
            <span className="w-3.5 h-3.5 rounded-full bg-purple-500" />
            <span className="w-3.5 h-3.5 rounded-full bg-pink-500" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600">
                <PenTool className="w-4 h-4" />
              </div>
              <h3 className="font-comico text-lg font-bold text-slate-900">
                Whiteboard Drawing & Shapes
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Express ideas freely with freehand drawing pen, sticky notes, rectangles, ellipses, text blocks, and custom palettes.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3. Organizations & Workspaces */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Viewport */}
        <div className="h-60 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:14px_14px] p-5 flex flex-col justify-center gap-2.5 border-b border-slate-100">
          {/* Board card item 1 */}
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 font-bold text-xs flex items-center justify-center">
                📐
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">System Architecture</p>
                <p className="text-[10px] text-slate-400">Edited 2 hours ago</p>
              </div>
            </div>
            <span className="text-xs text-amber-500">★</span>
          </div>

          {/* Board card item 2 */}
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 font-bold text-xs flex items-center justify-center">
                ⚡
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">API Gateway Design</p>
                <p className="text-[10px] text-slate-400">Edited yesterday</p>
              </div>
            </div>
            <span className="text-xs text-amber-500">★</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Cloud className="w-4 h-4" />
              </div>
              <h3 className="font-comico text-lg font-bold text-slate-900">
                Personal Dashboard & Favourites
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              All your boards in one clean, minimal dashboard. Search instantly, star your favourite canvases, and open your ideas with zero friction.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 4. Instant Link Sharing */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Viewport */}
        <div className="h-60 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:14px_14px] p-5 flex items-center justify-center border-b border-slate-100">
          <div className="w-full max-w-[240px] bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-md">
            <p className="text-xs font-bold text-slate-900 mb-2">Share Board Link</p>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                readOnly
                value="board.app/board/xyz-789"
                className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Link Copied
              </span>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
                Live Access
              </span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-comico text-lg font-bold text-slate-900">
                Instant Link Collaboration
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Collaborate seamlessly by sharing your board link. Anyone with the URL can join with real-time live cursors and sub-second sync.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 5. Select, Move & Transform */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Viewport */}
        <div className="h-60 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:14px_14px] p-4 flex items-center justify-center border-b border-slate-100">
          {/* Transformed Box with Bounding Handles */}
          <div className="relative border-2 border-indigo-500 border-dashed rounded-xl p-4 bg-indigo-50/20 shadow-sm">
            <div className="w-32 h-16 bg-white border border-slate-200 rounded-lg shadow-xs flex items-center justify-center text-xs font-medium text-slate-700">
              Transform Element
            </div>

            {/* Corner Handles */}
            <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-xs" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-xs" />
            <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-xs" />
            <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-xs" />

            {/* Rotation Handle */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border border-indigo-500 rounded-full flex items-center justify-center text-indigo-600 shadow-xs">
              <RotateCw className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Move className="w-4 h-4" />
              </div>
              <h3 className="font-comico text-lg font-bold text-slate-900">
                Select, Move & Transform
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Easily multi-select, drag, resize, rotate, and arrange sticky notes and shapes across an unbounded open canvas.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 6. Instant Cloud Sync */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
      >
        {/* Canvas Viewport */}
        <div className="h-60 relative bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:14px_14px] p-5 flex flex-col items-center justify-center gap-3 border-b border-slate-100">
          <div className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-slate-800">Auto-saved to cloud</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">v2.4</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 font-mono">v2.5 (Current)</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Cloud className="w-4 h-4" />
              </div>
              <h3 className="font-comico text-lg font-bold text-slate-900">
                Instant Cloud Sync
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              All strokes, shapes, and notes are automatically saved and synced so you never lose work or have to click save.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
