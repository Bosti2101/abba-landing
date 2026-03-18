'use client';

import { motion, AnimatePresence } from 'framer-motion';

export function FieldError({ message, id }: { message?: string; id?: string }) {
  return (
    <div aria-live='polite'>
      <AnimatePresence>
        {message && (
          <motion.p
            id={id}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className='text-xs font-medium overflow-hidden'
            role='alert'
            style={{ color: 'var(--color-error)' }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
