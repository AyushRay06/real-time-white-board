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
  Play,
  Pause,
  TableProperties,
} from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas"
import { useSimulation } from "./simulation-context"
import { useCanvasTheme } from "./canvas-theme-context"
import { cn } from "@/lib/utils"

interface ToolbarProps {
  canvasState: CanvasState
  setCanvasState: (newState: CanvasState) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  isLibraryOpen: boolean
  onToggleLibrary: () => void
  onOpenSpecs?: () => void
  isSpecsActive?: boolean
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
  onOpenSpecs,
  isSpecsActive,
  arrowStyle = "curvy",
  onToggleArrowStyle,
  onSelectAllArchitecture,
}: ToolbarProps) => {
  const { isSimulating, toggleSimulate } = useSimulation()
  const { theme } = useCanvasTheme()

  const groupClass =
    theme === "dark"
      ? "bg-slate-900/95 backdrop-blur-md rounded-2xl p-1.5 flex flex-col gap-y-1 items-center shadow-2xl border border-slate-800"
      : "bg-white/95 backdrop-blur-md rounded-2xl p-1.5 flex flex-col gap-y-1 items-center shadow-lg border border-neutral-200"

  const dividerClass = theme === "dark" ? "bg-slate-800" : "bg-neutral-200"

  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-3 flex flex-col gap-y-3 z-40 select-none">
      {/* ── Group 1: Select & Navigation ── */}
      <div className={groupClass}>
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
      </div>

      {/* ── Group 2: System Architecture Tools ── */}
      <div className={groupClass}>
        <ToolButton
          label={isLibraryOpen && !isSpecsActive ? "Close Architecture Library (L)" : "Architecture Components Library (L)"}
          icon={LayoutGrid}
          onClick={onToggleLibrary}
          isActive={isLibraryOpen && !isSpecsActive}
        />
        {onOpenSpecs && (
          <ToolButton
            label="System Design Specs & Tables (Requirements, API, Estimations)"
            icon={TableProperties}
            onClick={onOpenSpecs}
            isActive={isLibraryOpen && !!isSpecsActive}
          />
        )}
        <ToolButton
          label="Architecture Section / Zone Box (S)"
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
          label={`Connect Arrow (${arrowStyle === "sharp" ? "Sharp 90°" : "Curvy"}) [C]`}
          icon={arrowStyle === "sharp" ? CornerDownRight : Spline}
          onClick={() => {
            if (canvasState.mode === CanvasMode.Connecting && onToggleArrowStyle) {
              onToggleArrowStyle()
            } else {
              setCanvasState({ mode: CanvasMode.Connecting, from: null })
            }
          }}
          isActive={canvasState.mode === CanvasMode.Connecting}
        />
        {onSelectAllArchitecture && (
          <ToolButton
            label="Move / Select Entire Architecture (Ctrl+A)"
            icon={Move}
            onClick={onSelectAllArchitecture}
          />
        )}
        <ToolButton
          label={isSimulating ? "Pause Request Trace" : "Simulate Request Trace Flow"}
          icon={isSimulating ? Pause : Play}
          onClick={toggleSimulate}
          isActive={isSimulating}
        />
      </div>

      {/* ── Group 3: Shapes, Notes & Freehand ── */}
      <div className={groupClass}>
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
          label="Pen / Sketch (P)"
          icon={Pencil}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
      </div>

      {/* ── Group 4: Eraser & History ── */}
      <div className={groupClass}>
        <ToolButton
          label="Eraser (E) — Click or swipe to erase"
          icon={Eraser}
          onClick={() => setCanvasState({ mode: CanvasMode.Eraser })}
          isActive={canvasState.mode === CanvasMode.Eraser}
        />
        <div className={cn("w-5 h-px my-0.5", dividerClass)} />
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
