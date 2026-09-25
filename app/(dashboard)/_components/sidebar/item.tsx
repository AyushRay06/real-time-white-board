"use client"

import { Hint } from "@/components/hint"
import { cn } from "@/lib/utils"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import Image from "next/image"

interface ItemProps {
  id: string
  name: string
  imageUrl: string
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = organization?.id === id

  const onClick = () => {
    if (!setActive) return

    setActive({ organization: id })
  }

  return (
    <div className="w-9 h-9 relative flex items-center justify-center">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <div className="relative">
          {isActive && (
            <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-full" />
          )}
          <Image
            alt={name}
            src={imageUrl}
            onClick={onClick}
            className={cn(
              "rounded-xl cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-105 ring-2 ring-transparent",
              isActive && "opacity-100 ring-indigo-500 shadow-md shadow-indigo-500/30"
            )}
            width={36}
            height={36}
          />
        </div>
      </Hint>
    </div>
  )
}
