'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export function Header() {
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

  // Lock body scroll and set inert on main content when mobile menu is open
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
    { href: '/#contact', label: t('contact') },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-50'>
        <div
          className={cn(
            'absolute inset-0 bg-white border-b border-border shadow-sm',
            'transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div className='container-site relative'>
          <div className='flex items-center justify-between h-16 md:h-20'>
            <Link href='/' className='block' aria-label='ABA Pergola Systems'>
              <Image
                src='/logo.png'
                alt='ABA Pergola Systems'
                width={120}
                height={40}
                priority
                className={cn(
                  'h-10 md:h-12 w-auto transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                  scrolled ? '' : 'brightness-0 invert',
                )}
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
                  onClick={
                    href.includes('#')
                      ? (e: React.MouseEvent) => {
                          const hash = href.split('#')[1];
                          const el = document.getElementById(hash);
                          if (el) {
                            e.preventDefault();
                            el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      : undefined
                  }
                  className={cn(
                    'text-sm font-medium relative pb-0.5',
                    'transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    isActive(href)
                      ? scrolled
                        ? 'text-brand'
                        : 'text-white'
                      : scrolled
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
              <LanguageSwitcher inverted={!scrolled} />
              <Link
                href='/#contact'
                onClick={(e: React.MouseEvent) => {
                  const el = document.getElementById('contact');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Button
                  size='sm'
                  variant={scrolled ? 'primary' : 'outline'}
                  className={cn(
                    !scrolled &&
                      'border-white text-white [&:hover]:bg-white [&:hover]:text-ink',
                  )}
                >
                  {t('cta')}
                </Button>
              </Link>
            </div>

            <div className='flex lg:hidden items-center gap-4'>
              <LanguageSwitcher inverted={!scrolled} />
              <button
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className={cn(
                  'p-2 -mr-1 rounded-sm transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                  scrolled ? 'text-ink' : 'text-white',
                )}
              >
                <span className='sr-only'>{menuOpen ? 'Close' : 'Menu'}</span>
                <div className='w-5 h-4 flex flex-col justify-between'>
                  <span
                    className={cn(
                      'block h-px bg-current transition-all duration-300 origin-center',
                      menuOpen ? 'rotate-45 translate-y-[7.5px]' : '',
                    )}
                  />
                  <span
                    className={cn(
                      'block h-px bg-current transition-all duration-300',
                      menuOpen ? 'opacity-0 scale-x-0' : '',
                    )}
                  />
                  <span
                    className={cn(
                      'block h-px bg-current transition-all duration-300 origin-center',
                      menuOpen ? '-rotate-45 -translate-y-[7.5px]' : '',
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!menuOpen}
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
            <span className='font-bold text-ink'>Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className='p-2 -mr-2 text-ink-secondary'
              aria-label='Close menu'
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
                onClick={
                  href.includes('#')
                    ? (e: React.MouseEvent) => {
                        const hash = href.split('#')[1];
                        const el = document.getElementById(hash);
                        if (el) {
                          e.preventDefault();
                          setMenuOpen(false);
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    : undefined
                }
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
            <Link
              href='/#contact'
              className='block'
              onClick={(e: React.MouseEvent) => {
                const el = document.getElementById('contact');
                if (el) {
                  e.preventDefault();
                  setMenuOpen(false);
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Button size='md' className='w-full'>
                {t('cta')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
