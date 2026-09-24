import { Skeleton } from "@/components/ui/skeleton"
import {
  Circle,
  MousePointer2,
  Hand,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
  Spline,
  CornerDownRight,
  LayoutGrid,
  Layers,
  Move,
  Eraser,
} from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas"

interface ToolbarProps {
  canvasState: CanvasState
  setCanvasState: (newState: CanvasState) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  isLibraryOpen: boolean
  onToggleLibrary: () => void
  arrowStyle?: "curvy" | "sharp"
  onToggleArrowStyle?: () => void
  onSelectAllArchitecture?: () => void
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canRedo,
  canUndo,
  isLibraryOpen,
  onToggleLibrary,
  arrowStyle = "curvy",
  onToggleArrowStyle,
  onSelectAllArchitecture,
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-3 flex flex-col gap-y-4 z-40 select-none">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1.5 flex gap-y-1.5 flex-col items-center shadow-lg border border-neutral-200">
        <ToolButton
          label="Select (V)"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="Pan / Move Canvas (H or Hold Space)"
          icon={Hand}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Panning,
              origin: { x: 0, y: 0 },
              cameraOrigin: { x: 0, y: 0 },
            })
          }
          isActive={canvasState.mode === CanvasMode.Panning}
        />
        <ToolButton
          label="Architecture Section / Zone (S)"
          icon={Layers}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Section,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Section
          }
        />
        <ToolButton
          label="Text (T)"
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label="Sticky note (N)"
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />
        <ToolButton
          label="Rectangle (R)"
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label="Circle (O)"
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          label="Pen (P)"
          icon={Pencil}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
        <ToolButton
          label="Eraser (E) — Click or drag to erase"
          icon={Eraser}
          onClick={() => setCanvasState({ mode: CanvasMode.Eraser })}
          isActive={canvasState.mode === CanvasMode.Eraser}
        />
        <ToolButton
          label={`Connect (${arrowStyle === "sharp" ? "Sharp" : "Curvy"}) [C]`}
          icon={arrowStyle === "sharp" ? CornerDownRight : Spline}
          onClick={() => setCanvasState({ mode: CanvasMode.Connecting, from: null })}
          isActive={canvasState.mode === CanvasMode.Connecting}
        />
        {onToggleArrowStyle && (
          <ToolButton
            label={`Arrow Style: ${arrowStyle === "sharp" ? "Sharp (90°)" : "Curvy"} — Click to switch`}
            icon={arrowStyle === "sharp" ? CornerDownRight : Spline}
            onClick={onToggleArrowStyle}
          />
        )}
      </div>

      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1.5 flex flex-col gap-y-1.5 items-center shadow-lg border border-neutral-200">
        <ToolButton
          label={isLibraryOpen ? "Close Library (L)" : "Architecture Library (L)"}
          icon={LayoutGrid}
          onClick={onToggleLibrary}
          isActive={isLibraryOpen}
        />
        {onSelectAllArchitecture && (
          <ToolButton
            label="Move Entire Architecture (Ctrl+A)"
            icon={Move}
            onClick={onSelectAllArchitecture}
          />
        )}
      </div>

      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1.5 flex flex-col gap-y-1 items-center shadow-lg border border-neutral-200">
        <ToolButton
          label="Undo (Ctrl+Z)"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo (Ctrl+Shift+Z)"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  )
}

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-3 flex flex-col gap-y-4 bg-white/90 h-[380px] w-[52px] shadow-lg rounded-2xl border border-neutral-200" />
  )
}
