"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  Database,
  Code2,
  Calculator,
  GitBranch,
  Server,
  Play,
  Check,
  Cpu,
} from "lucide-react"

type ActiveTab = "zones" | "erd" | "apis" | "estimator" | "flow"

export function ArchitectureInteractive() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("zones")

  // Interactive state for Zones
  const [activePreset, setActivePreset] = useState<"vpc" | "subnet" | "k8s" | "db">("vpc")

  // Interactive state for Capacity Estimator
  const [dau, setDau] = useState<number>(5) // in millions
  const readQps = Math.round((dau * 1_000_000 * 20) / 86400)
  const writeQps = Math.round((dau * 1_000_000 * 2) / 86400)
  const storageGbPerMonth = Math.round((dau * 1_000_000 * 2 * 1.5 * 30) / (1024 * 1024))

  // Interactive state for Sequence Flow
  const [activeStep, setActiveStep] = useState<number>(1)
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(false)

  const handlePlayFlow = () => {
    if (isPlayingFlow) return
    setIsPlayingFlow(true)
    setActiveStep(1)
    let current = 1
    const interval = setInterval(() => {
      current++
      if (current > 5) {
        clearInterval(interval)
        setIsPlayingFlow(false)
        setActiveStep(5)
      } else {
        setActiveStep(current)
      }
    }, 700)
  }

  // Interactive state for API Spec
  const [activeMethod, setActiveMethod] = useState<"GET" | "POST" | "DELETE">("POST")

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-8">
        <button
          onClick={() => setActiveTab("zones")}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "zones"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Architecture Zones</span>
        </button>

        <button
          onClick={() => setActiveTab("erd")}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "erd"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Database ERD Schema</span>
        </button>

        <button
          onClick={() => setActiveTab("apis")}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "apis"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>API Endpoint Specs</span>
        </button>

        <button
          onClick={() => setActiveTab("estimator")}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "estimator"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Capacity Estimator</span>
        </button>

        <button
          onClick={() => setActiveTab("flow")}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "flow"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Sequence Flow Steps</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Top Control Bar of the Interactive Canvas */}
        <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
            <span className="text-xs font-semibold text-slate-500 ml-2 font-mono">
              system-design://{activeTab}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Architecture Simulator</span>
          </div>
        </div>

        {/* Tab 1: Architecture Zones */}
        {activeTab === "zones" && (
          <div className="p-6 sm:p-10 min-h-[420px] flex flex-col justify-between bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  Boundary Enclosures & Subnet Presets
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click a preset to test dynamic containment and visual grouping.
                </p>
              </div>

              {/* Preset Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActivePreset("vpc")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePreset === "vpc" ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  VPC Network
                </button>
                <button
                  onClick={() => setActivePreset("subnet")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePreset === "subnet" ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Private Subnet
                </button>
                <button
                  onClick={() => setActivePreset("k8s")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePreset === "k8s" ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  K8s Cluster
                </button>
                <button
                  onClick={() => setActivePreset("db")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePreset === "db" ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Database Tier
                </button>
              </div>
            </div>

            {/* Interactive Zone Canvas Preview */}
            <motion.div
              layout
              className={`relative rounded-2xl border-2 border-dashed p-6 transition-all duration-300 ${
                activePreset === "vpc"
                  ? "border-indigo-400 bg-indigo-50/25"
                  : activePreset === "subnet"
                  ? "border-emerald-400 bg-emerald-50/25"
                  : activePreset === "k8s"
                  ? "border-blue-400 bg-blue-50/25"
                  : "border-amber-400 bg-amber-50/25"
              }`}
            >
              {/* Zone Tag Badge */}
              <div
                className={`absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-2xs text-white ${
                  activePreset === "vpc"
                    ? "bg-indigo-600"
                    : activePreset === "subnet"
                    ? "bg-emerald-600"
                    : activePreset === "k8s"
                    ? "bg-blue-600"
                    : "bg-amber-600"
                }`}
              >
                {activePreset === "vpc" && "Virtual Private Cloud (10.0.0.0/16)"}
                {activePreset === "subnet" && "Private Subnet (AZ-1a)"}
                {activePreset === "k8s" && "Production Kubernetes Cluster"}
                {activePreset === "db" && "Encrypted Database Tier"}
              </div>

              {/* Contained Components */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">API Gateway</p>
                    <p className="text-[10px] text-slate-400 font-mono">Port :443</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Order Service</p>
                    <p className="text-[10px] text-slate-400 font-mono">3 Replicas</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Primary Postgres</p>
                    <p className="text-[10px] text-slate-400 font-mono">Multi-AZ</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Auto-capture: Enabled (Moving zone moves all 3 child components)</span>
                <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                  Fit to Contents ⤢
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Tab 2: Database Schema & ERD */}
        {activeTab === "erd" && (
          <div className="p-6 sm:p-10 min-h-[420px] flex flex-col justify-between bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="mb-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-600" />
                Relational Schema Cards & Foreign Key Connectors
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Define tables with PK/FK indicators, auto-scaling rows, and relational visual handles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Table 1: users */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">users</span>
                  <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    PostgreSQL
                  </span>
                </div>
                <div className="p-3 space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between py-1 px-2 rounded bg-amber-50/70 border border-amber-200/60 text-amber-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded font-sans font-bold">PK</span>
                      id
                    </span>
                    <span className="text-slate-400 text-[11px]">uuid</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-50 text-slate-700">
                    <span>email</span>
                    <span className="text-slate-400 text-[11px]">varchar(255)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-50 text-slate-700">
                    <span>password_hash</span>
                    <span className="text-slate-400 text-[11px]">varchar(60)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-50 text-slate-700">
                    <span>created_at</span>
                    <span className="text-slate-400 text-[11px]">timestamp</span>
                  </div>
                </div>
              </div>

              {/* Table 2: orders */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm relative">
                <div className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">orders</span>
                  <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    PostgreSQL
                  </span>
                </div>
                <div className="p-3 space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between py-1 px-2 rounded bg-amber-50/70 border border-amber-200/60 text-amber-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded font-sans font-bold">PK</span>
                      id
                    </span>
                    <span className="text-slate-400 text-[11px]">uuid</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded bg-indigo-50 border border-indigo-200 text-indigo-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="text-[9px] bg-indigo-600 text-white px-1 rounded font-sans font-bold">FK</span>
                      user_id
                    </span>
                    <span className="text-indigo-400 text-[11px]">uuid (→ users.id)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-50 text-slate-700">
                    <span>total_amount</span>
                    <span className="text-slate-400 text-[11px]">numeric(10,2)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-50 text-slate-700">
                    <span>status</span>
                    <span className="text-slate-400 text-[11px]">order_status_enum</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <Check className="w-3.5 h-3.5" /> 1-to-Many Relational Foreign Key Active
              </span>
              <span>Tight auto-hug rows • Proportional scaling enabled</span>
            </div>
          </div>
        )}

        {/* Tab 3: API Endpoint Specs */}
        {activeTab === "apis" && (
          <div className="p-6 sm:p-10 min-h-[420px] flex flex-col justify-between bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  RESTful Endpoint Contract Card
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Document HTTP methods, paths, status codes, and latency SLOs directly on the canvas.
                </p>
              </div>

              {/* Method Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveMethod("GET")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMethod === "GET" ? "bg-emerald-600 text-white shadow-2xs" : "text-slate-600"
                  }`}
                >
                  GET
                </button>
                <button
                  onClick={() => setActiveMethod("POST")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMethod === "POST" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600"
                  }`}
                >
                  POST
                </button>
                <button
                  onClick={() => setActiveMethod("DELETE")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMethod === "DELETE" ? "bg-red-600 text-white shadow-2xs" : "text-slate-600"
                  }`}
                >
                  DELETE
                </button>
              </div>
            </div>

            {/* Interactive API Card Preview */}
            <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-5 shadow-sm max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                      activeMethod === "POST"
                        ? "bg-indigo-100 text-indigo-700"
                        : activeMethod === "GET"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {activeMethod}
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-800">
                    {activeMethod === "POST" && "/api/v1/orders/checkout"}
                    {activeMethod === "GET" && "/api/v1/orders/:id"}
                    {activeMethod === "DELETE" && "/api/v1/orders/:id"}
                  </span>
                </div>

                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {activeMethod === "POST" ? "201 Created" : "200 OK"}
                </span>
              </div>

              <div className="py-3 grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Expected Latency
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">P99 &lt; 35ms</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Authentication
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">Bearer JWT / OAuth2</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl text-slate-200 font-mono text-[11px] overflow-x-auto">
                <span className="text-slate-400">// Request Payload Contract</span>
                <p className="text-indigo-300">
                  {activeMethod === "POST"
                    ? '{\n  "cartId": "c_99812",\n  "paymentMethod": "pm_card_visa",\n  "currency": "USD"\n}'
                    : '{\n  "query": "include_shipment_details=true"\n}'}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              Integrate with back-of-the-envelope estimations and sequence arrows directly
            </div>
          </div>
        )}

        {/* Tab 4: Capacity Estimator */}
        {activeTab === "estimator" && (
          <div className="p-6 sm:p-10 min-h-[420px] flex flex-col justify-between bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]">
            <div>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-indigo-600" />
                    Live Back-of-the-Envelope Capacity Estimator
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Adjust the slider to simulate traffic scaling and storage growth in real time.
                  </p>
                </div>

                <div className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700">
                  {dau} Million DAU
                </div>
              </div>

              {/* Range Slider */}
              <div className="my-6">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                  <span>1M Users</span>
                  <span className="text-indigo-600 font-bold">{dau}M Daily Active Users</span>
                  <span>50M Users</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={dau}
                  onChange={(e) => setDau(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            {/* Calculated Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-2">
              <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Read QPS (20:1 Ratio)
                </span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                  {readQps.toLocaleString()}{" "}
                  <span className="text-xs font-semibold text-slate-400">req/s</span>
                </p>
                <span className="text-[10px] text-emerald-600 font-medium">Cached at CDN layer</span>
              </div>

              <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Write QPS
                </span>
                <p className="text-2xl font-extrabold text-indigo-600 mt-1 font-mono">
                  {writeQps.toLocaleString()}{" "}
                  <span className="text-xs font-semibold text-slate-400">req/s</span>
                </p>
                <span className="text-[10px] text-indigo-500 font-medium">Distributed message queue</span>
              </div>

              <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Storage Growth / Mo
                </span>
                <p className="text-2xl font-extrabold text-purple-600 mt-1 font-mono">
                  {storageGbPerMonth.toLocaleString()}{" "}
                  <span className="text-xs font-semibold text-slate-400">GB</span>
                </p>
                <span className="text-[10px] text-purple-500 font-medium">1.5 KB payload avg</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Standard for System Design Interviews & RFC Documents</span>
              <span className="font-semibold text-slate-700">Auto-calculated</span>
            </div>
          </div>
        )}

        {/* Tab 5: Sequence Flow Numbers */}
        {activeTab === "flow" && (
          <div className="p-6 sm:p-10 min-h-[420px] flex flex-col justify-between bg-white bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-indigo-600" />
                  Sequence Flow Step Badges & Execution Tracing
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trace request paths across architectural tiers with ordered numeric markers.
                </p>
              </div>

              <button
                onClick={handlePlayFlow}
                disabled={isPlayingFlow}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isPlayingFlow ? "Simulating Flow..." : "Simulate Flow Trace"}</span>
              </button>
            </div>

            {/* Sequence Flow Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-4 relative">
              {/* Step 1 */}
              <div
                className={`p-3 rounded-2xl border-2 transition-all duration-300 text-center relative ${
                  activeStep >= 1
                    ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                    : "border-slate-200 bg-white opacity-60"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">
                  1
                </div>
                <p className="text-xs font-bold text-slate-800">Browser</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">HTTPS Request</p>
              </div>

              {/* Step 2 */}
              <div
                className={`p-3 rounded-2xl border-2 transition-all duration-300 text-center relative ${
                  activeStep >= 2
                    ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                    : "border-slate-200 bg-white opacity-60"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">
                  2
                </div>
                <p className="text-xs font-bold text-slate-800">CloudFront CDN</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">TLS Edge Term</p>
              </div>

              {/* Step 3 */}
              <div
                className={`p-3 rounded-2xl border-2 transition-all duration-300 text-center relative ${
                  activeStep >= 3
                    ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                    : "border-slate-200 bg-white opacity-60"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">
                  3
                </div>
                <p className="text-xs font-bold text-slate-800">API Gateway</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Rate Limit & Auth</p>
              </div>

              {/* Step 4 */}
              <div
                className={`p-3 rounded-2xl border-2 transition-all duration-300 text-center relative ${
                  activeStep >= 4
                    ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                    : "border-slate-200 bg-white opacity-60"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">
                  4
                </div>
                <p className="text-xs font-bold text-slate-800">Redis Cache</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Cache Lookup</p>
              </div>

              {/* Step 5 */}
              <div
                className={`p-3 rounded-2xl border-2 transition-all duration-300 text-center relative ${
                  activeStep >= 5
                    ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                    : "border-slate-200 bg-white opacity-60"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">
                  5
                </div>
                <p className="text-xs font-bold text-slate-800">PostgreSQL DB</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Read Replica</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                Current Active Step: #{activeStep}
              </span>
              <span>1-click sequence step badges available on the canvas toolbar</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
