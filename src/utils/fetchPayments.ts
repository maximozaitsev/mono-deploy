import { getJsonWithRetry } from "@/utils/http";
import { PaymentMethod } from "@/types/payment";
import { getOrFetch, getStale } from "@/utils/apiCache";

const baseUrl = "https://api.adkey-seo.com/storage/images/payments/";
const TTL_MS = 60_000;
const STALE_MS = 120_000;

export async function fetchPayments(): Promise<PaymentMethod[]> {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID;
  if (!siteId) return [];

  const key = `payments:${siteId}`;
  try {
    const data = await getOrFetch<PaymentMethod[]>(key, TTL_MS, async () => {
      const methods = await getJsonWithRetry<PaymentMethod[]>(
        `https://api.adkey-seo.com/api/website/get-payments/${siteId}`
      );
      return methods.map((m) => ({ ...m, image: `${baseUrl}${m.image}` }));
    });
    return data;
  } catch {
    const stale = getStale<PaymentMethod[]>(key, STALE_MS);
    if (stale) return stale;
    return [];
  }
}
