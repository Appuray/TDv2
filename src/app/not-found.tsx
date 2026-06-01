'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router?.push('/');
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history?.back();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main p-6 text-center">
      <div className="max-w-md animate-in">
        <span className="session-badge mb-6">Error 404</span>
        <h1
          className="font-editorial mb-4"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: '#2E2E38',
          }}
        >
          This story has
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#6B6B78' }}>
            not been written.
          </em>
        </h1>
        <p className="text-foreground/60 font-light leading-relaxed mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to moving
          forward.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={handleGoHome} className="btn-primary w-full sm:w-auto">
            <span>Back to Home</span>
            <Icon name="HomeIcon" size={14} />
          </button>

          <button onClick={handleGoBack} className="btn-outline w-full sm:w-auto">
            <span>Go Back</span>
            <Icon name="ArrowLeftIcon" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
