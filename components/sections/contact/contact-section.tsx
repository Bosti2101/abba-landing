'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { contactBranches } from '@/content/site-data';
import { cn } from '@/lib/utils/cn';

const MailIcon = () => (
  <svg
    width='16'
    height='16'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth='1.5'
  >
    <rect x='2' y='4' width='20' height='16' rx='2' />
    <path d='M2 7l10 7 10-7' strokeLinecap='round' />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width='16'
    height='16'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth='1.5'
  >
    <path
      d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    width='16'
    height='16'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth='1.5'
  >
    <path
      d='M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <circle cx='12' cy='10' r='3' />
  </svg>
);

export function ContactSection() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeBranch, setActiveBranch] = useState<0 | 1>(1); // 0=Bulgaria, 1=Romania

  const branches = [
    {
      data: contactBranches[0],
      label: t('bulgariaBranch'),
      address: t('bulgariaAddress'),
      mapTitle: 'Map for Bulgaria branch',
    },
    {
      data: contactBranches[1],
      label: t('romaniaBranch'),
      address: t('romaniaAddress'),
      mapTitle: 'Map for Romania branch',
    },
  ];

  // Auto-reset form after success
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(timer);
  }, [submitted]);

  function validate() {
    const errors: Record<string, string> = {};

    // Name: required, min 3, letters/spaces/hyphens only, max 160
    if (!form.name.trim()) {
      errors.name = t('validationRequired');
    } else if (form.name.trim().length < 3) {
      errors.name = t('validationMinChars', { min: 3 });
    } else if (!/^[\p{L}\s'-]+$/u.test(form.name)) {
      errors.name = t('validationNameLetters');
    } else if (form.name.length > 160) {
      errors.name = t('validationMaxChars', { max: 160 });
    }

    // Email: required, min 3, valid format, max 160
    if (!form.email.trim()) {
      errors.email = t('validationRequired');
    } else if (form.email.trim().length < 3) {
      errors.email = t('validationMinChars', { min: 3 });
    } else if (form.email.length > 160) {
      errors.email = t('validationMaxChars', { max: 160 });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = t('validationEmail');
    }

    // Phone: optional, min 3 if provided, digits/spaces/+/- only, max 160
    if (form.phone.trim()) {
      if (form.phone.trim().length < 3) {
        errors.phone = t('validationMinChars', { min: 3 });
      } else if (!/^[\d\s+\-()]+$/.test(form.phone)) {
        errors.phone = t('validationPhoneDigits');
      } else if (form.phone.length > 160) {
        errors.phone = t('validationMaxChars', { max: 160 });
      }
    }

    // Message: required, min 3, max 400
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
        throw new Error(data.error || t('formError'));
      }

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', country: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('formError'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id='contact' className='section-y-sm bg-white' aria-label='Contact'>
      <Container>
        <div className='flex flex-col gap-16'>
          {/* Heading */}
          <Reveal>
            <SectionHeading
              label={t('label')}
              title={t('title')}
              description={t('description')}
              align='center'
              className='max-w-2xl mx-auto'
            />
          </Reveal>

          {/* Two-column: branches left, form right */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left column — single card with branch switcher */}
            <Reveal>
              <div className='flex flex-col gap-6 p-8 bg-[#faf9f7] rounded-xl border border-[#e8e4df] h-full'>
                {/* Branch tab switcher */}
                <div className='relative flex bg-[#e8e4df] rounded-lg p-1'>
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
                          ? 'text-[#1a1a1a]'
                          : 'text-[#7a7a7a] hover:text-[#4a4a4a]',
                      )}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>

                {/* Branch content — animated */}
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
                        className='inline-flex items-center gap-3 text-sm text-[#4a4a4a] hover:text-[#c0392b] group'
                        style={{ transition: 'color 0.2s ease' }}
                      >
                        <span
                          className='w-8 h-8 bg-white rounded-md border border-[#e8e4df] flex items-center justify-center text-[#c0392b] group-hover:bg-[#c0392b] group-hover:text-white group-hover:border-[#c0392b] shrink-0'
                          style={{ transition: 'all 0.2s ease' }}
                        >
                          <MailIcon />
                        </span>
                        {branches[activeBranch].data.email}
                      </a>

                      <a
                        href={`tel:${branches[activeBranch].data.phone.replace(/\s/g, '')}`}
                        className='inline-flex items-center gap-3 text-sm text-[#4a4a4a] hover:text-[#c0392b] group'
                        style={{ transition: 'color 0.2s ease' }}
                      >
                        <span
                          className='w-8 h-8 bg-white rounded-md border border-[#e8e4df] flex items-center justify-center text-[#c0392b] group-hover:bg-[#c0392b] group-hover:text-white group-hover:border-[#c0392b] shrink-0'
                          style={{ transition: 'all 0.2s ease' }}
                        >
                          <PhoneIcon />
                        </span>
                        {branches[activeBranch].data.phone}
                      </a>

                      <div className='inline-flex items-center gap-3 text-sm text-[#7a7a7a]'>
                        <span className='w-8 h-8 bg-white rounded-md border border-[#e8e4df] flex items-center justify-center text-[#c0392b] shrink-0'>
                          <LocationIcon />
                        </span>
                        {branches[activeBranch].address}
                      </div>
                    </div>

                    <div className='flex-1 min-h-[220px] rounded-lg overflow-hidden border border-[#e8e4df]'>
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
            </Reveal>

            {/* Right column — contact form */}
            <Reveal>
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
                        className='w-20 h-20 bg-[#c0392b] rounded-full flex items-center justify-center'
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
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                          <FormField
                            id='name'
                            label={t('formName')}
                            type='text'
                            required
                            value={form.name}
                            error={fieldErrors.name}
                            onChange={(v) => {
                              setForm((f) => ({ ...f, name: v }));
                              setFieldErrors((e) => ({ ...e, name: '' }));
                            }}
                          />
                          <FormField
                            id='email'
                            label={t('formEmail')}
                            type='email'
                            required
                            value={form.email}
                            error={fieldErrors.email}
                            onChange={(v) => {
                              setForm((f) => ({ ...f, email: v }));
                              setFieldErrors((e) => ({ ...e, email: '' }));
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
                            onChange={(v) => {
                              setForm((f) => ({ ...f, phone: v }));
                              setFieldErrors((e) => ({ ...e, phone: '' }));
                            }}
                          />
                          <CustomSelect
                            label={t('formCountry')}
                            placeholder={t('countryPlaceholder')}
                            value={form.country}
                            onChange={(v) => setForm((f) => ({ ...f, country: v }))}
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
                            <span className='text-[#c0392b] ml-0.5'>*</span>
                          </label>
                          <textarea
                            id='message'
                            required
                            rows={5}
                            value={form.message}
                            onChange={(e) => {
                              setForm((f) => ({
                                ...f,
                                message: e.target.value,
                              }));
                              setFieldErrors((err) => ({
                                ...err,
                                message: '',
                              }));
                            }}
                            className='bg-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none resize-none'
                            style={{
                              border: fieldErrors.message
                                ? '1px solid #e74c3c'
                                : '1px solid rgba(255,255,255,0.15)',
                              transition: 'border-color 0.2s ease',
                            }}
                          />
                          <FieldError message={fieldErrors.message} />
                        </div>
                        {error && (
                          <p className='text-sm' style={{ color: '#e74c3c' }}>
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
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className='text-xs font-medium overflow-hidden'
          style={{ color: '#e74c3c' }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FormField({
  id,
  label,
  type,
  required,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={id}
        className='text-xs font-semibold tracking-wide uppercase'
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        {label}
        {required && <span className='text-[#c0392b] ml-0.5'>*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='bg-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none'
        style={{
          border: error
            ? '1px solid #e74c3c'
            : '1px solid rgba(255,255,255,0.15)',
          transition: 'border-color 0.2s ease',
        }}
      />
      <FieldError message={error} />
    </div>
  );
}

function CustomSelect({
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className='flex flex-col gap-2' ref={ref}>
      <span className='text-xs font-semibold tracking-wide uppercase' style={{ color: 'rgba(255,255,255,0.6)' }}>
        {label}
      </span>
      <div className='relative'>
        <button
          type='button'
          onClick={() => setOpen((v) => !v)}
          className='w-full bg-white/10 rounded-sm px-4 py-3 text-sm text-left flex items-center justify-between'
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'border-color 0.2s ease',
            color: selected ? '#ffffff' : 'rgba(255,255,255,0.35)',
          }}
        >
          {selected ? selected.label : placeholder}
          <svg
            width='12'
            height='8'
            viewBox='0 0 12 8'
            fill='none'
            className='shrink-0 ml-2'
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <path
              d='M1 1.5L6 6.5L11 1.5'
              stroke='rgba(255,255,255,0.5)'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className='absolute z-50 top-full left-0 right-0 mt-1 rounded-sm overflow-hidden'
              style={{
                background: '#3a3a3a',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {options.map((opt) => (
                <li key={opt.value}>
                  <button
                    type='button'
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      'w-full px-4 py-2.5 text-sm text-left transition-colors duration-100',
                      opt.value === value
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5',
                    )}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
