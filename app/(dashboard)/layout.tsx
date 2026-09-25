import { Navbar } from "./_components/navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="min-h-full flex flex-col bg-slate-50/50 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout
