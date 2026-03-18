'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('pages');

  return (
    <section className='min-h-[70vh] flex items-center justify-center bg-white'>
      <Container>
        <div className='text-center max-w-lg mx-auto'>
          <p className='text-8xl font-bold text-brand mb-2'>500</p>
          <div className='w-16 h-1 bg-brand rounded-full mx-auto mb-6' />
          <h1 className='text-2xl font-semibold text-ink mb-3'>
            {t('errorHeading')}
          </h1>
          <p className='text-ink-muted mb-10 leading-relaxed'>
            {t('errorDesc')}
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Button variant='primary' size='md' onClick={reset}>
              {t('errorRetry')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
