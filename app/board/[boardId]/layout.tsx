import type { Metadata } from "next"

// Private board pages must never be indexed — they contain user data
// and require authentication to access.
export const metadata: Metadata = {
  title: "Board",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
