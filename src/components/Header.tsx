'use client';
import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NAV_ITEMS = [
  { name: 'Gallery', href: '/gallery' },
  { name: 'Stories', href: '/stories' },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[60] px-4 md:px-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'top-4 translate-y-0' : 'top-0 translate-y-0'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-full transition-all duration-700 ${
            scrolled || isMenuOpen
              ? 'bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] px-6 py-3 md:px-8 md:py-4 mt-0'
              : 'bg-transparent border-transparent px-2 py-4 md:px-4 md:py-5 mt-0'
          }`}
        >
          {/* Logo */}
          <Link href="/" aria-label="Glowly Ink Home" className="flex items-center gap-2 group relative z-[70]">
            <AppLogo
              size={28}
              text="Glowly Ink"
              src="/assets/images/app_logo.png"
              className="group-hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 relative group py-2 ${
                    isActive
                      ? 'text-accent'
                      : 'text-foreground/70 hover:text-accent hover:-translate-y-0.5'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-accent transition-all duration-300 rounded-t-full ${
                      isActive
                        ? 'w-1/2 opacity-100'
                        : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTAs & Mobile Toggle */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/submit-idea"
              className="hidden lg:inline-flex text-[10px] uppercase tracking-[0.2em] font-bold text-foreground hover:text-accent transition-colors"
            >
              Submit Idea
            </Link>
            <Link
              href="/book-session"
              className="bg-accent text-[#111115] hidden sm:inline-flex items-center justify-center text-[10px] uppercase tracking-[0.2em] font-bold py-2.5 px-6 rounded-full hover:bg-accent/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
            >
              <span>Book Session</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-[70] p-2 -mr-2 text-foreground/80 hover:text-accent transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 animate-in" />
              ) : (
                <Bars3Icon className="w-6 h-6 animate-in" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-500 md:hidden ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-dark/40 backdrop-blur-md transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Content */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[400px] bg-bg-main shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent blur-[120px] rounded-full" />
          </div>

          <div className="relative min-h-[100dvh] flex flex-col pt-24 md:pt-32 px-6 md:px-10 pb-8 md:pb-10 overflow-y-auto">
            <div className="flex flex-col gap-6 md:gap-8">
              {NAV_ITEMS.map((item, i) => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-2xl md:text-3xl font-editorial transition-all duration-700 ${
                      isActive ? 'text-accent' : 'text-foreground/80 hover:text-accent'
                    } ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto space-y-8">
              <div
                className={`pt-8 border-t border-border transition-all duration-700 delay-500 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-6">
                  Ready to start?
                </p>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/submit-idea"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-accent hover:text-foreground transition-colors"
                  >
                    Submit Idea
                  </Link>
                  <Link
                    href="/book-session"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full text-center py-4 text-sm"
                  >
                    <span>Book Session</span>
                  </Link>
                </div>
              </div>

              <div
                className={`flex gap-6 transition-all duration-700 delay-700 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                {/* Placeholder social links */}
                {['Instagram', 'Pinterest'].map((social) => (
                  <span
                    key={social}
                    className="text-[10px] uppercase tracking-widest text-foreground/40"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
