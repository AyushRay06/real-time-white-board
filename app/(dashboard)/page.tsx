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
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <p>
          <BoardList orgId={organization.id} query={searchParams} />
        </p>
      )}
    </div>
  )
}

export default DashboardPage
