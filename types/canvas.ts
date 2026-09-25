export type Color = {
  r: number
  g: number
  b: number
}

export type Camera = {
  x: number
  y: number
  zoom: number
}

export type AnchorSide = "top" | "bottom" | "left" | "right"

export enum SysComponent {
  // Clients & Ingress
  WebClient = "WebClient",
  MobileClient = "MobileClient",
  IoTDevice = "IoTDevice",
  DesktopClient = "DesktopClient",

  // Networking & Edge
  DNS = "DNS",
  CDN = "CDN",
  LoadBalancer = "LoadBalancer",
  APIGateway = "APIGateway",
  ReverseProxy = "ReverseProxy",
  FirewallWAF = "FirewallWAF",
  RateLimiter = "RateLimiter",

  // Compute & Services
  Server = "Server",
  Microservice = "Microservice",
  Serverless = "Serverless",
  Docker = "Docker",
  Kubernetes = "Kubernetes",
  WorkerService = "WorkerService",
  CronScheduler = "CronScheduler",
  ServiceDiscovery = "ServiceDiscovery",

  // Relational & Distributed Databases
  Database = "Database",
  PrimaryDB = "PrimaryDB",
  ReplicaDB = "ReplicaDB",
  ShardedDB = "ShardedDB",
  DistributedSQL = "DistributedSQL",

  // NoSQL & Specialized Data Stores
  NoSQLDB = "NoSQLDB",
  Cassandra = "Cassandra",
  GraphDB = "GraphDB",
  TimeSeriesDB = "TimeSeriesDB",

  // Caching & In-Memory
  Cache = "Cache",
  DistributedCache = "DistributedCache",

  // Messaging & Streaming
  MessageQueue = "MessageQueue",
  EventStreaming = "EventStreaming",
  PubSub = "PubSub",
  DeadLetterQueue = "DeadLetterQueue",

  // Storage & Files
  ObjectStorage = "ObjectStorage",
  BlockStorage = "BlockStorage",
  FileSystem = "FileSystem",

  // Search & Big Data
  SearchEngine = "SearchEngine",
  DataWarehouse = "DataWarehouse",
  DataLake = "DataLake",
  StreamProcessing = "StreamProcessing",
  BatchProcessing = "BatchProcessing",

  // Security & Observability
  AuthService = "AuthService",
  SecretManager = "SecretManager",
  Monitoring = "Monitoring",
  LogAggregator = "LogAggregator",
  DistributedTracing = "DistributedTracing",
}

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
  Component,
  Arrow,
  Section,
  Doc,
}

export type DocType = "requirements" | "api" | "estimation" | "bottlenecks" | "schema" | "flow"

export type RequirementItem = {
  id: string
  type: "functional" | "non-functional"
  text: string
  priority?: "P0" | "P1" | "P2"
}

export type ApiEndpointItem = {
  id: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  description: string
  responseCode?: string
}

export type EstimationItem = {
  id: string
  metric: string
  value: string
  unit: string
  notes?: string
}

export type BottleneckItem = {
  id: string
  component: string
  risk: string
  severity: "High" | "Medium" | "Critical"
  mitigation: string
}

export type SchemaDataType =
  | "uuid"
  | "varchar"
  | "text"
  | "bigint"
  | "integer"
  | "boolean"
  | "timestamp"
  | "jsonb"
  | "float"

export type SchemaKeyType = "PK" | "FK" | "UQ" | "none"

export type SchemaColumnItem = {
  id: string
  name: string
  dataType: SchemaDataType
  keyType?: SchemaKeyType
  isNullable?: boolean
  references?: string
}

export type FlowProtocol = "HTTPS" | "gRPC" | "WebSocket" | "Kafka" | "SQL" | "Redis"

export type FlowStepItem = {
  id: string
  step: number
  from: string
  to: string
  action: string
  protocol?: FlowProtocol
}

export type DocLayer = {
  type: LayerType.Doc
  x: number
  y: number
  width: number
  height: number
  fill: Color
  docType: DocType
  title: string
  itemsJson: string
  activeTab?: string
  value?: string
}


export type StrokePattern = "solid" | "dashed" | "dotted"
export type ArrowDirection = "forward" | "bidirectional" | "none"
export type FontFamily = "sans" | "handwriting" | "serif" | "mono"
export type FontWeight = "normal" | "bold"
export type FontStyle = "normal" | "italic"
export type TextDecoration = "none" | "underline"
export type TextAlign = "left" | "center" | "right"
export type FillStyle = "solid" | "semi" | "transparent"
export type StrokeWidth = 1.5 | 3 | 5
export type Roundness = "sharp" | "rounded"

