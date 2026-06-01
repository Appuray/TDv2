'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const STATS = [
  { value: '1,800+', label: 'Custom designs etched', sub: 'Since 2019' },
  { value: '100%', label: 'Sterile studio environment', sub: 'Single-use disposables' },
  { value: '1-on-1', label: 'Bespoke design sessions', sub: 'No duplicated designs' },
  { value: '4.9★', label: 'Average client rating', sub: 'Over 350 reviews' },
];

const TRUST_POINTS = [
  {
    icon: 'ShieldCheckIcon' as const,
    title: 'Certified Artistry',
    body: 'Licensed design professionals specializing in fine-line, blackwork, and complex geometric details. Clean, sterile procedures.',
  },
  {
    icon: 'EyeIcon' as const,
    title: 'Bespoke Originals Only',
    body: 'We never repeat a custom design. Every sketch is uniquely drafted for your body, ensuring you walk away with a piece that is truly yours.',
  },
  {
    icon: 'HeartIcon' as const,
    title: 'Premium Vegan Pigments',
    body: 'We use only high-end, vegan-friendly, organic inks and medical-grade needle assemblies. Solid colors and stable lines that last.',
  },
  {
    icon: 'CameraIcon' as const,
    title: 'Private Lounge Setup',
    body: 'Say goodbye to exposed storefronts. Our studio features comfortable, fully private treatment rooms to give you the quiet focus you deserve.',
  },
];

function CountUp({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          // Just animate opacity for non-numeric values
          setDisplay(target);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );
    sectionRef.current
      ?.querySelectorAll('.animate-on-scroll')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 bg-[#111115]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-24">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4 animate-on-scroll"
              style={{ animation: 'animationIn 0.8s ease-out both' }}
            >
              Why Etch
            </p>
            <h2
              className="font-editorial animate-on-scroll"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#FAFAFA',
                animation: 'animationIn 0.8s ease-out 0.1s both',
              }}
            >
              Artistry you can
              <br />
              <em className="text-shimmer-light" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                feel in the lines.
              </em>
            </h2>
          </div>
          <p
            className="text-[#FAFAFA]/45 leading-relaxed font-light animate-on-scroll"
            style={{ animation: 'animationIn 0.8s ease-out 0.2s both' }}
          >
            We built Etch on the belief that permanent body art should be as considered as fine art.
            We reject flash sheets and mass templates to deliver singular design pieces crafted in
            tandem with your vision.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-24 border border-[rgba(250,250,250,0.06)] overflow-hidden rounded-sm">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card p-10 animate-on-scroll"
              style={{
                background: 'linear-gradient(180deg, #18181f 0%, #111115 100%)',
                border: 'none',
                animation: `animationIn 0.8s ease-out ${i * 0.1}s both`,
              }}
            >
              <p
                className="font-editorial mb-2"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#C4A882',
                  letterSpacing: '-0.04em',
                  fontWeight: 300,
                }}
              >
                <CountUp target={stat.value} />
              </p>
              <p className="text-[#FAFAFA]/80 font-medium text-sm mb-1">{stat.label}</p>
              <p className="text-[#FAFAFA]/30 text-[11px] uppercase tracking-[0.15em]">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Trust points */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_POINTS.map((point, i) => (
            <div
              key={point.title}
              className="animate-on-scroll"
              style={{ animation: `animationIn 0.8s ease-out ${0.1 + i * 0.1}s both` }}
            >
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center mb-5"
                style={{
                  background: 'rgba(196,168,130,0.12)',
                  border: '1px solid rgba(196,168,130,0.2)',
                }}
              >
                <Icon name={point.icon} size={18} className="text-accent" variant="outline" />
              </div>
              <h4 className="text-[#FAFAFA]/90 font-medium mb-3 text-sm uppercase tracking-[0.12em]">
                {point.title}
              </h4>
              <p className="text-[#FAFAFA]/40 leading-relaxed font-light text-sm">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
