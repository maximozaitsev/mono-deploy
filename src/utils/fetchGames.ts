import { Game } from "@/types/game";
import { getJsonWithRetry } from "@/utils/http";
import { getOrFetch, getStale } from "@/utils/apiCache";

const TTL_MS = 30_000;
const STALE_MS = 60_000;

export async function fetchGames(type: string): Promise<Game[]> {
  const key = `games:${type}`;
  try {
    const data = await getOrFetch<Game[]>(key, TTL_MS, async () => {
      // Route through local API with edge cache headers to enable long-lived caching
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      let games: Game[] = [];
      try {
        games = await getJsonWithRetry<Game[]>(`${base}/api/games/${type}`);
        if (!Array.isArray(games)) throw new Error("Invalid games payload");
      } catch {
        // Fallback to upstream if local route fails (ensures section is not empty)
        games = await getJsonWithRetry<Game[]>(
          `https://api.adkey-seo.com/api/website/get-games/${type}`
        );
      }
      return games.map((game) => {
        const imageUrl = `https://api.adkey-seo.com/storage/images/games/${game.image}`;
        return {
          ...game,
          image: imageUrl,
          // Match TopGames card size to avoid over-fetching
          optimizedImage: `${imageUrl}?format=webp&width=264&height=142`,
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
