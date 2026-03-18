'use client';

import { FieldError } from './field-error';

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export function FormField({
  id,
  label,
  type,
  required,
  value,
  onChange,
  error,
}: FormFieldProps) {
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={id}
        className='text-xs font-semibold tracking-wide uppercase'
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        {label}
        {required && <span className='text-brand ml-0.5'>*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className='bg-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none'
        style={{
          border: error
            ? '1px solid var(--color-error)'
            : '1px solid rgba(255,255,255,0.15)',
          transition: 'border-color 0.2s ease',
        }}
      />
      <FieldError message={error} id={`${id}-error`} />
    </div>
  );
}
