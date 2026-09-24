import React, { memo } from "react"
import {
  Monitor, Smartphone, Cpu, Laptop, Globe, Cloud, Shuffle, Network,
  ShieldAlert, Sliders, Server, Box, Zap, Layers, Package,
  Cog, Clock, Compass, Database, HardDrive, Copy, Grid, Columns,
  Share2, Activity, Archive, Radio, Inbox, ListTree, Bell, AlertTriangle,
  FolderGit2, FileText, Disc, Search, BarChart3, TrendingUp, Waves,
  Workflow, Lock, Key, Gauge, FileCode2, Eye
} from "lucide-react"
import { ComponentLayer, SysComponent, AnchorSide, Point } from "@/types/canvas"
import { useSimulation } from "./simulation-context"

// ─── Anchor point geometry ────────────────────────────────────────────────────
export function getAnchorPoint(
  x: number, y: number, width: number, height: number, anchor: AnchorSide
): Point {
  switch (anchor) {
    case "top":    return { x: x + width / 2, y }
    case "bottom": return { x: x + width / 2, y: y + height }
    case "left":   return { x,               y: y + height / 2 }
    case "right":  return { x: x + width,    y: y + height / 2 }
  }
}

/**
 * Given two layer bounding boxes, automatically pick the best anchor pair
 * so arrows route sensibly (right→left, bottom→top, etc.)
 */
export function computeBestAnchors(
  from: { x: number; y: number; width: number; height: number },
  to:   { x: number; y: number; width: number; height: number }
): { fromAnchor: AnchorSide; toAnchor: AnchorSide } {
  const fcx = from.x + from.width  / 2
  const fcy = from.y + from.height / 2
  const tcx = to.x   + to.width    / 2
  const tcy = to.y   + to.height   / 2
  const dx = tcx - fcx
  const dy = tcy - fcy
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0
      ? { fromAnchor: "right",  toAnchor: "left"  }
      : { fromAnchor: "left",   toAnchor: "right" }
  } else {
    return dy >= 0
      ? { fromAnchor: "bottom", toAnchor: "top"    }
      : { fromAnchor: "top",    toAnchor: "bottom" }
  }
}

// ─── Component Labels ─────────────────────────────────────────────────────────
export const COMPONENT_LABELS: Record<SysComponent, string> = {
  // Clients & Ingress
  [SysComponent.WebClient]:          "Web Client",
  [SysComponent.MobileClient]:       "Mobile App",
  [SysComponent.IoTDevice]:          "IoT Device",
  [SysComponent.DesktopClient]:      "Desktop App",

  // Networking & Edge
  [SysComponent.DNS]:                "DNS (Route53)",
  [SysComponent.CDN]:                "CDN (Edge)",
  [SysComponent.LoadBalancer]:       "Load Balancer",
  [SysComponent.APIGateway]:         "API Gateway",
  [SysComponent.ReverseProxy]:       "Reverse Proxy",
  [SysComponent.FirewallWAF]:        "WAF Firewall",
  [SysComponent.RateLimiter]:        "Rate Limiter",

  // Compute & Services
  [SysComponent.Server]:             "App Server",
  [SysComponent.Microservice]:       "Microservice",
  [SysComponent.Serverless]:         "Serverless (Lambda)",
  [SysComponent.Docker]:             "Docker Container",
  [SysComponent.Kubernetes]:         "K8s Cluster",
  [SysComponent.WorkerService]:      "Worker Service",
  [SysComponent.CronScheduler]:      "Cron Scheduler",
  [SysComponent.ServiceDiscovery]:   "Service Discovery",

  // Relational & Distributed Databases
  [SysComponent.Database]:           "SQL Database",
  [SysComponent.PrimaryDB]:          "Primary DB",
  [SysComponent.ReplicaDB]:          "Read Replica",
  [SysComponent.ShardedDB]:          "DB Shard",
  [SysComponent.DistributedSQL]:     "Distributed SQL",

  // NoSQL & Specialized Data Stores
  [SysComponent.NoSQLDB]:            "NoSQL (Mongo/Dynamo)",
  [SysComponent.Cassandra]:          "Cassandra Store",
  [SysComponent.GraphDB]:            "Graph DB (Neo4j)",
  [SysComponent.TimeSeriesDB]:       "Time Series DB",

  // Caching & In-Memory
  [SysComponent.Cache]:              "Redis Cache",
  [SysComponent.DistributedCache]:   "Redis Cluster",

  // Messaging & Streaming
  [SysComponent.MessageQueue]:       "Message Queue (SQS)",
  [SysComponent.EventStreaming]:     "Kafka Streaming",
  [SysComponent.PubSub]:             "Pub/Sub Topic",
  [SysComponent.DeadLetterQueue]:    "Dead Letter Queue",

  // Storage & Files
  [SysComponent.ObjectStorage]:      "S3 Object Store",
  [SysComponent.BlockStorage]:       "Block Store (EBS)",
  [SysComponent.FileSystem]:         "Distributed FS",

  // Search & Big Data
  [SysComponent.SearchEngine]:       "Elasticsearch",
  [SysComponent.DataWarehouse]:      "Data Warehouse",
  [SysComponent.DataLake]:           "Data Lake",
  [SysComponent.StreamProcessing]:   "Stream Processor",
  [SysComponent.BatchProcessing]:    "Batch Job (Spark)",

  // Security & Observability
  [SysComponent.AuthService]:        "Auth (OAuth/JWT)",
  [SysComponent.SecretManager]:      "Secrets Vault",
  [SysComponent.Monitoring]:         "Prometheus/Metrics",
  [SysComponent.LogAggregator]:      "Log Aggregator",
  [SysComponent.DistributedTracing]: "Jaeger Tracing",
}

