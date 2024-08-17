import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

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
      <div>
        <Button
          variant="ghost"
          disabled={disabled}
          onClick={onClick}
          className={cn(
            "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-pink-600",
            disabled && "cursor-not-allowed opacity-75"
          )}
        >
          <Star
            className={cn(
              "h-4 w-4",
              isFavourite && "fill-pink-600 text-red-600"
            )}
          />
        </Button>
      </div>
    </div>
  )
}
