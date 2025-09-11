"use client";

import { useState, useRef, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  priority = false,
  quality = 85,
  sizes,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;

    // For external API images, add optimization parameters
    if (src.includes('api.adkey-seo.com')) {
      const url = new URL(src);
      url.searchParams.set('format', 'webp');
      url.searchParams.set('quality', quality.toString());
      
      if (width && height) {
        url.searchParams.set('width', width.toString());
        url.searchParams.set('height', height.toString());
      }
      
      setImageSrc(url.toString());
    }
  }, [src, width, height, quality]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to original src if optimized version fails
    if (imageSrc !== src) {
      setImageSrc(src);
    }
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      loading={priority ? "eager" : loading}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
}
