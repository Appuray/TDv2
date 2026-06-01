import React from 'react';
import { Metadata } from 'next';
import ProcessSection from '@/components/sections/ProcessSection';

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'Learn about our rigorous hygiene standards, tattoo healing process, and advanced aesthetic treatment workflows at Glowly Ink & Aesthetics.',
  alternates: { canonical: '/process' },
  openGraph: {
    title: 'Our Process | Glowly Ink',
    description: 'Learn about our rigorous hygiene standards, tattoo healing process, and advanced aesthetic treatment workflows at Glowly Ink & Aesthetics.',
    url: 'https://glowlyink.com/process',
  },
};

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-bg-main">
      <div className="pt-32 pb-16 text-center px-6 border-b-2 border-white/10 mx-6 lg:mx-12">
        <h1 className="font-editorial text-foreground text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
          Our <span className="italic font-light">Process.</span>
        </h1>
        <p className="text-foreground/60 font-medium text-lg uppercase tracking-widest2 mt-8 max-w-2xl mx-auto">
          From the initial spark to the final etched piece.
        </p>
      </div>
      <ProcessSection />
    </main>
  );
}
