'use client';
import React, { useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = [
  {
    number: '01',
    title: 'Consultation & Skin Analysis',
    description:
      'Every journey starts with a conversation. We discuss your vision, analyze your skin/hair profile, and curate a customized plan to match your goals. You leave with a clear timeline and zero obligation to book.',
    badge: '1-on-1 Expert Consultation',
    image: '/images/tattoo_design.png',
  },
  {
    number: '02',
    title: 'Bespoke Drafting & Setup',
    description:
      'For tattoos, we draft custom sketches tailored to your body contour. For clinical aesthetics, we calibrate our advanced technology (Laser, Medifacial) specifically for your unique physiology. Everything is mapped out precisely.',
    badge: 'Customized Treatment Plan',
    image: '/images/tattoo_making.png',
  },
  {
    number: '03',
    title: 'Precision Application & Aftercare',
    description:
      'Executed in a private room utilizing medical-grade sanitization, sterile equipment, and premium technology. We provide immediate post-session protocols and strict aftercare routines for maximum visible, refined results.',
    badge: 'Private & Sterile Session',
    image: '/images/tattoo_design.png',
  },
];

export default function HorizontalProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!trackRef.current || !scrollContainerRef.current) return;

      const mm = gsap.matchMedia();
      const container = scrollContainerRef.current;
      const panels = gsap.utils.toArray<HTMLElement>('.process-panel');

      mm.add('(min-width: 768px)', () => {
        // Bulletproof Horizontal Scroll: No 'pin: true' to break layout.
        // We animate the 'x' of the flex container while the sticky wrapper holds it in place.
        gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Parallax effect on images inside panels
        panels.forEach((panel) => {
          const img = panel.querySelector('.panel-image');
          if (img) {
            gsap.fromTo(
              img,
              { x: '10%' },
              {
                x: '-10%',
                ease: 'none',
                scrollTrigger: {
                  trigger: trackRef.current,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: true,
                },
              }
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: trackRef }
  );

  return (
    // On desktop, the track is 300vh to allow scrolling. On mobile, it's auto height.
    <section ref={trackRef} className="relative h-auto md:h-[300vh] bg-bg-main z-20">
      {/* Sticky wrapper for desktop, standard relative for mobile */}
      <div className="relative md:sticky top-0 left-0 w-full h-auto md:h-screen overflow-hidden flex flex-col justify-center border-y border-border py-20 md:py-0">
        {/* Absolute Title (Desktop) / Relative (Mobile) */}
        <div className="relative md:absolute top-auto md:top-20 left-6 md:left-16 z-30 pointer-events-none mb-10 md:mb-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4">
            How it works
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
            className="font-editorial text-foreground text-shimmer italic"
          >
            The dedicated craft.
          </h2>
        </div>

        {/* The Flex Container: moves horizontally on desktop, stacks vertically on mobile */}
        <div
          ref={scrollContainerRef}
          className="w-full md:w-[300vw] h-auto md:h-[70vh] flex flex-col md:flex-row flex-nowrap mt-0 md:mt-40 gap-16 md:gap-0"
        >
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="process-panel w-full md:w-screen h-auto md:h-full flex items-center justify-center px-6 md:px-16 flex-shrink-0"
            >
              <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Image Side */}
                <div className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl border border-border shadow-[0_0_40px_rgba(196,168,130,0.05)]">
                  <AppImage
                    src={step.image}
                    alt={step.title}
                    fill
                    className="panel-image object-cover md:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-medium px-4 py-2 rounded-full border border-accent/30 bg-bg-main/80 text-accent backdrop-blur-md">
                      {step.badge}
                    </span>
                  </div>
                </div>

                {/* Text Side */}
                <div className="flex flex-col justify-center">
                  <span
                    className="font-editorial text-8xl md:text-[10rem] text-transparent leading-none select-none pointer-events-none absolute md:relative -top-20 md:top-0 -left-6 md:left-0 opacity-20 md:opacity-100"
                    style={{ WebkitTextStroke: '2px var(--color-border)', fontWeight: 300 }}
                  >
                    {step.number}
                  </span>
                  <h3 className="font-editorial text-3xl md:text-5xl font-light italic text-foreground mb-6 mt-0 md:-mt-12 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-foreground-muted font-light leading-relaxed text-sm md:text-lg max-w-md relative z-10">
                    {step.description}
                  </p>
                  {idx === STEPS.length - 1 && (
                    <div className="mt-12">
                      <a
                        href="/book-session"
                        className="inline-flex items-center gap-3 bg-accent text-[#111115] px-8 py-4 uppercase tracking-[0.15em] text-xs font-bold hover:bg-accent/90 transition-all duration-300 min-h-[44px] active-press"
                      >
                        <span>Book Consultation</span>
                        <Icon name="ArrowRightIcon" size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
