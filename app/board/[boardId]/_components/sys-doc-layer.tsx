"use client"

import React, { memo, useState, useMemo } from "react"
import {
  DocLayer,
  DocType,
  RequirementItem,
  ApiEndpointItem,
  EstimationItem,
  BottleneckItem,
  SchemaColumnItem,
  SchemaDataType,
  SchemaKeyType,
  FlowStepItem,
  FlowProtocol,
} from "@/types/canvas"
import { useMutation } from "@liveblocks/react/suspense"
import { useCanvasTheme } from "./canvas-theme-context"
import {
  CheckSquare2,
  Globe,
  Calculator,
  AlertTriangle,
  Plus,
  Trash2,
  ChevronDown,
  Layers,
  ArrowRight,
  Flame,
  ShieldAlert,
  Database,
  Key,
  ListOrdered,
  Sparkles,
  Route,
} from "lucide-react"
import { nanoid } from "nanoid"

interface SysDocLayerProps {
  id: string
  layer: DocLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
  onDoubleClick?: (id: string) => void
}

const HTTP_METHODS: ("GET" | "POST" | "PUT" | "DELETE" | "PATCH")[] = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
]

const PRIORITIES: ("P0" | "P1" | "P2")[] = ["P0", "P1", "P2"]
const SEVERITIES: ("Critical" | "High" | "Medium")[] = ["Critical", "High", "Medium"]

const SCHEMA_DATA_TYPES: SchemaDataType[] = [
  "uuid",
  "varchar",
  "text",
  "bigint",
  "integer",
  "boolean",
  "timestamp",
  "jsonb",
  "float",
]

const SCHEMA_KEYS: SchemaKeyType[] = ["none", "PK", "FK", "UQ"]
const FLOW_PROTOCOLS: FlowProtocol[] = ["HTTPS", "gRPC", "WebSocket", "Kafka", "SQL", "Redis"]

