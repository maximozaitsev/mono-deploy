import { useEffect, useRef, useCallback, useState } from 'react';

interface PerformanceOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useIntersectionObserver(
  options: PerformanceOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
      
      if (once && entry.isIntersecting && observerRef.current) {
        // Disconnect observer if we only need to trigger once
        observerRef.current.disconnect();
      }
    },
    [once]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
    });
    
    observerRef.current = observer;

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [callback, threshold, rootMargin]);

  return [elementRef, isIntersecting] as const;
}

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
        }, delay - (now - lastRun.current));
      }
    },
    [callback, delay]
  ) as T;
}

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}

export function useIdleCallback(
  callback: () => void,
  options: { timeout?: number } = {}
) {
  const { timeout = 2000 } = options;

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(callback, { timeout });
      return () => window.cancelIdleCallback(id);
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const id = setTimeout(callback, timeout);
      return () => clearTimeout(id);
    }
  }, [callback, timeout]);
}

export function usePrefetch(url: string, options: { priority?: 'high' | 'low' } = {}) {
  const { priority = 'low' } = options;

  useEffect(() => {
    if ('prefetch' in window.navigator) {
      (window.navigator as any).prefetch(url, { priority });
    } else {
      // Fallback for browsers that don't support prefetch
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    }
  }, [url, priority]);
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      const renderTime = performance.now() - startTime.current;
      console.log(`${componentName} rendered ${renderCount.current} times in ${renderTime.toFixed(2)}ms`);
    }
  });

  useEffect(() => {
    return () => {
      if (process.env.NODE_ENV === 'development') {
        const totalTime = performance.now() - startTime.current;
        console.log(`${componentName} unmounted after ${totalTime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);
}
