import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://abapergola.ro"}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_URL || "https://abapergola.ro",
  };
}
