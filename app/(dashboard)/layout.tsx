import { OrgSidebar } from "./_components/org-sidebar"
import { Sidebar } from "./_components/sidebar"

interface DashboardLayoutprops {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutprops) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default DashboardLayout
