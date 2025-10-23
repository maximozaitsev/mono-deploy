import { getJsonWithRetry } from "@/utils/http";
import { HomePageProps, Offer } from "@/types/offer";
import { getOrFetch, getStale } from "@/utils/apiCache";

const TTL_MS = 60_000;
const STALE_MS = 120_000;

export async function fetchOffers(): Promise<HomePageProps> {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID;
  if (!siteId) return { country: "", offers: [] };

  const key = `offers:${siteId}`;
  try {
    const data = await getOrFetch<HomePageProps>(key, TTL_MS, async () => {
      const res = await getJsonWithRetry<any>(
        `https://api.adkey-seo.com/api/website/get-website/${siteId}`
      );
      const website = res?.website ?? {};
      const offers = (res?.offers ?? []) as Offer[];
      const updatedOffers = offers.map((offer) => {
        const upstream = `https://api.adkey-seo.com/storage/images/offers/${offer.logo}`;
        const logoMobile = `/api/img?src=${encodeURIComponent(upstream)}&w=160&h=64&f=webp&q=82`;
        const logoDesktop = `/api/img?src=${encodeURIComponent(upstream)}&w=190&h=76&f=webp&q=82`;
        return {
          ...offer,
          logo: upstream,
          optimizedLogo: logoMobile,
          logoMobile,
          logoDesktop,
        } as Offer & { logoMobile: string; logoDesktop: string; optimizedLogo?: string };
      });
      return { country: website.country_name ?? "", offers: updatedOffers };
    });
    return data;
  } catch {
    const stale = getStale<HomePageProps>(key, STALE_MS);
    if (stale) return stale;
    return { country: "", offers: [] };
  }
}
