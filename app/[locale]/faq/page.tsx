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
    description: t("description"),
    openGraph: {
      title: `${t("title")} — ABA Pergola Systems`,
      description: t("description"),
      images: [{ url: "/logo.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} — ABA Pergola Systems`,
      description: t("description"),
      images: ["/logo.png"],
    },
    alternates: {
      canonical: `/${locale}/faq`,
      languages: { ro: "/ro/faq", en: "/en/faq", bg: "/bg/faq" },
    },
  };
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "faq" });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: t("q1"), acceptedAnswer: { "@type": "Answer", text: t("a1") } },
      { "@type": "Question", name: t("q2"), acceptedAnswer: { "@type": "Answer", text: t("a2") } },
      { "@type": "Question", name: t("q3"), acceptedAnswer: { "@type": "Answer", text: t("a3") } },
      { "@type": "Question", name: t("q4"), acceptedAnswer: { "@type": "Answer", text: t("a4") } },
      { "@type": "Question", name: t("q5"), acceptedAnswer: { "@type": "Answer", text: t("a5") } },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        label={t("label")}
        title={t("title")}
      />

      <FaqSection />
    </>
  );
}
