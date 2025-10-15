import { getJsonWithRetry } from "@/utils/http";
import { HomePageProps, Offer } from "@/types/offer";
import { getOrFetch, getStale } from "@/utils/apiCache";
import { createOptimizedImageSizes, getOptimizedImageUrl } from "@/utils/imageOptimization";

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
        const logoUrl = `https://api.adkey-seo.com/storage/images/offers/${offer.logo}`;
        
        // Создаем оптимизированные изображения с улучшенными параметрами
        const optimizedSizes = createOptimizedImageSizes(logoUrl, {
          quality: 85,
          format: 'webp'
        });

        return {
          ...offer,
          logo: logoUrl,
          // Основное оптимизированное изображение для десктопа
          optimizedLogo: getOptimizedImageUrl(logoUrl, 'desktop', 85),
          // Responsive размеры для разных устройств
          optimizedLogoSizes: optimizedSizes,
          // Мобильная версия для лучшей оптимизации
          mobileLogo: getOptimizedImageUrl(logoUrl, 'mobile', 85),
        };
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
