"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  className?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = "100vw",
  quality = 85,
  className = "",
  placeholder = "blur",
  blurDataURL,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (!isInView && !priority) {
    return (
      <div
        ref={imageRef}
        className={`${className} bg-gray-200 animate-pulse`}
        style={{
          width: width || "100%",
          height: height || "100%",
        }}
      />
    );
  }

  return (
    <div ref={imageRef} className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