type Theme = { bg: string; badge: string; icon: string; text: string; border: string }

export const COMPONENT_COLORS: Record<SysComponent, Theme> = {
  // Clients & Ingress (Blue / Cyan / Green)
  [SysComponent.WebClient]:          { bg: "#EFF6FF", badge: "#DBEAFE", icon: "#2563EB", text: "#1E40AF", border: "#93C5FD" },
  [SysComponent.MobileClient]:       { bg: "#F0FDF4", badge: "#DCFCE7", icon: "#16A34A", text: "#15803D", border: "#86EFAC" },
  [SysComponent.IoTDevice]:          { bg: "#ECFEFF", badge: "#CFFAFE", icon: "#0891B2", text: "#0E7490", border: "#67E8F9" },
  [SysComponent.DesktopClient]:      { bg: "#EEF2FF", badge: "#E0E7FF", icon: "#4F46E5", text: "#3730A3", border: "#A5B4FC" },

  // Networking & Edge (Amber / Purple / Orange / Rose)
  [SysComponent.DNS]:                { bg: "#FEF3C7", badge: "#FDE68A", icon: "#D97706", text: "#92400E", border: "#FCD34D" },
  [SysComponent.CDN]:                { bg: "#FDF4FF", badge: "#F3E8FF", icon: "#9333EA", text: "#7E22CE", border: "#D8B4FE" },
  [SysComponent.LoadBalancer]:       { bg: "#FFF7ED", badge: "#FFEDD5", icon: "#EA580C", text: "#9A3412", border: "#FDBA74" },
  [SysComponent.APIGateway]:         { bg: "#EEF2FF", badge: "#E0E7FF", icon: "#4F46E5", text: "#3730A3", border: "#A5B4FC" },
  [SysComponent.ReverseProxy]:       { bg: "#F5F3FF", badge: "#EDE9FE", icon: "#7C3AED", text: "#5B21B6", border: "#C4B5FD" },
  [SysComponent.FirewallWAF]:        { bg: "#FFF1F2", badge: "#FFE4E6", icon: "#E11D48", text: "#9F1239", border: "#FDA4AF" },
  [SysComponent.RateLimiter]:        { bg: "#FDF2F8", badge: "#FCE7F3", icon: "#DB2777", text: "#9D174D", border: "#F472B6" },

  // Compute & Services (Slate / Emerald / Amber / Blue / Sky)
  [SysComponent.Server]:             { bg: "#F8FAFC", badge: "#F1F5F9", icon: "#475569", text: "#1E293B", border: "#CBD5E1" },
  [SysComponent.Microservice]:       { bg: "#ECFDF5", badge: "#D1FAE5", icon: "#059669", text: "#065F46", border: "#6EE7B7" },
  [SysComponent.Serverless]:         { bg: "#FEFCE8", badge: "#FEF08A", icon: "#CA8A04", text: "#854D0E", border: "#FACC15" },
  [SysComponent.Docker]:             { bg: "#EFF6FF", badge: "#DBEAFE", icon: "#1D4ED8", text: "#1E3A8A", border: "#93C5FD" },
  [SysComponent.Kubernetes]:         { bg: "#F0F9FF", badge: "#E0F2FE", icon: "#0369A1", text: "#0C4A6E", border: "#7DD3FC" },
  [SysComponent.WorkerService]:      { bg: "#F4F4F5", badge: "#E4E4E7", icon: "#52525B", text: "#27272A", border: "#D4D4D8" },
  [SysComponent.CronScheduler]:      { bg: "#F5F5F4", badge: "#E7E5E4", icon: "#57534E", text: "#292524", border: "#D6D3D1" },
  [SysComponent.ServiceDiscovery]:   { bg: "#F0FDFA", badge: "#CCFBF1", icon: "#0D9488", text: "#115E59", border: "#5EEAD4" },

  // Relational & Distributed Databases
  [SysComponent.Database]:           { bg: "#F0F9FF", badge: "#E0F2FE", icon: "#0284C7", text: "#0C4A6E", border: "#7DD3FC" },
  [SysComponent.PrimaryDB]:          { bg: "#FFF1F2", badge: "#FFE4E6", icon: "#E11D48", text: "#9F1239", border: "#FDA4AF" },
  [SysComponent.ReplicaDB]:          { bg: "#FAF5FF", badge: "#F3E8FF", icon: "#9333EA", text: "#6B21A8", border: "#D8B4FE" },
  [SysComponent.ShardedDB]:          { bg: "#EFF6FF", badge: "#DBEAFE", icon: "#2563EB", text: "#1E40AF", border: "#93C5FD" },
  [SysComponent.DistributedSQL]:     { bg: "#ECFEFF", badge: "#CFFAFE", icon: "#0891B2", text: "#0E7490", border: "#67E8F9" },

  // NoSQL & Specialized Data Stores
  [SysComponent.NoSQLDB]:            { bg: "#F0FDF4", badge: "#DCFCE7", icon: "#16A34A", text: "#15803D", border: "#86EFAC" },
  [SysComponent.Cassandra]:          { bg: "#EEF2FF", badge: "#E0E7FF", icon: "#4F46E5", text: "#3730A3", border: "#A5B4FC" },
  [SysComponent.GraphDB]:            { bg: "#F5F3FF", badge: "#EDE9FE", icon: "#7C3AED", text: "#5B21B6", border: "#C4B5FD" },
  [SysComponent.TimeSeriesDB]:       { bg: "#FDF2F8", badge: "#FCE7F3", icon: "#C026D3", text: "#86198F", border: "#F0ABFC" },

  // Caching & In-Memory
  [SysComponent.Cache]:              { bg: "#FFFBEB", badge: "#FEF9C3", icon: "#CA8A04", text: "#713F12", border: "#FDE047" },
  [SysComponent.DistributedCache]:   { bg: "#FFF7ED", badge: "#FFEDD5", icon: "#EA580C", text: "#9A3412", border: "#FDBA74" },

  // Messaging & Streaming
  [SysComponent.MessageQueue]:       { bg: "#F0FDF4", badge: "#DCFCE7", icon: "#16A34A", text: "#14532D", border: "#86EFAC" },
  [SysComponent.EventStreaming]:     { bg: "#FAF5FF", badge: "#F3E8FF", icon: "#9333EA", text: "#6B21A8", border: "#D8B4FE" },
  [SysComponent.PubSub]:             { bg: "#EFF6FF", badge: "#DBEAFE", icon: "#2563EB", text: "#1E40AF", border: "#93C5FD" },
  [SysComponent.DeadLetterQueue]:    { bg: "#FEF2F2", badge: "#FEE2E2", icon: "#DC2626", text: "#991B1B", border: "#FCA5A5" },

  // Storage & Files
  [SysComponent.ObjectStorage]:      { bg: "#FFFBEB", badge: "#FEF9C3", icon: "#D97706", text: "#92400E", border: "#FCD34D" },
  [SysComponent.BlockStorage]:       { bg: "#F8FAFC", badge: "#F1F5F9", icon: "#475569", text: "#1E293B", border: "#CBD5E1" },
  [SysComponent.FileSystem]:         { bg: "#F0F9FF", badge: "#E0F2FE", icon: "#0284C7", text: "#0C4A6E", border: "#7DD3FC" },

  // Search & Big Data
  [SysComponent.SearchEngine]:       { bg: "#F0FDFA", badge: "#CCFBF1", icon: "#0D9488", text: "#115E59", border: "#5EEAD4" },
  [SysComponent.DataWarehouse]:      { bg: "#EEF2FF", badge: "#E0E7FF", icon: "#4F46E5", text: "#3730A3", border: "#A5B4FC" },
  [SysComponent.DataLake]:           { bg: "#ECFEFF", badge: "#CFFAFE", icon: "#0891B2", text: "#0E7490", border: "#67E8F9" },
  [SysComponent.StreamProcessing]:   { bg: "#FDF4FF", badge: "#F3E8FF", icon: "#9333EA", text: "#7E22CE", border: "#D8B4FE" },
  [SysComponent.BatchProcessing]:    { bg: "#FFF7ED", badge: "#FFEDD5", icon: "#EA580C", text: "#9A3412", border: "#FDBA74" },

  // Security & Observability
  [SysComponent.AuthService]:        { bg: "#F5F3FF", badge: "#EDE9FE", icon: "#7C3AED", text: "#5B21B6", border: "#C4B5FD" },
  [SysComponent.SecretManager]:      { bg: "#FEF3C7", badge: "#FDE68A", icon: "#D97706", text: "#92400E", border: "#FCD34D" },
  [SysComponent.Monitoring]:         { bg: "#ECFDF5", badge: "#D1FAE5", icon: "#059669", text: "#065F46", border: "#6EE7B7" },
  [SysComponent.LogAggregator]:      { bg: "#F4F4F5", badge: "#E4E4E7", icon: "#52525B", text: "#27272A", border: "#D4D4D8" },
  [SysComponent.DistributedTracing]: { bg: "#EFF6FF", badge: "#DBEAFE", icon: "#2563EB", text: "#1E40AF", border: "#93C5FD" },
}

