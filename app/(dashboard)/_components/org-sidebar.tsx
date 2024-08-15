"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { FileX, LayoutDashboardIcon, StarIcon } from "lucide-react"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

export const OrgSidebar = () => {
  const searchParams = useSearchParams()
  const favourites = searchParams.get("favourites")
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 py-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="logo" width={60} height={60} />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
      <div className="space-y-2 w-full">
        <Button
          asChild
          size="lg"
          variant={favourites ? "ghost" : "secondary"}
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboardIcon className="h-4 w-4 mr-2" /> Team boards
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant={favourites ? "secondary" : "ghost"}
          className="font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: "/",
              query: { favourites: true },
            }}
          >
            <StarIcon className="h-4 w-4 mr-2" /> Favourite boards
          </Link>
        </Button>
      </div>
    </div>
  )
}
