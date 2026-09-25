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
  Database,
  ListOrdered,
  Sparkles,
  Link2,
} from "lucide-react"
import { nanoid } from "nanoid"
import { colorToCss, colorToRgba } from "@/lib/utils"

interface SysDocLayerProps {
  id: string
  layer: DocLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
  onDoubleClick?: (id: string) => void
  isConnecting?: boolean
  isConnectingFrom?: boolean
  onConnectClick?: (id: string) => void
  onStartRelationConnect?: (id: string, fieldName: string) => void
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

const BASE_DIMENSIONS: Record<DocType, { width: number; height: number }> = {
  schema: { width: 460, height: 360 },
  estimation: { width: 480, height: 360 },
  requirements: { width: 520, height: 380 },
  bottlenecks: { width: 540, height: 380 },
  api: { width: 540, height: 360 },
  flow: { width: 540, height: 360 },
}

export const SysDocLayer = memo(
  ({
    id,
    layer,
    onPointerDown,
    selectionColor,
    isConnecting,
    isConnectingFrom,
    onConnectClick,
    onStartRelationConnect,
  }: SysDocLayerProps) => {
    const { x, y, width, height, docType, title, itemsJson, fill } = layer
    const { theme } = useCanvasTheme()
    const isDark = theme === "dark"

    const baseWidth = BASE_DIMENSIONS[docType]?.width || 480
    const scale = Math.max(0.2, width / baseWidth)

    const [activeTab, setActiveTab] = useState<string>("all")

    // Parse items safely
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
          const rowHeight = docType === "bottlenecks" ? 40 : docType === "api" || docType === "flow" ? 38 : 34
          const headerHeight = 44
          const tabsHeight = docType === "requirements" ? 36 : 0
          const footerHeight = 42
          const naturalBaseH = Math.max(
            BASE_DIMENSIONS[docType]?.height || 360,
            headerHeight + tabsHeight + newItems.length * rowHeight + footerHeight
          )
          const currentScale = ((currentLayer as any).get("width") || baseWidth) / baseWidth
          ;(currentLayer as any).set("height", Math.round(naturalBaseH * currentScale))
        }
      },
      [id, docType, baseWidth]
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
        text: type === "functional" ? "New requirement description" : "New SLA threshold",
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
        description: "Resource description",
        responseCode: "200",
      }
      updateItems([...currentList, newItem])
    }

    const addEstimation = () => {
      const currentList: EstimationItem[] = [...items]
      const newItem: EstimationItem = {
        id: nanoid(),
        metric: "Metric name",
        value: "10,000",
        unit: "req/s",
        notes: "Peak traffic estimate",
      }
      updateItems([...currentList, newItem])
    }

    const addBottleneck = () => {
      const currentList: BottleneckItem[] = [...items]
      const newItem: BottleneckItem = {
        id: nanoid(),
        component: "Subsystem bottleneck",
        risk: "Potential failure mode",
        severity: "High",
        mitigation: "Mitigation architecture",
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
        isNullable: false,
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
        to: `Service ${stepNum + 1}`,
        protocol: "HTTPS",
        action: "Request or payload",
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

    // Dynamic accent color: bound to user-selected color from toolbar palette!
    const customAccent = fill ? colorToCss(fill) : null
    const customRgba = fill ? colorToRgba(fill, isDark ? 0.22 : 0.12) : null

    // Base config styling per docType
    const config = useMemo(() => {
      switch (docType) {
        case "requirements":
          return {
            title: title || "Requirements Matrix",
            icon: CheckSquare2,
            typeLabel: "Requirements",
            defaultAccent: "#10b981",
            defaultRgba: isDark ? "rgba(16, 185, 129, 0.18)" : "rgba(16, 185, 129, 0.10)",
          }
        case "api":
          return {
            title: title || "API Endpoints",
            icon: Globe,
            typeLabel: "Endpoints",
            defaultAccent: "#6366f1",
            defaultRgba: isDark ? "rgba(99, 102, 241, 0.18)" : "rgba(99, 102, 241, 0.10)",
          }
        case "estimation":
          return {
            title: title || "Capacity Estimations",
            icon: Calculator,
            typeLabel: "Estimations",
            defaultAccent: "#f59e0b",
            defaultRgba: isDark ? "rgba(245, 158, 11, 0.18)" : "rgba(245, 158, 11, 0.10)",
          }
        case "schema":
          return {
            title: title || "users",
            icon: Database,
            typeLabel: "Table Schema",
            defaultAccent: "#06b6d4",
            defaultRgba: isDark ? "rgba(6, 182, 212, 0.18)" : "rgba(6, 182, 212, 0.10)",
          }
        case "flow":
          return {
            title: title || "Request Flow",
            icon: ListOrdered,
            typeLabel: "Data Flow",
            defaultAccent: "#8b5cf6",
            defaultRgba: isDark ? "rgba(139, 92, 246, 0.18)" : "rgba(139, 92, 246, 0.10)",
          }
        case "bottlenecks":
        default:
          return {
            title: title || "Bottlenecks & Mitigations",
            icon: AlertTriangle,
            typeLabel: "Bottlenecks",
            defaultAccent: "#f43f5e",
            defaultRgba: isDark ? "rgba(244, 63, 94, 0.18)" : "rgba(244, 63, 94, 0.10)",
          }
      }
    }, [docType, title, isDark])

    const accentColor = customAccent || config.defaultAccent
    const accentRgba = customRgba || config.defaultRgba
    const HeaderIcon = config.icon

    // Card styling: translucent glassmorphism
    const cardBg = isDark
      ? "bg-slate-900/80 backdrop-blur-xl text-slate-100 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
      : "bg-white/80 backdrop-blur-xl text-slate-900 shadow-[0_16px_40px_rgba(0,0,0,0.08)]"

    const rowDivider = isDark ? "border-slate-800/60" : "border-slate-100"
    const inputSeamless = "bg-transparent outline-none transition-colors"

    const handlePointerDown = (e: React.PointerEvent) => {
      if (isConnecting) {
        e.stopPropagation()
        onConnectClick?.(id)
      } else {
        onPointerDown(e, id)
      }
    }

    return (
      <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        onPointerDown={handlePointerDown}
        style={{
          outline: isConnectingFrom
            ? "3px solid #6366f1"
            : selectionColor
            ? `2px solid ${selectionColor}`
            : "none",
          outlineOffset: "3px",
          borderRadius: `${14 * scale}px`,
          overflow: "visible",
          cursor: isConnecting ? "crosshair" : "default",
        }}
        className="select-none"
      >
        <div
          style={{
            width: `${baseWidth}px`,
            height: `${Math.round(height / scale)}px`,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            borderColor: accentColor ? `${accentColor}85` : isDark ? "rgba(51, 65, 85, 0.8)" : "rgba(226, 232, 240, 0.9)",
            borderWidth: "1.5px",
            borderStyle: "solid",
            boxShadow: accentColor
              ? `0 0 20px ${accentColor}18, 0 16px 40px rgba(0,0,0,${isDark ? "0.55" : "0.08"})`
              : isDark
              ? "0 16px 40px rgba(0,0,0,0.55)"
              : "0 16px 40px rgba(0,0,0,0.08)",
          }}
          className={`flex flex-col rounded-xl transition-all duration-150 overflow-hidden font-sans ${cardBg} ${
            isConnectingFrom ? "ring-2 ring-indigo-500 shadow-[0_0_24px_rgba(99,102,241,0.35)]" : ""
          }`}
        >
          {/* ── CARD HEADER (Clean, Uncluttered, Flat, Uniform Border) ── */}
          <div
            className={`px-3 py-2 border-b flex items-center justify-between gap-2 shrink-0 ${
              isDark ? "border-slate-800/80 bg-slate-900/50" : "border-slate-200/80 bg-slate-100/60"
            }`}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div
                style={{ color: accentColor, backgroundColor: accentRgba }}
                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 border border-current/20"
              >
                <HeaderIcon className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={title || config.title}
                onChange={(e) => updateTitle(e.target.value)}
                onPointerDown={(e) => e.stopPropagation()}
                className={`font-mono text-xs font-bold flex-1 min-w-0 ${inputSeamless} hover:underline focus:underline text-slate-900 dark:text-slate-100`}
                placeholder="Title..."
              />
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span
                style={{ color: accentColor }}
                className="text-[10px] font-mono font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-slate-500/10"
              >
                {config.typeLabel}
              </span>
              <span className={`text-[10px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                ({items.length})
              </span>
            </div>
          </div>

          {/* ── REQUIREMENTS TABS (Only for requirements) ── */}
          {docType === "requirements" && (
            <div className={`px-3 py-1 border-b flex items-center gap-1 text-[11px] shrink-0 ${rowDivider}`}>
              {["all", "functional", "non-functional"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`px-2 py-0.5 rounded capitalize transition font-medium ${
                    activeTab === tab
                      ? "bg-slate-500/15 text-slate-900 dark:text-white font-bold"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {/* ── CARD BODY (FLAT TABULAR LIST - NO SCROLLBARS) ── */}
          <div
            className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* 1. REQUIREMENTS FLAT LIST */}
            {docType === "requirements" &&
              items
                .filter((item: RequirementItem) => activeTab === "all" || item.type === activeTab)
                .map((item: RequirementItem) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-slate-500/5 transition-colors group"
                  >
                    {/* Priority Toggle Chip */}
                    <button
                      onClick={() => {
                        const idx = PRIORITIES.indexOf(item.priority || "P0")
                        const next = PRIORITIES[(idx + 1) % PRIORITIES.length]
                        updateItemField(item.id, "priority", next)
                      }}
                      className={`text-[9px] font-bold font-mono px-1 py-0.5 rounded shrink-0 ${
                        item.priority === "P0"
                          ? "bg-rose-500/15 text-rose-500"
                          : item.priority === "P1"
                          ? "bg-amber-500/15 text-amber-500"
                          : "bg-blue-500/15 text-blue-500"
                      }`}
                    >
                      {item.priority || "P0"}
                    </button>

                    <button
                      onClick={() =>
                        updateItemField(
                          item.id,
                          "type",
                          item.type === "functional" ? "non-functional" : "functional"
                        )
                      }
                      className="text-[9px] font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0 uppercase"
                    >
                      {item.type === "functional" ? "func" : "non-func"}
                    </button>

                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateItemField(item.id, "text", e.target.value)}
                      placeholder="Requirement scope..."
                      className={`flex-1 text-xs text-slate-800 dark:text-slate-200 ${inputSeamless}`}
                    />

                    <button
                      onClick={() => removeItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-500 transition-opacity shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

            {/* 2. API ENDPOINTS FLAT LIST */}
            {docType === "api" &&
              items.map((item: ApiEndpointItem) => {
                const methodColors: Record<string, string> = {
                  GET: "text-emerald-500 bg-emerald-500/10",
                  POST: "text-blue-500 bg-blue-500/10",
                  PUT: "text-amber-500 bg-amber-500/10",
                  DELETE: "text-rose-500 bg-rose-500/10",
                  PATCH: "text-purple-500 bg-purple-500/10",
                }

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-slate-500/5 transition-colors group"
                  >
                    <button
                      onClick={() => {
                        const idx = HTTP_METHODS.indexOf(item.method)
                        const next = HTTP_METHODS[(idx + 1) % HTTP_METHODS.length]
                        updateItemField(item.id, "method", next)
                      }}
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        methodColors[item.method] || methodColors.GET
                      }`}
                    >
                      {item.method}
                    </button>

                    <input
                      type="text"
                      value={item.path}
                      onChange={(e) => updateItemField(item.id, "path", e.target.value)}
                      placeholder="/api/v1/..."
                      className={`font-mono text-xs font-semibold w-40 text-slate-900 dark:text-slate-100 shrink-0 ${inputSeamless}`}
                    />

                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItemField(item.id, "description", e.target.value)}
                      placeholder="Route description..."
                      className={`flex-1 text-xs text-slate-500 dark:text-slate-400 truncate ${inputSeamless}`}
                    />

                    <input
                      type="text"
                      value={item.responseCode || "200"}
                      onChange={(e) => updateItemField(item.id, "responseCode", e.target.value)}
                      className={`font-mono text-[10px] text-slate-400 w-9 text-right shrink-0 ${inputSeamless}`}
                    />

                    <button
                      onClick={() => removeItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-500 transition-opacity shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )
              })}

            {/* 3. CAPACITY ESTIMATION FLAT LIST */}
            {docType === "estimation" &&
              items.map((item: EstimationItem) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 px-3 py-1.5 text-xs hover:bg-slate-500/5 transition-colors group"
                >
                  <input
                    type="text"
                    value={item.metric}
                    onChange={(e) => updateItemField(item.id, "metric", e.target.value)}
                    placeholder="Metric"
                    className={`flex-1 font-medium text-slate-800 dark:text-slate-200 ${inputSeamless}`}
                  />
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => updateItemField(item.id, "value", e.target.value)}
                    placeholder="Value"
                    className={`font-mono text-xs font-bold text-amber-500 w-24 text-right shrink-0 ${inputSeamless}`}
                  />
                  <input
                    type="text"
                    value={item.notes || ""}
                    onChange={(e) => updateItemField(item.id, "notes", e.target.value)}
                    placeholder="Notes"
                    className={`w-32 text-[11px] text-slate-400 truncate text-right shrink-0 ${inputSeamless}`}
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-500 transition-opacity shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

            {/* 4. BOTTLENECKS FLAT LIST */}
            {docType === "bottlenecks" &&
              items.map((item: BottleneckItem) => {
                const sevColors: Record<string, string> = {
                  Critical: "text-rose-500 bg-rose-500/10",
                  High: "text-amber-500 bg-amber-500/10",
                  Medium: "text-sky-500 bg-sky-500/10",
                }

                return (
                  <div
                    key={item.id}
                    className="px-3 py-2 text-xs hover:bg-slate-500/5 transition-colors group space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={item.component}
                        onChange={(e) => updateItemField(item.id, "component", e.target.value)}
                        placeholder="Bottleneck component"
                        className={`font-semibold text-slate-900 dark:text-slate-100 flex-1 ${inputSeamless}`}
                      />
                      <button
                        onClick={() => {
                          const idx = SEVERITIES.indexOf(item.severity)
                          const next = SEVERITIES[(idx + 1) % SEVERITIES.length]
                          updateItemField(item.id, "severity", next)
                        }}
                        className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded shrink-0 ${
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
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <input
                        type="text"
                        value={item.risk}
                        onChange={(e) => updateItemField(item.id, "risk", e.target.value)}
                        placeholder="Risk impact..."
                        className={`flex-1 text-slate-500 dark:text-slate-400 truncate ${inputSeamless}`}
                      />
                      <span>→</span>
                      <input
                        type="text"
                        value={item.mitigation}
                        onChange={(e) => updateItemField(item.id, "mitigation", e.target.value)}
                        placeholder="Mitigation..."
                        className={`flex-1 font-medium text-indigo-500 dark:text-indigo-400 truncate ${inputSeamless}`}
                      />
                    </div>
                  </div>
                )
              })}

            {/* 5. DATABASE SCHEMA & ERD TABLE (Sleek Flat Rows + FK Relation Link) */}
            {docType === "schema" &&
              items.map((item: SchemaColumnItem) => {
                const keyColors: Record<string, string> = {
                  PK: "bg-amber-500/15 text-amber-500 font-bold",
                  FK: "bg-cyan-500/15 text-cyan-500 font-bold",
                  UQ: "bg-purple-500/15 text-purple-400 font-bold",
                  none: "text-transparent",
                }

                const isFk = item.keyType === "FK"

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs hover:bg-slate-500/5 transition-colors group"
                  >
                    {/* Key Chip Toggle */}
                    <button
                      onClick={() => {
                        const idx = SCHEMA_KEYS.indexOf(item.keyType || "none")
                        const next = SCHEMA_KEYS[(idx + 1) % SCHEMA_KEYS.length]
                        updateItemField(item.id, "keyType", next)
                      }}
                      title="Click to cycle PK, FK, UQ, none"
                      className={`text-[9px] font-mono px-1 py-0.5 rounded shrink-0 min-w-[24px] text-center ${
                        keyColors[item.keyType || "none"]
                      }`}
                    >
                      {item.keyType === "PK"
                        ? "PK"
                        : item.keyType === "FK"
                        ? "FK"
                        : item.keyType === "UQ"
                        ? "UQ"
                        : "—"}
                    </button>

                    {/* Field Name */}
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItemField(item.id, "name", e.target.value)}
                      placeholder="column_name"
                      className={`font-mono text-xs font-semibold text-slate-800 dark:text-slate-100 flex-1 truncate ${inputSeamless}`}
                    />

                    {/* Data Type Selector */}
                    <button
                      onClick={() => {
                        const idx = SCHEMA_DATA_TYPES.indexOf(item.dataType || "varchar")
                        const next = SCHEMA_DATA_TYPES[(idx + 1) % SCHEMA_DATA_TYPES.length]
                        updateItemField(item.id, "dataType", next)
                      }}
                      title="Click to cycle data type"
                      className="font-mono text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors shrink-0 text-right w-18 truncate"
                    >
                      {item.dataType || "varchar"}
                    </button>

                    {/* Nullability Toggle: Only show badge when nullable */}
                    <button
                      onClick={() => updateItemField(item.id, "isNullable", !item.isNullable)}
                      className="text-[9px] font-mono shrink-0 w-8 text-center"
                      title={item.isNullable ? "Nullable (click to toggle)" : "Not null (click to make nullable)"}
                    >
                      {item.isNullable ? (
                        <span className="text-sky-500 font-semibold bg-sky-500/10 px-1 py-0.5 rounded">
                          null
                        </span>
                      ) : (
                        <span className="text-slate-300 dark:text-slate-700 opacity-0 group-hover:opacity-40">
                          —
                        </span>
                      )}
                    </button>

                    {/* Foreign Key Relation Connector Anchor */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onStartRelationConnect?.(id, item.name)
                      }}
                      title="Draw relation arrow from this foreign key to another table"
                      className={`p-1 rounded transition-all shrink-0 ${
                        isFk
                          ? "text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 opacity-90 group-hover:opacity-100"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <Link2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Column */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-500 transition-opacity shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )
              })}

            {/* 6. REQUEST FLOW FLAT LIST */}
            {docType === "flow" &&
              items.map((item: FlowStepItem, idx: number) => {
                const protoColors: Record<string, string> = {
                  HTTPS: "text-emerald-500 bg-emerald-500/10",
                  gRPC: "text-indigo-500 bg-indigo-500/10",
                  WebSocket: "text-purple-500 bg-purple-500/10",
                  Kafka: "text-amber-500 bg-amber-500/10",
                  SQL: "text-cyan-500 bg-cyan-500/10",
                  Redis: "text-rose-500 bg-rose-500/10",
                }

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-slate-500/5 transition-colors group"
                  >
                    <div className="w-4 h-4 rounded-full bg-violet-500 text-white font-mono font-bold text-[9px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>

                    <div className="flex items-center gap-1 font-mono text-[11px] text-slate-700 dark:text-slate-300 shrink-0">
                      <input
                        type="text"
                        value={item.from}
                        onChange={(e) => updateItemField(item.id, "from", e.target.value)}
                        placeholder="Source"
                        className={`w-18 truncate ${inputSeamless}`}
                      />
                      <span className="text-slate-400">➔</span>
                      <input
                        type="text"
                        value={item.to}
                        onChange={(e) => updateItemField(item.id, "to", e.target.value)}
                        placeholder="Target"
                        className={`w-18 truncate ${inputSeamless}`}
                      />
                    </div>

                    <button
                      onClick={() => {
                        const pIdx = FLOW_PROTOCOLS.indexOf(item.protocol || "HTTPS")
                        const next = FLOW_PROTOCOLS[(pIdx + 1) % FLOW_PROTOCOLS.length]
                        updateItemField(item.id, "protocol", next)
                      }}
                      className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        protoColors[item.protocol || "HTTPS"] || protoColors.HTTPS
                      }`}
                    >
                      {item.protocol || "HTTPS"}
                    </button>

                    <input
                      type="text"
                      value={item.action}
                      onChange={(e) => updateItemField(item.id, "action", e.target.value)}
                      placeholder="Request action / payload..."
                      className={`flex-1 text-slate-700 dark:text-slate-300 text-xs truncate ${inputSeamless}`}
                    />

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

          {/* ── CARD FOOTER (Streamlined, minimal add actions) ── */}
          <div
            className={`px-3 py-1.5 border-t flex items-center justify-between text-xs shrink-0 ${
              isDark ? "border-slate-800/80 bg-slate-900/40" : "border-slate-100 bg-slate-50/50"
            }`}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {docType === "requirements" && (
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => addRequirement("functional")}
                  className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-indigo-500 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Functional</span>
                </button>
                <button
                  onClick={() => addRequirement("non-functional")}
                  className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-purple-500 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Non-Functional</span>
                </button>
              </div>
            )}

            {docType === "api" && (
              <button
                onClick={addApiEndpoint}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-indigo-500 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Endpoint</span>
              </button>
            )}

            {docType === "estimation" && (
              <button
                onClick={addEstimation}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-amber-500 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Metric</span>
              </button>
            )}

            {docType === "bottlenecks" && (
              <button
                onClick={addBottleneck}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-rose-500 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Bottleneck</span>
              </button>
            )}

            {docType === "schema" && (
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={addSchemaColumn}
                  style={{ color: accentColor }}
                  className="flex items-center gap-1 text-[11px] font-semibold hover:opacity-80 transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Column</span>
                </button>
                <button
                  onClick={addCommonAuditColumns}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-cyan-500" />
                  <span>+ Timestamps</span>
                </button>
              </div>
            )}

            {docType === "flow" && (
              <button
                onClick={addFlowStep}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-violet-500 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            )}
          </div>
        </div>
      </foreignObject>
    )
  }
)

SysDocLayer.displayName = "SysDocLayer"
