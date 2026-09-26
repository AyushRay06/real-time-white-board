"use client"

import React, { useRef } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { NoteLayer } from "@/types/canvas"
import { cn, colorToCss, getContrastingTextColor, getFontFamilyClass, getFontFamilyCss } from "@/lib/utils"
import { useMutation } from "@liveblocks/react/suspense"

interface NoteProps {
  id: string
  layer: NoteLayer
  onPointDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Note = ({ layer, onPointDown, id, selectionColor }: NoteProps) => {
  const {
    x,
    y,
    height,
    width,
    fill,
    value,
    fontFamily = "handwriting",
    fontSize = 18,
    fontWeight = "normal",
    textAlign = "left",
  } = layer

  const editableRef = useRef<HTMLElement>(null)

  const updateValue = useMutation(
    ({ storage }, newValue: string) => {
      const liveLayers = storage.get("layers")
      liveLayers.get(id)?.set("value", newValue)
    },
    [id]
  )

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  const bgColor = fill ? colorToCss(fill) : "#fef08a"
  const textColor = fill ? getContrastingTextColor(fill) : "#1c1917"
  const gradId = `curl-grad-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`
  const shadowId = `curl-shadow-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointDown(e, id)}
      style={{
        outline: selectionColor ? `2px solid ${selectionColor}` : "none",
        outlineOffset: "4px",
        borderRadius: "4px",
        overflow: "visible",
      }}
      className="select-none transition-shadow"
    >
      <div className="relative w-full h-full select-none">
        {/* ── 3D LIFTED CORNER CAST SHADOWS (Behind the note) ── */}
        {/* 1. Deep lifted shadow under the peeling bottom-right corner */}
        <div
          className="absolute -bottom-2 -right-1 w-3/5 h-9 pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.14) 55%, transparent 75%)",
            transform: "rotate(6deg) skewX(8deg)",
            filter: "blur(4.5px)",
          }}
        />

        {/* 2. Soft contact shadow along bottom-left */}
        <div
          className="absolute -bottom-1 left-2 w-2/5 h-4 pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
            filter: "blur(3px)",
          }}
        />

        {/* ── MAIN STICKY NOTE PAPER BODY ── */}
        <div
          className="relative w-full h-full flex flex-col rounded-[2px] transition-transform duration-100"
          style={{
            backgroundColor: bgColor,
            // 3D paper lighting: light from top-left, gentle curvature across the body
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 22%, rgba(0,0,0,0.01) 70%, rgba(0,0,0,0.08) 100%)",
            // Realistic paper edge caliper (top highlight, soft bottom shadow)
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.08), 0 6px 14px -2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08)",
            // Cutout at bottom-right corner where paper has curled away
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0% 100%)",
          }}
        >
          {/* Top Adhesive Glue Strip (Glued flat to the surface) */}
          <div className="w-full h-5 shrink-0 bg-black/[0.04] border-b border-black/[0.06] flex items-center px-2">
            <div className="w-full h-[1px] bg-white/30 rounded-full" />
          </div>

          {/* Note Writing Area */}
          <div className="w-full flex-1 p-3 pt-1 pb-6 pr-8 flex flex-col justify-start overflow-hidden">
            <ContentEditable
              innerRef={editableRef as any}
              html={value !== undefined ? value : ""}
              onChange={handleContentChange}
              onKeyDown={(e) => e.stopPropagation()}
              className={cn(
                "w-full h-full outline-none leading-relaxed tracking-wide cursor-text overflow-y-auto no-scrollbar",
                "empty:before:content-['Take_a_note...'] empty:before:opacity-40 empty:before:pointer-events-none",
                getFontFamilyClass(fontFamily)
              )}
              style={{
                fontFamily: getFontFamilyCss(fontFamily),
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight === "bold" ? 700 : 400,
                textAlign: textAlign,
                color: textColor,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            />
          </div>
        </div>

        {/* ── 3D FLYING / CURLED-UP CORNER FLAP ── */}
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none select-none overflow-visible">
          <svg
            viewBox="0 0 32 32"
            className="w-full h-full overflow-visible"
            style={{
              filter: "drop-shadow(-2.5px -2.5px 3px rgba(0,0,0,0.22))",
            }}
          >
            <defs>
              {/* 3D cylindrical lighting across the curled flap */}
              <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={bgColor} stopOpacity="1" />
                <stop offset="28%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="55%" stopColor={bgColor} stopOpacity="1" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
              </linearGradient>

              {/* Surface cavity shadow underneath the curled paper */}
              <radialGradient id={shadowId} cx="20%" cy="20%" r="80%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#000000" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 1. Dark cavity shadow on the surface where corner lifted up */}
            <path
              d="M 0 32 Q 16 26 32 0 L 32 32 Z"
              fill={`url(#${shadowId})`}
            />

            {/* 2. Base curled paper flap */}
            <path
              d="M 0 32 Q 12 12 32 0 C 26 12 16 24 0 32 Z"
              fill={bgColor}
            />

            {/* 3. 3D cylindrical shine and specular ridge on the curl */}
            <path
              d="M 0 32 Q 12 12 32 0 C 26 12 16 24 0 32 Z"
              fill={`url(#${gradId})`}
            />

            {/* 4. Crisp paper edge rim highlight */}
            <path
              d="M 32 0 C 26 12 16 24 0 32"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="0.8"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </foreignObject>
  )
}
