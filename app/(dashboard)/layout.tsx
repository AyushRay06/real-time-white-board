import { Navbar } from "./_components/navbar"
import { OrgSidebar } from "./_components/org-sidebar"
import { Sidebar } from "./_components/sidebar"

interface DashboardLayoutprops {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutprops) => {
  return (
    <main className="h-full bg-slate-50/60 selection:bg-indigo-500 selection:text-white">
      <Sidebar />
      <div className="pl-[60px] h-full flex flex-col">
        <div className="flex gap-x-0 h-full">
          <OrgSidebar />
          <div className="h-full flex-1 flex flex-col min-w-0 overflow-hidden">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardLayout
