'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Lightbox, useLightbox } from '@/components/ui/lightbox';
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  fadeInUp,
} from '@/lib/motion/variants';
import { motion } from 'framer-motion';
import { CheckIcon } from './check-icon';

const engineeringImages = [
  {
    src: '/projects/PERGOLA RETRACTABILA/pergola-retractabila-8.webp',
    alt: 'ABA Pergola Systems',
  },
  {
    src: '/projects/SISTEM GLISANT/sistem-glisant-2.webp',
    alt: 'ABA Pergola Systems',
  },
];

export function EngineeringSection() {
  const t = useTranslations('engineering');
  const lightbox = useLightbox();

  const points = [t('point1'), t('point2'), t('point3'), t('point4')];

  return (
    <section
      className='section-y-sm bg-surface-warm'
      aria-label='Engineering and design'
    >
      <Container>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          <div className='flex flex-col gap-8'>
            <Reveal variants={fadeInLeft}>
              <SectionHeading
                label={t('label')}
                title={t('title')}
                description={t('description')}
              />
            </Reveal>

            <motion.ul
              className='grid grid-cols-1 sm:grid-cols-2 gap-4'
              variants={staggerContainer}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: false, margin: '-80px' }}
            >
              {points.map((point) => (
                <motion.li
                  key={point}
                  variants={fadeInUp}
                  className='flex items-start gap-3 p-4 bg-white rounded-md border border-border shadow-sm'
                >
                  <span className='mt-0.5 text-brand'>
                    <CheckIcon />
                  </span>
                  <span className='text-sm text-ink-secondary font-medium leading-snug'>
                    {point}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <Reveal variants={fadeInRight}>
            <div className='flex flex-col gap-5'>
              {engineeringImages.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => lightbox.openAt(i)}
                  className='relative aspect-video rounded-lg overflow-hidden cursor-zoom-in bg-neutral-200'
                  aria-label={`View ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className='object-cover'
                    sizes='(max-width: 1024px) 100vw, 50vw'
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      <Lightbox
        images={engineeringImages}
        initialIndex={lightbox.index}
        open={lightbox.open}
        onClose={lightbox.close}
      />
    </section>
  );
}
