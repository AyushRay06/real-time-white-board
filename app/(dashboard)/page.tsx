import { UserButton } from "@clerk/nextjs"
import Image from "next/image"

const Dashboard = () => {
  return (
    <div>
      <div>This is a screen for authenticated users only </div>
      <UserButton />
    </div>
  )
}

export default Dashboard
