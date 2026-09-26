const fs = require("fs");

function renderElementToSvg(el) {
  if (el.isDeleted) return "";
  const stroke = el.strokeColor || "#000000";
  const strokeWidth = el.strokeWidth || 1.5;
  const fill = el.backgroundColor === "transparent" ? "none" : (el.backgroundColor || "none");
  const strokeDash = el.strokeStyle === "dashed" ? 'stroke-dasharray="6 4"' : el.strokeStyle === "dotted" ? 'stroke-dasharray="2 2"' : "";

  if (el.type === "rectangle") {
    return `<rect x="${el.x.toFixed(1)}" y="${el.y.toFixed(1)}" width="${el.width.toFixed(1)}" height="${el.height.toFixed(1)}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" rx="4" ${strokeDash} stroke-linecap="round" stroke-linejoin="round" />`;
  }
  if (el.type === "ellipse") {
    const cx = (el.x + el.width / 2).toFixed(1);
    const cy = (el.y + el.height / 2).toFixed(1);
    const rx = (el.width / 2).toFixed(1);
    const ry = (el.height / 2).toFixed(1);
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" ${strokeDash} />`;
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
      el.points.forEach((pt, i) => {
        const px = (el.x + pt[0]).toFixed(1);
        const py = (el.y + pt[1]).toFixed(1);
        d += (i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`);
      });
      return `<path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" ${strokeDash} stroke-linecap="round" stroke-linejoin="round" />`;
    }
  }
  if (el.type === "text") {
    if (el.text && el.text.length > 30) return "";
    const lines = (el.text || "").split("\n");
    const fontSize = Math.min(el.fontSize || 14, 24);
    const lineHeight = fontSize * 1.2;
    const textFill = el.strokeColor || "#000000";
    let tspans = "";
    lines.forEach((line, i) => {
      const ly = (el.y + (i + 1) * lineHeight).toFixed(1);
      const safeLine = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      tspans += `<tspan x="${el.x.toFixed(1)}" y="${ly}">${safeLine}</tspan>`;
    });
    return `<text font-family="sans-serif" font-size="${fontSize}" font-weight="600" fill="${textFill}">${tspans}</text>`;
  }
  return "";
}

function getItemSvg(elements) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const validEls = elements.filter(e => !e.isDeleted);
  if (validEls.length === 0) return "";

  validEls.forEach(el => {
    minX = Math.min(minX, el.x);
    minY = Math.min(minY, el.y);
    maxX = Math.max(maxX, el.x + (el.width || 0));
    maxY = Math.max(maxY, el.y + (el.height || 0));
    if (el.points) {
      el.points.forEach(pt => {
        minX = Math.min(minX, el.x + pt[0]);
        minY = Math.min(minY, el.y + pt[1]);
        maxX = Math.max(maxX, el.x + pt[0]);
        maxY = Math.max(maxY, el.y + pt[1]);
      });
    }
  });

  const pad = 10;
  const w = Math.max(maxX - minX + pad * 2, 36);
  const h = Math.max(maxY - minY + pad * 2, 36);
  const vbX = (minX - pad).toFixed(1);
  const vbY = (minY - pad).toFixed(1);
  const vbW = w.toFixed(1);
  const vbH = h.toFixed(1);

  const inner = validEls.map(renderElementToSvg).filter(Boolean).join("");
  return `<svg viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

const allItems = [];

// 1. drwnio.excalidrawlib (18 items)
const drwnioLib = JSON.parse(fs.readFileSync("public/drwnio.excalidrawlib", "utf8")).library;
const drwnioMeta = [
  { name: "Storage Bucket", type: "ObjectStorage", cat: "Draw.io" },
  { name: "SQL Database", type: "Database", cat: "Draw.io" },
  { name: "Server Cluster", type: "Server", cat: "Draw.io" },
  { name: "JSON Data Service", type: "WorkerService", cat: "Draw.io" },
  { name: "Kubernetes Cluster", type: "Kubernetes", cat: "Draw.io" },
  { name: "Backend Engine", type: "Microservice", cat: "Draw.io" },
  { name: "App Service", type: "Server", cat: "Draw.io" },
  { name: "Cloud Compute", type: "Serverless", cat: "Draw.io" },
  { name: "Microservice Mesh", type: "Microservice", cat: "Draw.io" },
  { name: "Message Queue", type: "MessageQueue", cat: "Draw.io" },
  { name: "Go Worker", type: "WorkerService", cat: "Draw.io" },
  { name: "Docker Container", type: "Docker", cat: "Draw.io" },
  { name: "Load Balancer", type: "LoadBalancer", cat: "Draw.io" },
  { name: "Compute Instance", type: "Server", cat: "Draw.io" },
  { name: "Event Bus", type: "EventStreaming", cat: "Draw.io" },
  { name: "Python Engine", type: "StreamProcessing", cat: "Draw.io" },
  { name: "Cloud CDN", type: "CDN", cat: "Draw.io" },
  { name: "DNS Resolver", type: "DNS", cat: "Draw.io" }
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

console.log(`Generated ${allItems.length} total items.`);

// Output TypeScript file
const tsContent = `// Auto-generated from Excalidraw libraries:
// 1. drwnio.excalidrawlib (18 items)
// 2. aws-serverless.excalidrawlib (15 items)
// 3. architecture-diagram-components.excalidrawlib (11 items)
// 4. software-architecture (1).excalidrawlib (7 items)
// 5. system-design.excalidrawlib (24 items)
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
console.log("Successfully generated lib/excalidraw-library.ts!");
