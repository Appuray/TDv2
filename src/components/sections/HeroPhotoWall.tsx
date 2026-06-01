'use client';
import React, { useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* 24 images arranged in a 6-column mosaic wall */
const PHOTO_WALL_IMAGES = [
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
  '/images/tattoo_design.png',
  '/images/tattoo_making.png',
];

export default function HeroPhotoWall() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only run the heavy 24-item parallax on Desktop (min-width: 768px)
      mm.add('(min-width: 768px)', () => {
        const wallItems = gsap.utils.toArray<HTMLElement>('.pw-item');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        wallItems.forEach((item, i) => {
          const speed = i % 3 === 0 ? 0.04 : i % 3 === 1 ? 0.065 : 0.025;
          const direction = i % 2 === 0 ? 1 : -1;

          tl.to(
            item,
            {
              y: () => window.innerHeight * speed * direction * 2,
              ease: 'none',
              force3D: true,
            },
            0
          );
        });
      });

      // Text fade and slight parallax runs on all devices
      gsap.to(textRef.current, {
        yPercent: 30,
        opacity: 0,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="hero-section">
      {/* ── Photo Wall Background ── */}
      <div className="hero-wall" aria-hidden="true">
        {PHOTO_WALL_IMAGES.map((src, i) => (
          <div key={i} className={`pw-item relative ${i >= 12 ? 'hidden md:block' : ''}`}>
            <Image
              src={src}
              alt={`Glowly Ink custom tattoo and aesthetic design portfolio ${i + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover"
              priority={i < 6}
              quality={i < 6 ? 85 : 50}
            />
          </div>
        ))}
      </div>

      {/* ── Gradient Overlay ── */}
      <div className="hero-overlay" />

      {/* ── Diagonal Rays ── */}
      <div className="absolute inset-0 z-[2] diagonal-rays" aria-hidden="true" />

      {/* ── Centered Hero Content ── */}
      <div ref={textRef} className="hero-content" style={{ willChange: 'transform, opacity' }}>
        {/* Badge */}
        <div className="animate-in mb-5 sm:mb-8">
          <span className="inline-flex items-center gap-3 px-6 py-2 border border-accent/30 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-accent bg-accent/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulseGlow" />
            SKIN • HAIR • LASER • TATTOO STUDIO
          </span>
        </div>

        {/* Main headline */}
        <h1 className="hero-title font-editorial animate-in-delay-1">
          Glow up with expert care
          <br />
          <em className="text-shimmer">& artistic precision.</em>
        </h1>

        {/* Sub */}
        <p className="hero-sub animate-in-delay-2">
          Premium skincare, advanced laser treatments, and bespoke custom tattoos.
          <br className="hidden md:inline" /> Modern technology meets high hygiene standards for
          refined, visible results.
        </p>

        {/* CTAs */}
        <div className="animate-in-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 sm:mt-16 w-full sm:w-auto">
          <a href="/book-session" className="btn-primary w-full sm:w-auto justify-center">
            <span>Book Your Design Session</span>
            <Icon name="ArrowRightIcon" size={14} />
          </a>
          <a href="/submit-idea" className="btn-outline w-full sm:w-auto justify-center">
            <span>Submit Your Idea</span>
          </a>
        </div>
      </div>
    </section>
  );
}
