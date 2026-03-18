'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export function Header({ forceSolid = false }: { forceSolid?: boolean } = {}) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const main = document.getElementById('main-content');
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      main?.setAttribute('inert', '');
    } else {
      document.body.style.overflow = '';
      main?.removeAttribute('inert');
    }
    return () => {
      document.body.style.overflow = '';
      main?.removeAttribute('inert');
    };
  }, [menuOpen]);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/contact', label: t('contact') },
  ];

  const solid = forceSolid || scrolled || menuOpen;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className='fixed top-0 left-0 right-0 z-[999]'>
      <div
        className={cn(
          'absolute inset-0 bg-white border-b border-border shadow-sm',
          'transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
          solid ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div className='container-site relative'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          <Link href='/' className='relative block h-10 md:h-12 w-[120px]' aria-label='ABA Pergola Systems'>
            <Image
              src='/logo.png'
              alt='ABA Pergola Systems'
              fill
              priority
              className={cn(
                'object-contain object-left transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                solid ? '' : 'brightness-0 invert',
              )}
              sizes='120px'
            />
          </Link>

          <nav
            className='hidden lg:flex items-center gap-7'
            aria-label='Main navigation'
          >
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm font-medium relative pb-0.5',
                  'transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                  isActive(href)
                    ? solid
                      ? 'text-brand'
                      : 'text-white'
                    : solid
                      ? 'text-ink-secondary hover:text-brand'
                      : 'text-white/80 hover:text-white',
                  'after:absolute after:bottom-0 after:left-0 after:h-px after:bg-brand',
                  'after:transition-all after:duration-200',
                  isActive(href)
                    ? 'after:w-full'
                    : 'after:w-0 hover:after:w-full',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className='hidden lg:flex items-center gap-6'>
            <LanguageSwitcher inverted={!solid} />
            <Link href='/contact'>
              <Button
                size='sm'
                variant={solid ? 'primary' : 'outline'}
                className={cn(
                  !solid &&
                    'border-white text-white [&:hover]:bg-white [&:hover]:text-ink',
                )}
              >
                {t('cta')}
              </Button>
            </Link>
          </div>

          <div className='flex lg:hidden items-center gap-4'>
            <LanguageSwitcher inverted={!solid} />
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={menuOpen}
              className={cn(
                'p-2 -mr-1 rounded-sm transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                solid ? 'text-ink' : 'text-white',
              )}
            >
              <div
                className={cn(
                  'w-5 h-4 flex flex-col justify-between',
                  menuOpen && 'invisible',
                )}
              >
                <span className='block h-px bg-current' />
                <span className='block h-px bg-current' />
                <span className='block h-px bg-current' />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 lg:hidden transition-all duration-300',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        inert={!menuOpen || undefined}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/40 transition-opacity duration-300',
            menuOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={cn(
            'absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl',
            'flex flex-col transition-transform duration-300 ease-out',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className='flex items-center justify-between px-6 h-16 border-b border-border'>
            <span className='font-bold text-ink'>{t('menu')}</span>
            <button
              onClick={() => setMenuOpen(false)}
              className='p-2 -mr-2 text-ink-secondary'
              aria-label={t('closeMenu')}
            >
              <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
                <path
                  d='M1 1L17 17M17 1L1 17'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </div>
          <nav
            className='flex-1 px-6 py-8 flex flex-col gap-1'
            aria-label='Mobile navigation'
          >
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'py-3 text-base font-medium border-b border-surface-mid transition-colors duration-200',
                  isActive(href) ? 'text-brand' : 'text-ink hover:text-brand',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className='px-6 pb-8'>
            <Link href='/contact' className='block' onClick={() => setMenuOpen(false)}>
              <Button size='md' className='w-full'>
                {t('cta')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
