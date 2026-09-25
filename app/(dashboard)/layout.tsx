import { Suspense } from "react"
import { Navbar } from "./_components/navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="min-h-full flex flex-col bg-slate-50/50 selection:bg-indigo-500 selection:text-white">
      <Suspense fallback={<div className="h-16 w-full border-b border-slate-200/80 bg-white" />}>
        <Navbar />
      </Suspense>
      <div className="flex-1">
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout
