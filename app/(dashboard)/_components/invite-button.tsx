import { Plus } from "lucide-react"
import { OrganizationProfile } from "@clerk/nextjs"

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-9 px-3.5 rounded-xl border-slate-200/90 text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 text-indigo-600" />
          <span>Invite members</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px] ">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  )
}
