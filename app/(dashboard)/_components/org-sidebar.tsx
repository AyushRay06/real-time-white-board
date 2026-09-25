"use client"

import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { LayoutDashboardIcon, StarIcon } from "lucide-react"
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
    <div className="hidden lg:flex flex-col space-y-6 w-[230px] px-4 py-5 border-r border-slate-200/80 bg-white/70 backdrop-blur-md h-full shrink-0">
      <Link href="/" className="group flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-100/70 transition-colors">
        <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-1 shadow-sm shadow-indigo-500/20 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
          <Image src="/logo.svg" alt="Board" width={22} height={22} className="brightness-0 invert" />
        </div>
        <div className="flex flex-col">
          <span className={cn("font-bold text-lg tracking-tight text-slate-900 leading-tight", font.className)}>
            Board
          </span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Workspace</span>
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
              padding: "8px 12px",
              width: "100%",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              justifyContent: "space-between",
              backgroundColor: "white",
              fontSize: "13px",
              fontWeight: "500",
              color: "#1E293B",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
              transition: "all 0.2s ease",
            },
          },
        }}
      />

      <div className="space-y-1.5 w-full">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
            !favourites
              ? "bg-indigo-50/80 text-indigo-700 font-semibold shadow-xs border border-indigo-100/80"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
          )}
        >
          <LayoutDashboardIcon
            className={cn(
              "h-4 w-4 transition-colors",
              !favourites ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
            )}
          />
          <span>Team boards</span>
        </Link>
        <Link
          href={{
            pathname: "/",
            query: { favourites: "true" },
          }}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
            favourites
              ? "bg-indigo-50/80 text-indigo-700 font-semibold shadow-xs border border-indigo-100/80"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
          )}
        >
          <StarIcon
            className={cn(
              "h-4 w-4 transition-colors",
              favourites
                ? "text-amber-500 fill-amber-400"
                : "text-slate-400 group-hover:text-amber-500"
            )}
          />
          <span>Favourite boards</span>
        </Link>
      </div>
    </div>
  )
}
