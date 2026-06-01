'use client';

import React, { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function HealedSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | string>('100%');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
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

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-24 bg-[#0a0a0c] border-b border-border relative overflow-hidden">
      {/* Background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-accent/20 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium text-accent bg-accent/5 mb-4">
            Anatomical Flow
          </span>
          <h2 className="font-editorial text-4xl md:text-6xl text-foreground mb-6">
            From Sketch to <em className="text-shimmer">Healed Reality.</em>
          </h2>
          <p className="text-foreground-muted font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Drag the gold slider below to see how our micro-precision digital drafting seamlessly
            conforms to real skin contours, yielding crisp, long-lasting healed results.
          </p>
        </div>

        {/* Slider Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative h-[480px] md:h-[580px] w-full overflow-hidden border border-accent/25 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] select-none cursor-ew-resize group"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* Left Side: Stencil/Draft Image (Covering full width) */}
            <div className="absolute inset-0 w-full h-full">
              <AppImage
                src="/images/digital_sketch.png"
                alt="Digital fine-line tattoo sketch layout stencil"
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover pointer-events-none filter brightness-90 grayscale saturate-50"
              />
              <div className="absolute bottom-6 left-6 bg-[#0a0a0c]/80 backdrop-blur-md px-4 py-2 border border-white/15 text-[10px] uppercase tracking-widest text-accent font-semibold rounded-md">
                01 / Digital Draft
              </div>
            </div>

            {/* Right Side: Healed Result Image (Clipped dynamically) */}
            <div
              className="absolute inset-y-0 right-0 h-full overflow-hidden transition-all duration-75"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Inner container must keep the exact same width and position as the parent to keep the image aligned */}
              <div
                className="absolute inset-y-0 right-0 h-full w-[896px] md:w-[896px]"
                style={{
                  width: containerWidth,
                  right: 0,
                }}
              >
                <AppImage
                  src="/images/healed_result.png"
                  alt="Fully healed custom fine-line tattoo on skin"
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover pointer-events-none filter brightness-95"
                />
              </div>
              <div className="absolute bottom-6 right-6 bg-accent px-4 py-2 text-[#0a0a0c] text-[10px] uppercase tracking-widest font-bold rounded-md shadow-lg">
                02 / Healed Masterpiece
              </div>
            </div>

            {/* Glowing Golden Divider Line */}
            <div
              className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-accent-light via-accent to-accent-light pointer-events-none z-20 shadow-[0_0_10px_#C4A882]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag Handle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#111115] border-2 border-accent flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="2.5"
                  className="animate-pulse"
                >
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
