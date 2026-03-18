import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/routing";
import { FaqSection } from "@/components/sections/faq/faq-section";
import { PageHero } from "@/components/sections/page-hero/page-hero";

interface FaqPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: `${t("title")} — ABA Pergola Systems`,
    description: t("q1"),
  };
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "faq" });

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
      />

      <FaqSection />
    </>
  );
}
