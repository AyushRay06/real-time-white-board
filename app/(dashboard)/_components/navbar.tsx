"use client"

import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from "@clerk/nextjs"
import { SearchInput } from "./search-input"
import { InviteButton } from "./invite-button"

export const Navbar = () => {
  const { organization } = useOrganization()
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-x-4 px-6 h-18 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all">
      <div className="hidden lg:flex lg:flex-1 max-w-[480px]">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1 max-w-[320px]">
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
              },
            },
          }}
        />
      </div>
      <div className="flex items-center gap-x-3 ml-auto">
        {organization && <InviteButton />}
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-9 w-9 rounded-xl ring-2 ring-slate-100 shadow-2xs hover:ring-indigo-100 transition-all",
            },
          }}
        />
      </div>
    </header>
  )
}
