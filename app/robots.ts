import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/board/", "/api/"],
      },
    ],
    sitemap: "https://hld.ayushray.in/sitemap.xml",
  }
}
