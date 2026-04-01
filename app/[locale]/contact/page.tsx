import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n/routing';
import { PageHero } from '@/components/sections/page-hero/page-hero';
import { ContactSection } from '@/components/sections/contact/contact-section';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages' });
  return {
    title: t('contactTitle'),
    description: t('contactDesc'),
    openGraph: {
      title: t('contactTitle'),
      description: t('contactDesc'),
      images: [{ url: '/logo.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('contactTitle'),
      description: t('contactDesc'),
      images: ['/logo.png'],
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      <PageHero
        label={t('label')}
        title={t('title')}
        description={t('description')}
      />
      <ContactSection showHeading={false} />
    </>
  );
}
