"use client"
import Image from "next/image"

interface EmptySearchProps {
  src: string
  alt: string
}

export const EmptySearch = ({ src, alt }: EmptySearchProps) => {
  return (
    <div className="h-full flex-col flex items-center justify-center ">
      <Image src={src} alt={alt} width={400} height={400} />
    </div>
  )
}
