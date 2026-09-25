"use client"

import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Hint } from "@/components/hint"

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-9 h-9">
          <Hint
            label="Create Organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <button className="bg-slate-800/80 hover:bg-indigo-600 border border-slate-700/60 hover:border-indigo-500 h-9 w-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-indigo-500/25 group cursor-pointer">
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90 duration-200" />
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
