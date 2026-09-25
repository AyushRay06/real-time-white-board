"use client"

import React, { useState } from "react"
import { SysComponent, DocType } from "@/types/canvas"
import { COMPONENT_LABELS, COMPONENT_COLORS, ComponentIcon } from "./sys-component-layer"
import {
  Network,
  Server,
  Layers,
  Search,
  X,
  CheckSquare2,
  Globe,
  Calculator,
  AlertTriangle,
  Database,
  ListOrdered,
} from "lucide-react"
import { useCanvasTheme } from "./canvas-theme-context"

export type ArchitectureSpace = "components" | "tables" | "specs" | "templates"

const LIBRARY_GROUPS: { label: string; items: SysComponent[] }[] = [
  {
    label: "Clients & Ingress",
    items: [
      SysComponent.WebClient,
      SysComponent.MobileClient,
      SysComponent.IoTDevice,
      SysComponent.DesktopClient,
    ],
  },
  {
    label: "Networking & Gateways",
    items: [
      SysComponent.DNS,
      SysComponent.CDN,
      SysComponent.LoadBalancer,
      SysComponent.APIGateway,
      SysComponent.ReverseProxy,
      SysComponent.FirewallWAF,
      SysComponent.RateLimiter,
    ],
  },
  {
    label: "Compute & Services",
    items: [
      SysComponent.Server,
      SysComponent.Microservice,
      SysComponent.Serverless,
      SysComponent.Docker,
      SysComponent.Kubernetes,
      SysComponent.WorkerService,
      SysComponent.CronScheduler,
      SysComponent.ServiceDiscovery,
    ],
  },
  {
    label: "Relational & SQL DBs",
    items: [
      SysComponent.Database,
      SysComponent.PrimaryDB,
      SysComponent.ReplicaDB,
      SysComponent.ShardedDB,
      SysComponent.DistributedSQL,
    ],
  },
  {
    label: "NoSQL & Graph Stores",
    items: [
      SysComponent.NoSQLDB,
      SysComponent.Cassandra,
      SysComponent.GraphDB,
      SysComponent.TimeSeriesDB,
    ],
  },
  {
    label: "Caching & In-Memory",
    items: [
      SysComponent.Cache,
      SysComponent.DistributedCache,
    ],
  },
  {
    label: "Queues & Streaming",
    items: [
      SysComponent.MessageQueue,
      SysComponent.EventStreaming,
      SysComponent.PubSub,
      SysComponent.DeadLetterQueue,
    ],
  },
  {
    label: "Storage & File Systems",
    items: [
      SysComponent.ObjectStorage,
      SysComponent.BlockStorage,
      SysComponent.FileSystem,
    ],
  },
  {
    label: "Search & Big Data",
    items: [
      SysComponent.SearchEngine,
      SysComponent.DataWarehouse,
      SysComponent.DataLake,
      SysComponent.StreamProcessing,
      SysComponent.BatchProcessing,
    ],
  },
  {
    label: "Security & Observability",
    items: [
      SysComponent.AuthService,
      SysComponent.SecretManager,
      SysComponent.Monitoring,
      SysComponent.LogAggregator,
      SysComponent.DistributedTracing,
    ],
  },
]

export interface ArchitectureTemplate {
  id: "three-tier" | "microservices" | "cdn-caching"
  name: string
  description: string
  icon: React.ElementType
}

const TEMPLATES: ArchitectureTemplate[] = [
  {
    id: "three-tier",
    name: "Classic 3-Tier Web App",
    description: "Client → DNS → Load Balancer → 2 Servers → Primary DB, Replica & Cache",
    icon: Network,
  },
  {
    id: "microservices",
    name: "Event-Driven Microservices",
    description: "Client → API Gateway → Microservices → Message Queue → Worker → Database",
    icon: Layers,
  },
  {
    id: "cdn-caching",
    name: "Global CDN & Edge Compute",
    description: "Web/Mobile → Cloud CDN → Serverless API → Distributed Cache & DB",
    icon: Server,
  },
]

export interface SpecItem {
  id: DocType
  category: string
  name: string
  badge: string
  description: string
  icon: React.ElementType
  color: "emerald" | "indigo" | "amber" | "rose" | "cyan" | "violet"
}

