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
    title: 'Consultation & Concept Mapping',
    description:
      'Every piece starts as a conversation. We discuss your vision, map out body placement, and curate reference materials to capture your style. You leave this session with a clear price quote, a customized project timeline, and zero obligation to book.',
    badge: '1-on-1 Artist consultation',
    badgeColor: '#D4AF37',
    image: {
      src: '/images/tattoo_design.png',
      alt: 'Tattoo designer discussing sketching details with a client at a design table',
    },
    dataStep: '1',
  },
  {
    number: '02',
    title: 'Bespoke Sketching & Stencil Layout',
    description:
      'We draft a custom digital sketch tailored specifically to your body contour. We iterate on the drawing based on your feedback until you approve. On tattoo day, we apply the stencil, adjusting angles and scales until the placement sits perfectly with your natural alignment.',
    badge: 'Custom anatomical drafting',
    badgeColor: '#D4AF37',
    image: {
      src: '/images/tattoo_making.png',
      alt: 'Tattoo designer drawing custom fine line stencils on a tablet',
    },
    dataStep: '2',
  },
  {
    number: '03',
    title: 'Precision Application & Aftercare',
    description:
      'Tattooing is executed in a private, quiet room utilizing medical-grade sanitization, sterile single-use needles, and premium organic inks. We apply medical healing wraps immediately post-session. Your client portal provides direct access to day-by-day care instructions and a free touch-up window.',
    badge: 'Private & sterile session',
    badgeColor: '#D4AF37',
    image: {
      src: '/images/tattoo_design.png',
      alt: 'Professional tattooing process in a fully sterile private environment',
    },
    dataStep: '3',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const stepTriggersRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stepContents = gsap.utils.toArray<HTMLElement>('.workflow-step-content');
      const stepTriggers = gsap.utils.toArray<HTMLElement>('.step-trigger');
      const workflowImages = gsap.utils.toArray<HTMLElement>('.workflow-img');

      stepContents.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) {
              const idx = step.getAttribute('data-step');

              stepTriggers.forEach((trigger) => {
                const line = trigger.querySelector<HTMLElement>('.step-indicator');
                const text = trigger.querySelector<HTMLElement>('.step-text');
                const title = trigger.querySelector<HTMLElement>('h3');

                if (trigger.getAttribute('data-step') === idx) {
                  if (line) gsap.to(line, { height: '100%', duration: 0.6, ease: 'power3.out' });
                  if (text) text.classList.add('active');
                  if (title)
                    gsap.to(title, {
                      color: '#FAFAFA',
                      textShadow: '0 0 20px rgba(196,168,130,0.2)',
                      duration: 0.4,
                    });
                } else {
                  if (line) gsap.to(line, { height: '0%', duration: 0.6, ease: 'power3.out' });
                  if (text) text.classList.remove('active');
                  if (title)
                    gsap.to(title, {
                      color: 'var(--color-foreground-muted)',
                      textShadow: 'none',
                      duration: 0.4,
                    });
                }
              });

              workflowImages.forEach((img) => {
                if (img.getAttribute('data-step') === idx) {
                  img.classList.add('active-img');
                } else {
                  img.classList.remove('active-img');
                }
              });
            }
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-bg-main relative overflow-hidden pt-20 border-y border-border"
    >
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent opacity-5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent opacity-5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row">
          {/* Sticky Left */}
          <div className="lg:w-1/2 lg:h-screen sticky top-0 flex flex-col justify-center py-16 lg:py-0 pr-0 lg:pr-20 border-r border-border">
            {/* Header */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4 animate-pulse">
              How it works
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
              className="font-editorial text-foreground mb-12"
            >
              The dedicated
              <br />
              <em
                className="text-shimmer"
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                }}
              >
                craft of tattooing.
              </em>
            </h2>

            {/* Step nav — desktop */}
            <div
              ref={stepTriggersRef}
              className="hidden lg:block border-l border-border pl-8 relative space-y-10 mb-12"
            >
              <div className="vertical-beam opacity-50" />
              {STEPS.map((step, index) => (
                <div
                  key={step.dataStep}
                  className="step-trigger flex items-start gap-5 cursor-pointer group"
                  data-step={step.dataStep}
                  onClick={() => {
                    const el = stepsRef.current?.querySelectorAll('.workflow-step-content')[index];
                    if (el) {
                      const topOffset =
                        el.getBoundingClientRect().top +
                        window.scrollY -
                        window.innerHeight / 2 +
                        100;
                      window.scrollTo({ top: topOffset, behavior: 'smooth' });
                    }
                  }}
                >
                  <div
                    className="step-indicator absolute top-0 left-[-1px] w-[2px] transition-all duration-700 ease-out"
                    style={{
                      height: '0%',
                      background: step.badgeColor,
                      boxShadow: `0 0 15px ${step.badgeColor}, 0 0 5px ${step.badgeColor}`,
                    }}
                  />

                  <div>
                    <h3
                      className="text-base uppercase tracking-[0.2em] font-medium transition-all duration-500 group-hover:text-foreground"
                      style={{
                        color: 'var(--color-foreground-muted)',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      <span className="text-accent font-bold mr-2">{step.number}</span>{' '}
                      <span className="opacity-40">/</span> {step.title}
                    </h3>
                    <p className="step-text text-sm mt-1 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic visual — desktop */}
            <div
              ref={imagesRef}
              className="hidden lg:block relative overflow-hidden rounded-xl border border-border shadow-[0_0_40px_rgba(196,168,130,0.1)]"
              style={{ aspectRatio: '16/9' }}
            >
              {STEPS.map((step) => (
                <div
                  key={step.dataStep}
                  className="workflow-img absolute inset-0 z-10 transition-all duration-1000"
                  data-step={step.dataStep}
                >
                  <AppImage
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="45vw"
                    className="object-cover transform scale-105 transition-transform duration-1000"
                  />

                  {/* Dynamic Cinematic Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/20 to-transparent mix-blend-overlay opacity-60" />

                  <div className="absolute bottom-6 left-6 z-10">
                    <span
                      className="text-[10px] uppercase tracking-[0.25em] font-medium px-4 py-2 rounded-full"
                      style={{
                        background: 'rgba(10, 10, 12, 0.8)',
                        border: `1px solid rgba(196, 168, 130, 0.3)`,
                        color: 'var(--color-accent)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrolling Right */}
          <div ref={stepsRef} className="lg:w-1/2">
            <div className="h-[10vh] hidden lg:block" />

            {STEPS.map((step, idx) => (
              <div
                key={step.dataStep}
                className="workflow-step-content min-h-[50vh] lg:min-h-[70vh] flex flex-col justify-center px-0 lg:px-20 py-16 lg:py-24 relative"
                style={{
                  borderBottom: idx < STEPS.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
                data-step={step.dataStep}
              >
                {/* Glowing Noodle SVG */}
                <div className="absolute left-0 lg:left-8 top-0 bottom-0 w-8 hidden lg:block">
                  <svg
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d={`M 1 ${idx === 0 ? 0 : -50} V 50 C 1 90 30 90 40 90`}
                      className="noodle-line"
                      vectorEffect="non-scaling-stroke"
                      style={{ stroke: 'var(--color-border)' }}
                    />

                    <path
                      d={`M 1 ${idx === 0 ? 0 : -50} V 50 C 1 90 30 90 40 90`}
                      className="noodle-beam-path"
                      vectorEffect="non-scaling-stroke"
                      style={{
                        animationDelay: `${idx * 1.5}s`,
                        stroke: 'var(--color-accent)',
                        filter: 'drop-shadow(0 0 8px rgba(196,168,130,0.5))',
                      }}
                    />
                  </svg>
                </div>

                <div className="relative lg:pl-12">
                  {/* Ghost number */}
                  <span
                    className="absolute -left-6 -top-12 font-editorial select-none pointer-events-none"
                    style={{
                      fontSize: '6rem',
                      color: 'transparent',
                      WebkitTextStroke: '1.5px var(--color-border)',
                      fontWeight: 300,
                      lineHeight: 1,
                      textShadow: '0 0 20px rgba(196,168,130,0.1)',
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>

                  {/* Mobile image */}
                  <div
                    className="lg:hidden relative overflow-hidden rounded-xl mb-10 border border-border shadow-xl"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <AppImage
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      sizes="90vw"
                      className="object-cover"
                      style={{ filter: 'saturate(0.85) brightness(0.9)' } as React.CSSProperties}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent opacity-80" />
                  </div>

                  <h3
                    className="font-editorial text-foreground mb-8 relative z-10"
                    style={{
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                      letterSpacing: '-0.02em',
                      fontStyle: 'italic',
                      fontWeight: 300,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="leading-relaxed font-light relative z-10 mb-10 text-[1.1rem]"
                    style={{ color: 'var(--color-foreground-muted)', maxWidth: '500px' }}
                  >
                    {step.description}
                  </p>

                  <span
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-medium px-4 py-2 rounded-full"
                    style={{
                      background: 'rgba(196, 168, 130, 0.05)',
                      border: `1px solid rgba(196,168,130,0.2)`,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {step.badge}
                  </span>

                  {/* Final CTA */}
                  {idx === STEPS.length - 1 && (
                    <div className="mt-16">
                      <a
                        href="#booking"
                        className="inline-flex items-center gap-3 bg-accent text-[#111115] px-8 py-4 uppercase tracking-[0.15em] text-xs font-bold hover:bg-accent/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,168,130,0.2)]"
                      >
                        <span>Book Your Consultation</span>
                        <Icon name="ArrowRightIcon" size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
