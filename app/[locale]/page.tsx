import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/routing";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { LivingSpacesSection } from "@/components/sections/living-spaces/living-spaces-section";
import { WinterGardensSection } from "@/components/sections/winter-gardens/winter-gardens-section";
import { AboutSection } from "@/components/sections/about/about-section";
import { StrengthsSection } from "@/components/sections/strengths/strengths-section";
import { EngineeringSection } from "@/components/sections/engineering/engineering-section";
import { PortfolioSection } from "@/components/sections/portfolio/portfolio-section";
import { ServicesSection } from "@/components/sections/services/services-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { PartnersSection } from "@/components/sections/partners/partners-section";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });

  return {
    title: t("homeTitle"),
    description: t("homeDesc"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      type: "website",
      locale,
      images: [{ url: "/logo.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDesc"),
      images: ["/logo.png"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ro: "/ro",
        en: "/en",
        bg: "/bg",
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <HeroSection />
      <LivingSpacesSection />
      <WinterGardensSection />
      <AboutSection />
      <StrengthsSection />
      <EngineeringSection />
      <ServicesSection />
      <PortfolioSection />
      <PartnersSection />
      <ContactSection />
    </>
  );
}