export type RectangleLayer = {
  type: LayerType.Rectangle
  x: number
  y: number
  width: number
  height: number
  fill: Color
  value?: string
  strokePattern?: StrokePattern
  strokeWidth?: number
  fillStyle?: FillStyle
  roundness?: Roundness
  fontFamily?: FontFamily
  fontSize?: number
  fontWeight?: FontWeight
  textAlign?: TextAlign
}

export type EllipseLayer = {
  type: LayerType.Ellipse
  x: number
  y: number
  width: number
  height: number
  fill: Color
  value?: string
  strokePattern?: StrokePattern
  strokeWidth?: number
  fillStyle?: FillStyle
  fontFamily?: FontFamily
  fontSize?: number
  fontWeight?: FontWeight
  textAlign?: TextAlign
}

export type PathLayer = {
  type: LayerType.Path
  x: number
  y: number
  width: number
  height: number
  fill: Color
  points: number[][]
  value?: string
}

export type TextLayer = {
  type: LayerType.Text
  x: number
  y: number
  width: number
  height: number
  fill: Color
  value?: string
  fontFamily?: FontFamily
  fontSize?: number
  fontWeight?: FontWeight
  fontStyle?: FontStyle
  textDecoration?: TextDecoration
  textAlign?: TextAlign
}

export type NoteLayer = {
  type: LayerType.Note
  x: number
  y: number
  width: number
  height: number
  fill: Color
  value?: string
  fontFamily?: FontFamily
  fontSize?: number
  fontWeight?: FontWeight
  textAlign?: TextAlign
}

export type ComponentStatus = "healthy" | "warning" | "error" | "info" | "none"

export type ComponentLayer = {
  type: LayerType.Component
  x: number
  y: number
  width: number
  height: number
  fill: Color
  componentType: SysComponent
  value?: string
  status?: ComponentStatus
  statusText?: string
  customColor?: Color
}

export type ArrowStyle = "curvy" | "sharp" | "orthogonal"

export type ArrowLayer = {
  type: LayerType.Arrow
  // Connected layer IDs and their anchor sides
  fromLayerId: string
  toLayerId: string
  fromAnchor: AnchorSide
  toAnchor: AnchorSide
  // x, y, width, height kept for bounding-box compatibility (selection)
  x: number
  y: number
  width: number
  height: number
  fill: Color
  value?: string
  sequenceStep?: number
  arrowStyle?: ArrowStyle
  strokePattern?: StrokePattern
  direction?: ArrowDirection
  isAnimated?: boolean
  controlOffset?: Point
}

export type SimulationMode = "idle" | "playing" | "spike" | "chaos"
export type SimulationSpeed = 0.5 | 1 | 2 | 3

export type SectionLayer = {
  type: LayerType.Section
  x: number
  y: number
  width: number
  height: number
  fill: Color
  value?: string
  strokePattern?: StrokePattern
}

export type Point = {
  x: number
  y: number
}

export type XYWH = {
  x: number
  y: number
  width: number
  height: number
}

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None
    }
  | {
      mode: CanvasMode.SelectionNet
      origin: Point
      current?: Point
    }
  | {
      mode: CanvasMode.Translating
      current?: Point
    }
  | {
      mode: CanvasMode.Inserting
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text
        | LayerType.Component
        | LayerType.Section
        | LayerType.Doc
      componentType?: SysComponent
      docType?: DocType
    }
  | {
      mode: CanvasMode.Pressing
      origin: Point
    }
  | {
      mode: CanvasMode.Resizing
      initialBounds: XYWH
      corner: Side
    }
  | {
      mode: CanvasMode.Pencil
    }
  | {
      mode: CanvasMode.Connecting
      // null = waiting for first click; string = layerId of starting component
      from: string | null
      connectionLabel?: string
    }
  | {
      mode: CanvasMode.Panning
      origin: Point
      cameraOrigin: Point
    }
  | {
      mode: CanvasMode.Eraser
    }

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
  Connecting,
  Panning,
  Eraser,
}

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | TextLayer
  | PathLayer
  | NoteLayer
  | ComponentLayer
  | ArrowLayer
  | SectionLayer
  | DocLayer

