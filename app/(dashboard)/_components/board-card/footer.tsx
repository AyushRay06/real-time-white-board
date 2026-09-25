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
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    event.preventDefault()
    onClick()
  }

  return (
    <div className="relative bg-white px-3.5 py-3 border-t border-slate-100/90">
      <div className="pr-8">
        <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
          {title}
        </p>
        <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
          {authorLabel} • {createdAtLabel}
        </p>
      </div>

      <button
        disabled={disabled}
        onClick={handleClick}
        aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        className={cn(
          "absolute top-3 right-3 p-1.5 rounded-lg transition-all duration-150 outline-none cursor-pointer",
          isFavourite
            ? "text-amber-500 opacity-100 hover:bg-amber-50"
            : "text-slate-300 opacity-0 group-hover:opacity-100 hover:text-amber-500 hover:bg-slate-100",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4 transition-transform hover:scale-110",
            isFavourite && "fill-amber-400 text-amber-500"
          )}
        />
      </button>
    </div>
  )
}
