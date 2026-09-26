"use client"

import React, { useState } from "react"
import { SysComponent, DocType } from "@/types/canvas"
import { COMPONENT_LABELS, COMPONENT_COLORS, ComponentIcon } from "./sys-component-layer"
import { EXCALIDRAW_LIBRARY_ITEMS, EXCALIDRAW_PACKS } from "@/lib/excalidraw-library"
import {
  Network,
  Server,
  Layers,
  Search,
  X,
  CheckSquare2,
  Globe,
  Calculator,
  Database,
  Shapes,
} from "lucide-react"
import { useCanvasTheme } from "./canvas-theme-context"

export type ArchitectureSpace = "components" | "excalidraw" | "tables" | "specs" | "templates"

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
    label: "NoSQL, Vector & Graph",
    items: [
      SysComponent.MongoDB,
      SysComponent.NoSQLDB,
      SysComponent.VectorDB,
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
  icon: React.ElementType
}

const TEMPLATES: ArchitectureTemplate[] = [
  {
    id: "three-tier",
    name: "Classic 3-Tier Web Application",
    icon: Network,
  },
  {
    id: "microservices",
    name: "Event-Driven Microservices",
    icon: Layers,
  },
  {
    id: "cdn-caching",
    name: "Global CDN & Edge Compute",
    icon: Server,
  },
]

export interface SpecItem {
  id: DocType
  name: string
  badge: string
  icon: React.ElementType
  color: "emerald" | "indigo" | "amber" | "cyan"
}

// ─── SPACE 2: DATA MODELING & TABLES ──────────────────────────────────────────
export const TABLE_SPECS: SpecItem[] = [
  {
    id: "schema",
    name: "Database Schema & ERD",
    badge: "SQL / Relational",
    icon: Database,
    color: "cyan",
  },
  {
    id: "nosql-schema",
    name: "Document Collection Schema",
    badge: "NoSQL / MongoDB",
    icon: Database,
    color: "emerald",
  },
  {
    id: "functional-requirements",
    name: "Functional Requirements",
    badge: "Requirements",
    icon: CheckSquare2,
    color: "emerald",
  },
  {
    id: "non-functional-requirements",
    name: "Non-Functional Requirements",
    badge: "SLAs & Quality",
    icon: CheckSquare2,
    color: "indigo",
  },
  {
    id: "api",
    name: "API Endpoints Specification",
    badge: "RESTful Endpoints",
    icon: Globe,
    color: "indigo",
  },
  {
    id: "estimation",
    name: "Capacity & Estimation",
    badge: "Scale & Sizing",
    icon: Calculator,
    color: "amber",
  },
]

// ─── SPACE 3: SYSTEM ARCHITECTURE SPECS ───────────────────────────────────────
export const ARCHITECTURE_SPECS: SpecItem[] = [
  {
    id: "functional-requirements",
    name: "Functional Requirements",
    badge: "Requirements",
    icon: CheckSquare2,
    color: "emerald",
  },
  {
    id: "non-functional-requirements",
    name: "Non-Functional Requirements",
    badge: "SLAs & Quality",
    icon: CheckSquare2,
    color: "indigo",
  },
  {
    id: "api",
    name: "API Endpoints Specification",
    badge: "RESTful Endpoints",
    icon: Globe,
    color: "indigo",
  },
  {
    id: "estimation",
    name: "Capacity & Estimation",
    badge: "Scale & Sizing",
    icon: Calculator,
    color: "amber",
  },
]

interface ComponentLibraryProps {
  onSelect: (type: SysComponent, customLabel?: string, iconSvg?: string) => void
  onSelectTemplate?: (templateId: "three-tier" | "microservices" | "cdn-caching") => void
  onSelectDoc?: (docType: DocType) => void
  isOpen: boolean
  onClose: () => void
  activeSpace: ArchitectureSpace
  onSpaceChange?: (space: ArchitectureSpace) => void
}

