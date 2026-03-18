'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
}

export function CustomSelect({
  label,
  placeholder,
  value,
  onChange,
  options,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Reset active index when opening
  useEffect(() => {
    if (open) {
      const currentIdx = options.findIndex((o) => o.value === value);
      setActiveIndex(currentIdx >= 0 ? currentIdx : 0);
    }
  }, [open, options, value]);

  const selectOption = useCallback(
    (opt: SelectOption) => {
      onChange(opt.value);
      setOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (open && activeIndex >= 0) {
            selectOption(options[activeIndex]);
          } else {
            setOpen(true);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            setActiveIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : 0,
            );
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            setActiveIndex((prev) =>
              prev > 0 ? prev - 1 : options.length - 1,
            );
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
        case 'Tab':
          setOpen(false);
          break;
      }
    },
    [open, activeIndex, options, selectOption],
  );

  // Scroll active option into view
  useEffect(() => {
    if (open && listRef.current && activeIndex >= 0) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, open]);

  const listboxId = 'country-listbox';

  return (
    <div className='flex flex-col gap-2' ref={ref}>
      <span
        className='text-xs font-semibold tracking-wide uppercase'
        id='country-label'
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        {label}
      </span>
      <div className='relative'>
        <button
          type='button'
          role='combobox'
          aria-expanded={open}
          aria-haspopup='listbox'
          aria-controls={listboxId}
          aria-labelledby='country-label'
          onClick={() => setOpen((v) => !v)}
          onKeyDown={handleKeyDown}
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
            aria-hidden='true'
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
              ref={listRef}
              id={listboxId}
              role='listbox'
              aria-labelledby='country-label'
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
              {options.map((opt, i) => (
                <li
                  key={opt.value}
                  role='option'
                  aria-selected={opt.value === value}
                >
                  <button
                    type='button'
                    tabIndex={-1}
                    onClick={() => selectOption(opt)}
                    className={cn(
                      'w-full px-4 py-2.5 text-sm text-left transition-colors duration-100',
                      opt.value === value
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5',
                      i === activeIndex && 'bg-white/10 text-white',
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
