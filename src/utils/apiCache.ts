type Entry<T> = { ts: number; data: T; size: number };
type Fetcher<T> = () => Promise<T>;

const store = new Map<string, Entry<any>>();
const inflight = new Map<string, Promise<any>>();

// Memory management
const MAX_CACHE_SIZE = 50; // Maximum number of entries
const MAX_MEMORY_USAGE = 10 * 1024 * 1024; // 10MB limit

let currentMemoryUsage = 0;

function estimateSize(obj: any): number {
  return new Blob([JSON.stringify(obj)]).size;
}

function cleanupCache() {
  if (store.size <= MAX_CACHE_SIZE && currentMemoryUsage <= MAX_MEMORY_USAGE) {
    return;
  }

  // Sort by timestamp (oldest first) and remove entries until we're under limits
  const entries = Array.from(store.entries())
    .sort(([, a], [, b]) => a.ts - b.ts);

  for (const [key, entry] of entries) {
    if (store.size <= MAX_CACHE_SIZE && currentMemoryUsage <= MAX_MEMORY_USAGE) {
      break;
    }
    currentMemoryUsage -= entry.size;
    store.delete(key);
  }
}

export async function getOrFetch<T>(
  key: string,
  ttlMs: number,
  fetcher: Fetcher<T>
): Promise<T> {
  const now = Date.now();
  const hit = store.get(key);
  if (hit && now - hit.ts <= ttlMs) return hit.data as T;

  const current = inflight.get(key);
  if (current) return current;

  const p = (async () => {
    try {
      const data = await fetcher();
      const size = estimateSize(data);
      
      // Clean up old entry if it exists
      const oldEntry = store.get(key);
      if (oldEntry) {
        currentMemoryUsage -= oldEntry.size;
      }
      
      // Add new entry
      store.set(key, { ts: Date.now(), data, size });
      currentMemoryUsage += size;
      
      // Cleanup if needed
      cleanupCache();
      
      return data;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, p);
  return p;
}

export function getStale<T>(key: string, maxStaleMs: number): T | null {
  const e = store.get(key);
  if (!e) return null;
  if (Date.now() - e.ts <= maxStaleMs) return e.data as T;
  return null;
}

// Clear cache manually if needed
export function clearCache(): void {
  store.clear();
  inflight.clear();
  currentMemoryUsage = 0;
}

// Get cache stats
export function getCacheStats(): { size: number; memoryUsage: number; entries: number } {
  return {
    size: currentMemoryUsage,
    memoryUsage: currentMemoryUsage,
    entries: store.size,
  };
}
