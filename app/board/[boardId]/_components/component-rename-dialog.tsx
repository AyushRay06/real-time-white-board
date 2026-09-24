"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ComponentRenameDialogProps {
  isOpen: boolean
  initialValue: string
  onClose: () => void
  onSave: (val: string) => void
}

export function ComponentRenameDialog({
  isOpen,
  initialValue,
  onClose,
  onSave,
}: ComponentRenameDialogProps) {
  const [val, setVal] = useState(initialValue)

  useEffect(() => {
    if (isOpen) {
      setVal(initialValue)
    }
  }, [isOpen, initialValue])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    onSave(val.trim())
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-neutral-200">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-neutral-800">
            Edit Component Label
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div>
            <label className="text-xs font-semibold text-neutral-500 mb-1 block">
              Label / Custom Name (e.g. Auth Service, Redis :6379, Primary DB)
            </label>
            <Input
              autoFocus
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="e.g. Auth Server :8080"
              className="w-full text-sm font-medium"
            />
          </div>

          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Save Label
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
