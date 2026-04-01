import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/routing";
import { ServicesSection } from "@/components/sections/services/services-section";
import { PageHero } from "@/components/sections/page-hero/page-hero";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("projectsTitle"),
    description: t("projectsDesc"),
    openGraph: {
      title: t("projectsTitle"),
      description: t("projectsDesc"),
      images: [{ url: "/logo.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("projectsTitle"),
      description: t("projectsDesc"),
      images: ["/logo.png"],
    },
    alternates: {
      canonical: `/${locale}/projects`,
      languages: { ro: "/ro/projects", en: "/en/projects", bg: "/bg/projects" },
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />

      <ServicesSection showHeading={false} />
    </>
  );
}
