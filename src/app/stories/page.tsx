'use client';

import React, { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

interface StoryItem {
  id: string;
  title: string;
  artist: string;
  placement: string;
  style: string;
  duration: string;
  narrative: string;
  phases: {
    sketch: {
      src: string;
      desc: string;
    };
    stencil: {
      src: string;
      desc: string;
    };
    healed: {
      src: string;
      desc: string;
    };
  };
}

const FEATURED_STORY: StoryItem = {
  id: 'aventine-flow',
  title: 'Aventine Flow',
  artist: 'Elena Silva',
  placement: 'Collarbone & Shoulder',
  style: 'Fine-line dotwork & Geometry',
  duration: '2 Sessions (6 Hours Total)',
  narrative:
    'Designed in close collaboration with a collector from Rome, Aventine Flow wraps around the natural contours of the clavicle. The piece explores the intersection of sacred geometric structures with fluid, biological curves, forming an anatomical expansion that feels grown rather than applied.',
  phases: {
    sketch: {
      src: '/images/digital_sketch.png',
      desc: 'The initial digital concept, emphasizing perfect symmetrical mapping and geometric micro-grids.',
    },
    stencil: {
      src: '/images/stencil_mapping.png',
      desc: 'The purple stencil applied to the skin, carefully positioned to align with the body’s skeletal framework.',
    },
    healed: {
      src: '/images/healed_result.png',
      desc: 'The final, fully-healed result showing the soft, velvety gradient of the fine dotwork.',
    },
  },
};

const OTHER_STORIES = [
  {
    id: 'cartographer-spine',
    title: 'The Cartographer’s Spine',
    artist: 'Marcus Thorne',
    placement: 'Full Spine Alignment',
    style: 'Micro-precision line-work',
    duration: '3 Sessions (9 Hours)',
    narrative:
      'A sprawling, high-fidelity cartographic map depicting abstract celestial configurations. Each fine line represents cosmic navigation coordinates, running perfectly down the center of the spine with breathtaking precision.',
    src: '/images/tattoo_making.png',
  },
  {
    id: 'shattered-geometry',
    title: 'Shattered Geometry',
    artist: 'Elena Silva',
    placement: 'Tricep Panel & Upper Arm',
    style: 'Neo-traditional blackwork',
    duration: '1 Session (4 Hours)',
    narrative:
      'A high-contrast, deeply saturated geometric mandala fractured by organic negative spaces. This piece plays with heavy black shading next to pure skin tones to create an illusion of depth and physical relief.',
    src: '/images/tattoo_design.png',
  },
];

export default function StoriesPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState<'sketch' | 'stencil' | 'healed'>('healed');
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <main className="min-h-screen bg-bg-main pt-32 pb-24 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header section */}
        <div className="mb-20 border-b border-accent/15 pb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4 animate-in">
            Case Studies
          </p>
          <h1 className="font-editorial text-foreground text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-6">
            Permanent
            <br />
            <span className="italic font-light text-shimmer">Chronicles.</span>
          </h1>
          <p className="text-foreground-muted font-light text-sm md:text-base max-w-xl leading-relaxed">
            Every tattoo is a collaborative pilgrimage. Here we document the slow, deliberate
            transition of bespoke designs from digital stencils into lived-in masterpieces.
          </p>
        </div>

        {/* Featured Story Section */}
        <div className="mb-32">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left: Interactive progression viewports */}
            <div className="w-full lg:w-7/12 space-y-6">
              {/* Tab Selector */}
              <div className="flex border-b border-white/5 pb-2 gap-6 text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground-muted">
                <button
                  onClick={() => setActiveTab('sketch')}
                  className={`pb-2 relative transition-colors ${
                    activeTab === 'sketch' ? 'text-accent' : 'hover:text-foreground'
                  }`}
                >
                  01. Digital Sketch
                  {activeTab === 'sketch' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('stencil')}
                  className={`pb-2 relative transition-colors ${
                    activeTab === 'stencil' ? 'text-accent' : 'hover:text-foreground'
                  }`}
                >
                  02. Stencil Mapping
                  {activeTab === 'stencil' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('healed')}
                  className={`pb-2 relative transition-colors ${
                    activeTab === 'healed' ? 'text-accent' : 'hover:text-foreground'
                  }`}
                >
                  03. Healed Ink
                  {activeTab === 'healed' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
                  )}
                </button>
              </div>

              {/* Main Tab Viewport */}
              <div className="relative aspect-[4/3] bg-[#111115] border border-white/5 overflow-hidden group">
                <AppImage
                  src={
                    activeTab === 'sketch'
                      ? FEATURED_STORY.phases.sketch.src
                      : activeTab === 'stencil'
                        ? FEATURED_STORY.phases.stencil.src
                        : FEATURED_STORY.phases.healed.src
                  }
                  alt={FEATURED_STORY.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-1000 group-hover:scale-102"
                  style={{
                    filter: activeTab === 'sketch' ? 'none' : 'saturate(0.7) brightness(0.9)',
                  }}
                />

                {/* Floating active state tag */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="text-[8px] uppercase tracking-[0.2em] font-semibold text-[#111115] bg-accent px-2.5 py-1">
                    {activeTab === 'sketch'
                      ? 'Phase: Conception'
                      : activeTab === 'stencil'
                        ? 'Phase: Skin Blueprint'
                        : 'Phase: Healed Masterpiece'}
                  </span>
                </div>

                {/* Subtitle description overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-main/90 via-bg-main/60 to-transparent">
                  <p className="text-xs text-foreground font-light leading-relaxed max-w-lg">
                    {activeTab === 'sketch'
                      ? FEATURED_STORY.phases.sketch.desc
                      : activeTab === 'stencil'
                        ? FEATURED_STORY.phases.stencil.desc
                        : FEATURED_STORY.phases.healed.desc}
                  </p>
                </div>
              </div>

              {/* ── HIGHLY INTERACTIVE SLIDER ── */}
              <div className="pt-8">
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-accent">
                    Interactive Comparison
                  </span>
                  <h3 className="font-editorial text-lg text-foreground italic font-light mt-1">
                    Slide to reveal Stencil vs. Healed Tattoo
                  </h3>
                </div>

                {/* Interactive Slider Container */}
                <div
                  ref={sliderContainerRef}
                  className="relative aspect-[16/9] w-full bg-[#111115] border border-accent/25 overflow-hidden select-none cursor-ew-resize"
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  {/* Before Image (Stencil) - Fits Full Width */}
                  <div className="absolute inset-0 w-full h-full">
                    <AppImage
                      src={FEATURED_STORY.phases.stencil.src}
                      alt="Stencil Mapping"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                      style={{ filter: 'saturate(0.8) brightness(0.85)' }}
                    />
                    <div className="absolute bottom-4 left-4 bg-bg-main/70 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-widest text-foreground/80 font-bold border border-white/5">
                      Stencil
                    </div>
                  </div>

                  {/* After Image (Healed Ink) - Overlay with clipPath */}
                  <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                    }}
                  >
                    <AppImage
                      src={FEATURED_STORY.phases.healed.src}
                      alt="Healed Result"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                      style={{ filter: 'saturate(0.85) brightness(0.9)' }}
                    />
                    <div className="absolute bottom-4 right-4 bg-bg-main/70 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-widest text-accent font-bold border border-accent/20">
                      Healed Ink
                    </div>
                  </div>

                  {/* Slider Control Line */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-accent z-30 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    {/* Slider circular handle */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent text-[#111115] border border-white/10 flex items-center justify-center shadow-2xl">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
                      </svg>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-foreground-muted font-light mt-3 italic text-center">
                  Drag the slider handle sideways to compare the raw canvas stencil with the healed
                  pigment flow.
                </p>
              </div>
            </div>

            {/* Right: Technical specifications & Narrative narrative */}
            <div className="w-full lg:w-5/12 space-y-10 lg:sticky lg:top-32">
              <div>
                <span className="session-badge mb-6">Featured Case</span>
                <h2 className="font-editorial text-4xl md:text-5xl text-foreground font-bold tracking-tight mb-4">
                  {FEATURED_STORY.title}
                </h2>

                {/* Meta list */}
                <div className="grid grid-cols-2 gap-4 text-xs py-6 border-y border-white/5 my-6">
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-foreground-muted mb-1">
                      Artist
                    </span>
                    <span className="text-foreground font-semibold">{FEATURED_STORY.artist}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-foreground-muted mb-1">
                      Placement
                    </span>
                    <span className="text-foreground font-semibold">
                      {FEATURED_STORY.placement}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-foreground-muted mb-1">
                      Style
                    </span>
                    <span className="text-foreground font-semibold">{FEATURED_STORY.style}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-foreground-muted mb-1">
                      Sessions
                    </span>
                    <span className="text-accent font-semibold">{FEATURED_STORY.duration}</span>
                  </div>
                </div>

                <p className="text-foreground-muted font-light leading-relaxed text-sm md:text-base mb-8">
                  {FEATURED_STORY.narrative}
                </p>
              </div>

              {/* Booking Context CTA */}
              <div className="bg-[#111115] border border-accent/15 p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl rounded-full" />
                <h3 className="font-editorial text-xl text-foreground italic font-light mb-2">
                  Inspired by Aventine Flow?
                </h3>
                <p className="text-foreground-muted font-light text-xs leading-relaxed mb-6">
                  Schedule a private 1-on-1 design consultation with Elena Silva to collaborate on
                  your custom layout.
                </p>
                <Link
                  href={`/book-session?artist=${encodeURIComponent(FEATURED_STORY.artist)}&placement=${encodeURIComponent(FEATURED_STORY.placement)}`}
                  className="inline-flex w-full items-center justify-center gap-3 bg-accent text-[#111115] py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent/90 transition-colors active-press"
                >
                  <span>Request Custom Ink</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Other Notable Stories */}
        <div>
          <div className="border-t border-white/5 pt-16 mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">
              More Progressions
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl text-foreground font-bold tracking-tight mt-2">
              Additional Chronicles.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OTHER_STORIES.map((story) => (
              <div
                key={story.id}
                className="bg-[#111115] border border-white/5 group hover:border-accent/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(196,168,130,0.04)] hover-scale"
              >
                {/* Visual anchor */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <AppImage
                    src={story.src}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-all duration-1000 group-hover:scale-105"
                    style={{ filter: 'saturate(0.6) brightness(0.85)' }}
                  />
                  <div className="absolute inset-0 bg-[#0a0a0c]/20 group-hover:bg-[#0a0a0c]/40 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#111115] bg-accent px-2.5 py-1">
                      {story.style.split(' & ')[0]}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-foreground-muted font-medium">
                      {story.duration}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl text-foreground font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                    {story.title}
                  </h3>

                  <p className="text-[10px] uppercase tracking-widest text-accent font-bold mb-4">
                    By {story.artist} — {story.placement}
                  </p>

                  <p className="text-foreground-muted font-light text-xs leading-relaxed mb-6">
                    {story.narrative}
                  </p>

                  <Link
                    href={`/book-session?artist=${encodeURIComponent(story.artist)}&placement=${encodeURIComponent(story.placement)}`}
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-accent hover:text-foreground transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>Request Similar Project</span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
