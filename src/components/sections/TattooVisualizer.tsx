'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface BodyPart {
  id: string;
  name: string;
  pain: number;
  painLevel: 'Low' | 'Moderate' | 'High' | 'Extreme';
  sessions: number;
  hours: number;
  path: string; // Background skeleton svg indicator
}

const BODY_PARTS: BodyPart[] = [
  {
    id: 'forearm',
    name: 'Outer Forearm',
    pain: 3,
    painLevel: 'Low',
    sessions: 1,
    hours: 3,
    path: 'M 35 10 C 35 30, 45 60, 50 120 C 55 180, 48 240, 40 300 H 60 C 52 240, 58 180, 63 120 C 68 60, 70 30, 70 10 Z',
  },
  {
    id: 'shoulder',
    name: 'Upper Shoulder',
    pain: 5,
    painLevel: 'Moderate',
    sessions: 2,
    hours: 6,
    path: 'M 10 50 C 10 20, 40 10, 70 20 C 90 27, 95 40, 95 60 C 95 90, 70 120, 50 140 C 30 120, 10 90, 10 50 Z',
  },
  {
    id: 'spine',
    name: 'Spine Alignment',
    pain: 9,
    painLevel: 'Extreme',
    sessions: 3,
    hours: 12,
    path: 'M 48 10 V 310 M 52 10 V 310 M 45 40 H 55 M 43 80 H 57 M 40 120 H 60 M 38 160 H 62 M 40 200 H 60 M 43 240 H 57 M 45 280 H 55',
  },
  {
    id: 'calf',
    name: 'Calf Muscle',
    pain: 6,
    painLevel: 'High',
    sessions: 2,
    hours: 7,
    path: 'M 30 10 C 30 50, 20 100, 20 160 C 20 220, 38 270, 42 310 H 58 C 62 270, 80 220, 80 160 C 80 100, 70 50, 70 10 Z',
  },
];

interface Stencil {
  id: string;
  name: string;
  artist: string;
  style: string;
  svgPath: React.ReactNode;
}

const STENCILS: Stencil[] = [
  {
    id: 'mandala',
    name: 'Sacred Mandala',
    artist: 'Elena Silva',
    style: 'Geometric Dotwork',
    svgPath: (
      <g stroke="currentColor" fill="none" strokeWidth="1.2">
        {/* Mandala center */}
        <circle cx="100" cy="100" r="12" />
        <circle cx="100" cy="100" r="28" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="48" />
        {/* Radiating geometric lines */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = (100 + Math.cos(angle) * 12).toFixed(3);
          const y1 = (100 + Math.sin(angle) * 12).toFixed(3);
          const x2 = (100 + Math.cos(angle) * 88).toFixed(3);
          const y2 = (100 + Math.sin(angle) * 88).toFixed(3);

          const px = (100 + Math.cos(angle) * 48).toFixed(3);
          const py = (100 + Math.sin(angle) * 48).toFixed(3);

          const p2x = (100 + Math.cos(angle + 0.15) * 64).toFixed(3);
          const p2y = (100 + Math.sin(angle + 0.15) * 64).toFixed(3);
          const p3x = (100 + Math.cos(angle - 0.15) * 64).toFixed(3);
          const p3y = (100 + Math.sin(angle - 0.15) * 64).toFixed(3);

          return (
            <React.Fragment key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} />
              <polygon points={`${px},${py} ${p2x},${p2y} ${p3x},${p3y}`} />
            </React.Fragment>
          );
        })}
        <circle cx="100" cy="100" r="88" strokeWidth="0.8" />
      </g>
    ),
  },
  {
    id: 'sacred_lines',
    name: 'Anatomical Wave',
    artist: 'Elena Silva',
    style: 'Fine-Line Minimalist',
    svgPath: (
      <g stroke="currentColor" fill="none" strokeWidth="1.5">
        {/* Dynamic flowing lines */}
        <path d="M 20 180 C 40 100, 70 80, 100 100 C 130 120, 160 90, 180 20" />
        <path d="M 30 190 C 50 110, 75 90, 100 110 C 125 130, 155 105, 170 35" strokeWidth="0.75" />
        <path
          d="M 10 170 C 30 90, 65 70, 100 90 C 135 110, 165 75, 190 5"
          strokeWidth="0.5"
          strokeDasharray="4 2"
        />

        {/* Tiny stars & geometric dots */}
        <circle cx="100" cy="100" r="4" fill="currentColor" />
        <circle cx="140" cy="70" r="2" fill="currentColor" />
        <circle cx="60" cy="130" r="2" fill="currentColor" />
        <polygon
          points="120,50 123,55 129,56 124,60 126,66 120,63 114,66 116,60 111,56 117,55"
          fill="currentColor"
        />
      </g>
    ),
  },
  {
    id: 'tiger_fury',
    name: 'Neo-Traditional Eye',
    artist: 'Marcus Thorne',
    style: 'Heavy Blackwork',
    svgPath: (
      <g stroke="currentColor" fill="none" strokeWidth="1.6">
        {/* Eye contour */}
        <path d="M 20 100 Q 100 30, 180 100 Q 100 170, 20 100 Z" fill="none" />
        <circle cx="100" cy="100" r="36" />
        <circle cx="100" cy="100" r="18" fill="currentColor" />
        {/* Geometric shards coming from eye */}
        <path d="M 100 18 V 3" />
        <path d="M 100 182 V 197" />
        <path d="M 18 100 H 3" />
        <path d="M 182 100 H 197" />
        <path d="M 100 64 L 60 10" />
        <path d="M 100 64 L 140 10" />
        <path d="M 100 136 L 60 190" />
        <path d="M 100 136 L 140 190" />
      </g>
    ),
  },
];

