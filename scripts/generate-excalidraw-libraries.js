const fs = require("fs");

function rotatePoint(x, y, cx, cy, angle) {
  if (!angle) return [x, y];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = x - cx;
  const dy = y - cy;
  return [
    cx + dx * cos - dy * sin,
    cy + dx * sin + dy * cos
  ];
}

function getElementBounds(el) {
  const w = el.width || 0;
  const h = el.height || 0;
  const cx = el.x + w / 2;
  const cy = el.y + h / 2;
  const angle = el.angle || 0;

  if (el.points && el.points.length > 0) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    el.points.forEach(pt => {
      const px = el.x + pt[0];
      const py = el.y + pt[1];
      const [rx, ry] = rotatePoint(px, py, cx, cy, angle);
      minX = Math.min(minX, rx);
      minY = Math.min(minY, ry);
      maxX = Math.max(maxX, rx);
      maxY = Math.max(maxY, ry);
    });
    return { minX, minY, maxX, maxY };
  }

  const corners = [
    [el.x, el.y],
    [el.x + w, el.y],
    [el.x + w, el.y + h],
    [el.x, el.y + h]
  ];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  corners.forEach(([px, py]) => {
    const [rx, ry] = rotatePoint(px, py, cx, cy, angle);
    minX = Math.min(minX, rx);
    minY = Math.min(minY, ry);
    maxX = Math.max(maxX, rx);
    maxY = Math.max(maxY, ry);
  });
  return { minX, minY, maxX, maxY };
}

function isDescriptiveText(text) {
  if (!text) return true;
  const t = text.trim();
  if (t === "JSON" || t === "DNS" || t === "{" || t === "}" || t === "PK" || t === "FK") return false;
  return true;
}

function renderArrowhead(pFrom, pTo, stroke, strokeWidth) {
  const dx = pTo[0] - pFrom[0];
  const dy = pTo[1] - pFrom[1];
  const len = Math.hypot(dx, dy);
  if (len < 1) return "";
  const angle = Math.atan2(dy, dx);
  const headLen = Math.max(strokeWidth * 4.5, 9);
  const a1 = angle - Math.PI / 6;
  const a2 = angle + Math.PI / 6;
  const p1x = (pTo[0] - headLen * Math.cos(a1)).toFixed(1);
  const p1y = (pTo[1] - headLen * Math.sin(a1)).toFixed(1);
  const p2x = (pTo[0] - headLen * Math.cos(a2)).toFixed(1);
  const p2y = (pTo[1] - headLen * Math.sin(a2)).toFixed(1);
  const tox = pTo[0].toFixed(1);
  const toy = pTo[1].toFixed(1);
  return `<path d="M ${p1x} ${p1y} L ${tox} ${toy} L ${p2x} ${p2y}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round" />`;
}

