'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FormField } from './form-field';
import { FieldError } from './field-error';
import { CustomSelect } from './custom-select';

export function ContactForm() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    website: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(timer);
  }, [submitted]);

  function validate() {
    const errors: Record<string, string> = {};

    if (!form.name.trim()) {
      errors.name = t('validationRequired');
    } else if (form.name.trim().length < 3) {
      errors.name = t('validationMinChars', { min: 3 });
    } else if (!/^[\p{L}\s'-]+$/u.test(form.name)) {
      errors.name = t('validationNameLetters');
    } else if (form.name.length > 160) {
      errors.name = t('validationMaxChars', { max: 160 });
    }

    if (!form.email.trim()) {
      errors.email = t('validationRequired');
    } else if (form.email.trim().length < 3) {
      errors.email = t('validationMinChars', { min: 3 });
    } else if (form.email.length > 160) {
      errors.email = t('validationMaxChars', { max: 160 });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = t('validationEmail');
    }

    if (!form.phone.trim()) {
      errors.phone = t('validationRequired');
    } else if (form.phone.trim().length < 3) {
      errors.phone = t('validationMinChars', { min: 3 });
    } else if (!/^[\d\s+\-()]+$/.test(form.phone)) {
      errors.phone = t('validationPhoneDigits');
    } else if (form.phone.length > 160) {
      errors.phone = t('validationMaxChars', { max: 160 });
    }

    if (!form.country.trim()) {
      errors.country = t('validationRequired');
    }

    if (!form.message.trim()) {
      errors.message = t('validationRequired');
    } else if (form.message.trim().length < 3) {
      errors.message = t('validationMinChars', { min: 3 });
    } else if (form.message.length > 400) {
      errors.message = t('validationMaxChars', { max: 400 });
    }

    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          country: form.country
            ? form.country.charAt(0).toUpperCase() + form.country.slice(1)
            : '',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        const errorCode = data.error;
        const errorMessages: Record<string, string> = {
          QUOTA_EXCEEDED: t('formErrorQuota'),
          RATE_LIMITED: t('formErrorRateLimit'),
          MISSING_FIELDS: t('formErrorMissingFields'),
          INVALID_NAME: t('validationNameLetters'),
          INVALID_EMAIL: t('validationEmail'),
          INVALID_PHONE: t('validationPhoneDigits'),
          INVALID_MESSAGE: t('formError'),
          INVALID_REQUEST: t('formError'),
          SEND_FAILED: t('formError'),
        };
        throw new Error(errorMessages[errorCode] || t('formError'));
      }

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', country: '', message: '', website: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('formError'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-8 sm:p-10 bg-[#2c2c2c] rounded-xl flex flex-col h-full'>
      <AnimatePresence mode='wait'>
        {submitted ? (
          <motion.div
            key='success'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className='flex-1 flex flex-col items-center justify-center gap-5 py-12'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className='w-20 h-20 bg-brand rounded-full flex items-center justify-center'
            >
              <motion.svg
                width='36'
                height='36'
                fill='none'
                viewBox='0 0 24 24'
                stroke='white'
                strokeWidth='2.5'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <path
                  d='M20 6L9 17l-5-5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </motion.svg>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className='text-white text-lg font-semibold text-center'
            >
              {t('formSuccess')}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key='form'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3
              className='text-xl font-semibold mb-8'
              style={{ color: '#ffffff' }}
            >
              {t('title')}
            </h3>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-5'
              noValidate
            >
              <input
                type='text'
                name='website'
                autoComplete='off'
                tabIndex={-1}
                aria-hidden='true'
                className='absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden'
                value={form.website || ''}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, website: e.target.value }))
                }
              />
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <FormField
                  id='name'
                  label={t('formName')}
                  type='text'
                  required
                  value={form.name}
                  error={fieldErrors.name}
                  onChange={(value) => {
                    setForm((prev) => ({ ...prev, name: value }));
                    setFieldErrors((prev) => ({ ...prev, name: '' }));
                  }}
                />
                <FormField
                  id='email'
                  label={t('formEmail')}
                  type='email'
                  required
                  value={form.email}
                  error={fieldErrors.email}
                  onChange={(value) => {
                    setForm((prev) => ({ ...prev, email: value }));
                    setFieldErrors((prev) => ({ ...prev, email: '' }));
                  }}
                />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <FormField
                  id='phone'
                  label={t('formPhone')}
                  type='tel'
                  value={form.phone}
                  error={fieldErrors.phone}
                  onChange={(value) => {
                    setForm((prev) => ({ ...prev, phone: value }));
                    setFieldErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                />
                <CustomSelect
                  label={t('formCountry')}
                  placeholder={t('countryPlaceholder')}
                  value={form.country}
                  onChange={(value) => setForm((prev) => ({ ...prev, country: value }))}
                  options={[
                    { value: 'romania', label: t('countryRomania') },
                    { value: 'bulgaria', label: t('countryBulgaria') },
                  ]}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='message'
                  className='text-xs font-semibold tracking-wide uppercase'
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {t('formMessage')}
                  <span className='text-brand ml-0.5'>*</span>
                </label>
                <textarea
                  id='message'
                  required
                  rows={5}
                  value={form.message}
                  aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                  aria-invalid={!!fieldErrors.message}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, message: e.target.value }));
                    setFieldErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  className='bg-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none resize-none'
                  style={{
                    border: fieldErrors.message
                      ? '1px solid var(--color-error)'
                      : '1px solid rgba(255,255,255,0.15)',
                    transition: 'border-color 0.2s ease',
                  }}
                />
                <FieldError message={fieldErrors.message} id='message-error' />
              </div>
              {error && (
                <p className='text-sm' style={{ color: 'var(--color-error)' }}>
                  {error}
                </p>
              )}
              <Button
                type='submit'
                size='lg'
                variant='primary'
                className='mt-2 self-end'
                disabled={loading}
              >
                {loading ? t('formSending') : t('formSubmit')}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