const SKIN_TONES = [
  { name: 'Pale Sand', hex: '#F3D2C1', text: 'text-gray-900' },
  { name: 'Warm Honey', hex: '#DFB18A', text: 'text-gray-900' },
  { name: 'Rich Bronze', hex: '#A77D5E', text: 'text-white' },
  { name: 'Dark Cocoa', hex: '#583624', text: 'text-white' },
];

export default function TattooVisualizer() {
  const [selectedPart, setSelectedPart] = useState<BodyPart>(BODY_PARTS[0]);
  const [selectedSkin, setSelectedSkin] = useState(SKIN_TONES[1]);
  const [selectedStencil, setSelectedStencil] = useState<Stencil>(STENCILS[0]);

  // Custom Adjustments
  const [scale, setScale] = useState(80); // percentage
  const [rotation, setRotation] = useState(0); // degrees
  const [opacity, setOpacity] = useState(85); // percentage
  const [xOffset, setXOffset] = useState(0); // px
  const [yOffset, setYOffset] = useState(0); // px
  const [stencilStyle, setStencilStyle] = useState<'solid' | 'stencil' | 'dotwork'>('stencil');

  // Mouse drag states for canvas placement
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStart.current = { x: clientX, y: clientY };
    offsetStart.current = { x: xOffset, y: yOffset };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    setXOffset(offsetStart.current.x + dx);
    setYOffset(offsetStart.current.y + dy);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  const handleMouseUp = handleEnd;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Stencil styling variables
  const getStencilColorClass = () => {
    switch (stencilStyle) {
      case 'solid':
        return 'text-[#111115]'; // Solid carbon black
      case 'stencil':
        return 'text-[#2b3da6]'; // Real stencil purple/blue
      case 'dotwork':
        return 'text-[#383842] opacity-80'; // Charcoal shade
      default:
        return 'text-accent';
    }
  };

  return (
    <section className="py-24 bg-[#111115] border-y border-border relative overflow-hidden">
      {/* Background cinematic visuals */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-accent/20 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium text-accent bg-accent/5 mb-4">
            Try Before You Ink
          </span>
          <h2 className="font-editorial text-4xl md:text-6xl text-foreground mb-6">
            Design Your <em className="text-shimmer">Dream Tattoo.</em>
          </h2>
          <p className="text-foreground-muted font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Select a design, pick your skin tone, and see exactly how it will look on your body.
            Drag, resize, and place it perfectly before booking your session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* ── LEFT: Visual Canvas Display (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#0a0a0c] border border-white/5 p-4 md:p-6 lg:p-8 rounded-2xl relative shadow-2xl overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
            {/* Top row controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 z-20 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-foreground-muted font-bold block mb-1">
                  Body Part
                </span>
                <span className="font-editorial text-xl text-accent font-semibold">
                  {selectedPart.name}
                </span>
              </div>

              {/* Skin Tone Selector */}
              <div className="flex items-center gap-3 bg-surface/50 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
                <span className="text-[9px] uppercase tracking-wider text-foreground-muted font-bold">
                  Skin:
                </span>
                <div className="flex gap-2">
                  {SKIN_TONES.map((tone) => (
                    <button
                      key={tone.name}
                      onClick={() => setSelectedSkin(tone)}
                      className={`w-6 h-6 rounded-full border transition-all duration-300 ${
                        selectedSkin.name === tone.name
                          ? 'border-accent scale-110 shadow-[0_0_10px_#C4A882]'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: tone.hex }}
                      title={tone.name}
                      aria-label={`Select skin tone ${tone.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Simulator Canvas Area */}
            <div
              className="flex-grow flex items-center justify-center relative overflow-hidden rounded-xl border border-white/5 transition-all duration-500 shadow-inner group"
              style={{ backgroundColor: selectedSkin.hex }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleEnd}
              onTouchCancel={handleEnd}
            >
              {/* Grid guide */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.15)_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none opacity-40" />

              {/* Body anatomy path rendering */}
              <svg
                className="absolute inset-0 w-full h-full text-black/10 select-none pointer-events-none"
                viewBox="0 0 100 320"
                preserveAspectRatio="none"
              >
                <path
                  d={selectedPart.path}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                  className="transition-all duration-700"
                />
              </svg>

              {/* Draggable Stencil Element */}
              <div
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                className={`absolute cursor-grab active:cursor-grabbing select-none transition-transform duration-75 origin-center ${getStencilColorClass()}`}
                style={{
                  transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg) scale(${scale / 100})`,
                  opacity: opacity / 100,
                }}
              >
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  className="drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
                >
                  {selectedStencil.svgPath}
                </svg>
              </div>

              {/* Position helper HUD in bottom corner */}
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[9px] font-mono text-foreground-muted select-none pointer-events-none">
                POS: {xOffset}px, {yOffset}px | ROT: {rotation}°
              </div>

              {/* Instruction banner overlay */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded text-[9px] uppercase tracking-wider text-accent pointer-events-none select-none font-medium">
                Drag stencil to place
              </div>
            </div>

            {/* Quick reset button */}
            <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted border-t border-white/5 pt-4 z-20">
              <span>Tattoo Placement Previewer</span>
              <button
                onClick={() => {
                  setXOffset(0);
                  setYOffset(0);
                  setScale(80);
                  setRotation(0);
                  setOpacity(85);
                }}
                className="text-accent hover:text-foreground font-semibold uppercase tracking-wider"
              >
                Reset Layout
              </button>
            </div>
          </div>

          {/* ── RIGHT: Controls Panel (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-surface border border-white/5 p-4 md:p-6 lg:p-8 rounded-2xl shadow-2xl">
            <div className="space-y-8">
              {/* Segment 1: Placement & Stencil Choice */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
                  01 / Choose Design
                </h3>

                {/* Body Part Grid selector */}
                <label className="block text-[10px] uppercase tracking-widest text-foreground-muted mb-2 font-semibold">
                  Where do you want the tattoo?
                </label>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {BODY_PARTS.map((part) => (
                    <button
                      key={part.id}
                      onClick={() => {
                        setSelectedPart(part);
                        setXOffset(0);
                        setYOffset(0);
                      }}
                      className={`px-3 py-2.5 text-[9px] uppercase tracking-wider font-bold text-center border transition-all duration-300 ${
                        selectedPart.id === part.id
                          ? 'border-accent bg-accent/5 text-accent'
                          : 'border-white/10 text-foreground-muted hover:border-white/20 hover:text-foreground'
                      }`}
                    >
                      {part.name}
                    </button>
                  ))}
                </div>

                {/* Stencil Choice Selector */}
                <label className="block text-[10px] uppercase tracking-widest text-foreground-muted mb-2 font-semibold">
                  Pick a Design
                </label>
                <div className="space-y-2">
                  {STENCILS.map((stencil) => (
                    <button
                      key={stencil.id}
                      onClick={() => setSelectedStencil(stencil)}
                      className={`w-full text-left px-4 py-3 border transition-all duration-300 flex items-center justify-between ${
                        selectedStencil.id === stencil.id
                          ? 'border-accent bg-accent/5'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <h4 className="font-editorial text-sm text-foreground">{stencil.name}</h4>
                        <p className="text-[9px] text-foreground-muted uppercase tracking-wider font-semibold">
                          By {stencil.artist} • {stencil.style}
                        </p>
                      </div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={
                          selectedStencil.id === stencil.id ? 'text-accent' : 'text-foreground/30'
                        }
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Segment 2: Stencil Render Styling (Black, Blue, Charcoal) */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-foreground-muted mb-3 font-semibold">
                  Ink Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'solid', name: 'Solid Black' },
                      { id: 'stencil', name: 'Stencil Blue' },
                      { id: 'dotwork', name: 'Soft Dotwork' },
                    ] as const
                  ).map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setStencilStyle(style.id)}
                      className={`px-3 py-2 text-[9px] uppercase tracking-wider font-bold text-center border transition-all duration-300 ${
                        stencilStyle === style.id
                          ? 'border-accent bg-accent/5 text-accent'
                          : 'border-white/5 text-foreground-muted hover:border-white/15'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Segment 3: Sliders (Scale, Rotate, Opacity) */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
                  02 / Adjust Your Tattoo
                </h3>

                <div className="space-y-4">
                  {/* Scale */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider">
                      <span className="text-foreground-muted">Size</span>
                      <span className="text-foreground font-semibold">{scale}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="150"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="w-full accent-accent bg-white/10 h-1 rounded"
                    />
                  </div>

                  {/* Rotation */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider">
                      <span className="text-foreground-muted">Rotate</span>
                      <span className="text-foreground font-semibold">{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full accent-accent bg-white/10 h-1 rounded"
                    />
                  </div>

                  {/* Opacity */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider">
                      <span className="text-foreground-muted">Fade (Opacity)</span>
                      <span className="text-foreground font-semibold">{opacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(Number(e.target.value))}
                      className="w-full accent-accent bg-white/10 h-1 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Segment 4: Anatomical Consult & Pain Meter */}
              <div className="bg-[#0a0a0c] border border-white/5 p-4 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-foreground-muted font-bold">
                    Pain Level
                  </span>
                  <span
                    className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold ${
                      selectedPart.pain >= 8
                        ? 'bg-red-950 text-red-400 border border-red-800/40'
                        : selectedPart.pain >= 5
                          ? 'bg-amber-950 text-amber-400 border border-amber-800/40'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                    }`}
                  >
                    {selectedPart.painLevel} Pain
                  </span>
                </div>

                {/* Pain Bar Gauge */}
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      selectedPart.pain >= 8
                        ? 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                        : selectedPart.pain >= 5
                          ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'
                          : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'
                    }`}
                    style={{ width: `${(selectedPart.pain / 10) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-foreground-muted mb-0.5">
                      Sessions Needed
                    </span>
                    <span className="text-foreground font-bold">
                      {selectedPart.sessions} Session(s)
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-foreground-muted mb-0.5">
                      Time Required
                    </span>
                    <span className="text-foreground font-bold">~{selectedPart.hours} Hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Immersive Consultation Booking CTA */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <Link
                href={`/book-session?artist=${encodeURIComponent(selectedStencil.artist)}&placement=${encodeURIComponent(selectedPart.name)}&sessions=${selectedPart.sessions}`}
                className="w-full bg-accent text-[#0a0a0c] py-4 text-xs uppercase tracking-[0.25em] font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Book This Tattoo</span>
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
              <p className="text-center text-[9px] text-foreground-muted uppercase tracking-wider font-medium mt-3">
                Book a session with {selectedStencil.artist} for your {selectedPart.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
