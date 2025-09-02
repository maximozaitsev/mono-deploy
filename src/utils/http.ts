export type RetryOptions = {
  retries?: number;
  timeoutMs?: number;
};

const RETRY_STATUSES = new Set([429, 502, 503, 504]);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseRetryAfter(h: string | null): number | null {
  if (!h) return null;
  const num = Number(h);
  if (!Number.isNaN(num)) return Math.max(0, num * 1000);
  const dt = Date.parse(h);
  if (!Number.isNaN(dt)) {
    const ms = dt - Date.now();
    return ms > 0 ? ms : 0;
  }
  return null;
}

export async function getJsonWithRetry<T>(
  url: string,
  opts: RetryOptions = {}
): Promise<T> {
  const retries = opts.retries ?? 4;
  const timeoutMs = opts.timeoutMs ?? 7000;

  let attempt = 0;
  while (true) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
        signal: controller.signal,
      });
      clearTimeout(t);

      if (res.ok) {
        return (await res.json()) as T;
      }

      if (attempt < retries && RETRY_STATUSES.has(res.status)) {
        attempt++;
        const retryAfter = parseRetryAfter(res.headers.get("retry-after"));
        const backoff = Math.min(800 * 2 ** (attempt - 1), 8000);
        const jitter = Math.floor(Math.random() * 200);
        const delay = retryAfter != null ? retryAfter : backoff + jitter;
        await sleep(delay);
        continue;
      }

      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    } catch (e: any) {
      clearTimeout(t);
      const isAbort = e?.name === "AbortError";
      const isNetwork = e && !("status" in e);
      if (attempt < retries && (isAbort || isNetwork)) {
        attempt++;
        const backoff = Math.min(800 * 2 ** (attempt - 1), 8000);
        const jitter = Math.floor(Math.random() * 200);
        await sleep(backoff + jitter);
        continue;
      }
      throw e;
    }
  }
}
