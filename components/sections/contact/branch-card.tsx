'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { MailIcon, PhoneIcon, LocationIcon } from './contact-icons';
import { contactBranches } from '@/content/site-data';

interface BranchInfo {
  data: (typeof contactBranches)[number];
  label: string;
  address: string;
  mapTitle: string;
}

interface BranchCardProps {
  branches: BranchInfo[];
}

export function BranchCard({ branches }: BranchCardProps) {
  const [activeBranch, setActiveBranch] = useState<0 | 1>(1);

  return (
    <div className='flex flex-col gap-6 p-8 bg-surface-warm rounded-xl border border-border h-full'>
      <div className='relative flex bg-border rounded-lg p-1'>
        <motion.div
          className='absolute top-1 bottom-1 rounded-[10px] bg-white shadow-sm'
          style={{ width: 'calc(50% - 4px)' }}
          animate={{
            left: activeBranch === 0 ? 4 : 'calc(50% + 0px)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
        {branches.map((b, i) => (
          <button
            key={i}
            onClick={() => setActiveBranch(i as 0 | 1)}
            className={cn(
              'relative z-10 flex-1 py-2.5 px-3 text-sm font-semibold rounded-sm transition-colors duration-200 text-center',
              activeBranch === i
                ? 'text-ink'
                : 'text-ink-muted hover:text-ink-secondary',
            )}
          >
            {b.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={activeBranch}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className='flex flex-col gap-6 flex-1'
        >
          <div className='flex flex-col gap-4 items-start'>
            <a
              href={`mailto:${branches[activeBranch].data.email}`}
              className='inline-flex items-center gap-3 text-sm text-ink-secondary hover:text-brand group transition-colors duration-200'
            >
              <span
                className='w-8 h-8 bg-white rounded-md border border-border flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:border-brand shrink-0 transition-all duration-200'
              >
                <MailIcon />
              </span>
              {branches[activeBranch].data.email}
            </a>

            <a
              href={`tel:${branches[activeBranch].data.phone.replace(/\s/g, '')}`}
              className='inline-flex items-center gap-3 text-sm text-ink-secondary hover:text-brand group transition-colors duration-200'
            >
              <span
                className='w-8 h-8 bg-white rounded-md border border-border flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:border-brand shrink-0 transition-all duration-200'
              >
                <PhoneIcon />
              </span>
              {branches[activeBranch].data.phone}
            </a>

            <div className='inline-flex items-center gap-3 text-sm text-ink-muted'>
              <span className='w-8 h-8 bg-white rounded-md border border-border flex items-center justify-center text-brand shrink-0'>
                <LocationIcon />
              </span>
              {branches[activeBranch].address}
            </div>
          </div>

          <div className='flex-1 min-h-[220px] rounded-lg overflow-hidden border border-border'>
            <iframe
              src={branches[activeBranch].data.mapEmbedUrl}
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title={branches[activeBranch].mapTitle}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
