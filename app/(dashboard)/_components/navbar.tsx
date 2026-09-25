"use client"

import { UserButton } from "@clerk/nextjs"
import { SearchInput } from "./search-input"
import Image from "next/image"
import Link from "next/link"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { LayoutDashboard, Star } from "lucide-react"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

export const Navbar = () => {
  const searchParams = useSearchParams()
  const favourites = searchParams.get("favourites")

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Nav Tabs */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <Image
              src="/logo.svg"
              alt="Board"
              width={28}
              height={28}
              className="flex-shrink-0"
            />
            <span className={cn("font-bold text-lg tracking-tight text-slate-900", font.className)}>
              Board
            </span>
          </Link>

          {/* Minimalist Tabs */}
          <nav className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                !favourites
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Boards</span>
            </Link>
            <Link
              href={{
                pathname: "/",
                query: { favourites: "true" },
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                favourites
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Star className={cn("h-3.5 w-3.5", favourites && "fill-amber-400 text-amber-500")} />
              <span>Favourites</span>
            </Link>
          </nav>
        </div>

        {/* Center Search */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <SearchInput />
        </div>

        {/* Right User Profile */}
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 rounded-full ring-2 ring-slate-100 shadow-2xs hover:ring-indigo-100 transition-all",
              },
            }}
          />
        </div>
      </div>
    </header>
  )
}
