'use client';

import React, { useRef, useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface TattooItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  artist: string;
  placement: string;
  sessions: number;
  style: string;
  story: string;
  layoutClass?: string;
}

const GALLERY_IMAGES: TattooItem[] = Array.from({ length: 8 }).map((_, i) => {
  const categories = ['Geometric', 'Traditional', 'Minimalist'];
  const artists = ['Elena Silva', 'Marcus Thorne'];
  const placements = [
    'Inner forearm',
    'Spine alignment',
    'Upper shoulder',
    'Calf wrap',
    'Tricep panel',
  ];
  const styles = ['Fine-line dot-work', 'Neo-traditional blackwork', 'Micro-precision line-work'];

  const category = categories[i % 3];
  const artist = i % 2 === 0 ? artists[0] : artists[1];
  const placement = placements[i % 5];
  const style = styles[i % 3];
  const sessions = (i % 3) + 1;
  const story = `A custom collaborative piece drafted meticulously for a private client, emphasizing high-contrast flow and precise anatomical alignment.`;

  const layoutClasses = ['rotate-[-1deg]', 'rotate-[1.5deg]', 'rotate-[-2deg]', 'rotate-[1deg]'];

  return {
    id: i,
    src: i % 2 === 0 ? '/images/tattoo_design.png' : '/images/tattoo_making.png',
    alt: `Tattoo artwork ${i + 1} by ${artist}`,
    category,
    artist,
    placement,
    sessions,
    style,
    story,
    layoutClass: layoutClasses[i % 4],
  };
});

