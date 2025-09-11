// Utility for optimizing external API images without Next.js Image component

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

export function optimizeImageUrl(
  originalUrl: string, 
  options: ImageOptimizationOptions = {}
): string {
  if (!originalUrl || !originalUrl.includes('api.adkey-seo.com')) {
    return originalUrl;
  }

  try {
    const url = new URL(originalUrl);
    
    // Set format to webp for better compression
    url.searchParams.set('format', options.format || 'webp');
    
    // Set quality (default 85 for good balance)
    url.searchParams.set('quality', (options.quality || 85).toString());
    
    // Set dimensions if provided
    if (options.width) {
      url.searchParams.set('width', options.width.toString());
    }
    
    if (options.height) {
      url.searchParams.set('height', options.height.toString());
    }
    
    return url.toString();
  } catch (error) {
    console.warn('Failed to optimize image URL:', error);
    return originalUrl;
  }
}

export function getResponsiveImageSrc(
  baseUrl: string,
  sizes: { [key: string]: { width: number; height?: number } }
): string {
  if (typeof window === 'undefined') {
    return baseUrl;
  }

  const screenWidth = window.innerWidth;
  
  // Find the best size for current screen
  const sortedSizes = Object.entries(sizes).sort((a, b) => {
    const [, sizeA] = a;
    const [, sizeB] = b;
    return sizeA.width - sizeB.width;
  });

  for (const [breakpoint, size] of sortedSizes) {
    const breakpointWidth = parseInt(breakpoint.replace('px', ''));
    if (screenWidth <= breakpointWidth) {
      return optimizeImageUrl(baseUrl, {
        width: size.width,
        height: size.height,
        quality: 85,
        format: 'webp'
      });
    }
  }

  // Fallback to largest size
  const largestSize = sortedSizes[sortedSizes.length - 1][1];
  return optimizeImageUrl(baseUrl, {
    width: largestSize.width,
    height: largestSize.height,
    quality: 85,
    format: 'webp'
  });
}
