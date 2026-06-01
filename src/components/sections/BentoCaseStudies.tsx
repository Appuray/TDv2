'use client';
import React, { useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WORKS = [
  {
    title: 'Custom Tattoos & Cover-ups',
    category: 'Artistic Precision',
    placement: 'Permanent Ink',
    image: '/images/tattoo_making.png',
    span: 'col-span-12 md:col-span-8',
    height: 'h-[400px] md:h-[600px]',
  },
  {
    title: 'Advanced Laser Hair Reduction',
    category: 'Modern Tech',
    placement: 'Smooth Skin',
    image: '/images/tattoo_design.png',
    span: 'col-span-12 md:col-span-4',
    height: 'h-[400px] md:h-[600px]',
  },
  {
    title: 'Clinical Skincare & Medifacials',
    category: 'Expert Care',
    placement: 'Glowing Results',
    image: '/images/tattoo_design.png',
    span: 'col-span-12 md:col-span-4',
    height: 'h-[400px] md:h-[500px]',
  },
  {
    title: 'Semi-Permanent Makeup',
    category: 'Microblading & Lip Blush',
    placement: 'Enhancement',
    image: '/images/tattoo_making.png',
    span: 'col-span-12 md:col-span-8',
    height: 'h-[400px] md:h-[500px]',
  },
];

export default function BentoCaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.bento-card');

      cards.forEach((card, i) => {
        const img = card.querySelector('.bento-img');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          card,
          { clipPath: 'inset(10% 5% 10% 5% round 24px)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 16px)',
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
          }
        );

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.3 },
            {
              scale: 1,
              duration: 1.5,
              ease: 'power3.out',
            },
            '-=1'
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="relative z-30 bg-bg-main py-32 px-6 lg:px-16 border-b border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-foreground-muted font-bold mb-4">
            Our Services & Portfolio
          </p>
          <h2
            className="font-editorial text-5xl md:text-7xl lg:text-8xl text-foreground italic"
            style={{ letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            Premium <span className="text-shimmer">Treatments.</span>
          </h2>
        </div>
        <div className="max-w-xs mt-6 md:mt-0">
          <p className="text-foreground-muted text-sm leading-relaxed">
            A showcase of custom anatomical drafts, advanced skincare, and precision application
            tailored to your body's natural geometry and needs.
          </p>
        </div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto grid grid-cols-12 gap-4 md:gap-6">
        {WORKS.map((work, index) => (
          <div
            key={index}
            className={`bento-card relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#111115] will-change-transform ${work.span} ${work.height}`}
          >
            {/* Image */}
            <AppImage
              src={work.image}
              alt={work.title}
              fill
              className="bento-img object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-[#0a0a0c]/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
              {/* Top Meta */}
              <div className="flex justify-end overflow-hidden">
                <div className="translate-y-[-120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <span className="text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-accent/20 bg-[#111115]/80 backdrop-blur-md text-accent">
                    View Project
                  </span>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground-muted mb-2">
                  <span>{work.category}</span>
                  <span className="w-1 h-1 rounded-full bg-accent/50" />
                  <span>{work.placement}</span>
                </div>
                <h3 className="font-editorial text-2xl md:text-3xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                  {work.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href="/gallery"
          className="inline-block text-[11px] uppercase tracking-[0.2em] font-bold text-foreground border-b border-accent/30 pb-1 hover:text-accent hover:border-accent transition-colors active-press"
        >
          Explore Full Archive
        </a>
      </div>
    </section>
  );
}
