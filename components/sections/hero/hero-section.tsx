'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { SlideZoom } from './slide-zoom';
import { HeroStatsBar } from './hero-stats-bar';

const heroSlides = [
  { src: '/hero/hero-4.webp', alt: 'ABA Pergola Systems' },
  { src: '/hero/hero-1.webp', alt: 'ABA Pergola Systems' },
  { src: '/hero/hero-2.webp', alt: 'ABA Pergola Systems' },
  { src: '/hero/hero-3.webp', alt: 'ABA Pergola Systems' },
];

const SLIDE_INTERVAL = 5;
const WIPE_DURATION = 0.6;
const ZOOM_DURATION = 12;

export function HeroSection() {
  const t = useTranslations('hero');
  const [slides, setSlides] = useState({ active: 0, previous: -1 });

  useEffect(() => {
    const timer = setInterval(() => {
      setSlides((prev) => ({
        previous: prev.active,
        active: (prev.active + 1) % heroSlides.length,
      }));
    }, SLIDE_INTERVAL * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className='relative min-h-dvh flex flex-col overflow-hidden'
      aria-label='Hero section'
    >
      <style>{`
        .hero-slide {
          position: absolute;
          inset: 0;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          overflow: hidden;
        }
        .hero-slide--active {
          will-change: clip-path;
          animation: hero-wipe ${WIPE_DURATION}s cubic-bezier(0.65, 0, 0.35, 1) forwards !important;
        }
        .hero-slide--first {
          animation: none !important;
        }
        .hero-zoom {
          width: 100%;
          height: 100%;
          transform: scale(1);
          will-change: transform;
        }
        .hero-zoom--running {
          animation: hero-kb ${ZOOM_DURATION}s linear infinite !important;
        }
        @keyframes hero-wipe {
          from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
          to   { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }
        @keyframes hero-kb {
          from { transform: scale(1); }
          to   { transform: scale(1.35); }
        }
        @media (max-width: 768px) {
          @keyframes hero-kb {
            from { transform: scale(1); }
            to   { transform: scale(1.5); }
          }
        }
      `}</style>

      <div className='absolute inset-0' style={{ zIndex: 0 }}>
        {heroSlides.map((slide, i) => {
          const isActive = i === slides.active;
          const isPrevious = i === slides.previous;
          const isFirstSlide = i === 0 && slides.previous === -1;
          const isShown = isActive || isPrevious || isFirstSlide;

          return (
            <div
              key={i}
              className={cn(
                'hero-slide',
                isActive && 'hero-slide--active',
                isFirstSlide && 'hero-slide--first',
              )}
              style={{
                zIndex: isActive ? 2 : isPrevious ? 1 : 0,
                visibility: 'visible',
              }}
            >
              <SlideZoom
                slide={slide}
                index={i}
                isActive={isActive}
                isShown={isShown}
              />
            </div>
          );
        })}

        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            zIndex: 3,
            background: `
              linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.85) 100%),
              linear-gradient(135deg, rgba(192,57,43,0.12) 0%, transparent 50%, rgba(0,0,0,0.4) 100%),
              radial-gradient(ellipse 80% 100% at 0% 50%, rgba(0,0,0,0.55) 0%, transparent 70%)
            `,
          }}
        />
      </div>

      <div
        className='container-site flex-1 flex flex-col justify-center pt-32 pb-24 relative'
        style={{ zIndex: 4 }}
      >
        <div className='max-w-2xl'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className='inline-flex items-center gap-2 mb-6'>
              <span className='block w-8 h-px bg-brand' />
              <span className='text-xs font-semibold tracking-widest uppercase text-white/60'>
                ABA Pergola Systems
              </span>
            </span>
          </motion.div>

          <motion.h1
            className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight'
            style={{ color: '#ffffff' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {t('title')}
          </motion.h1>

          <motion.p
            className='mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            className='mt-10 flex flex-wrap gap-3 sm:gap-4'
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          >
            <Link href='/projects'>
              <Button size='sm' variant='primary' className='min-h-[44px] sm:min-h-[48px] sm:text-base sm:px-6'>
                {t('ctaProjects')}
              </Button>
            </Link>
            <Link href='/services'>
              <Button
                size='sm'
                variant='outline'
                className='min-h-[44px] sm:min-h-[48px] sm:text-base sm:px-6 border-white/40 text-white hover:bg-white/10 hover:border-white/60'
              >
                {t('cta')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div
        className='absolute bottom-44 md:bottom-24 left-1/2 -translate-x-1/2'
        style={{ zIndex: 4 }}
        aria-hidden='true'
      >
        <style>{`
          @keyframes hero-chevron {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.6; }
          }
          .hero-chevron {
            animation: hero-chevron 1.6s ease-in-out infinite !important;
          }
        `}</style>
        <motion.div
          className='flex flex-col items-center gap-2 text-white/40'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className='text-[10px] font-medium tracking-widest uppercase'>
            {t('scrollHint')}
          </span>
          <div className='flex flex-col items-center gap-0'>
            {[0, 1, 2].map((i) => (
              <svg
                key={i}
                width='16'
                height='10'
                viewBox='0 0 20 12'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='hero-chevron -my-0.5'
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <path d='M2 2l8 8 8-8' />
              </svg>
            ))}
          </div>
        </motion.div>
      </div>

      <HeroStatsBar />
    </section>
  );
}
