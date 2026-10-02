"use client"

import React, { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCanvasTheme } from "./canvas-theme-context"
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react"

interface MediaUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUploadFiles: (files: File[]) => Promise<void>
  isProcessing?: boolean
  progressText?: string
}

export const MediaUploadDialog = ({
  isOpen,
  onClose,
  onUploadFiles,
  isProcessing = false,
  progressText = "",
}: MediaUploadDialogProps) => {
  const { theme } = useCanvasTheme()
  const isDark = theme === "dark"

  const [dragOver, setDragOver] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)
  const allMediaInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)
      await onUploadFiles(files)
      onClose()
    }
  }

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      await onUploadFiles(files)
      if (e.target) e.target.value = ""
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`max-w-md p-6 rounded-2xl border shadow-2xl backdrop-blur-xl ${
          isDark
            ? "bg-slate-900/95 border-slate-800 text-white"
            : "bg-white/95 border-slate-200 text-slate-900"
        }`}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <UploadCloud className="w-5 h-5 text-indigo-500" />
            Add Images or PDF to Canvas
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Drop images or multi-page PDF documents. Each PDF page is rendered individually as a movable, editable canvas sheet with crisp text.
          </DialogDescription>
        </DialogHeader>

        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={allMediaInputRef}
          accept="image/*,application/pdf"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />
        <input
          type="file"
          ref={imageInputRef}
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />
        <input
          type="file"
          ref={pdfInputRef}
          accept="application/pdf"
          className="hidden"
          onChange={handleFileInputChange}
        />

        {isProcessing ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <div className="text-sm font-semibold">{progressText || "Processing and rendering document..."}</div>
            <p className="text-xs text-muted-foreground max-w-xs">
              Rendering vector pages into high-resolution canvas sheets with full text extraction.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-2">
            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => allMediaInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 group ${
                dragOver
                  ? "border-indigo-500 bg-indigo-500/10 scale-[1.01]"
                  : isDark
                  ? "border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800/60"
                  : "border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100/80"
              }`}
            >
              <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold">
                Click or drag files here to place on canvas
              </div>
              <p className="text-[11px] text-muted-foreground">
                Supports PNG, JPG, WebP, SVG, and multi-page PDFs
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => imageInputRef.current?.click()}
                className="h-11 flex items-center justify-center gap-2 text-xs font-medium"
              >
                <ImageIcon className="w-4 h-4 text-sky-500" />
                Upload Images
              </Button>

              <Button
                variant="outline"
                onClick={() => pdfInputRef.current?.click()}
                className="h-11 flex items-center justify-center gap-2 text-xs font-medium"
              >
                <FileText className="w-4 h-4 text-rose-500" />
                Upload PDF Document
              </Button>
            </div>

            {/* Feature Highlights Card */}
            <div
              className={`p-3 rounded-xl border text-xs flex flex-col gap-1.5 ${
                isDark ? "bg-slate-800/50 border-slate-700/60" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold text-indigo-500">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Multi-Page PDF Features:</span>
              </div>
              <ul className="text-[11px] text-muted-foreground space-y-1 pl-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  <span>Renders every page individually (e.g. 5 pages = 5 movable sheets)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  <span>All text is preserved and rendered with high-DPI clarity</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  <span>One-click copy text from any page, resize, and connect arrows</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
