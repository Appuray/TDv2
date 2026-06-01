'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface AppImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

function AppImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  sizes,
  onClick,
  fallbackSrc = '/assets/images/no_image.png',
  ...props
}: AppImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const commonClassName = `${className} ${isLoading ? 'bg-gray-200' : ''} ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`;

  const imageProps = {
    src: imageSrc,
    alt: alt || 'Image',
    className: commonClassName,
    priority,
    quality,
    placeholder,
    blurDataURL,
    onError: handleError,
    onLoad: handleLoad,
    onClick,
    ...props,
  };

  if (fill) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          {...imageProps}
          alt={alt || 'Image'}
          fill
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          style={{ objectFit: 'cover' }}
        />
      </div>
    );
  }

  return (
    <Image
      {...imageProps}
      alt={alt || 'Image'}
      width={width || 400}
      height={height || 300}
      style={{
        ...imageProps.style,
        width: width ? 'auto' : '100%',
        height: 'auto',
      }}
    />
  );
}

export default AppImage;
