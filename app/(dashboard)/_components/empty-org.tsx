import Image from "next/image"
import { CreateOrganization } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty.png" alt="empty" width={400} height={400} />
      <h2 className="font-semibold mt-10 text-2xl">Welcome To Board</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Create an Organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
