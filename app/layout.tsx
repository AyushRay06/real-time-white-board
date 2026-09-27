import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ConvexClientProvider } from "@/providers/convex-client-provider"
import { Toaster } from "@/components/ui/sonner"
import { ModalProvider } from "@/providers/modal-provider"
import { Suspense } from "react"
import { Loading } from "@/components/auth/loading"

const inter = Inter({ subsets: ["latin"] })

const BASE_URL = "https://hld.ayushray.in"

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "HLD — Real-Time Collaborative Whiteboard",
    template: "%s | HLD",
  },
  description:
    "Brainstorm, design, and collaborate in real time on an infinite canvas. Draw shapes, add sticky notes, and sketch system architectures with your team — powered by Liveblocks.",
  keywords: [
    "collaborative whiteboard",
    "real-time whiteboard",
    "online whiteboard",
    "team collaboration tool",
    "system architecture diagram",
    "infinite canvas",
    "brainstorming tool",
    "HLD",
  ],
  authors: [{ name: "Ayush Kumar Ray", url: BASE_URL }],
  creator: "Ayush Kumar Ray",
  publisher: "HLD",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "HLD",
    title: "HLD — Real-Time Collaborative Whiteboard",
    description:
      "Brainstorm, design, and collaborate in real time on an infinite canvas. Draw shapes, sticky notes, and system architectures with your team.",
    images: [
      {
        url: `${BASE_URL}/boardlist.png`,
        width: 1200,
        height: 630,
        alt: "HLD — Collaborative Whiteboard Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HLD — Real-Time Collaborative Whiteboard",
    description:
      "Draw, brainstorm, and collaborate in real time on an infinite canvas with your team.",
    images: [`${BASE_URL}/boardlist.png`],
    creator: "@ayushkumarray",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.ico",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HLD",
  url: BASE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Real-time collaborative whiteboard for teams. Draw shapes, add sticky notes, and design system architectures on an infinite canvas.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Ayush Kumar Ray",
    url: BASE_URL,
  },
  featureList: [
    "Real-time collaboration",
    "Infinite canvas",
    "Shapes and drawing tools",
    "Sticky notes",
    "System architecture templates",
    "Team management",
    "Live cursors",
    "Free and open source",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            <ModalProvider />
            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  )
}
