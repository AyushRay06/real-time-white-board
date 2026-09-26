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

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointDown(e, id)}
      style={{
        outline: selectionColor ? `2px solid ${selectionColor}` : "none",
        outlineOffset: "3px",
        borderRadius: "3px",
      }}
      className="select-none transition-shadow drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <div
        className="relative w-full h-full flex flex-col overflow-hidden rounded-[3px] border border-black/[0.08] group"
        style={{
          backgroundColor: bgColor,
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.06) 18%, rgba(0,0,0,0.02) 80%, rgba(0,0,0,0.08) 100%)",
        }}
      >
        {/* Top Adhesive Glue Strip Band (Authentic 3M Post-It touch) */}
        <div className="w-full h-5 shrink-0 bg-black/[0.035] border-b border-black/[0.06] flex items-center px-2">
          {/* Subtle paper highlight */}
          <div className="w-full h-[1px] bg-white/25 rounded-full" />
        </div>

        {/* Note Writing Area */}
        <div className="w-full flex-1 p-3 pt-1.5 pb-4 flex flex-col justify-start overflow-hidden">
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

        {/* Bottom-Right Dog-Ear (Curled / Folded Sticky Note Corner) */}
        <div className="absolute bottom-0 right-0 w-4.5 h-4.5 pointer-events-none overflow-hidden select-none">
          {/* Under-crease shadow representing the exposed surface below the fold */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, transparent 48%, rgba(0,0,0,0.14) 50%, rgba(0,0,0,0.28) 100%)",
            }}
          />
          {/* The folded triangular paper flap */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 shadow-[-1.5px_-1.5px_3px_rgba(0,0,0,0.2)]"
            style={{
              backgroundColor: bgColor,
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.14) 100%)",
              clipPath: "polygon(0% 100%, 100% 0%, 0% 0%)",
              filter: "brightness(0.88)",
              borderBottomRightRadius: "1px",
            }}
          />
        </div>
      </div>
    </foreignObject>
  )
}
