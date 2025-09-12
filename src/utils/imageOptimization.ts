/**
 * Image optimization utilities for unoptimized Next.js setup
 * Since we use unoptimized: true, we need to manually optimize image URLs
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

/**
 * Optimize image URL with query parameters for better performance
 * @param originalUrl - Original image URL
 * @param options - Optimization options
 * @returns Optimized image URL
 */
export function optimizeImageUrl(
  originalUrl: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!originalUrl || typeof originalUrl !== 'string') return originalUrl;
  
  const {
    width,
    height,
    quality = 85,
    format = 'webp'
  } = options;

  // If it's already a local static asset, return as is
  if (originalUrl.startsWith('/') && !originalUrl.includes('?')) {
    return originalUrl;
  }

  // For external URLs, add optimization parameters directly
  try {
    const url = new URL(originalUrl);
    
    if (format) {
      url.searchParams.set('format', format);
    }
    
    if (width) {
      url.searchParams.set('width', width.toString());
    }
    
    if (height) {
      url.searchParams.set('height', height.toString());
    }
    
    if (quality) {
      url.searchParams.set('quality', quality.toString());
    }

    return url.toString();
  } catch (error) {
    // If URL parsing fails, return original URL
    console.warn('Failed to parse URL:', originalUrl, error);
    return originalUrl;
  }
}

/**
 * Get optimized image URL for different use cases
 */
export const imageOptimizations = {
  // Casino/Offer logos
  offerLogo: (url: string) => optimizeImageUrl(url, {
    width: 190,
    height: 76,
    quality: 85,
    format: 'webp'
  }),
  
  offerLogoMobile: (url: string) => optimizeImageUrl(url, {
    width: 160,
    height: 64,
    quality: 85,
    format: 'webp'
  }),

  // Game images
  gameImage: (url: string) => optimizeImageUrl(url, {
    width: 264,
    height: 142,
    quality: 85,
    format: 'webp'
  }),

  // Payment method images
  paymentMethod: (url: string) => optimizeImageUrl(url, {
    width: 120,
    height: 70,
    quality: 85,
    format: 'webp'
  }),

  paymentMethodMobile: (url: string) => optimizeImageUrl(url, {
    width: 84,
    height: 64,
    quality: 85,
    format: 'webp'
  }),

  // Provider images
  providerImage: (url: string) => optimizeImageUrl(url, {
    width: 120,
    height: 60,
    quality: 85,
    format: 'webp'
  }),

  // Bonus details logos
  bonusLogo: (url: string) => optimizeImageUrl(url, {
    width: 140,
    height: 56,
    quality: 85,
    format: 'webp'
  }),

  // Footer partner logos (SVG, no optimization needed)
  partnerLogo: (url: string) => url,
};

/**
 * Check if image URL is already optimized
 */
export function isOptimizedImageUrl(url: string): boolean {
  return url.includes('format=') || url.includes('width=') || url.includes('quality=');
}

/**
 * Check if URL is external (needs proxy)
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Check if URL is already proxied
 */
export function isProxiedUrl(url: string): boolean {
  return url.includes('/api/image-proxy');
}

/**
 * Get responsive image sizes for different breakpoints
 */
export const responsiveSizes = {
  // Hero images
  hero: '(max-width: 768px) 100vw, 768px',
  
  // Two-column layouts
  twoColumn: '(max-width: 768px) 100vw, 50vw',
  
  // Game grid
  gameGrid: `
    (min-width: 1200px) 25vw,
    (min-width: 890px) 33vw,
    (min-width: 768px) 50vw,
    100vw
  `,
  
  // Offer cards
  offerCard: '(max-width: 768px) 160px, 190px',
  
  // App store buttons
  appButton: '181px',
  
  // Footer logos
  footerLogo: '(max-width: 768px) 22px, 32px',
};
