/**
 * Утилиты для оптимизации изображений
 */

export interface OptimizedImageSizes {
  mobile: string;
  desktop: string;
  retina: string;
}

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

/**
 * Создает оптимизированные URL изображений для разных размеров экрана
 */
export function createOptimizedImageSizes(
  baseUrl: string,
  options: ImageOptimizationOptions = {}
): OptimizedImageSizes {
  const {
    quality = 85,
    format = 'webp'
  } = options;

  const params = new URLSearchParams({
    format,
    quality: quality.toString(),
  });

  // Создаем параметры с разным качеством для разных размеров
  const mobileParams = new URLSearchParams({ format, quality: quality.toString() });
  const desktopParams = new URLSearchParams({ format, quality: quality.toString() });
  const retinaParams = new URLSearchParams({ format, quality: (quality - 10).toString() }); // Меньше качество для retina

  return {
    mobile: `${baseUrl}?${mobileParams.toString()}&width=160&height=64`,
    desktop: `${baseUrl}?${desktopParams.toString()}&width=190&height=76`,
    retina: `${baseUrl}?${retinaParams.toString()}&width=380&height=152`,
  };
}

/**
 * Создает srcSet для responsive изображений
 */
export function createSrcSet(sizes: OptimizedImageSizes): string {
  return `${sizes.mobile} 160w, ${sizes.desktop} 190w, ${sizes.retina} 380w`;
}

/**
 * Определяет оптимальный формат изображения на основе поддержки браузера
 */
export function getOptimalImageFormat(): 'webp' | 'avif' | 'jpeg' {
  // В реальном приложении здесь можно добавить проверку поддержки браузера
  // Пока используем webp как наиболее поддерживаемый формат
  return 'webp';
}

/**
 * Создает оптимизированный URL изображения с учетом устройства
 */
export function getOptimizedImageUrl(
  baseUrl: string,
  deviceType: 'mobile' | 'desktop' | 'retina' = 'desktop',
  quality: number = 85
): string {
  const format = getOptimalImageFormat();
  const params = new URLSearchParams({
    format,
    quality: quality.toString(),
  });

  const dimensions = {
    mobile: 'width=160&height=64',
    desktop: 'width=190&height=76',
    retina: 'width=380&height=152',
  };

  return `${baseUrl}?${params.toString()}&${dimensions[deviceType]}`;
}