const ICON_MAP: Record<SysComponent, React.ElementType> = {
  // Clients
  [SysComponent.WebClient]:          Monitor,
  [SysComponent.MobileClient]:       Smartphone,
  [SysComponent.IoTDevice]:          Cpu,
  [SysComponent.DesktopClient]:      Laptop,

  // Networking
  [SysComponent.DNS]:                Globe,
  [SysComponent.CDN]:                Cloud,
  [SysComponent.LoadBalancer]:       Shuffle,
  [SysComponent.APIGateway]:         Network,
  [SysComponent.ReverseProxy]:       Compass,
  [SysComponent.FirewallWAF]:        ShieldAlert,
  [SysComponent.RateLimiter]:        Sliders,

  // Compute
  [SysComponent.Server]:             Server,
  [SysComponent.Microservice]:       Box,
  [SysComponent.Serverless]:         Zap,
  [SysComponent.Docker]:             Package,
  [SysComponent.Kubernetes]:         Layers,
  [SysComponent.WorkerService]:      Cog,
  [SysComponent.CronScheduler]:      Clock,
  [SysComponent.ServiceDiscovery]:   ListTree,

  // Relational DBs
  [SysComponent.Database]:           Database,
  [SysComponent.PrimaryDB]:          HardDrive,
  [SysComponent.ReplicaDB]:          Copy,
  [SysComponent.ShardedDB]:          Columns,
  [SysComponent.DistributedSQL]:     Grid,

  // NoSQL DBs
  [SysComponent.NoSQLDB]:            FileText,
  [SysComponent.Cassandra]:          Columns,
  [SysComponent.GraphDB]:            Share2,
  [SysComponent.TimeSeriesDB]:       Activity,

  // Caching
  [SysComponent.Cache]:              Zap,
  [SysComponent.DistributedCache]:   Grid,

  // Messaging
  [SysComponent.MessageQueue]:       Inbox,
  [SysComponent.EventStreaming]:     Radio,
  [SysComponent.PubSub]:             Bell,
  [SysComponent.DeadLetterQueue]:    AlertTriangle,

  // Storage
  [SysComponent.ObjectStorage]:      Archive,
  [SysComponent.BlockStorage]:       Disc,
  [SysComponent.FileSystem]:         FolderGit2,

  // Search & Big Data
  [SysComponent.SearchEngine]:       Search,
  [SysComponent.DataWarehouse]:      BarChart3,
  [SysComponent.DataLake]:           Waves,
  [SysComponent.StreamProcessing]:   TrendingUp,
  [SysComponent.BatchProcessing]:    Workflow,

  // Security & Observability
  [SysComponent.AuthService]:        Lock,
  [SysComponent.SecretManager]:      Key,
  [SysComponent.Monitoring]:         Gauge,
  [SysComponent.LogAggregator]:      FileCode2,
  [SysComponent.DistributedTracing]: Eye,
}

