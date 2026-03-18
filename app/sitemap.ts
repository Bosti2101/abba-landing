import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/routing";
import { serviceItems } from "@/content/site-data";

const BASE_URL = "https://abapergola.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/services", "/projects", "/faq"];

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === "" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const projectEntries = locales.flatMap((locale) =>
    serviceItems.map((item) => ({
      url: `${BASE_URL}/${locale}/projects/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...projectEntries];
}
