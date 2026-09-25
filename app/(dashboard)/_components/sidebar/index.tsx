import { List } from "./list"
import { NewButton } from "./new-button"

export const Sidebar = () => {
  return (
    <aside className="fixed z-[50] left-0 bg-slate-900 border-r border-slate-800/80 h-full w-[60px] flex p-2.5 flex-col items-center gap-y-4 text-white shadow-xl shadow-slate-950/20">
      <List />
      <NewButton />
    </aside>
  )
}