function renderElementInner(el) {
  if (el.isDeleted) return "";
  const stroke = el.strokeColor || "#000000";
  const strokeWidth = el.strokeWidth || 1.5;
  const fill = el.backgroundColor === "transparent" ? "none" : (el.backgroundColor || "none");
  const strokeDash = el.strokeStyle === "dashed" ? 'stroke-dasharray="6 4"' : el.strokeStyle === "dotted" ? 'stroke-dasharray="2 2"' : "";

  if (el.type === "rectangle") {
    const rx = el.strokeSharpness === "round" || el.roundness ? 4 : 0;
    return `<rect x="${el.x.toFixed(1)}" y="${el.y.toFixed(1)}" width="${el.width.toFixed(1)}" height="${el.height.toFixed(1)}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" rx="${rx}" ${strokeDash} stroke-linecap="round" stroke-linejoin="round" />`;
  }
  if (el.type === "ellipse") {
    const cx = (el.x + el.width / 2).toFixed(1);
    const cy = (el.y + el.height / 2).toFixed(1);
    const rx = (el.width / 2).toFixed(1);
    const ry = (el.height / 2).toFixed(1);
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" ${strokeDash} stroke-linecap="round" stroke-linejoin="round" />`;
  }
  if (el.type === "diamond") {
    const p1 = `${(el.x + el.width / 2).toFixed(1)},${el.y.toFixed(1)}`;
    const p2 = `${(el.x + el.width).toFixed(1)},${(el.y + el.height / 2).toFixed(1)}`;
    const p3 = `${(el.x + el.width / 2).toFixed(1)},${(el.y + el.height).toFixed(1)}`;
    const p4 = `${el.x.toFixed(1)},${(el.y + el.height / 2).toFixed(1)}`;
    return `<polygon points="${p1} ${p2} ${p3} ${p4}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" ${strokeDash} stroke-linecap="round" stroke-linejoin="round" />`;
  }
  if (el.type === "line" || el.type === "arrow" || el.type === "draw") {
    if (el.points && el.points.length > 0) {
      let d = "";
      const isClosed = el.points.length > 2 && (
        Math.hypot(
          el.points[0][0] - el.points[el.points.length - 1][0],
          el.points[0][1] - el.points[el.points.length - 1][1]
        ) < 12
      );

      el.points.forEach((pt, i) => {
        const px = (el.x + pt[0]).toFixed(1);
        const py = (el.y + pt[1]).toFixed(1);
        d += (i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`);
      });
      if (isClosed) d += " Z";

      // If line is open, do NOT fill it (prevent stray triangle spikes)
      const actualFill = isClosed ? fill : "none";
      let svg = `<path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${actualFill}" ${strokeDash} stroke-linecap="round" stroke-linejoin="round" />`;

      // Draw arrowhead if arrow or endArrowhead is set
      if ((el.type === "arrow" || el.endArrowhead) && el.points.length >= 2) {
        const pLast = el.points[el.points.length - 1];
        const pPrev = el.points[el.points.length - 2];
        const pTo = [el.x + pLast[0], el.y + pLast[1]];
        const pFrom = [el.x + pPrev[0], el.y + pPrev[1]];
        svg += renderArrowhead(pFrom, pTo, stroke, strokeWidth);
      }

      return svg;
    }
  }
  if (el.type === "text") {
    if (isDescriptiveText(el.text)) return "";
    const lines = (el.text || "").split("\n");
    const fontSize = Math.min(el.fontSize || 14, 28);
    const lineHeight = fontSize * 1.2;
    const textFill = el.strokeColor || "#000000";
    let tspans = "";
    lines.forEach((line, i) => {
      const ly = (el.y + (i + 1) * lineHeight).toFixed(1);
      const safeLine = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      tspans += `<tspan x="${el.x.toFixed(1)}" y="${ly}">${safeLine}</tspan>`;
    });
    return `<text font-family="sans-serif" font-size="${fontSize}" font-weight="700" fill="${textFill}" text-anchor="middle" dominant-baseline="middle">${tspans}</text>`;
  }
  return "";
}

function renderElement(el) {
  const inner = renderElementInner(el);
  if (!inner) return "";
  if (el.angle && el.angle !== 0) {
    const cx = (el.x + (el.width || 0) / 2).toFixed(2);
    const cy = (el.y + (el.height || 0) / 2).toFixed(2);
    const deg = ((el.angle * 180) / Math.PI).toFixed(2);
    return `<g transform="rotate(${deg} ${cx} ${cy})">${inner}</g>`;
  }
  return inner;
}

function getItemSvg(elements) {
  // Filter out deleted elements and descriptive text labels
  let validEls = elements.filter(e => !e.isDeleted);
  const nonTextEls = validEls.filter(e => e.type !== "text");

  // If there are non-text shapes, strip out descriptive texts
  if (nonTextEls.length > 0) {
    validEls = validEls.filter(e => e.type !== "text" || !isDescriptiveText(e.text));
  }

  if (validEls.length === 0) return "";

  // Outlier detection: if an element is far from median center, ignore it
  if (validEls.length > 2) {
    const xs = validEls.map(e => e.x + (e.width || 0) / 2).sort((a,b) => a-b);
    const ys = validEls.map(e => e.y + (e.height || 0) / 2).sort((a,b) => a-b);
    const medX = xs[Math.floor(xs.length / 2)];
    const medY = ys[Math.floor(ys.length / 2)];
    validEls = validEls.filter(e => {
      const ex = e.x + (e.width || 0) / 2;
      const ey = e.y + (e.height || 0) / 2;
      return Math.abs(ex - medX) < 350 && Math.abs(ey - medY) < 350;
    });
  }

  // Calculate tight bounding box including rotations
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  validEls.forEach(el => {
    const b = getElementBounds(el);
    minX = Math.min(minX, b.minX);
    minY = Math.min(minY, b.minY);
    maxX = Math.max(maxX, b.maxX);
    maxY = Math.max(maxY, b.maxY);
  });

  const contentW = maxX - minX;
  const contentH = maxY - minY;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  // Make a uniform, centered square viewBox with 12% padding
  const maxDim = Math.max(contentW, contentH);
  const pad = Math.max(maxDim * 1.15, 36);
  const vbX = (cx - pad / 2).toFixed(1);
  const vbY = (cy - pad / 2).toFixed(1);
  const vbDim = pad.toFixed(1);

  const innerSvg = validEls.map(renderElement).filter(Boolean).join("");
  return `<svg viewBox="${vbX} ${vbY} ${vbDim} ${vbDim}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${innerSvg}</svg>`;
}

const allItems = [];

// 1. drwnio.excalidrawlib (18 items)
const drwnioLib = JSON.parse(fs.readFileSync("public/drwnio.excalidrawlib", "utf8")).library;
const drwnioMeta = [
  { name: "Storage Bucket", type: "ObjectStorage", cat: "Storage" },
  { name: "SQL Database", type: "Database", cat: "Database" },
  { name: "Server Cluster", type: "Server", cat: "Compute" },
  { name: "JSON Data Service", type: "WorkerService", cat: "Data" },
  { name: "Kubernetes Cluster", type: "Kubernetes", cat: "Compute" },
  { name: "Backend Engine", type: "Microservice", cat: "Compute" },
  { name: "App Service", type: "Server", cat: "Compute" },
  { name: "Cloud Compute", type: "Serverless", cat: "Compute" },
  { name: "Microservice Mesh", type: "Microservice", cat: "Compute" },
  { name: "Message Queue", type: "MessageQueue", cat: "Messaging" },
  { name: "Go Worker", type: "WorkerService", cat: "Compute" },
  { name: "Docker Container", type: "Docker", cat: "Compute" },
  { name: "Load Balancer", type: "LoadBalancer", cat: "Networking" },
  { name: "Compute Instance", type: "Server", cat: "Compute" },
  { name: "Event Bus", type: "EventStreaming", cat: "Messaging" },
  { name: "Python Engine", type: "StreamProcessing", cat: "Compute" },
  { name: "Cloud CDN", type: "CDN", cat: "Networking" },
  { name: "DNS Resolver", type: "DNS", cat: "Networking" }
];
drwnioLib.forEach((item, idx) => {
  const meta = drwnioMeta[idx] || { name: `Draw.io Item ${idx + 1}`, type: "Server", cat: "Draw.io" };
  const elements = Array.isArray(item) ? item : item.elements;
  allItems.push({
    id: `drwnio-${idx}`,
    name: meta.name,
    componentType: meta.type,
    category: meta.cat,
    pack: "Draw.io",
    svg: getItemSvg(elements)
  });
});

// 2. aws-serverless.excalidrawlib (15 items)
const awsLib = JSON.parse(fs.readFileSync("public/aws-serverless.excalidrawlib", "utf8")).library;
const awsMeta = [
  { name: "AWS Lambda", type: "Serverless", cat: "Compute" },
  { name: "API Gateway", type: "APIGateway", cat: "Networking" },
  { name: "EventBridge", type: "EventStreaming", cat: "Messaging" },
  { name: "Step Functions", type: "WorkerService", cat: "Compute" },
  { name: "DynamoDB", type: "NoSQLDB", cat: "Database" },
  { name: "AWS Cognito", type: "Microservice", cat: "Compute" },
  { name: "Amazon S3", type: "ObjectStorage", cat: "Storage" },
  { name: "AWS IAM", type: "FirewallWAF", cat: "Networking" },
  { name: "Amazon SNS", type: "PubSub", cat: "Messaging" },
  { name: "Amazon SQS", type: "MessageQueue", cat: "Messaging" },
  { name: "Aurora Serverless", type: "PrimaryDB", cat: "Database" },
  { name: "Amazon Kinesis", type: "StreamProcessing", cat: "Messaging" },
  { name: "CloudWatch", type: "DistributedTracing", cat: "Compute" },
  { name: "AppSync GraphQL", type: "APIGateway", cat: "Networking" },
  { name: "AWS Fargate", type: "Docker", cat: "Compute" }
];
awsLib.forEach((item, idx) => {
  const meta = awsMeta[idx] || { name: `AWS Item ${idx + 1}`, type: "Serverless", cat: "AWS Serverless" };
  const elements = Array.isArray(item) ? item : item.elements;
  allItems.push({
    id: `aws-${idx}`,
    name: meta.name,
    componentType: meta.type,
    category: meta.cat,
    pack: "AWS Serverless",
    svg: getItemSvg(elements)
  });
});

// 3. architecture-diagram-components.excalidrawlib (11 items)
const archLib = JSON.parse(fs.readFileSync("public/architecture-diagram-components.excalidrawlib", "utf8")).libraryItems;
const archTypeMap = {
  "Slack": "Microservice",
  "Docker": "Docker",
  "GitHub": "WorkerService",
  "VPC": "ReverseProxy",
  "Private subnet": "ReverseProxy",
  "Public subnet": "ReverseProxy",
  "User": "WebClient",
  "Users": "MobileClient",
  "Device": "IoTDevice",
  "Server": "Server",
  "Email": "MessageQueue"
};
archLib.forEach((item, idx) => {
  const name = item.name || `Arch ${idx + 1}`;
  allItems.push({
    id: `arch-${idx}`,
    name,
    componentType: archTypeMap[name] || "Server",
    category: "Architecture",
    pack: "Architecture",
    svg: getItemSvg(item.elements)
  });
});

// 4. software-architecture (1).excalidrawlib (7 items)
const softLib = JSON.parse(fs.readFileSync("public/software-architecture (1).excalidrawlib", "utf8")).library;
const softMeta = [
  { name: "Event Stream Flow", type: "EventStreaming", cat: "Messaging" },
  { name: "Relational Database", type: "Database", cat: "Database" },
  { name: "Decision Gateway", type: "ReverseProxy", cat: "Networking" },
  { name: "Service Ingress Node", type: "APIGateway", cat: "Networking" },
  { name: "Document / Records", type: "ObjectStorage", cat: "Storage" },
  { name: "Web Browser Client", type: "WebClient", cat: "Clients" },
  { name: "Mobile Device Client", type: "MobileClient", cat: "Clients" }
];
softLib.forEach((item, idx) => {
  const meta = softMeta[idx] || { name: `Soft Item ${idx + 1}`, type: "Server", cat: "Software Patterns" };
  const elements = Array.isArray(item) ? item : item.elements;
  allItems.push({
    id: `soft-${idx}`,
    name: meta.name,
    componentType: meta.type,
    category: meta.cat,
    pack: "Software Patterns",
    svg: getItemSvg(elements)
  });
});

// 5. system-design.excalidrawlib (24 items)
const sysLib = JSON.parse(fs.readFileSync("public/system-design.excalidrawlib", "utf8")).library;
const sysMeta = [
  { name: "Generic Node", type: "Server", cat: "Compute" },
  { name: "Application Server", type: "Server", cat: "Compute" },
  { name: "Multi-Instance Server", type: "Microservice", cat: "Compute" },
  { name: "Dedicated Server", type: "Server", cat: "Compute" },
  { name: "Multi-Instance Cluster", type: "Kubernetes", cat: "Compute" },
  { name: "Network Gateway", type: "APIGateway", cat: "Networking" },
  { name: "Relational DB", type: "Database", cat: "Database" },
  { name: "Object Storage", type: "ObjectStorage", cat: "Storage" },
  { name: "Cold Storage", type: "BlockStorage", cat: "Storage" },
  { name: "Document DB", type: "MongoDB", cat: "Database" },
  { name: "Columnar DB", type: "Cassandra", cat: "Database" },
  { name: "Graph DB", type: "GraphDB", cat: "Database" },
  { name: "Stack Storage", type: "FileSystem", cat: "Storage" },
  { name: "Key-Value Cache", type: "Cache", cat: "Database" },
  { name: "Auth & IAM", type: "FirewallWAF", cat: "Security" },
  { name: "DNS Resolver", type: "DNS", cat: "Networking" },
  { name: "Load Balancer", type: "LoadBalancer", cat: "Networking" },
  { name: "Message Queue", type: "MessageQueue", cat: "Messaging" },
  { name: "Data Pipeline", type: "EventStreaming", cat: "Messaging" },
  { name: "Cloud Network", type: "ReverseProxy", cat: "Networking" },
  { name: "CDN Edge", type: "CDN", cat: "Networking" },
  { name: "Archive Storage", type: "ObjectStorage", cat: "Storage" },
  { name: "Mobile Client", type: "MobileClient", cat: "Clients" },
  { name: "Web Application", type: "WebClient", cat: "Clients" }
];
sysLib.forEach((item, idx) => {
  const meta = sysMeta[idx] || { name: `Sys Item ${idx + 1}`, type: "Server", cat: "System Design" };
  const elements = Array.isArray(item) ? item : item.elements;
  allItems.push({
    id: `sys-${idx}`,
    name: meta.name,
    componentType: meta.type,
    category: meta.cat,
    pack: "System Design",
    svg: getItemSvg(elements)
  });
});

console.log(`Generated ${allItems.length} high-quality centered items.`);

const tsContent = `// Auto-generated from Excalidraw libraries with high-precision centered SVGs
import { SysComponent } from "@/types/canvas"

export interface ExcalidrawLibraryItem {
  id: string
  name: string
  componentType: SysComponent
  category: string
  pack: string
  svg: string
}

export const EXCALIDRAW_PACKS = [
  "All",
  "AWS Serverless",
  "System Design",
  "Architecture",
  "Draw.io",
  "Software Patterns",
] as const

export type ExcalidrawPackName = typeof EXCALIDRAW_PACKS[number]

export const EXCALIDRAW_LIBRARY_ITEMS: ExcalidrawLibraryItem[] = [
${allItems.map(it => `  {
    id: ${JSON.stringify(it.id)},
    name: ${JSON.stringify(it.name)},
    componentType: SysComponent.${it.componentType},
    category: ${JSON.stringify(it.category)},
    pack: ${JSON.stringify(it.pack)},
    svg: ${JSON.stringify(it.svg)}
  }`).join(",\n")}
]
`;

fs.writeFileSync("lib/excalidraw-library.ts", tsContent, "utf8");
console.log("Successfully updated lib/excalidraw-library.ts with high quality centered SVGs!");
