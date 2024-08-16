"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface EmptySearchProps {
  src: string
  alt: string
  desc1: string
  desc2: string
}

export const EmptySearch = ({ src, alt, desc1, desc2 }: EmptySearchProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={src} alt={alt} width={300} height={300} />
      <h2 className="text-3xl font-semibold my-4">{desc1}</h2>
      <p className="text-lg text-muted-foreground">{desc2}</p>
    </div>
  )
}
