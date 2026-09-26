"use client"

import Link from "next/link"
import { ArrowLeft, Layout, Compass, RefreshCw } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #334155 1px, transparent 1px),
            linear-gradient(to bottom, #334155 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Subtle Luminous Radial Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        {/* Technical Status Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-semibold tracking-wider uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          HTTP 404 // NODE NOT FOUND
        </div>

        {/* Schematic Architectural Diagram of Disconnected Node */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-6 mb-8 relative shadow-2xl">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-800 pb-2 mb-4">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              TOPOLOGY_STATUS
            </span>
            <span className="text-red-400/90">DISCONNECTED</span>
          </div>

          <div className="flex items-center justify-between py-4 px-2">
            {/* Source Node */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Layout className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-slate-400">Cluster Root</span>
            </div>

            {/* Severed Connection Wire */}
            <div className="flex-1 px-4 flex flex-col items-center">
              <div className="w-full relative flex items-center justify-center">
                <div className="w-full h-[2px] border-b-2 border-dashed border-red-500/40" />
                <span className="absolute px-2 bg-slate-900 text-[10px] font-mono text-red-400 border border-red-500/30">
                  NULL_REF
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-2">Target Unreachable</span>
            </div>

            {/* Target 404 Node */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 bg-red-950/40 border border-red-500/50 border-dashed flex items-center justify-center text-red-400">
                <span className="text-sm font-bold font-mono">404</span>
              </div>
              <span className="text-[10px] font-mono text-red-400">Missing Node</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Architecture Node Not Found
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
          The board, document, or diagram element you are navigating to has been relocated, unlinked, or does not exist in this workspace.
        </p>

        {/* Action Buttons with sharp edges */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-150 border border-indigo-500 active:scale-[0.98] shadow-lg shadow-indigo-600/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Dashboard
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-sm transition-all duration-150 border border-slate-700 active:scale-[0.98]"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
        </div>

        {/* Monospace Metadata Footer */}
        <div className="mt-12 text-[10px] font-mono text-slate-600 uppercase tracking-widest flex items-center gap-3">
          <span>SYS_ID: ERR_404</span>
          <span>•</span>
          <span>WHITEBOARD PROTOCOL V2</span>
        </div>
      </div>
    </main>
  )
}