// ─── Component icon re-exported for library panel ─────────────────────────────
export function ComponentIcon({ type, color }: { type: SysComponent; color: string }) {
  const Icon = ICON_MAP[type] || Box
  return <Icon size={24} color={color} strokeWidth={1.8} />
}

// ─── Main layer component ────────────────────────────────────────────────────
interface SysComponentLayerProps {
  id: string
  layer: ComponentLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
  isConnecting?: boolean
  isConnectingFrom?: boolean   // this component is the "from" node
  onConnectClick?: (layerId: string) => void
  onDoubleClick?: (layerId: string) => void
}

function getComponentTelemetry(compType: SysComponent, status?: string): { metric1: string; metric2: string } {
  if (status === "error") {
    return { metric1: "ERR: Outage", metric2: "0 req/s · 100% fail" }
  }
  switch (compType) {
    case SysComponent.WebClient:
    case SysComponent.MobileClient:
    case SysComponent.DesktopClient:
    case SysComponent.IoTDevice:
      return { metric1: "18.4k Users", metric2: "Latency: 28ms" }
    case SysComponent.LoadBalancer:
    case SysComponent.APIGateway:
    case SysComponent.ReverseProxy:
      return { metric1: "34.2k QPS", metric2: "p99: 8.2ms · 99.99%" }
    case SysComponent.DNS:
    case SysComponent.CDN:
      return { metric1: "Edge Hit: 98.4%", metric2: "12ms TTFB" }
    case SysComponent.RateLimiter:
    case SysComponent.FirewallWAF:
      return { metric1: "Blocked: 2.1%", metric2: "Pass: 97.9%" }
    case SysComponent.Server:
    case SysComponent.Microservice:
    case SysComponent.Kubernetes:
    case SysComponent.Docker:
      return { metric1: "CPU: 42% · RAM: 58%", metric2: "12/12 Pods Healthy" }
    case SysComponent.Serverless:
    case SysComponent.WorkerService:
      return { metric1: "Concurrency: 450", metric2: "Avg Exec: 45ms" }
    case SysComponent.Database:
    case SysComponent.PrimaryDB:
    case SysComponent.ReplicaDB:
    case SysComponent.ShardedDB:
    case SysComponent.DistributedSQL:
      return { metric1: "1.8k TPS · IOPS 3.2k", metric2: "Conn: 64/100 · 4ms" }
    case SysComponent.NoSQLDB:
    case SysComponent.Cassandra:
    case SysComponent.GraphDB:
    case SysComponent.TimeSeriesDB:
      return { metric1: "Write: 14k/s", metric2: "Read: 22k/s · 2ms" }
    case SysComponent.Cache:
    case SysComponent.DistributedCache:
      return { metric1: "Hit Rate: 97.2%", metric2: "0.8ms p99 · 2.4 GB" }
    case SysComponent.MessageQueue:
    case SysComponent.EventStreaming:
    case SysComponent.PubSub:
    case SysComponent.DeadLetterQueue:
      return { metric1: "Lag: 0 ms", metric2: "18.5 MB/s ingress" }
    case SysComponent.AuthService:
    case SysComponent.SecretManager:
      return { metric1: "Valid Token: 99.99%", metric2: "4.2ms JWT verify" }
    default:
      return { metric1: "Active · Healthy", metric2: "Uptime: 99.98%" }
  }
}

