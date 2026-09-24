"use client"

import React, { useState } from "react"
import { SysComponent } from "@/types/canvas"
import { COMPONENT_LABELS, COMPONENT_COLORS, ComponentIcon } from "./sys-component-layer"
import { Network, Server, Layers, Search, X } from "lucide-react"

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

interface ComponentLibraryProps {
  onSelect: (type: SysComponent) => void
  onSelectTemplate?: (templateId: "three-tier" | "microservices" | "cdn-caching") => void
  isOpen: boolean
  onClose: () => void
}

export function ComponentLibrary({ onSelect, onSelectTemplate, isOpen, onClose }: ComponentLibraryProps) {
  const [activeTab, setActiveTab] = useState<"components" | "templates">("components")
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  if (!isOpen) return null

  const lowerSearch = search.toLowerCase()

  const categories = ["All", ...LIBRARY_GROUPS.map((g) => g.label)]

  return (
    <div
      className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden select-none animate-in fade-in zoom-in-95 duration-100"
      style={{ maxHeight: "84vh" }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-neutral-100 bg-neutral-50/70">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-neutral-800 tracking-wide">System Architecture</span>
          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-100 text-indigo-700 rounded-full">
            47 Components
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-100 p-1 bg-neutral-100/70 m-2 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setActiveTab("components")}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === "components"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Components
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === "templates"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Templates
        </button>
      </div>

      {activeTab === "components" ? (
        <>
          {/* Search Box */}
          <div className="px-2.5 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components (e.g. Kafka, Redis, S3)..."
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-neutral-200 bg-neutral-50 outline-none focus:border-indigo-400 focus:bg-white transition-colors"
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
                      ? "bg-indigo-600 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Scrollable list */}
          <div className="overflow-y-auto flex-1 px-2.5 pb-2 space-y-3">
            {LIBRARY_GROUPS.map((group) => {
              if (selectedCategory !== "All" && selectedCategory !== group.label && !search) {
                return null
              }

              const filtered = group.items.filter(
                (item) =>
                  !lowerSearch ||
                  (COMPONENT_LABELS[item] && COMPONENT_LABELS[item].toLowerCase().includes(lowerSearch)) ||
                  item.toLowerCase().includes(lowerSearch)
              )
              if (!filtered.length) return null

              return (
                <div key={group.label}>
                  <div className="flex items-center justify-between px-0.5 mb-1.5">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      {group.label}
                    </span>
                    <span className="text-[9px] font-semibold text-neutral-400">
                      {filtered.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {filtered.map((type) => {
                      const theme = COMPONENT_COLORS[type] || { bg: "#EFF6FF", badge: "#DBEAFE", icon: "#2563EB", text: "#1E40AF", border: "#93C5FD" }
                      const label = COMPONENT_LABELS[type] || type

                      return (
                        <button
                          key={type}
                          onClick={() => onSelect(type)}
                          className="flex flex-col items-center gap-1 py-2 px-1.5 rounded-xl border border-neutral-100 hover:border-indigo-300 hover:bg-neutral-50 transition-all cursor-pointer group shadow-2xs text-left"
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                            style={{ background: theme.bg, border: `1.5px solid ${theme.border}` }}
                          >
                            <svg viewBox="0 0 32 32" width={22} height={22}>
                              <ComponentIcon type={type} color={theme.icon} />
                            </svg>
                          </div>
                          <span
                            className="text-[10px] font-semibold text-center leading-tight truncate w-full"
                            style={{ color: theme.icon }}
                          >
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

          <div className="px-3 py-2 border-t border-neutral-100 text-[10px] text-neutral-400 text-center bg-neutral-50/50">
            Click component, then click canvas to place
          </div>
        </>
      ) : (
        <div className="overflow-y-auto flex-1 p-3 space-y-2.5">
          <div className="text-[10px] font-medium text-neutral-400 mb-1">
            Instantly load full production architectures onto your canvas:
          </div>
          {TEMPLATES.map((tpl) => {
            const Icon = tpl.icon
            return (
              <div
                key={tpl.id}
                onClick={() => onSelectTemplate?.(tpl.id)}
                className="p-3 rounded-xl border border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/40 cursor-pointer transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors">
                    {tpl.name}
                  </h4>
                </div>
                <p className="text-[11px] text-neutral-500 leading-snug">
                  {tpl.description}
                </p>
                <div className="mt-2 text-right">
                  <span className="text-[10px] font-semibold text-indigo-600 group-hover:underline">
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
