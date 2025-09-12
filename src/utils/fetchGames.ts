import { Game } from "@/types/game";
import { getJsonWithRetry } from "@/utils/http";
import { getOrFetch, getStale } from "@/utils/apiCache";
import { imageOptimizations } from "./imageOptimization";

const TTL_MS = 30_000;
const STALE_MS = 60_000;

export async function fetchGames(type: string): Promise<Game[]> {
  const key = `games:${type}`;
  try {
    const data = await getOrFetch<Game[]>(key, TTL_MS, async () => {
      // Back to upstream API directly
      const games = await getJsonWithRetry<Game[]>(
        `https://api.adkey-seo.com/api/website/get-games/${type}`
      );
      return games.map((game) => {
        const imageUrl = `https://api.adkey-seo.com/storage/images/games/${game.image}`;
        return {
          ...game,
          image: imageUrl,
          // Use our image optimization utility for caching
          optimizedImage: imageOptimizations.gameImage(imageUrl),
        };
      });
    });
    return data;
  } catch {
    const stale = getStale<Game[]>(key, STALE_MS);
    if (stale) return stale;
    return [];
  }
}
