export type CanvasState =
  | {
      mode: CanvasMode.None
    }
  | {
      mode: CanvasMode.Pressing
    }
  | {
      mode: CanvasMode.Inserting
    }
  | {
      mode: CanvasMode.Resizing
    }
  | {
      mode: CanvasMode.pencil
    }
  | {
      mode: CanvasMode.Translating
    }
  | {
      mode: CanvasMode.SelectionNet
    }

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  pencil,
}
