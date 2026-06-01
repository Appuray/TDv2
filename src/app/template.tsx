'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Fast, elegant page transition
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="will-change-transform min-h-screen flex flex-col">
      {children}
    </div>
  );
}
