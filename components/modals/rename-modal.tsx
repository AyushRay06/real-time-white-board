"use client"

import { useRenameModal } from "@/store/use-rename-modal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

export const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal()
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for the board.</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
