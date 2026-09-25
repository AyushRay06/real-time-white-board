"use client"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { useState, useEffect, ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

export const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = useState<string>("")
  const [debouncedValue, setDebouncedValue] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue("")
    setDebouncedValue("")
  }

  // Manually handle the debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, 400)

    // Cleanup the timeout if the value changes within the delay
    return () => {
      clearTimeout(handler)
    }
  }, [value])

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue || "",
        },
      },
      { skipEmptyString: true, skipNull: true }
    )
    router.push(url)
  }, [debouncedValue, router])

  return (
    <div className="w-full relative group">
      <Search className="absolute top-1/2 left-3.5 transform -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors h-4 w-4 pointer-events-none" />
      <Input
        className="w-full pl-10 pr-10 h-10 rounded-xl bg-slate-100/70 hover:bg-slate-100 focus:bg-white border-slate-200/80 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all shadow-2xs"
        placeholder="Search boards..."
        onChange={handleChange}
        value={value}
      />
      {value ? (
        <button
          onClick={handleClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 p-0.5 rounded-md hover:bg-slate-200/80 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : (
        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </div>
      )}
    </div>
  )
}