export const SysDocLayer = memo(
  ({ id, layer, onPointerDown, selectionColor }: SysDocLayerProps) => {
    const { x, y, width, height, docType, title, itemsJson } = layer
    const { theme } = useCanvasTheme()
    const isDark = theme === "dark"

    const [activeTab, setActiveTab] = useState<string>("all")

    // Parse items from JSON safely
    const items = useMemo(() => {
      try {
        return itemsJson ? JSON.parse(itemsJson) : []
      } catch {
        return []
      }
    }, [itemsJson])

    // Liveblocks mutation to update items
    const updateItems = useMutation(
      ({ storage }, newItems: any[]) => {
        const liveLayers = storage.get("layers")
        const currentLayer = liveLayers.get(id)
        if (currentLayer) {
          ;(currentLayer as any).set("itemsJson", JSON.stringify(newItems))
        }
      },
      [id]
    )

    // Liveblocks mutation to update title
    const updateTitle = useMutation(
      ({ storage }, newTitle: string) => {
        const liveLayers = storage.get("layers")
        const currentLayer = liveLayers.get(id)
        if (currentLayer) {
          ;(currentLayer as any).set("title", newTitle)
        }
      },
      [id]
    )

    // Add row handlers
    const addRequirement = (type: "functional" | "non-functional") => {
      const currentList: RequirementItem[] = [...items]
      const newItem: RequirementItem = {
        id: nanoid(),
        type,
        text: type === "functional" ? "New functional requirement" : "New non-functional SLA",
        priority: "P0",
      }
      updateItems([...currentList, newItem])
    }

    const addApiEndpoint = () => {
      const currentList: ApiEndpointItem[] = [...items]
      const newItem: ApiEndpointItem = {
        id: nanoid(),
        method: "GET",
        path: "/api/v1/resource",
        description: "Fetch resource details",
        responseCode: "200",
      }
      updateItems([...currentList, newItem])
    }

    const addEstimation = () => {
      const currentList: EstimationItem[] = [...items]
      const newItem: EstimationItem = {
        id: nanoid(),
        metric: "Metric Name",
        value: "10,000",
        unit: "QPS / Day",
        notes: "Peak traffic estimate",
      }
      updateItems([...currentList, newItem])
    }

    const addBottleneck = () => {
      const currentList: BottleneckItem[] = [...items]
      const newItem: BottleneckItem = {
        id: nanoid(),
        component: "Component / Subsystem",
        risk: "Identified SPOF or capacity limitation",
        severity: "High",
        mitigation: "Sharding / caching / queue buffer mitigation",
      }
      updateItems([...currentList, newItem])
    }

    const addSchemaColumn = () => {
      const currentList: SchemaColumnItem[] = [...items]
      const newItem: SchemaColumnItem = {
        id: nanoid(),
        name: `column_${currentList.length + 1}`,
        dataType: "varchar",
        keyType: "none",
        isNullable: true,
      }
      updateItems([...currentList, newItem])
    }

    const addCommonAuditColumns = () => {
      const currentList: SchemaColumnItem[] = [...items]
      const newItems: SchemaColumnItem[] = [
        { id: nanoid(), name: "created_at", dataType: "timestamp", keyType: "none", isNullable: false },
        { id: nanoid(), name: "updated_at", dataType: "timestamp", keyType: "none", isNullable: false },
      ]
      updateItems([...currentList, ...newItems])
    }

    const addFlowStep = () => {
      const currentList: FlowStepItem[] = [...items]
      const stepNum = currentList.length + 1
      const newItem: FlowStepItem = {
        id: nanoid(),
        step: stepNum,
        from: `Service ${stepNum}`,
        to: `Target ${stepNum}`,
        protocol: "HTTPS",
        action: "Process payload or execute query",
      }
      updateItems([...currentList, newItem])
    }

    const removeItem = (itemId: string) => {
      const filtered = items.filter((item: any) => item.id !== itemId)
      updateItems(filtered)
    }

    const updateItemField = (itemId: string, field: string, val: any) => {
      const updated = items.map((item: any) => {
        if (item.id === itemId) {
          return { ...item, [field]: val }
        }
        return item
      })
      updateItems(updated)
    }

    // Config styling based on docType
    const config = useMemo(() => {
      switch (docType) {
        case "requirements":
          return {
            title: title || "System Requirements",
            icon: CheckSquare2,
            accent: "emerald",
            badgeColor: isDark ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-emerald-50 text-emerald-700 border-emerald-200",
            headerBg: isDark ? "from-emerald-950/40 via-slate-900/60 to-slate-900/90" : "from-emerald-50/70 via-white to-white",
          }
        case "api":
          return {
            title: title || "API Endpoints Specification",
            icon: Globe,
            accent: "indigo",
            badgeColor: isDark ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "bg-indigo-50 text-indigo-700 border-indigo-200",
            headerBg: isDark ? "from-indigo-950/40 via-slate-900/60 to-slate-900/90" : "from-indigo-50/70 via-white to-white",
          }
        case "estimation":
          return {
            title: title || "Back-of-the-Envelope Estimation",
            icon: Calculator,
            accent: "amber",
            badgeColor: isDark ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-amber-50 text-amber-700 border-amber-200",
            headerBg: isDark ? "from-amber-950/40 via-slate-900/60 to-slate-900/90" : "from-amber-50/70 via-white to-white",
          }
        case "schema":
          return {
            title: title || "users (Table Schema)",
            icon: Database,
            accent: "cyan",
            badgeColor: isDark ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : "bg-cyan-50 text-cyan-700 border-cyan-200",
            headerBg: isDark ? "from-cyan-950/40 via-slate-900/60 to-slate-900/90" : "from-cyan-50/70 via-white to-white",
          }
        case "flow":
          return {
            title: title || "Request Lifecycle & Data Flow",
            icon: ListOrdered,
            accent: "violet",
            badgeColor: isDark ? "bg-violet-500/20 text-violet-400 border-violet-500/30" : "bg-violet-50 text-violet-700 border-violet-200",
            headerBg: isDark ? "from-violet-950/40 via-slate-900/60 to-slate-900/90" : "from-violet-50/70 via-white to-white",
          }
        case "bottlenecks":
        default:
          return {
            title: title || "Bottlenecks & SPOF Analysis",
            icon: AlertTriangle,
            accent: "rose",
            badgeColor: isDark ? "bg-rose-500/20 text-rose-400 border-rose-500/30" : "bg-rose-50 text-rose-700 border-rose-200",
            headerBg: isDark ? "from-rose-950/40 via-slate-900/60 to-slate-900/90" : "from-rose-50/70 via-white to-white",
          }
      }
    }, [docType, title, isDark])

    const HeaderIcon = config.icon

    // Card background classes
    const cardBg = isDark
      ? "bg-slate-900/95 border-slate-800 text-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
      : "bg-white/95 border-slate-200 text-slate-900 shadow-xl shadow-slate-900/5"

    const rowBorder = isDark ? "border-slate-800/80 hover:bg-slate-800/40" : "border-slate-100 hover:bg-slate-50/70"
    const inputClass = isDark
      ? "bg-transparent text-slate-200 placeholder:text-slate-500 focus:bg-slate-800/80 focus:ring-1 focus:ring-indigo-400 rounded px-1.5 py-0.5 outline-none transition"
      : "bg-transparent text-slate-800 placeholder:text-slate-400 focus:bg-slate-100 focus:ring-1 focus:ring-indigo-500 rounded px-1.5 py-0.5 outline-none transition"

    return (
      <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          outline: selectionColor ? `2px solid ${selectionColor}` : "none",
          outlineOffset: "3px",
          borderRadius: "16px",
          overflow: "visible",
        }}
        className="cursor-move select-none"
      >
        <div
          className={`w-full h-full flex flex-col rounded-2xl border backdrop-blur-xl transition-all duration-150 overflow-hidden font-sans ${cardBg}`}
        >
          {/* ── CARD HEADER ── */}
          <div
            className={`px-3.5 py-2.5 border-b flex items-center justify-between bg-gradient-to-r ${config.headerBg} ${
              isDark ? "border-slate-800" : "border-slate-200/80"
            }`}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className={`p-1.5 rounded-lg border shadow-xs ${config.badgeColor}`}>
                <HeaderIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={title || config.title}
                onChange={(e) => updateTitle(e.target.value)}
                onPointerDown={(e) => e.stopPropagation()}
                className={`font-bold text-xs tracking-wide flex-1 min-w-0 ${inputClass}`}
              />
            </div>

            {/* Quick Badge / Filter */}
            <div className="flex items-center gap-1.5 pl-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${config.badgeColor}`}>
                {items.length} {docType === "api" ? "Routes" : docType === "requirements" ? "Items" : "Entries"}
              </span>
            </div>
          </div>

          {/* ── REQUIREMENTS FILTER TABS (FOR REQUIREMENTS DOC ONLY) ── */}
          {docType === "requirements" && (
            <div className={`px-3 py-1.5 border-b flex items-center gap-1 text-[11px] font-medium ${isDark ? "border-slate-800 bg-slate-900/60" : "border-slate-100 bg-slate-50/50"}`}>
              {["all", "functional", "non-functional"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`px-2 py-0.5 rounded-md capitalize transition ${
                    activeTab === tab
                      ? isDark
                        ? "bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30"
                        : "bg-white text-indigo-600 font-semibold border border-slate-200 shadow-2xs"
                      : isDark
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab === "all" ? `All (${items.length})` : tab}
                </button>
              ))}
            </div>
          )}

          {/* ── CARD BODY (SCROLLABLE TABLE) ── */}
          <div
            className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin text-xs"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* 1. REQUIREMENTS LIST */}
            {docType === "requirements" && (
              <div className="space-y-1">
                {items
                  .filter((item: RequirementItem) => (activeTab === "all" ? true : item.type === activeTab))
                  .map((item: RequirementItem) => {
                    const isFunc = item.type === "functional"
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-2 p-1.5 rounded-lg border transition group ${rowBorder}`}
                      >
                        {/* Type toggle */}
                        <button
                          onClick={() =>
                            updateItemField(
                              item.id,
                              "type",
                              isFunc ? "non-functional" : "functional"
                            )
                          }
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0 transition ${
                            isFunc
                              ? isDark
                                ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                                : "bg-indigo-50 text-indigo-700 border-indigo-200"
                              : isDark
                              ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                          }`}
                        >
                          {isFunc ? "Func" : "Non-Func"}
                        </button>

                        {/* Priority cycle */}
                        <button
                          onClick={() => {
                            const nextPriority =
                              item.priority === "P0" ? "P1" : item.priority === "P1" ? "P2" : "P0"
                            updateItemField(item.id, "priority", nextPriority)
                          }}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 transition ${
                            item.priority === "P0"
                              ? "bg-rose-500/15 text-rose-500 border-rose-500/30"
                              : item.priority === "P1"
                              ? "bg-amber-500/15 text-amber-500 border-amber-500/30"
                              : "bg-slate-500/15 text-slate-400 border-slate-500/30"
                          }`}
                        >
                          {item.priority || "P0"}
                        </button>

                        {/* Requirement Description */}
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => updateItemField(item.id, "text", e.target.value)}
                          placeholder="Requirement description..."
                          className={`flex-1 font-medium text-xs ${inputClass}`}
                        />

                        {/* Delete row */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )
                  })}
              </div>
            )}

            {/* 2. API ENDPOINTS LIST */}
            {docType === "api" && (
              <div className="space-y-1">
                {items.map((item: ApiEndpointItem) => {
                  const methodColors: Record<string, string> = {
                    GET: isDark ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-emerald-50 text-emerald-700 border-emerald-200",
                    POST: isDark ? "bg-blue-500/20 text-blue-300 border-blue-500/40" : "bg-blue-50 text-blue-700 border-blue-200",
                    PUT: isDark ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-amber-50 text-amber-700 border-amber-200",
                    DELETE: isDark ? "bg-rose-500/20 text-rose-300 border-rose-500/40" : "bg-rose-50 text-rose-700 border-rose-200",
                    PATCH: isDark ? "bg-purple-500/20 text-purple-300 border-purple-500/40" : "bg-purple-50 text-purple-700 border-purple-200",
                  }
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-2 p-1.5 rounded-lg border transition group ${rowBorder}`}
                    >
                      {/* Method selector */}
                      <button
                        onClick={() => {
                          const idx = HTTP_METHODS.indexOf(item.method)
                          const next = HTTP_METHODS[(idx + 1) % HTTP_METHODS.length]
                          updateItemField(item.id, "method", next)
                        }}
                        className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded border shrink-0 transition ${
                          methodColors[item.method] || methodColors.GET
                        }`}
                      >
                        {item.method}
                      </button>

                      {/* Path */}
                      <input
                        type="text"
                        value={item.path}
                        onChange={(e) => updateItemField(item.id, "path", e.target.value)}
                        placeholder="/api/v1/path"
                        className={`font-mono text-[11px] font-medium w-40 sm:w-48 shrink-0 ${inputClass}`}
                      />

                      {/* Description */}
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                        placeholder="Endpoint description..."
                        className={`flex-1 font-medium text-xs ${inputClass}`}
                      />

                      {/* Response status */}
                      <input
                        type="text"
                        value={item.responseCode || "200"}
                        onChange={(e) => updateItemField(item.id, "responseCode", e.target.value)}
                        placeholder="200"
                        className={`w-12 text-center font-mono text-[10px] font-semibold rounded border py-0.5 shrink-0 ${
                          isDark ? "border-slate-800 bg-slate-800/40 text-slate-300" : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      />

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* 3. ESTIMATIONS LIST */}
            {docType === "estimation" && (
              <div className="space-y-1">
                {items.map((item: EstimationItem) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border transition group ${rowBorder}`}
                  >
                    <input
                      type="text"
                      value={item.metric}
                      onChange={(e) => updateItemField(item.id, "metric", e.target.value)}
                      placeholder="Metric..."
                      className={`w-32 sm:w-40 font-semibold text-xs shrink-0 ${inputClass}`}
                    />
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateItemField(item.id, "value", e.target.value)}
                      placeholder="Value (e.g. 100M)"
                      className={`w-24 sm:w-28 font-mono text-xs font-bold shrink-0 text-amber-500 ${inputClass}`}
                    />
                    <input
                      type="text"
                      value={item.notes || ""}
                      onChange={(e) => updateItemField(item.id, "notes", e.target.value)}
                      placeholder="Notes / Calculation assumption..."
                      className={`flex-1 text-[11px] text-slate-500 ${inputClass}`}
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 4. BOTTLENECKS & SPOFS LIST */}
            {docType === "bottlenecks" && (
              <div className="space-y-1">
                {items.map((item: BottleneckItem) => {
                  const sevColors: Record<string, string> = {
                    Critical: isDark ? "bg-rose-500/20 text-rose-300 border-rose-500/40" : "bg-rose-50 text-rose-700 border-rose-200",
                    High: isDark ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-amber-50 text-amber-700 border-amber-200",
                    Medium: isDark ? "bg-sky-500/20 text-sky-300 border-sky-500/40" : "bg-sky-50 text-sky-700 border-sky-200",
                  }
                  return (
                    <div
                      key={item.id}
                      className={`p-2 rounded-lg border transition group space-y-1.5 ${rowBorder}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={item.component}
                          onChange={(e) => updateItemField(item.id, "component", e.target.value)}
                          placeholder="Subsystem / Component Bottleneck"
                          className={`font-bold text-xs flex-1 ${inputClass}`}
                        />
                        <button
                          onClick={() => {
                            const idx = SEVERITIES.indexOf(item.severity)
                            const next = SEVERITIES[(idx + 1) % SEVERITIES.length]
                            updateItemField(item.id, "severity", next)
                          }}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded border transition shrink-0 ${
                            sevColors[item.severity] || sevColors.High
                          }`}
                        >
                          {item.severity}
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-500 transition-opacity shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                        <div className={`p-1.5 rounded border flex flex-col gap-0.5 ${isDark ? "bg-slate-900/60 border-slate-800" : "bg-slate-50/80 border-slate-100"}`}>
                          <span className="text-[9px] font-semibold uppercase text-slate-400">Risk / Impact</span>
                          <input
                            type="text"
                            value={item.risk}
                            onChange={(e) => updateItemField(item.id, "risk", e.target.value)}
                            placeholder="Risk details..."
                            className={`w-full ${inputClass}`}
                          />
                        </div>
                        <div className={`p-1.5 rounded border flex flex-col gap-0.5 ${isDark ? "bg-indigo-950/20 border-indigo-900/30" : "bg-indigo-50/50 border-indigo-100"}`}>
                          <span className="text-[9px] font-semibold uppercase text-indigo-400">Mitigation</span>
                          <input
                            type="text"
                            value={item.mitigation}
                            onChange={(e) => updateItemField(item.id, "mitigation", e.target.value)}
                            placeholder="Architectural mitigation..."
                            className={`w-full ${inputClass}`}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* 5. DATABASE SCHEMA & ERD TABLE */}
            {docType === "schema" && (
              <div className="space-y-1">
                {/* Column header row */}
                <div
                  className={`grid grid-cols-[48px_1fr_90px_72px_24px] items-center px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                    isDark ? "bg-slate-950/60 text-slate-400" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <span>Key</span>
                  <span>Field Name</span>
                  <span>Type</span>
                  <span>Null</span>
                  <span />
                </div>

                {items.map((item: SchemaColumnItem) => {
                  const keyColors: Record<string, string> = {
                    PK: isDark ? "bg-amber-500/25 text-amber-300 border-amber-500/40" : "bg-amber-50 text-amber-800 border-amber-300",
                    FK: isDark ? "bg-cyan-500/25 text-cyan-300 border-cyan-500/40" : "bg-cyan-50 text-cyan-800 border-cyan-300",
                    UQ: isDark ? "bg-purple-500/25 text-purple-300 border-purple-500/40" : "bg-purple-50 text-purple-800 border-purple-300",
                    none: isDark ? "bg-slate-800/40 text-slate-400 border-slate-700/60" : "bg-slate-50 text-slate-400 border-slate-200",
                  }

                  return (
                    <div
                      key={item.id}
                      className={`grid grid-cols-[48px_1fr_90px_72px_24px] items-center gap-1.5 px-2 py-1 rounded-lg border transition group text-xs ${rowBorder}`}
                    >
                      {/* Key Chip Toggle */}
                      <button
                        onClick={() => {
                          const idx = SCHEMA_KEYS.indexOf(item.keyType || "none")
                          const next = SCHEMA_KEYS[(idx + 1) % SCHEMA_KEYS.length]
                          updateItemField(item.id, "keyType", next)
                        }}
                        title="Click to cycle PK (Primary Key), FK (Foreign Key), UQ (Unique), none"
                        className={`text-[9px] font-mono font-bold py-0.5 px-1 rounded border flex items-center justify-center transition shrink-0 ${
                          keyColors[item.keyType || "none"]
                        }`}
                      >
                        {item.keyType === "PK" ? "PK" : item.keyType === "FK" ? "FK" : item.keyType === "UQ" ? "UQ" : "—"}
                      </button>

                      {/* Field Name */}
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItemField(item.id, "name", e.target.value)}
                        placeholder="field_name"
                        className={`font-mono text-xs font-semibold ${inputClass}`}
                      />

                      {/* Data Type Selector */}
                      <button
                        onClick={() => {
                          const idx = SCHEMA_DATA_TYPES.indexOf(item.dataType || "varchar")
                          const next = SCHEMA_DATA_TYPES[(idx + 1) % SCHEMA_DATA_TYPES.length]
                          updateItemField(item.id, "dataType", next)
                        }}
                        title="Click to cycle data type"
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition truncate text-left ${
                          isDark
                            ? "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
                            : "bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {item.dataType || "varchar"}
                      </button>

                      {/* Nullable Toggle */}
                      <button
                        onClick={() => updateItemField(item.id, "isNullable", !item.isNullable)}
                        className={`text-[9px] font-semibold py-0.5 px-1 rounded border transition text-center shrink-0 ${
                          item.isNullable
                            ? isDark
                              ? "bg-sky-500/15 text-sky-400 border-sky-500/30"
                              : "bg-sky-50 text-sky-700 border-sky-200"
                            : isDark
                            ? "bg-slate-800/40 text-slate-400 border-slate-700/50"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {item.isNullable ? "NULL" : "NOT NULL"}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-500 transition-opacity shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* 6. REQUEST LIFECYCLE & DATA FLOW STEPS */}
            {docType === "flow" && (
              <div className="space-y-1">
                {/* Header Row */}
                <div
                  className={`grid grid-cols-[28px_140px_70px_1fr_24px] items-center px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                    isDark ? "bg-slate-950/60 text-slate-400" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <span>#</span>
                  <span>From ➔ To</span>
                  <span>Protocol</span>
                  <span>Action / Request</span>
                  <span />
                </div>

                {items.map((item: FlowStepItem, idx: number) => {
                  const protoColors: Record<string, string> = {
                    HTTPS: isDark ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-emerald-50 text-emerald-700 border-emerald-200",
                    gRPC: isDark ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40" : "bg-indigo-50 text-indigo-700 border-indigo-200",
                    WebSocket: isDark ? "bg-purple-500/20 text-purple-300 border-purple-500/40" : "bg-purple-50 text-purple-700 border-purple-200",
                    Kafka: isDark ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-amber-50 text-amber-700 border-amber-200",
                    SQL: isDark ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" : "bg-cyan-50 text-cyan-700 border-cyan-200",
                    Redis: isDark ? "bg-rose-500/20 text-rose-300 border-rose-500/40" : "bg-rose-50 text-rose-700 border-rose-200",
                  }

                  return (
                    <div
                      key={item.id}
                      className={`grid grid-cols-[28px_140px_70px_1fr_24px] items-center gap-1.5 px-2 py-1 rounded-lg border transition group text-xs ${rowBorder}`}
                    >
                      {/* Step Number Badge */}
                      <div className="w-5 h-5 rounded-full bg-violet-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs">
                        {idx + 1}
                      </div>

                      {/* From ➔ To */}
                      <div className="flex items-center gap-1 text-[11px] font-medium">
                        <input
                          type="text"
                          value={item.from}
                          onChange={(e) => updateItemField(item.id, "from", e.target.value)}
                          placeholder="Source"
                          className={`w-14 truncate ${inputClass}`}
                        />
                        <span className="text-slate-400">➔</span>
                        <input
                          type="text"
                          value={item.to}
                          onChange={(e) => updateItemField(item.id, "to", e.target.value)}
                          placeholder="Target"
                          className={`w-14 truncate ${inputClass}`}
                        />
                      </div>

                      {/* Protocol Chip */}
                      <button
                        onClick={() => {
                          const pIdx = FLOW_PROTOCOLS.indexOf(item.protocol || "HTTPS")
                          const next = FLOW_PROTOCOLS[(pIdx + 1) % FLOW_PROTOCOLS.length]
                          updateItemField(item.id, "protocol", next)
                        }}
                        title="Click to cycle protocol"
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded border transition text-center shrink-0 ${
                          protoColors[item.protocol || "HTTPS"] || protoColors.HTTPS
                        }`}
                      >
                        {item.protocol || "HTTPS"}
                      </button>

                      {/* Action / Request payload */}
                      <input
                        type="text"
                        value={item.action}
                        onChange={(e) => updateItemField(item.id, "action", e.target.value)}
                        placeholder="Action or query payload..."
                        className={`font-medium ${inputClass}`}
                      />

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-500 transition-opacity shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── CARD FOOTER (ADD ROW ACTION) ── */}
          <div
            className={`p-2 border-t flex items-center justify-between text-xs ${
              isDark ? "border-slate-800 bg-slate-900/60" : "border-slate-100 bg-slate-50/60"
            }`}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {docType === "requirements" && (
              <div className="flex items-center gap-1.5 w-full">
                <button
                  onClick={() => addRequirement("functional")}
                  className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-lg border text-xs font-semibold transition ${
                    isDark
                      ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
                      : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Functional</span>
                </button>
                <button
                  onClick={() => addRequirement("non-functional")}
                  className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-lg border text-xs font-semibold transition ${
                    isDark
                      ? "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
                      : "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Non-Functional</span>
                </button>
              </div>
            )}

            {docType === "api" && (
              <button
                onClick={addApiEndpoint}
                className={`w-full flex items-center justify-center gap-1.5 py-1 rounded-lg border text-xs font-semibold transition ${
                  isDark
                    ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
                    : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add API Endpoint</span>
              </button>
            )}

            {docType === "estimation" && (
              <button
                onClick={addEstimation}
                className={`w-full flex items-center justify-center gap-1.5 py-1 rounded-lg border text-xs font-semibold transition ${
                  isDark
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                    : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Metric / Calculation</span>
              </button>
            )}

            {docType === "bottlenecks" && (
              <button
                onClick={addBottleneck}
                className={`w-full flex items-center justify-center gap-1.5 py-1 rounded-lg border text-xs font-semibold transition ${
                  isDark
                    ? "border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                    : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Bottleneck & Mitigation</span>
              </button>
            )}

            {docType === "schema" && (
              <div className="flex items-center gap-1.5 w-full">
                <button
                  onClick={addSchemaColumn}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-lg border text-xs font-semibold transition ${
                    isDark
                      ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
                      : "border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Column</span>
                </button>
                <button
                  onClick={addCommonAuditColumns}
                  className={`flex items-center justify-center gap-1 py-1 px-2.5 rounded-lg border text-xs font-medium transition ${
                    isDark
                      ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-cyan-500" />
                  <span>+ Audit Fields</span>
                </button>
              </div>
            )}

            {docType === "flow" && (
              <button
                onClick={addFlowStep}
                className={`w-full flex items-center justify-center gap-1.5 py-1 rounded-lg border text-xs font-semibold transition ${
                  isDark
                    ? "border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20"
                    : "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Flow Step</span>
              </button>
            )}
          </div>
        </div>
      </foreignObject>
    )
  }
)

SysDocLayer.displayName = "SysDocLayer"
