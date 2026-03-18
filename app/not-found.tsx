import { NextIntlClientProvider } from 'next-intl';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { locales, defaultLocale } from '@/lib/i18n/routing';

export default async function NotFound() {
  const headersList = await headers();
  const url = headersList.get('x-next-url') || headersList.get('referer') || '';
  const pathLocale = url.split('/').find((segment) => locales.includes(segment as typeof locales[number]));
  const locale = pathLocale || defaultLocale;

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`@/messages/${defaultLocale}.json`)).default;
  }

  const t = (key: string) => {
    const pages = messages?.pages || {};
    return pages[key as keyof typeof pages] || key;
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header forceSolid />
      <main id='main-content'>
        <section className='min-h-[70vh] flex items-center justify-center bg-white'>
          <div className='text-center max-w-lg mx-auto px-6'>
            <p className='text-8xl font-bold text-brand mb-2'>404</p>
            <div className='w-16 h-1 bg-brand rounded-full mx-auto mb-6' />
            <h1 className='text-2xl font-semibold text-ink mb-3'>
              {t('notFoundHeading')}
            </h1>
            <p className='text-ink-muted mb-10 leading-relaxed'>
              {t('notFoundDesc')}
            </p>
            <div className='flex items-center justify-center gap-4'>
              <Link
                href={`/${locale}`}
                className='inline-flex items-center justify-center font-medium tracking-wide rounded-sm px-6 py-3 text-sm bg-brand text-white hover:bg-brand-hover'
                style={{ transition: 'all 0.2s ease-out' }}
              >
                {t('notFoundHome')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className='inline-flex items-center justify-center font-medium tracking-wide rounded-sm px-6 py-3 text-sm border border-brand text-brand hover:bg-brand hover:text-white'
                style={{ transition: 'all 0.2s ease-out' }}
              >
                {t('notFoundContact')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
