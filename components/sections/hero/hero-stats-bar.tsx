'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';

export function HeroStatsBar() {
  const t = useTranslations('about');

  const stats = [
    { value: `${t('stat1Value')}+`, label: t('stat1Label') },
    { value: `${t('stat2Value')}+`, label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: `${t('stat4Value')}+`, label: t('stat4Label') },
  ];

  return (
    <motion.div
      className='relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/10'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className='grid grid-cols-2 md:grid-cols-4'>
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className={cn(
              'px-6 py-4 flex flex-col items-center text-center gap-0.5',
              i % 2 === 0 && 'border-r border-white/10',
              i < 2 && 'border-b border-white/10',
              'md:border-r-0 md:border-b-0',
              i > 0 && 'md:border-l md:border-white/10',
            )}
          >
            <span className='text-2xl font-bold text-white tracking-tight'>
              {value}
            </span>
            <span className='text-xs text-white/50 font-medium'>{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
