"use client"

import { BoardList } from "./_components/board-list"

interface DashboardPageProps {
  searchParams: {
    search?: string
    favourites?: string
  }
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <BoardList query={searchParams} />
    </div>
  )
}

export default DashboardPage
