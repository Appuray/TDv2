'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface BodyPart {
  id: string;
  name: string;
  pain: number;
  painLevel: 'Low' | 'Moderate' | 'High' | 'Extreme';
  sessions: number;
  hours: number;
  path: string;
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

const SKIN_TONES = [
  { name: 'Pale Sand', hex: '#F3D2C1' },
  { name: 'Warm Honey', hex: '#DFB18A' },
  { name: 'Rich Bronze', hex: '#A77D5E' },
  { name: 'Dark Cocoa', hex: '#583624' },
];

const BRUSH_COLORS = [
  { id: 'solid', hex: '#111115', name: 'Solid Black' },
  { id: 'stencil', hex: '#2b3da6', name: 'Stencil Blue' },
  { id: 'blood', hex: '#8a1c1c', name: 'Sketch Red' },
  { id: 'white', hex: '#ffffff', name: 'White Highlight' },
];

const CANVAS_SIZE = 1000;

export default function TattooVisualizer() {
  const [selectedPart, setSelectedPart] = useState<BodyPart>(BODY_PARTS[0]);
  const [selectedSkin, setSelectedSkin] = useState(SKIN_TONES[1]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brushColor, setBrushColor] = useState(BRUSH_COLORS[0].hex);
  const [brushSize, setBrushSize] = useState(8);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_SIZE / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    lastPos.current = getCoordinates(e);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const newPos = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(newPos.x, newPos.y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.stroke();

    lastPos.current = newPos;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <section className="pt-20 pb-4 lg:pt-24 lg:pb-6 bg-[#0a0a0c] border-y border-white/[0.03] relative h-screen lg:h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 flex-1 flex flex-col w-full h-full min-h-0">
        <div className="text-center mb-4 shrink-0">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium text-foreground-muted bg-white/[0.03] border border-white/[0.05] mb-2">
            Interactive Canvas
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground font-editorial">
            Sketch your custom design.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 flex-1 min-h-0">
          {/* ── LEFT: Visual Canvas Display (8 cols) ── */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white/[0.02] border border-white/[0.06] p-4 lg:p-6 rounded-[2rem] relative overflow-hidden h-[50vh] lg:h-full lg:min-h-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            
            {/* Top row indicators */}
            <div className="flex flex-wrap items-center justify-between gap-4 z-20 mb-6 pointer-events-none">
              <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/[0.05]">
                <span className="text-[10px] text-foreground-muted font-medium block uppercase tracking-wider mb-0.5">
                  Placement
                </span>
                <span className="text-sm text-foreground font-medium font-editorial">
                  {selectedPart.name}
                </span>
              </div>
            </div>

            {/* Middle Simulator Canvas Area */}
            <div
              className="flex-grow flex items-center justify-center relative overflow-hidden rounded-2xl transition-colors duration-500 shadow-inner group"
              style={{ backgroundColor: selectedSkin.hex }}
            >
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.15)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Body anatomy path */}
              <svg
                className="absolute inset-0 w-full h-full text-black/[0.07] select-none pointer-events-none"
                viewBox="0 0 100 320"
                preserveAspectRatio="none"
              >
                <path
                  d={selectedPart.path}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="4 6"
                  className="transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
              </svg>

              {/* Freehand Draw Layer */}
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="absolute inset-0 w-full h-full touch-none cursor-crosshair z-10"
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
              />

              <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] text-white/80 pointer-events-none select-none font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Draw anywhere
              </div>
            </div>
          </div>

          {/* ── RIGHT: Controls Panel (4 cols) ── */}
          <div className="lg:col-span-4 flex flex-col h-full min-h-0 relative">
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 pb-4"
              >
                {/* Segment 1: Placement & Skin Tone */}
                <div className="bg-white/[0.02] border border-white/[0.06] p-4 lg:p-5 rounded-[1.5rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <h3 className="text-base font-medium text-foreground mb-4 font-editorial">
                  1. Setup Canvas
                </h3>

                <label className="block text-[11px] text-foreground-muted mb-2 font-medium">
                  Select placement
                </label>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {BODY_PARTS.map((part) => (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      className={`px-3 py-2.5 text-[11px] font-medium text-left rounded-xl transition-all duration-200 active:scale-[0.98] ${
                        selectedPart.id === part.id
                          ? 'bg-white/10 text-foreground shadow-sm ring-1 ring-white/10'
                          : 'bg-transparent text-foreground-muted hover:bg-white/[0.03]'
                      }`}
                    >
                      {part.name}
                    </button>
                  ))}
                </div>

                <label className="block text-[11px] text-foreground-muted mb-2 font-medium">
                  Select skin tone
                </label>
                <div className="flex gap-2">
                  {SKIN_TONES.map((tone) => (
                    <button
                      key={tone.name}
                      onClick={() => setSelectedSkin(tone)}
                      className="relative w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none"
                      style={{ backgroundColor: tone.hex }}
                      aria-label={`Select skin tone ${tone.name}`}
                    >
                      {selectedSkin.name === tone.name && (
                        <motion.div
                          layoutId="skin-indicator"
                          className="absolute -inset-[3px] rounded-full border border-white/30"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Segment 2: Drawing Tools */}
              <div className="bg-white/[0.02] border border-white/[0.06] p-4 lg:p-5 rounded-[1.5rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <h3 className="text-base font-medium text-foreground mb-4 font-editorial">
                  2. Tools
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] text-foreground-muted mb-3 font-medium">
                      Brush Color
                    </label>
                    <div className="flex gap-3">
                      {BRUSH_COLORS.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setBrushColor(color.hex)}
                          className="relative w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none ring-1 ring-white/10 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                          aria-label={`Select brush color ${color.name}`}
                        >
                          {brushColor === color.hex && (
                            <motion.div
                              layoutId="brush-indicator"
                              className="absolute -inset-[3px] rounded-full border border-white/30"
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium mb-3">
                      <span className="text-foreground-muted">Brush Size</span>
                      <span className="text-foreground">{brushSize}px</span>
                    </div>
                    <input
                      type="range" min="1" max="40" value={brushSize}
                      onChange={(e) => setBrushSize(Number(e.target.value))}
                      className="w-full custom-range-slider"
                      aria-label="Adjust brush size"
                    />
                  </div>
                </div>

                <button
                  onClick={clearCanvas}
                  className="w-full mt-6 px-4 py-3 bg-transparent border border-white/10 text-foreground text-xs font-medium rounded-xl hover:bg-white/[0.03] transition-all active:scale-[0.98]"
                >
                  Clear Canvas
                </button>
              </div>
            </motion.div>
            </div>

            {/* Consultation Booking CTA - Always Visible at bottom */}
            <div className="mt-2 pt-4 border-t border-white/[0.05] shrink-0">
              <Link
                href={`/book-session?mode=draw&placement=${encodeURIComponent(selectedPart.name)}`}
                className="w-full bg-white text-black py-3.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Book this concept</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-center text-[10px] text-foreground-muted mt-3 font-medium">
                Reserves a consultation for {selectedPart.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
