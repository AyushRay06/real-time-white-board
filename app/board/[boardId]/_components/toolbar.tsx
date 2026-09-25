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
  Layers,
  Move,
  Eraser,
  Play,
  Pause,
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
  arrowStyle?: "curvy" | "sharp"
  onToggleArrowStyle?: () => void
  onSelectAllArchitecture?: () => void
  onInsertLayerDirectly?: (layerType: LayerType) => void
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canRedo,
  canUndo,
  arrowStyle = "curvy",
  onToggleArrowStyle,
  onSelectAllArchitecture,
  onInsertLayerDirectly,
}: ToolbarProps) => {
  const { isSimulating, toggleSimulate } = useSimulation()
  const { theme } = useCanvasTheme()

  const groupClass =
    theme === "dark"
      ? "bg-slate-900/90 backdrop-blur-md rounded-xl p-1 flex flex-col gap-y-0.5 items-center shadow-lg border border-slate-800/80"
      : "bg-white/90 backdrop-blur-md rounded-xl p-1 flex flex-col gap-y-0.5 items-center shadow-md border border-neutral-200/80"

  const dividerClass = theme === "dark" ? "bg-slate-800" : "bg-neutral-200"

  const handleInsert = (layerType: LayerType) => {
    if (onInsertLayerDirectly) {
      onInsertLayerDirectly(layerType)
    } else {
      setCanvasState({
        mode: CanvasMode.Inserting,
        layerType: layerType as any,
      })
    }
  }

  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-3 flex flex-col gap-y-2 z-40 select-none">
      {/* ── Group 1: Select & Navigation ── */}
      <div className={groupClass}>
        <ToolButton
          label="Select"
          shortcut="F1"
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
          label="Pan Canvas"
          shortcut="F2"
          icon={Hand}
          onClick={() =>
            setCanvasState(
              canvasState.mode === CanvasMode.Panning
                ? { mode: CanvasMode.None }
                : {
                    mode: CanvasMode.Panning,
                    origin: { x: 0, y: 0 },
                    cameraOrigin: { x: 0, y: 0 },
                  }
            )
          }
          isActive={canvasState.mode === CanvasMode.Panning}
        />
      </div>

      {/* ── Group 2: Shapes & Content (Instant 1-Click Placement) ── */}
      <div className={groupClass}>
        <ToolButton
          label="Text"
          shortcut="F3"
          icon={Type}
          onClick={() => handleInsert(LayerType.Text)}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label="Sticky Note"
          shortcut="F4"
          icon={StickyNote}
          onClick={() => handleInsert(LayerType.Note)}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />
        <ToolButton
          label="Rectangle"
          shortcut="F5"
          icon={Square}
          onClick={() => handleInsert(LayerType.Rectangle)}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label="Circle"
          shortcut="F6"
          icon={Circle}
          onClick={() => handleInsert(LayerType.Ellipse)}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          label="Pen / Sketch"
          shortcut="F7"
          icon={Pencil}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
      </div>

      {/* ── Group 3: Architecture Lines & Section Zones ── */}
      <div className={groupClass}>
        <ToolButton
          label={`Connect Arrow (${arrowStyle === "sharp" ? "Sharp 90°" : "Curvy"})`}
          shortcut="F8"
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
        <ToolButton
          label="Architecture Zone Box"
          shortcut="F9"
          icon={Layers}
          onClick={() => handleInsert(LayerType.Section)}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Section
          }
        />
        <ToolButton
          label={isSimulating ? "Pause Request Trace" : "Simulate Request Trace Flow"}
          icon={isSimulating ? Pause : Play}
          onClick={toggleSimulate}
          isActive={isSimulating}
        />
        {onSelectAllArchitecture && (
          <ToolButton
            label="Move / Select Entire Architecture"
            icon={Move}
            onClick={onSelectAllArchitecture}
          />
        )}
      </div>

      {/* ── Group 4: Eraser & History ── */}
      <div className={groupClass}>
        <ToolButton
          label="Eraser"
          shortcut="F10"
          icon={Eraser}
          onClick={() => setCanvasState({ mode: CanvasMode.Eraser })}
          isActive={canvasState.mode === CanvasMode.Eraser}
        />
        <div className={cn("w-4 h-px my-0.5", dividerClass)} />
        <ToolButton
          label="Undo (Ctrl+Z)"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo (Ctrl+Y)"
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
    <div className="absolute top-1/2 -translate-y-1/2 left-3 flex flex-col gap-y-1.5 bg-white h-[360px] w-[44px] shadow-md rounded-2xl animate-pulse" />
  )
}
