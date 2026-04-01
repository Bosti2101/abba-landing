import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/routing';
import { serviceItems, portfolioCategories } from '@/content/site-data';
import { PageHero } from '@/components/sections/page-hero/page-hero';
import { Container } from '@/components/ui/container';
import { ProjectGallery } from './project-gallery';
import { BioclimaticContent } from './bioclimatic-content';
import { PergolaRetractabilaContent } from './pergola-retractabila-content';
import { GradinaDeIarnaContent } from './gradina-de-iarna-content';
import { SistemGhilotinaContent } from './sistem-ghilotina-content';

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceItems.map((item) => ({ locale, slug: item.id })),
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = serviceItems.find((service) => service.id === slug);
  if (!item) return {};

  const t = await getTranslations({ locale, namespace: 'services' });
  const title = t(
    item.title as 'item1Title' | 'item2Title' | 'item3Title' | 'item4Title',
  );
  const description = t(
    item.description as 'item1Desc' | 'item2Desc' | 'item3Desc' | 'item4Desc',
  );

  return {
    title: `${title} — ABA Pergola Systems`,
    description,
    openGraph: { title, description },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const item = serviceItems.find((service) => service.id === slug);
  if (!item) notFound();

  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'services' });

  const title = t(
    item.title as 'item1Title' | 'item2Title' | 'item3Title' | 'item4Title',
  );
  const description = t(
    item.description as 'item1Desc' | 'item2Desc' | 'item3Desc' | 'item4Desc',
  );

  const category = portfolioCategories.find((cat) => cat.id === slug);
  const images = category?.images ?? [];

  const hasRichContent =
    slug === 'sistem-bioclimatic' || slug === 'pergola-retractabila' || slug === 'gradina-de-iarna' || slug === 'sistem-ghilotina';

  const galleryImages = hasRichContent
    ? images.map((img) => ({ src: img.src, alt: img.alt }))
    : [
        { src: item.image, alt: title },
        ...images.slice(0, 2).map((img) => ({ src: img.src, alt: img.alt })),
      ];

  return (
    <>
      <PageHero label={t('label')} title={title} description={description} />

      {slug === 'sistem-bioclimatic' && <BioclimaticContent />}
      {slug === 'pergola-retractabila' && <PergolaRetractabilaContent />}
      {slug === 'gradina-de-iarna' && <GradinaDeIarnaContent />}
      {slug === 'sistem-ghilotina' && <SistemGhilotinaContent />}

      <section className='section-y-sm bg-white'>
        <Container>
          <ProjectGallery images={galleryImages} />
        </Container>
      </section>
    </>
  );
}
