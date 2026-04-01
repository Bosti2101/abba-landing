'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { serviceItems } from '@/content/site-data';
import { ArrowIcon } from './arrow-icon';

type ItemTitleKey = 'item1Title' | 'item2Title' | 'item3Title' | 'item4Title' | 'item5Title';
type ItemDescKey = 'item1Desc' | 'item2Desc' | 'item3Desc' | 'item4Desc' | 'item5Desc';

export function ServicesSection({ showHeading = true }: { showHeading?: boolean }) {
  const t = useTranslations('services');
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const slides = [...serviceItems, ...serviceItems, ...serviceItems];

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className='section-y-sm bg-surface-warm' aria-label='Services'>
      {showHeading && (
        <Container>
          <Reveal>
            <SectionHeading
              label={t('label')}
              title={t('title')}
              description={t('description')}
              align='center'
              className='mb-14 max-w-2xl mx-auto'
            />
          </Reveal>
        </Container>
      )}

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {slides.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className='services-slide shrink-0 min-w-0 pl-3 sm:pl-4 lg:pl-5'
            >
              <Link
                href={item.href}
                className='group flex flex-col h-full bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'
                aria-label={t(item.title as ItemTitleKey)}
              >
                <div className='relative aspect-[4/3] overflow-hidden'>
                  <Image
                    src={item.image}
                    alt={t(item.title as ItemTitleKey)}
                    fill
                    priority={index < 5}
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 24vw'
                  />
                </div>
                <div className='flex flex-col flex-1 p-6 gap-3'>
                  <h3 className='font-semibold text-ink text-sm leading-snug'>
                    {t(item.title as ItemTitleKey)}
                  </h3>
                  <p className='text-xs text-ink-muted leading-relaxed flex-1'>
                    {t(item.description as ItemDescKey)}
                  </p>
                  <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-brand mt-2 group-hover:gap-3 transition-[gap] duration-200'>
                    {t('learnMore')} <ArrowIcon />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Container>
        <div className='flex gap-3 mt-8'>
          <button
            onClick={scrollPrev}
            aria-label='Previous'
            className='w-11 h-11 rounded-sm border border-border flex items-center justify-center text-ink-secondary hover:border-brand hover:text-brand cursor-pointer transition-all duration-200'
          >
            <svg aria-hidden='true' width='18' height='18' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
              <path d='M19 12H5M12 5l-7 7 7 7' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            aria-label='Next'
            className='w-11 h-11 rounded-sm border border-border flex items-center justify-center text-ink-secondary hover:border-brand hover:text-brand cursor-pointer transition-all duration-200'
          >
            <svg aria-hidden='true' width='18' height='18' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
              <path d='M5 12h14M12 5l7 7-7 7' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}
