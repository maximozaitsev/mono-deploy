import { Game } from "@/types/game";
import { getJsonWithRetry } from "@/utils/http";
import { getOrFetch, getStale } from "@/utils/apiCache";

const TTL_MS = 30_000;
const STALE_MS = 60_000;

export async function fetchGames(type: string): Promise<Game[]> {
  const key = `games:${type}`;
  try {
    const data = await getOrFetch<Game[]>(key, TTL_MS, async () => {
      const games = await getJsonWithRetry<Game[]>(
        `https://api.adkey-seo.com/api/website/get-games/${type}`
      );
      return games.map((game) => {
        const upstream = `https://api.adkey-seo.com/storage/images/games/${game.image}`;
        return {
          ...game,
          image: upstream,
          optimizedImage: `/api/img?src=${encodeURIComponent(upstream)}&w=264&h=142&f=webp&q=82&fit=cover`,
          optimizedImage2x: `/api/img?src=${encodeURIComponent(upstream)}&w=528&h=284&f=webp&q=82&fit=cover`,
        } as Game & { optimizedImage2x: string };
      });
    });
    return data;
  } catch {
    const stale = getStale<Game[]>(key, STALE_MS);
    if (stale) return stale;
    return [];
  }
}
