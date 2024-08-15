"use client"

import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Hint } from "@/components/hint"

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="Create Organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <button className="bg-white/25 h-full w-full flex items-center justify-center rounded-lg opacity-60 hover:opacity-100">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 border-none bg-transparent max-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  )
}