// ─── SPACE 2: DATA MODELING & TABLES ──────────────────────────────────────────
export const TABLE_SPECS: SpecItem[] = [
  {
    id: "schema",
    category: "Entity Relation Diagram",
    name: "Database Schema & ERD Table",
    badge: "PostgreSQL / MySQL / SQLite",
    description: "Table with Primary [PK], Foreign [FK], Unique [UQ] keys, SQL types, and FK relation connectors.",
    icon: Database,
    color: "cyan",
  },
  {
    id: "flow",
    category: "Execution Flow",
    name: "Numbered Sequence & Data Flow",
    badge: "Request Pipeline",
    description: "Ordered step-by-step request flow (Client → Gateway → Services → DB) with protocol chips.",
    icon: ListOrdered,
    color: "violet",
  },
]

// ─── SPACE 3: SYSTEM ARCHITECTURE SPECS & ESTIMATIONS ─────────────────────────
export const ARCHITECTURE_SPECS: SpecItem[] = [
  {
    id: "requirements",
    category: "System Scope",
    name: "Requirements Matrix",
    badge: "Functional & Non-Functional",
    description: "Ready-made matrix with P0/P1/P2 priorities, functional scope & non-functional SLAs.",
    icon: CheckSquare2,
    color: "emerald",
  },
  {
    id: "api",
    category: "API Interface",
    name: "API Endpoints Specification",
    badge: "RESTful Endpoints",
    description: "HTTP routes table with GET/POST/PUT/DELETE badges, URL paths & response status codes.",
    icon: Globe,
    color: "indigo",
  },
  {
    id: "estimation",
    category: "Scale & Capacity",
    name: "Capacity & Estimations",
    badge: "Back-of-the-Envelope",
    description: "Capacity calculations for DAU, Read/Write throughput QPS, daily data storage & cache RAM.",
    icon: Calculator,
    color: "amber",
  },
  {
    id: "bottlenecks",
    category: "Reliability & SPOF",
    name: "Bottlenecks & Mitigations",
    badge: "Failure Mode Analysis",
    description: "Deep dive failure mode assessment, single points of failure & architectural mitigations.",
    icon: AlertTriangle,
    color: "rose",
  },
]

interface ComponentLibraryProps {
  onSelect: (type: SysComponent) => void
  onSelectTemplate?: (templateId: "three-tier" | "microservices" | "cdn-caching") => void
  onSelectDoc?: (docType: DocType) => void
  isOpen: boolean
  onClose: () => void
  activeSpace: ArchitectureSpace
  onSpaceChange: (space: ArchitectureSpace) => void
}

