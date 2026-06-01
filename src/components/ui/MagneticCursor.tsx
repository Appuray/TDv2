'use client';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const machineRef = useRef<SVGGElement>(null);
  const needleRef = useRef<SVGPolygonElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) {
      // Force hide ALL cursors globally so buttons don't show the native hand
      const style = document.createElement('style');
      style.id = 'hide-native-cursor';
      style.innerHTML = `
        * { cursor: none !important; }
        a, button, input, [role="button"] { cursor: none !important; }
      `;
      document.head.appendChild(style);
      setIsReady(true);

      return () => {
        const existingStyle = document.getElementById('hide-native-cursor');
        if (existingStyle) existingStyle.remove();
      };
    }
  }, []);

  useGSAP(() => {
    if (!cursorRef.current || !isReady) return;

    // Use a very tiny duration (0.02) to prevent the "trailing lag" bug while keeping it technically smooth
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.02, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.02, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      // The needle tip is drawn exactly at SVG coordinate (10, 50).
      // To align the tip with the real mouse pointer (clientX), we shift the container left by 10 and up by 50.
      xTo(e.clientX - 10);
      yTo(e.clientY - 50);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('pw-item') ||
        target.classList.contains('panel')
      ) {
        // Pivot is exactly at the needle tip (10px 50px).
        gsap.to(cursorRef.current, {
          scale: 1.15,
          rotate: -8,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      } else {
        gsap.to(cursorRef.current, { scale: 1, rotate: 0, duration: 0.3 });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    // Tattoo buzzing animation on click
    let buzzTween: gsap.core.Tween | null = null;
    let needleTween: gsap.core.Tween | null = null;

    const handleMouseDown = () => {
      if (!machineRef.current || !needleRef.current) return;

      buzzTween = gsap.to(machineRef.current, {
        x: 'random(-0.5, 0.5)',
        y: 'random(-0.5, 0.5)',
        duration: 0.015,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });

      needleTween = gsap.to(needleRef.current, {
        y: 2,
        duration: 0.015,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    };

    const handleMouseUp = () => {
      if (buzzTween) buzzTween.kill();
      if (needleTween) needleTween.kill();

      gsap.to(machineRef.current, { x: 0, y: 0, duration: 0.1 });
      gsap.to(needleRef.current, { y: 0, duration: 0.1 });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isReady]);

  if (!isReady) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block drop-shadow-xl"
      // The absolute pivot of the entire div is at exactly 10,50 (the needle tip).
      style={{ willChange: 'transform', transformOrigin: '10px 50px' }}
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* We place the needle tip EXACTLY at (10, 50). 
            Then we rotate the machine by 35 degrees around that exact point.
            The pen body is drawn going UPWARDS (negative Y) from the tip. */}
        <g ref={machineRef} transform="translate(10, 50) rotate(35)">
          {/* RCA Cable (Backside) */}
          <path
            d="M0,-68 C0,-85 15,-90 20,-110"
            stroke="#111115"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />

          {/* Brass Motor Cap */}
          <rect x="-4" y="-68" width="8" height="4" rx="1" fill="#C4A882" />

          {/* Black Machine Body */}
          <rect
            x="-6"
            y="-64"
            width="12"
            height="24"
            rx="2"
            fill="#18181f"
            stroke="#242430"
            strokeWidth="1"
          />

          {/* Brass Grip */}
          <rect x="-5" y="-40" width="10" height="20" rx="1" fill="#C4A882" />

          {/* Grip Knurling */}
          <line x1="-5" y1="-36" x2="5" y2="-36" stroke="#111115" strokeWidth="0.5" opacity="0.4" />
          <line x1="-5" y1="-32" x2="5" y2="-32" stroke="#111115" strokeWidth="0.5" opacity="0.4" />
          <line x1="-5" y1="-28" x2="5" y2="-28" stroke="#111115" strokeWidth="0.5" opacity="0.4" />
          <line x1="-5" y1="-24" x2="5" y2="-24" stroke="#111115" strokeWidth="0.5" opacity="0.4" />

          {/* Clear Cartridge / Tip */}
          <path
            d="M-3,-8 L3,-8 L4,-20 L-4,-20 Z"
            fill="rgba(255,255,255,0.2)"
            stroke="#C4A882"
            strokeWidth="0.5"
          />

          {/* Needle - Tip is EXACTLY at (0, 0) inside this group */}
          <polygon ref={needleRef} points="0,0 -1,-8 1,-8" fill="#FAFAFA" />

          {/* Tiny glowing anchor point EXACTLY at the click point (0,0) */}
          <circle cx="0" cy="0" r="1.5" fill="#C4A882" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
