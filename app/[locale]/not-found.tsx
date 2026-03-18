import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const t = useTranslations('pages');

  return (
    <section className='min-h-[70vh] flex items-center justify-center bg-white'>
      <Container>
        <div className='text-center max-w-lg mx-auto'>
          <p className='text-8xl font-bold text-brand mb-2'>404</p>
          <div className='w-16 h-1 bg-brand rounded-full mx-auto mb-6' />
          <h1 className='text-2xl font-semibold text-ink mb-3'>
            {t('notFoundHeading')}
          </h1>
          <p className='text-ink-muted mb-10 leading-relaxed'>
            {t('notFoundDesc')}
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Link href='/'>
              <Button variant='primary' size='md'>
                {t('notFoundHome')}
              </Button>
            </Link>
            <Link href='/contact'>
              <Button variant='outline' size='md'>
                {t('notFoundContact')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
