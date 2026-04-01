import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/routing";
import { FaqSection } from "@/components/sections/faq/faq-section";
import { PageHero } from "@/components/sections/page-hero/page-hero";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("servicesTitle"),
    description: t("servicesDesc"),
    openGraph: {
      title: t("servicesTitle"),
      description: t("servicesDesc"),
      images: [{ url: "/logo.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("servicesTitle"),
      description: t("servicesDesc"),
      images: ["/logo.png"],
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "portfolio" });

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />

      <FaqSection />
    </>
  );
}
