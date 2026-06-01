'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main p-6 text-center">
      <div className="max-w-md animate-in">
        <span className="session-badge mb-6">Something went wrong</span>
        <h1
          className="font-editorial mb-4"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: '#2E2E38',
          }}
        >
          A brief pause
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#6B6B78' }}>in your story.</em>
        </h1>
        <p className="text-foreground/60 font-light leading-relaxed mb-10 max-w-sm mx-auto">
          We encountered an unexpected error. Don&apos;t worry, your progress is safe. Let&apos;s
          try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => reset()} className="btn-primary w-full sm:w-auto">
            <span>Try Again</span>
            <Icon name="ArrowPathIcon" size={14} />
          </button>

          <Link href="/" className="btn-outline w-full sm:w-auto">
            <span>Go Home</span>
            <Icon name="HomeIcon" size={14} />
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded text-left overflow-auto max-h-40">
            <p className="text-xs text-red-600 font-mono">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
