"use client"
import { BoardList } from "./_components/board-list"
import { EmptyOrg } from "./_components/empty-org"
import { useOrganization } from "@clerk/nextjs"

interface DashboardPageProps {
  searchParams: {
    search?: string
    favourites?: string
  }
}
const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization()

  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  )
}

export default DashboardPage