export default function GalleryPage() {
  const [selectedTattoo, setSelectedTattoo] = useState<TattooItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!trackRef.current || !trackContainerRef.current) return;

      const mm = gsap.matchMedia();

      // Sticky Stacking Scroll Animations
      mm.add('all', () => {
        const panels = panelsRef.current;

        panels.forEach((panel, i) => {
          if (!panel) return;

          // 1. Initial Reveal (Fade up when it first comes into view)
          gsap.fromTo(
            panel,
            { y: 150, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 95%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // 2. The Stacking Physics (Scale down and dim when the NEXT card slides over)
          const nextPanel = panels[i + 1];
          if (nextPanel) {
            gsap.to(panel, {
              scale: 0.9,
              opacity: 0.5,
              filter: 'brightness(0.3) saturate(0)',
              ease: 'none',
              scrollTrigger: {
                trigger: nextPanel,
                start: 'top bottom', // Starts when next card enters bottom of screen
                end: 'top 15%', // Ends when next card hits the sticky position
                scrub: true,
              },
            });
          }
        });
      });

      // Cleanup
      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <main className="min-h-screen bg-bg-main relative overflow-hidden" ref={containerRef}>
      {/* ── Hero Entry ── */}
      <section className="h-screen w-full flex flex-col justify-center px-6 md:px-20 relative z-10">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-accent font-medium mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          The Archive Collection
        </p>
        <h1 className="font-editorial text-foreground text-7xl md:text-[12vw] leading-[0.85] tracking-tighter font-bold uppercase mix-blend-difference z-20">
          Selected
          <br />
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/50 ml-[10vw]">
            Works.
          </span>
        </h1>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-6 md:left-20 flex items-center gap-4 text-accent">
          <div className="w-12 h-[1px] bg-accent/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-accent animate-[slideRight_2s_ease-in-out_infinite]" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-semibold">
            Scroll to explore
          </span>
        </div>
      </section>

      {/* ── Sticky Card Stacking Feed ── */}
      <section ref={trackContainerRef} className="w-full relative z-20 bg-bg-main py-20 pb-[50vh]">
        <div ref={trackRef} className="flex flex-col w-full px-4 md:px-20 max-w-[1400px] mx-auto">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={img.id}
              ref={(el) => {
                panelsRef.current[index] = el;
              }}
              onClick={() => setSelectedTattoo(img)}
              className={`panel sticky top-[10vh] md:top-[12vh] flex-shrink-0 group cursor-pointer overflow-hidden rounded-[30px] md:rounded-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] will-change-transform mb-[80vh] w-full md:w-[75vw] h-[75vh] md:h-[80vh] mx-auto ${img.layoutClass}`}
              style={{ zIndex: index }}
            >
              {/* Image Container */}
              <div className="absolute inset-0 overflow-hidden bg-[#18181f]">
                <div className="absolute inset-[-5px] transition-transform duration-1000 group-hover:scale-105 will-change-transform">
                  <AppImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ filter: 'saturate(0.5) contrast(1.1) brightness(0.8)' }}
                  />
                </div>
              </div>

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-700 z-10" />

              {/* Art Info Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none">
                <div className="overflow-hidden">
                  <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-semibold text-[#111115] bg-accent px-4 py-2 transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    {img.category}
                  </span>
                </div>

                <div className="mt-auto transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">
                  <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-3 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-accent inline-block"></span>
                    {img.artist}
                  </p>
                  <h3 className="font-editorial text-4xl md:text-5xl text-white italic font-light drop-shadow-lg">
                    {img.placement}
                  </h3>
                </div>
              </div>

              {/* Outer stroke detail */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-colors duration-700 z-30 pointer-events-none mix-blend-overlay" />
            </div>
          ))}

          {/* End cap message */}
          <div className="w-full flex items-center justify-center pt-20 pb-32">
            <h2 className="font-editorial text-5xl md:text-7xl text-foreground-muted font-light italic text-center">
              End of <br />
              <span className="text-accent not-italic font-bold">Exhibition</span>
            </h2>
          </div>
        </div>
      </section>

      {/* ── Premium Lightbox & Details Drawer ── */}
      <div
        className={`fixed inset-0 z-[100] flex justify-end transition-all duration-700 ease-in-out ${
          selectedTattoo ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#0a0a0c]/80 backdrop-blur-md transition-opacity duration-700 ${
            selectedTattoo ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSelectedTattoo(null)}
        />

        {/* Side Panel Drawer */}
        <div
          className={`relative bg-bg-main w-full md:w-[60vw] lg:w-[45vw] h-[100dvh] md:h-full flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            selectedTattoo ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedTattoo(null)}
            className="absolute top-8 right-8 z-30 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-foreground/60 hover:text-accent hover:border-accent/40 bg-surface/50 backdrop-blur-md transition-all duration-300"
            aria-label="Close details"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {selectedTattoo && (
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
              {/* Massive Image Header */}
              <div className="relative w-full h-[50vh] md:h-[60vh] flex-shrink-0 bg-[#18181f]">
                <AppImage
                  src={selectedTattoo.src}
                  alt={selectedTattoo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  style={{ filter: 'saturate(0.7) brightness(0.9)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent opacity-90" />

                {/* Floating Meta */}
                <div className="absolute bottom-10 left-10 flex gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#111115] bg-accent px-4 py-2">
                    {selectedTattoo.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white border border-white/20 backdrop-blur-md px-4 py-2">
                    {selectedTattoo.sessions} sessions
                  </span>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-10 md:p-14 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-editorial text-4xl md:text-6xl text-foreground font-bold tracking-tight mb-4 leading-none">
                    {selectedTattoo.placement}
                  </h2>

                  <p className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-10 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-accent inline-block"></span>
                    By {selectedTattoo.artist}
                  </p>

                  <p className="text-foreground-muted font-light text-sm md:text-base leading-loose mb-12 italic border-l border-accent/30 pl-6">
                    &quot;{selectedTattoo.story}&quot;
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mb-12">
                    <div>
                      <span className="block text-[9px] uppercase tracking-[0.25em] text-foreground-muted mb-2 font-bold">
                        Ink Style
                      </span>
                      <span className="text-sm text-foreground font-medium tracking-wide">
                        {selectedTattoo.style}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-[0.25em] text-foreground-muted mb-2 font-bold">
                        Anatomy Flow
                      </span>
                      <span className="text-sm text-foreground font-medium tracking-wide">
                        {selectedTattoo.placement} Alignment
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/book-session?artist=${encodeURIComponent(selectedTattoo.artist)}&placement=${encodeURIComponent(selectedTattoo.placement)}`}
                  className="group relative w-full inline-flex items-center justify-between bg-accent text-[#111115] p-6 overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 text-xs md:text-sm uppercase tracking-[0.2em] font-bold">
                    Request Custom Ink
                  </span>
                  <span className="relative z-10 w-10 h-10 flex items-center justify-center bg-[#111115] text-accent rounded-full transform group-hover:rotate-45 transition-transform duration-500">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