export function ComponentLibrary({
  onSelect,
  onSelectTemplate,
  onSelectDoc,
  isOpen,
  onClose,
  activeSpace,
}: ComponentLibraryProps) {
  const [search, setSearch] = useState("")
  const [selectedPack, setSelectedPack] = useState<string>("All")
  const { theme } = useCanvasTheme()
  const isDark = theme === "dark"

  if (!isOpen) return null

  const containerBg = isDark
    ? "bg-slate-900/95 border-slate-800 text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
    : "bg-white/95 border-neutral-200 text-neutral-800 shadow-2xl"

  const headerBg = isDark
    ? "border-slate-800 bg-slate-900/90"
    : "border-neutral-100 bg-neutral-50/80"

  const cardBorder = isDark
    ? "border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/40 bg-slate-900/40"
    : "border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/40 bg-white"

  const renderBadge = (color: SpecItem["color"]) => {
    return {
      emerald: isDark ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-emerald-50 text-emerald-700 border-emerald-200",
      indigo: isDark ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "bg-indigo-50 text-indigo-700 border-indigo-200",
      amber: isDark ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-amber-50 text-amber-700 border-amber-200",
      cyan: isDark ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : "bg-cyan-50 text-cyan-700 border-cyan-200",
    }[color]
  }

  return (
    <div
      className={`absolute right-14 top-1/2 -translate-y-1/2 z-50 w-64 sm:w-72 rounded-2xl border flex flex-col overflow-hidden select-none animate-in fade-in slide-in-from-right-4 duration-150 backdrop-blur-xl ${containerBg}`}
      style={{ maxHeight: "86vh" }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Header — Shows only current active space and item count */}
      <div className={`flex items-center justify-between px-3 py-2.5 border-b shrink-0 ${headerBg}`}>
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs font-bold tracking-wide truncate">
            {activeSpace === "components" && "Components"}
            {activeSpace === "excalidraw" && "Excalidraw Icons"}
            {activeSpace === "tables" && "Tables"}
            {activeSpace === "specs" && "Specifications"}
            {activeSpace === "templates" && "Templates"}
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-indigo-500/15 text-indigo-400 rounded-full border border-indigo-500/30 shrink-0">
            {activeSpace === "components" && "49"}
            {activeSpace === "excalidraw" && `${EXCALIDRAW_LIBRARY_ITEMS.length}`}
            {activeSpace === "tables" && "6"}
            {activeSpace === "specs" && "4"}
            {activeSpace === "templates" && "3"}
          </span>
        </div>
        <button
          onClick={onClose}
          className={`w-5 h-5 flex items-center justify-center rounded-md transition-colors shrink-0 ${
            isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── SPACE 1: ARCHITECTURE COMPONENTS ── */}
      {activeSpace === "components" && (
        <>
          {/* Search Box */}
          <div className="px-2.5 py-2 border-b border-neutral-100 dark:border-slate-800/60 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components..."
                className={`w-full pl-8 pr-7 py-1 text-xs rounded-lg border outline-none transition-colors ${
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
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable list with categorized groups and compact rectangular rows */}
          <div className="overflow-y-auto flex-1 p-2 space-y-2.5 [scrollbar-width:none]">
            {LIBRARY_GROUPS.map((group) => {
              const filtered = group.items.filter(
                (item) =>
                  !search ||
                  COMPONENT_LABELS[item]?.toLowerCase().includes(search.toLowerCase()) ||
                  item.toLowerCase().includes(search.toLowerCase())
              )

              if (filtered.length === 0) return null

              return (
                <div key={group.label} className="space-y-1">
                  <div className={`text-[10px] font-bold uppercase tracking-wider px-1 ${isDark ? "text-slate-400" : "text-neutral-400"}`}>
                    {group.label}
                  </div>
                  <div className="space-y-1">
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
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.setData("application/json", JSON.stringify({ type: "sys-component", componentType: item }))
                            e.dataTransfer.effectAllowed = "copy"
                          }}
                          onClick={() => {
                            onSelect(item)
                            onClose()
                          }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg border text-left transition-all cursor-grab active:cursor-grabbing group ${
                            isDark
                              ? "border-slate-800 bg-slate-800/40 hover:bg-slate-800 hover:border-slate-700 text-slate-200"
                              : "border-neutral-200 hover:border-indigo-300 hover:bg-indigo-50/50 bg-white"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${colors.badge}`}>
                            <ComponentIcon type={item} color={colors.icon} />
                          </div>
                          <span className="text-[11px] font-medium leading-tight truncate">
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

          <div className={`px-2.5 py-1.5 border-t text-[10px] text-center shrink-0 ${isDark ? "border-slate-800 text-slate-500 bg-slate-900/60" : "border-neutral-100 text-neutral-400 bg-neutral-50/50"}`}>
            Drag or click to place component on canvas
          </div>
        </>
      )}

      {/* ── SPACE 2: EXCALIDRAW / DRAW.IO ICONS ── */}
      {activeSpace === "excalidraw" && (
        <>
          {/* Search Box */}
          <div className="px-2.5 py-2 border-b border-neutral-100 dark:border-slate-800/60 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Excalidraw icons..."
                className={`w-full pl-8 pr-7 py-1 text-xs rounded-lg border outline-none transition-colors ${
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
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Pack Filter Pills */}
          <div className="px-2.5 py-1.5 border-b border-neutral-100 dark:border-slate-800/60 flex items-center gap-1 overflow-x-auto [scrollbar-width:none] shrink-0">
            {EXCALIDRAW_PACKS.map((pack) => {
              const isSelected = selectedPack === pack
              return (
                <button
                  key={pack}
                  type="button"
                  onClick={() => setSelectedPack(pack)}
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-full whitespace-nowrap transition-colors shrink-0 ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-xs"
                      : isDark
                      ? "bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {pack}
                </button>
              )
            })}
          </div>

          {/* Grid of Excalidraw vector icons */}
          <div className="overflow-y-auto flex-1 p-2 [scrollbar-width:none]">
            <div className="grid grid-cols-2 gap-2">
              {EXCALIDRAW_LIBRARY_ITEMS.filter((item) => {
                const matchesPack = selectedPack === "All" || item.pack === selectedPack
                const matchesSearch =
                  !search ||
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.category.toLowerCase().includes(search.toLowerCase()) ||
                  item.pack.toLowerCase().includes(search.toLowerCase())
                return matchesPack && matchesSearch
              }).map((item) => (
                <div
                  key={item.id}
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "application/json",
                      JSON.stringify({
                        type: "sys-component",
                        componentType: item.componentType,
                        customLabel: item.name,
                        iconSvg: item.svg,
                      })
                    )
                    e.dataTransfer.effectAllowed = "copy"
                  }}
                  onClick={() => {
                    onSelect(item.componentType, item.name, item.svg)
                    onClose()
                  }}
                  className={`p-2 rounded-xl border cursor-grab active:cursor-grabbing transition-all group flex flex-col items-center text-center gap-1.5 shadow-2xs hover:scale-[1.02] active:scale-[0.98] ${cardBorder}`}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center p-1 rounded-lg bg-slate-100 dark:bg-slate-800/70 overflow-hidden shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 transition-colors [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                  <div className="min-w-0 w-full">
                    <span className="text-[11px] font-semibold leading-tight group-hover:text-indigo-500 transition-colors block truncate">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-neutral-400 dark:text-slate-500 block truncate">
                      {item.pack}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`px-2.5 py-1.5 border-t text-[10px] text-center shrink-0 ${
              isDark
                ? "border-slate-800 text-slate-500 bg-slate-900/60"
                : "border-neutral-100 text-neutral-400 bg-neutral-50/50"
            }`}
          >
            Drag or click to place icon on canvas
          </div>
        </>
      )}

      {/* ── SPACE 3: DATA MODELING & TABLES ── */}
      {activeSpace === "tables" && (
        <div className="overflow-y-auto flex-1 p-2 space-y-1.5 [scrollbar-width:none]">
          <div className={`text-[10px] font-medium px-1 mb-1 ${isDark ? "text-slate-400" : "text-neutral-500"}`}>
            Database & System Tables:
          </div>

          {TABLE_SPECS.map((spec) => {
            const Icon = spec.icon
            const badgeClasses = renderBadge(spec.color)

            return (
              <div
                key={spec.id}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData("application/json", JSON.stringify({ type: "sys-doc", docType: spec.id }))
                  e.dataTransfer.effectAllowed = "copy"
                }}
                onClick={() => {
                  onSelectDoc?.(spec.id)
                  onClose()
                }}
                className={`p-2 rounded-xl border cursor-grab active:cursor-grabbing transition-all group flex items-center justify-between gap-2 shadow-2xs ${cardBorder}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${badgeClasses}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold leading-tight group-hover:text-indigo-500 transition-colors block truncate">
                      {spec.name}
                    </span>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border inline-block mt-0.5 ${badgeClasses}`}>
                      {spec.badge}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-indigo-500 group-hover:underline shrink-0">
                  Add Table →
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* ── SPACE 3: SYSTEM ARCHITECTURE SPECS ── */}
      {activeSpace === "specs" && (
        <div className="overflow-y-auto flex-1 p-2 space-y-1.5 [scrollbar-width:none]">
          <div className={`text-[10px] font-medium px-1 mb-1 ${isDark ? "text-slate-400" : "text-neutral-500"}`}>
            System Specifications:
          </div>

          {ARCHITECTURE_SPECS.map((spec) => {
            const Icon = spec.icon
            const badgeClasses = renderBadge(spec.color)

            return (
              <div
                key={spec.id}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData("application/json", JSON.stringify({ type: "sys-doc", docType: spec.id }))
                  e.dataTransfer.effectAllowed = "copy"
                }}
                onClick={() => {
                  onSelectDoc?.(spec.id)
                  onClose()
                }}
                className={`p-2 rounded-xl border cursor-grab active:cursor-grabbing transition-all group flex items-center justify-between gap-2 shadow-2xs ${cardBorder}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${badgeClasses}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold leading-tight group-hover:text-indigo-500 transition-colors block truncate">
                      {spec.name}
                    </span>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border inline-block mt-0.5 ${badgeClasses}`}>
                      {spec.badge}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-indigo-500 group-hover:underline shrink-0">
                  Add Table →
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* ── SPACE 4: ARCHITECTURE TEMPLATES ── */}
      {activeSpace === "templates" && (
        <div className="overflow-y-auto flex-1 p-2 space-y-1.5 [scrollbar-width:none]">
          <div className={`text-[10px] font-medium px-1 mb-1 ${isDark ? "text-slate-400" : "text-neutral-400"}`}>
            Production Blueprints:
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
                className={`p-2.5 rounded-xl border cursor-pointer transition-all group flex items-center justify-between gap-2 shadow-2xs ${cardBorder}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-500 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-semibold truncate group-hover:text-indigo-500 transition-colors">
                    {tpl.name}
                  </h4>
                </div>
                <button
                  type="button"
                  className="px-2 py-1 text-[10px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shrink-0"
                >
                  Load Architecture
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