export function ComponentLibrary({
  onSelect,
  onSelectTemplate,
  onSelectDoc,
  isOpen,
  onClose,
  activeSpace,
  onSpaceChange,
}: ComponentLibraryProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const { theme } = useCanvasTheme()
  const isDark = theme === "dark"

  if (!isOpen) return null

  const categories = ["All", ...LIBRARY_GROUPS.map((g) => g.label)]

  const containerBg = isDark
    ? "bg-slate-900/90 border-slate-800 text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
    : "bg-white/90 border-neutral-200 text-neutral-800 shadow-2xl"

  const headerBg = isDark
    ? "border-slate-800 bg-slate-900/80"
    : "border-neutral-100 bg-neutral-50/70"

  const tabContainerBg = isDark ? "bg-slate-800/60" : "bg-neutral-100/70"
  const tabActiveBg = isDark ? "bg-slate-700 text-indigo-400 shadow-xs" : "bg-white text-indigo-600 shadow-xs"
  const tabInactiveColor = isDark ? "text-slate-400 hover:text-slate-200" : "text-neutral-500 hover:text-neutral-800"

  const cardBorder = isDark
    ? "border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/40 bg-slate-900/40"
    : "border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/40 bg-white"

  const renderBadge = (color: SpecItem["color"]) => {
    return {
      emerald: isDark ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-emerald-50 text-emerald-700 border-emerald-200",
      indigo: isDark ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "bg-indigo-50 text-indigo-700 border-indigo-200",
      amber: isDark ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-amber-50 text-amber-700 border-amber-200",
      rose: isDark ? "bg-rose-500/20 text-rose-400 border-rose-500/30" : "bg-rose-50 text-rose-700 border-rose-200",
      cyan: isDark ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : "bg-cyan-50 text-cyan-700 border-cyan-200",
      violet: isDark ? "bg-violet-500/20 text-violet-400 border-violet-500/30" : "bg-violet-50 text-violet-700 border-violet-200",
    }[color]
  }

  return (
    <div
      className={`absolute right-14 top-1/2 -translate-y-1/2 z-50 w-84 md:w-92 rounded-2xl border flex flex-col overflow-hidden select-none animate-in fade-in slide-in-from-right-4 duration-150 backdrop-blur-xl ${containerBg}`}
      style={{ maxHeight: "86vh" }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-3.5 py-2.5 border-b ${headerBg}`}>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold tracking-wide">
            {activeSpace === "components" && "Architecture Components"}
            {activeSpace === "tables" && "Data Modeling & Tables"}
            {activeSpace === "specs" && "System Design Specs"}
            {activeSpace === "templates" && "Architecture Templates"}
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">
            {activeSpace === "components" && "47 Items"}
            {activeSpace === "tables" && "2 Tables"}
            {activeSpace === "specs" && "4 Specs"}
            {activeSpace === "templates" && "3 Blueprints"}
          </span>
        </div>
        <button
          onClick={onClose}
          className={`w-5 h-5 flex items-center justify-center rounded-md transition-colors ${
            isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Distinct Space Tabs Switcher */}
      <div className={`grid grid-cols-4 p-1 m-2 rounded-xl text-[11px] font-semibold ${tabContainerBg}`}>
        <button
          onClick={() => onSpaceChange("components")}
          className={`py-1 rounded-lg transition-all text-center ${
            activeSpace === "components" ? tabActiveBg : tabInactiveColor
          }`}
        >
          Components
        </button>
        <button
          onClick={() => onSpaceChange("tables")}
          className={`py-1 rounded-lg transition-all text-center ${
            activeSpace === "tables" ? tabActiveBg : tabInactiveColor
          }`}
        >
          Tables
        </button>
        <button
          onClick={() => onSpaceChange("specs")}
          className={`py-1 rounded-lg transition-all text-center ${
            activeSpace === "specs" ? tabActiveBg : tabInactiveColor
          }`}
        >
          Specs
        </button>
        <button
          onClick={() => onSpaceChange("templates")}
          className={`py-1 rounded-lg transition-all text-center ${
            activeSpace === "templates" ? tabActiveBg : tabInactiveColor
          }`}
        >
          Templates
        </button>
      </div>

      {/* ── SPACE 1: ARCHITECTURE COMPONENTS ── */}
      {activeSpace === "components" && (
        <>
          {/* Search Box */}
          <div className="px-2.5 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components (Kafka, Redis, S3)..."
                className={`w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border outline-none transition-colors ${
                  isDark
                    ? "border-slate-800 bg-slate-800/60 text-slate-100 focus:border-indigo-500 focus:bg-slate-800"
                    : "border-neutral-200 bg-neutral-50 focus:border-indigo-400 focus:bg-white"
                }`}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Chips Bar */}
          {!search && (
            <div className="flex gap-1 overflow-x-auto px-2.5 pb-2 scrollbar-none text-[10px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-full whitespace-nowrap transition-colors font-medium ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white font-semibold"
                      : isDark
                      ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Scrollable list */}
          <div className="overflow-y-auto flex-1 px-2.5 pb-2 space-y-3 [scrollbar-width:none]">
            {LIBRARY_GROUPS.map((group) => {
              if (selectedCategory !== "All" && selectedCategory !== group.label && !search) {
                return null
              }

              const filtered = group.items.filter(
                (item) =>
                  !search ||
                  COMPONENT_LABELS[item]?.toLowerCase().includes(search.toLowerCase()) ||
                  item.toLowerCase().includes(search.toLowerCase())
              )

              if (filtered.length === 0) return null

              return (
                <div key={group.label}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider px-1 mb-1.5 ${isDark ? "text-slate-400" : "text-neutral-400"}`}>
                    {group.label}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {filtered.map((item) => {
                      const colors = COMPONENT_COLORS[item] || {
                        border: "border-slate-300",
                        badge: "bg-slate-100 text-slate-700",
                        text: "text-slate-800",
                        icon: "text-slate-600",
                      }
                      const label = COMPONENT_LABELS[item] || item

                      return (
                        <button
                          key={item}
                          onClick={() => {
                            onSelect(item)
                            onClose()
                          }}
                          className={`flex items-center gap-1.5 p-1.5 rounded-xl border text-left transition-all group ${
                            isDark
                              ? "border-slate-800 bg-slate-800/40 hover:bg-slate-800 hover:border-slate-700 text-slate-200"
                              : "border-neutral-200 hover:border-indigo-300 hover:bg-indigo-50/50 bg-white"
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${colors.badge}`}>
                            <ComponentIcon type={item} color={colors.icon} />
                          </div>
                          <span className="text-[11px] font-medium leading-tight line-clamp-2">
                            {label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className={`px-3 py-2 border-t text-[10px] text-center ${isDark ? "border-slate-800 text-slate-500 bg-slate-900/60" : "border-neutral-100 text-neutral-400 bg-neutral-50/50"}`}>
            Click component, then click canvas to place
          </div>
        </>
      )}

      {/* ── SPACE 2: DATA MODELING & TABLES ── */}
      {activeSpace === "tables" && (
        <div className="overflow-y-auto flex-1 p-3 space-y-2.5 [scrollbar-width:none]">
          <div className={`text-[10px] font-medium mb-1 ${isDark ? "text-slate-400" : "text-neutral-500"}`}>
            Ready-made database schema & execution flow tables:
          </div>

          {TABLE_SPECS.map((spec) => {
            const Icon = spec.icon
            const badgeClasses = renderBadge(spec.color)

            return (
              <div
                key={spec.id}
                onClick={() => {
                  onSelectDoc?.(spec.id)
                  onClose()
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all group shadow-2xs ${cardBorder}`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${badgeClasses}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold leading-tight group-hover:text-indigo-500 transition-colors">
                      {spec.name}
                    </span>
                  </div>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${isDark ? "bg-slate-800/80 text-slate-400 border-slate-700" : "bg-slate-100 text-slate-600 border-slate-200"}`}>
                    {spec.category}
                  </span>
                </div>

                <p className={`text-[11px] leading-snug mb-2 ${isDark ? "text-slate-400" : "text-neutral-500"}`}>
                  {spec.description}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-dashed border-neutral-200/50">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${badgeClasses}`}>
                    {spec.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-500 group-hover:underline">
                    Add Table →
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── SPACE 3: SYSTEM ARCHITECTURE SPECS ── */}
      {activeSpace === "specs" && (
        <div className="overflow-y-auto flex-1 p-3 space-y-2.5 [scrollbar-width:none]">
          <div className={`text-[10px] font-medium mb-1 ${isDark ? "text-slate-400" : "text-neutral-500"}`}>
            System design specifications & scale calculation matrices:
          </div>

          {ARCHITECTURE_SPECS.map((spec) => {
            const Icon = spec.icon
            const badgeClasses = renderBadge(spec.color)

            return (
              <div
                key={spec.id}
                onClick={() => {
                  onSelectDoc?.(spec.id)
                  onClose()
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all group shadow-2xs ${cardBorder}`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${badgeClasses}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold leading-tight group-hover:text-indigo-500 transition-colors">
                      {spec.name}
                    </span>
                  </div>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${isDark ? "bg-slate-800/80 text-slate-400 border-slate-700" : "bg-slate-100 text-slate-600 border-slate-200"}`}>
                    {spec.category}
                  </span>
                </div>

                <p className={`text-[11px] leading-snug mb-2 ${isDark ? "text-slate-400" : "text-neutral-500"}`}>
                  {spec.description}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-dashed border-neutral-200/50">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${badgeClasses}`}>
                    {spec.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-500 group-hover:underline">
                    Add Spec →
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── SPACE 4: ARCHITECTURE TEMPLATES ── */}
      {activeSpace === "templates" && (
        <div className="overflow-y-auto flex-1 p-3 space-y-2.5 [scrollbar-width:none]">
          <div className={`text-[10px] font-medium mb-1 ${isDark ? "text-slate-400" : "text-neutral-400"}`}>
            Instantly load production blueprints with smart placement:
          </div>
          {TEMPLATES.map((tpl) => {
            const Icon = tpl.icon
            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate?.(tpl.id)
                  onClose()
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all group shadow-2xs ${cardBorder}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold group-hover:text-indigo-500 transition-colors">
                    {tpl.name}
                  </h4>
                </div>
                <p className={`text-[11px] leading-snug ${isDark ? "text-slate-400" : "text-neutral-500"}`}>
                  {tpl.description}
                </p>
                <div className="mt-2 text-right">
                  <span className="text-[10px] font-semibold text-indigo-500 group-hover:underline">
                    Load Architecture →
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
