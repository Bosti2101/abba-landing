'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { FaqItem } from './faq-item';

export function FaqSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
  ];

  return (
    <section className='section-y bg-white' aria-label='FAQ'>
      <Container>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-12 lg:gap-20'>
          <Reveal>
            <SectionHeading label={t('label')} title={t('title')} />
          </Reveal>

          <Reveal>
            <div
              role='list'
              className='divide-y divide-border border-t border-border'
            >
              {items.map(({ q, a }, i) => (
                <FaqItem
                  key={i}
                  question={q}
                  answer={a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  index={i}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
