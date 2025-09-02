type Entry<T> = { ts: number; data: T };
type Fetcher<T> = () => Promise<T>;

const store = new Map<string, Entry<any>>();
const inflight = new Map<string, Promise<any>>();

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
      store.set(key, { ts: Date.now(), data });
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
