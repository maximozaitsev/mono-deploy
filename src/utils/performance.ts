// Performance monitoring utility
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  target?: EventTarget;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config: any) => void;
  }
}

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initObservers();
    }
  }

  private initObservers() {
    // Observe LCP
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // Observe FID
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'first-input') {
              const firstInputEntry = entry as PerformanceEventTiming;
              this.metrics.fid = firstInputEntry.processingStart - firstInputEntry.startTime;
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer failed:', e);
      }

      // Observe CLS
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as LayoutShiftEntry;
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
            }
          }
          this.metrics.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }
    }

    // Measure FCP
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            this.metrics.fcp = fcpEntry.startTime;
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      } catch (e) {
        console.warn('FCP observer failed:', e);
      }
    }

    // Measure TTFB
    if ('PerformanceObserver' in window) {
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const navigationEntry = entries.find(entry => entry.entryType === 'navigation');
          if (navigationEntry) {
            this.metrics.ttfb = (navigationEntry as any).responseStart - (navigationEntry as any).requestStart;
          }
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);
      } catch (e) {
        console.warn('TTFB observer failed:', e);
      }
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public logMetrics(): void {
    if (typeof window !== 'undefined') {
      console.log('Performance Metrics:', this.metrics);
      
      // Log to analytics if available
      if (typeof window.gtag !== 'undefined' && window.gtag) {
        Object.entries(this.metrics).forEach(([metric, value]) => {
          window.gtag!('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: metric,
            value: Math.round(value),
            non_interaction: true,
          });
        });
      }
    }
  }

  public disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
}

// Auto-log metrics after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      getPerformanceMonitor().logMetrics();
    }, 1000);
  });
}

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (performanceMonitor) {
      performanceMonitor.disconnect();
    }
  });
}
