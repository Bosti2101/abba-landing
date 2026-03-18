import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { locales, type Locale } from "@/lib/i18n/routing";
import { serviceItems } from "@/content/site-data";
import { portfolioCategories } from "@/content/site-data";
import { PageHero } from "@/components/sections/page-hero/page-hero";
import { Container } from "@/components/ui/container";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceItems.map((item) => ({ locale, slug: item.id }))
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = serviceItems.find((s) => s.id === slug);
  if (!item) return {};

  const t = await getTranslations({ locale, namespace: "services" });
  const title = t(item.title as "item1Title" | "item2Title" | "item3Title" | "item4Title");
  const description = t(item.description as "item1Desc" | "item2Desc" | "item3Desc" | "item4Desc");

  return {
    title: `${title} — ABA Pergola Systems`,
    description,
    openGraph: { title, description },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const item = serviceItems.find((s) => s.id === slug);
  if (!item) notFound();

  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "services" });

  const title = t(item.title as "item1Title" | "item2Title" | "item3Title" | "item4Title");
  const description = t(item.description as "item1Desc" | "item2Desc" | "item3Desc" | "item4Desc");

  const category = portfolioCategories.find((c) => c.id === slug);
  const images = category?.images ?? [];

  return (
    <>
      <PageHero label={t("label")} title={title} description={description} />

      <section className="section-y-sm bg-white">
        <Container>
          {/* Two-column layout: left = full tall image, right = two stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Left — larger image taking more width */}
            <div className="relative aspect-[3/4] lg:aspect-auto lg:col-span-3 rounded-xl overflow-hidden group">
              <Image
                src={item.image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Right — two stacked images */}
            <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {images.slice(0, 2).map((img, i) => (
                <div
                  key={`${img.src}-${i}`}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
