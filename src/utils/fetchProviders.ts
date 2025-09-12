import { Provider } from "@/types/provider";
import { getJsonWithRetry } from "@/utils/http";
import { getOrFetch, getStale } from "@/utils/apiCache";
import { imageOptimizations } from "./imageOptimization";

const TTL_MS = 60_000;
const STALE_MS = 120_000;

export async function fetchProviders(): Promise<Provider[]> {
  const key = "providers";
  try {
    const data = await getOrFetch<Provider[]>(key, TTL_MS, async () => {
      const providers = await getJsonWithRetry<Provider[]>(
        "https://api.adkey-seo.com/api/website/get-providers/"
      );
      return providers.map((provider) => {
        const logoUrl = `https://api.adkey-seo.com/storage/images/providers/${provider.image}`;
        return {
          ...provider,
          image: logoUrl,
          // Use our image optimization utility for caching
          optimizedLogo: imageOptimizations.providerImage(logoUrl),
        };
      });
    });
    return data;
  } catch {
    const stale = getStale<Provider[]>(key, STALE_MS);
    if (stale) return stale;
    return [];
  }
}
