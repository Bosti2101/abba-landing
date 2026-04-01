'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { contactBranches } from '@/content/site-data';
import { BranchCard } from './branch-card';
import { ContactForm } from './contact-form';

export function ContactSection({ showHeading = true }: { showHeading?: boolean }) {
  const t = useTranslations('contact');
  const tNav = useTranslations('nav');

  const branches = [
    {
      data: contactBranches[0],
      label: t('bulgariaBranch'),
      address: t('bulgariaAddress'),
      mapTitle: tNav('mapBulgaria'),
    },
    {
      data: contactBranches[1],
      label: t('romaniaBranch'),
      address: t('romaniaAddress'),
      mapTitle: tNav('mapRomania'),
    },
  ];

  return (
    <section id='contact' className='section-y-sm bg-white' aria-label='Contact'>
      <Container>
        <div className='flex flex-col gap-16'>
          {showHeading && (
            <Reveal>
              <SectionHeading
                label={t('label')}
                title={t('title')}
                description={t('description')}
                align='center'
                className='max-w-2xl mx-auto'
              />
            </Reveal>
          )}

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <Reveal>
              <BranchCard branches={branches} />
            </Reveal>

            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
