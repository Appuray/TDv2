'use client';
import React, { useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CASE_STUDIES = [
  {
    id: 'CS01',
    clientProfile: 'Botanical Legacy Sleeve · 28 · Brooklyn',
    reason:
      'A custom forearm sleeve capturing native wildflowers from his childhood home. He wanted a design that felt sketched directly onto skin with micro-precision line-work.',
    inkStyle: 'Fine-line botanical · Muted blackwork · Forearm',
    sessions: 2,
    area: 'Inner wrist & forearm',
    outcome: 'Intricate, clean healed lines',
    emotion: 'Connection',
    progressImages: [
      {
        label: 'Concept Sketch',
        src: '/images/tattoo_design.png',
        alt: 'Digital line-work drawing mockup of botanical sleeve',
      },
      {
        label: 'Stencil Placement',
        src: '/images/tattoo_making.png',
        alt: 'Forearm showing applied stencil placement ready for tattooing',
      },
      {
        label: 'Healed Ink',
        src: '/images/tattoo_design.png',
        alt: 'Healed fine-line botanical forearm sleeve',
      },
    ],
    accentColor: '#D4AF37',
  },
  {
    id: 'CS02',
    clientProfile: 'Geometric Spine Alignment · 34 · Manhattan',
    reason:
      'A complex mathematical alignment tracing down the spine. She wanted perfect symmetry, absolute vertical precision, and dot-work gradients that flow naturally with body movement.',
    inkStyle: 'Fine-line geometric · High-contrast dot-work · Full Spine',
    sessions: 3,
    area: 'Spine',
    outcome: 'Perfect geometric symmetry',
    emotion: 'Alignment',
    progressImages: [
      {
        label: 'Concept Sketch',
        src: '/images/tattoo_making.png',
        alt: 'Symmetrical geometric line-work design',
      },
      {
        label: 'Stencil Placement',
        src: '/images/tattoo_design.png',
        alt: 'Client spine showing vertical stencil alignment',
      },
      {
        label: 'Healed Ink',
        src: '/images/tattoo_making.png',
        alt: 'Completed geometric spine tattoo showing dot-work detailing',
      },
    ],
    accentColor: '#C4A882',
  },
  {
    id: 'CS03',
    clientProfile: 'Phoenix Cover-up · 31 · Bushwick',
    reason:
      'An old, dark tribal tattoo from his college days. He wanted a bold phoenix cover-up that completely masked the old ink without requiring laser removal sessions, utilizing negative space shading.',
    inkStyle: 'Neo-traditional blackwork · Custom cover-up · Upper arm',
    sessions: 4,
    area: 'Upper arm sleeve',
    outcome: '100% cover-up of old tribal design',
    emotion: 'Rebirth',
    progressImages: [
      {
        label: 'Old Ink',
        src: '/images/tattoo_design.png',
        alt: 'Before photo showing old tribal tattoo to be covered',
      },
      {
        label: 'Stencil & Blockout',
        src: '/images/tattoo_making.png',
        alt: 'Phoenix coverup stencil mapping over old tattoo',
      },
      {
        label: 'Healed Ink',
        src: '/images/tattoo_design.png',
        alt: 'Completed phoenix covering tribal ink',
      },
    ],
    accentColor: '#B8A9C9',
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading reveals
      gsap.fromTo(
        '.section-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Card reveals
      const cards = gsap.utils.toArray<HTMLElement>('.case-study-card');
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="stories" ref={sectionRef} className="py-32 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-20 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4 section-heading">
            Design Stories
          </p>
          <h2
            className="font-editorial section-heading"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#2E2E38',
            }}
          >
            Concepts drafted.
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#6B6B78' }}>
              Artistry etched.
            </em>
          </h2>
          <p className="mt-6 text-foreground-muted leading-relaxed font-light max-w-lg section-heading">
            Each case study below outlines a collaborative creation — the client concept, the custom
            stencil layout, and the final healed result. We showcase this progression because
            transparency in craftsmanship matters.
          </p>
        </div>

        {/* Case study cards */}
        <div className="space-y-24">
          {CASE_STUDIES.map((study, idx) => (
            <article
              key={study.id}
              className={`case-study-card p-0 overflow-hidden ${idx % 2 === 1 ? 'ml-auto' : ''}`}
              style={{
                maxWidth: '1100px',
              }}
            >
              <div
                className={`grid lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Image progression */}
                <div
                  className={`relative ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, ${study.accentColor}22, ${study.accentColor}08)`,
                  }}
                >
                  <div className="grid grid-cols-3 h-full min-h-[320px]">
                    {study.progressImages.map((img, imgIdx) => (
                      <div key={imgIdx} className="relative overflow-hidden group">
                        <AppImage
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 33vw, 18vw"
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          style={
                            { filter: 'saturate(0.7) brightness(0.95)' } as React.CSSProperties
                          }
                        />

                        {/* Label */}
                        <div className="absolute bottom-3 left-3 z-10">
                          <span
                            className="text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-1"
                            style={{ background: 'rgba(250,250,250,0.88)', color: '#2E2E38' }}
                          >
                            {img.label}
                          </span>
                        </div>
                        {/* Progress line */}
                        {imgIdx < study.progressImages.length - 1 && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-4 flex items-center justify-center">
                            <div
                              className="w-px h-8"
                              style={{ background: 'rgba(250,250,250,0.5)' }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-10 lg:p-14 flex flex-col justify-between ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}
                >
                  <div>
                    {/* ID + profile */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/25 font-medium">
                        {study.id}
                      </span>
                      <span className="session-badge">{study.sessions} sessions</span>
                    </div>

                    {/* Client profile */}
                    <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium mb-3">
                      {study.clientProfile}
                    </p>

                    {/* Story */}
                    <p
                      className="font-editorial text-foreground leading-relaxed mb-8"
                      style={{
                        fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                        fontStyle: 'italic',
                        fontWeight: 300,
                      }}
                    >
                      &quot;{study.reason}&quot;
                    </p>

                    {/* Meta grid */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[rgba(213,198,224,0.3)]">
                      {[
                        { label: 'Ink Style', value: study.inkStyle },
                        { label: 'Area', value: study.area },
                        { label: 'Outcome', value: study.outcome },
                        { label: 'Emotion', value: study.emotion },
                      ].map((meta) => (
                        <div key={meta.label}>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-foreground/35 font-medium mb-1">
                            {meta.label}
                          </p>
                          <p className="text-sm text-foreground font-medium leading-snug">
                            {meta.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-10">
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-accent border-b border-accent/40 hover:border-accent pb-0.5 transition-colors"
                    >
                      Request Custom Design
                      <Icon name="ArrowRightIcon" size={12} className="text-accent" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
