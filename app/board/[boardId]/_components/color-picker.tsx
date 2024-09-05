"use client"

import { colorToCss } from "@/lib/utils"
import { Color } from "@/types/canvas"

interface ColorPickerProps {
  onChange: (color: Color) => void
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[200px] border-r border-neutral-200 shadow-lg">
      <ColorButton
        onClick={onChange}
        color={{
          r: 225,
          g: 51,
          b: 51,
        }}
      />

      <ColorButton
        onClick={onChange}
        color={{
          r: 225,
          g: 255,
          b: 51,
        }}
      />
      <ColorButton
        onClick={onChange}
        color={{
          r: 153,
          g: 255,
          b: 51,
        }}
      />
      <ColorButton
        onClick={onChange}
        color={{
          r: 153,
          g: 255,
          b: 255,
        }}
      />
      <ColorButton
        onClick={onChange}
        color={{
          r: 178,
          g: 102,
          b: 255,
        }}
      />
      <ColorButton
        onClick={onChange}
        color={{
          r: 255,
          g: 153,
          b: 255,
        }}
      />
      <ColorButton
        onClick={onChange}
        color={{
          r: 192,
          g: 192,
          b: 192,
        }}
      />
      <ColorButton
        onClick={onChange}
        color={{
          r: 0,
          g: 0,
          b: 0,
        }}
      />
      <ColorButton
        onClick={onChange}
        color={{
          r: 224,
          g: 224,
          b: 224,
        }}
      />
    </div>
  )
}

interface ColorButtonProps {
  onClick: (color: Color) => void
  color: Color
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-3 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: colorToCss(color) }}
      />
    </button>
  )
}