export const SysComponentLayer = memo(function SysComponentLayer({
  id,
  layer,
  onPointerDown,
  selectionColor,
  isConnecting = false,
  isConnectingFrom = false,
  onConnectClick,
  onDoubleClick,
}: SysComponentLayerProps) {
  const { x, y, width, height, componentType, value } = layer
  const theme  = COMPONENT_COLORS[componentType] || { bg: "#EFF6FF", badge: "#DBEAFE", icon: "#2563EB", text: "#1E40AF", border: "#93C5FD" }
  const label  = value || COMPONENT_LABELS[componentType] || componentType
  const Icon   = ICON_MAP[componentType] || Box

  // Decide border colour: connecting-from gets a vivid blue ring
  const strokeColor = isConnectingFrom
    ? "#2563EB"
    : selectionColor || theme.border

  const strokeWidth = isConnectingFrom || selectionColor ? 2.5 : 1.5

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isConnecting) {
      e.stopPropagation()
      onConnectClick?.(id)
    } else {
      onPointerDown(e, id)
    }
  }

  let simContext: any = null
  try {
    simContext = useSimulation()
  } catch {}

  const isSimulating = Boolean(simContext && simContext.simMode !== "idle")
  const showMetrics = Boolean(simContext?.showMetrics)
  const isFocused = Boolean(simContext?.isTourActive && simContext?.focusedLayerId === id)
  const telemetry = showMetrics ? getComponentTelemetry(layer.componentType, layer.status) : null

  return (
    <g
      onPointerDown={handlePointerDown}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onDoubleClick?.(id)
      }}
      style={{ cursor: isConnecting ? "crosshair" : "pointer" }}
    >
      {/* Drop shadow */}
      <rect x={x + 2} y={y + 4} width={width} height={height} rx={12} fill="rgba(0,0,0,0.07)" />

      {/* Rich card via foreignObject */}
      <foreignObject x={x} y={y} width={width} height={height}>
        {/* @ts-ignore – xmlns required for SVG foreignObject in some renderers */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: theme.bg,
            border: `${strokeWidth}px solid ${strokeColor}`,
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 6px 10px",
            boxSizing: "border-box",
            fontFamily: "Inter, system-ui, sans-serif",
            pointerEvents: "none",
            transition: "border-color 0.15s ease",
            boxShadow: isConnectingFrom ? `0 0 0 3px #93C5FD` : undefined,
          }}
        >
          {/* Status health badge in top-right */}
          {layer.status && layer.status !== "none" && (
            <div
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "1px 5px",
                borderRadius: 9999,
                fontSize: 8,
                fontWeight: 700,
                backgroundColor:
                  layer.status === "healthy"
                    ? "#DCFCE7"
                    : layer.status === "warning"
                    ? "#FEF9C3"
                    : layer.status === "error"
                    ? "#FEE2E2"
                    : "#DBEAFE",
                color:
                  layer.status === "healthy"
                    ? "#15803D"
                    : layer.status === "warning"
                    ? "#A16207"
                    : layer.status === "error"
                    ? "#B91C1C"
                    : "#1D4ED8",
                border: `1px solid ${
                  layer.status === "healthy"
                    ? "#86EFAC"
                    : layer.status === "warning"
                    ? "#FDE047"
                    : layer.status === "error"
                    ? "#FCA5A5"
                    : "#93C5FD"
                }`,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor:
                    layer.status === "healthy"
                      ? "#22C55E"
                      : layer.status === "warning"
                      ? "#EAB308"
                      : layer.status === "error"
                      ? "#EF4444"
                      : "#3B82F6",
                }}
              />
              <span>{layer.statusText || layer.status.toUpperCase()}</span>
            </div>
          )}

          {/* Icon badge */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: theme.badge,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={24} color={theme.icon} strokeWidth={1.8} />
          </div>

          {/* Label */}
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: theme.text,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: "0.01em",
              maxWidth: "92%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        </div>
      </foreignObject>

      {/* Hit rect — catches all pointer events across the whole component */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill="white"
        fillOpacity={0.001}
        style={{ pointerEvents: "all" }}
      />

      {/* ── Tour Focus Spotlight Halo ── */}
      {isFocused && (
        <rect
          x={x - 6}
          y={y - 6}
          width={width + 12}
          height={height + 12}
          rx={16}
          fill="none"
          stroke="#6366f1"
          strokeWidth={3}
          strokeDasharray="6 4"
          className="animate-pulse"
          style={{ filter: "drop-shadow(0 0 10px rgba(99,102,241,0.9))", pointerEvents: "none" }}
        />
      )}

      {/* ── Simulation Processing Energy Halo ── */}
      {isSimulating && (
        <rect
          x={x - 3}
          y={y - 3}
          width={width + 6}
          height={height + 6}
          rx={14}
          fill="none"
          stroke={
            layer.status === "error"
              ? "#ef4444"
              : simContext?.simMode === "spike"
              ? "#f59e0b"
              : "#06b6d4"
          }
          strokeWidth={1.5}
          opacity={0.65}
          className="animate-pulse"
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* ── Live Telemetry Metrics HUD Card ── */}
      {showMetrics && telemetry && (
        <foreignObject
          x={x - 20}
          y={y + height + 5}
          width={width + 40}
          height={42}
          style={{ overflow: "visible", pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              backdropFilter: "blur(6px)",
              color: "#e2e8f0",
              borderRadius: 8,
              padding: "4px 8px",
              fontSize: 9,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              userSelect: "none",
            }}
          >
            <div style={{ color: "#38bdf8", fontWeight: 700, letterSpacing: "0.02em" }}>
              {telemetry.metric1}
            </div>
            <div style={{ color: "#94a3b8", fontSize: 8 }}>
              {telemetry.metric2}
            </div>
          </div>
        </foreignObject>
      )}
    </g>
  )
})
