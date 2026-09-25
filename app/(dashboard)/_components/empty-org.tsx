import Image from "next/image"
import { CreateOrganization } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <Image
          src="/empty.png"
          alt="empty"
          width={300}
          height={300}
          className="drop-shadow-sm"
        />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1.5">
        Welcome to Board
      </h2>
      <p className="text-sm text-slate-500 max-w-sm">
        Create an organization to start designing architectures and collaborating with your team.
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 h-11 shadow-md shadow-indigo-600/20 transition-all hover:scale-105 cursor-pointer">
              Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
