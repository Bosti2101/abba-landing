'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { staggerContainer, scaleIn } from '@/lib/motion/variants';
import { motion } from 'framer-motion';
import { serviceItems } from '@/content/site-data';
import { cn } from '@/lib/utils/cn';
import { ArrowIcon } from './arrow-icon';

export function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section className='section-y-sm bg-surface-warm' aria-label='Services'>
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

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false, margin: '-80px' }}
        >
          {serviceItems.map((item, index) => (
            <motion.div key={item.id} variants={scaleIn}>
              <Link
                href={item.href}
                className='group flex flex-col h-full bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'
                aria-label={t(
                  item.title as
                    | 'item1Title'
                    | 'item2Title'
                    | 'item3Title'
                    | 'item4Title',
                )}
              >
                <div className='relative aspect-[4/3] overflow-hidden'>
                  <Image
                    src={item.image}
                    alt={t(
                      item.title as
                        | 'item1Title'
                        | 'item2Title'
                        | 'item3Title'
                        | 'item4Title',
                    )}
                    fill
                    priority={index === 0}
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                  />
                </div>

                <div className='flex flex-col flex-1 p-6 gap-3'>
                  <h3 className='font-semibold text-ink text-sm leading-snug'>
                    {t(
                      item.title as
                        | 'item1Title'
                        | 'item2Title'
                        | 'item3Title'
                        | 'item4Title',
                    )}
                  </h3>
                  <p className='text-xs text-ink-muted leading-relaxed flex-1'>
                    {t(
                      item.description as
                        | 'item1Desc'
                        | 'item2Desc'
                        | 'item3Desc'
                        | 'item4Desc',
                    )}
                  </p>
                  <span
                    className='inline-flex items-center gap-1.5 text-xs font-semibold text-brand mt-2 group-hover:gap-3 transition-all duration-200'
                  >
                    {t('learnMore')} <ArrowIcon />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
