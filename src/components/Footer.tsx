import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

export default function Footer() {
  const LINKS = [
    { name: 'Gallery', href: '/gallery' },
    { name: 'Stories', href: '/stories' },
    { name: 'Process', href: '/process' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <footer className="border-t border-accent/15 bg-surface py-16 px-6 relative overflow-hidden">
      {/* Decorative subtle ambient light */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-20 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Logo */}
        <Link href="/" aria-label="Glowly Ink Home" className="flex items-center gap-2 group">
          <AppLogo
            size={24}
            text="Glowly Ink"
            className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        {/* Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-medium">
          {LINKS.map((link, i, arr) => (
            <React.Fragment key={link.name}>
              <Link
                href={link.href}
                className="text-foreground/50 hover:text-accent transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
              {i < arr.length - 1 && <span className="text-foreground/15">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Contact Info for Ads Trust and Local SEO */}
        <address className="flex flex-col items-end gap-1 text-right mt-8 md:mt-0 not-italic">
          <p className="text-[10px] uppercase tracking-widest text-foreground/60 font-bold">
            Shop No. 21, Aakriti Complex, Zirakpur
          </p>
          <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-medium">
            Open: 10:00 AM - 8:00 PM | vermasanil16@gmail.com
          </p>
          <p className="text-[10px] uppercase tracking-widest text-foreground/30 font-medium mt-2">
            © 2026 Glowly Ink & Aesthetics
          </p>
        </address>
      </div>
    </footer>
  );
}
