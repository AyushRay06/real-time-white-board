import { cn } from "@/lib/utils"

interface FooterProps {
  title: string
  authorLabel: string
  createdAtLabel: string
  onClick: () => void
  disabled: boolean
  isFavourite: boolean
}
export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
  isFavourite,
}: FooterProps) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] turncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 hover:opacity-100 transition text-muted-foreground truncate">
        {authorLabel},{createdAtLabel}
      </p>
    </div>
  )
}
