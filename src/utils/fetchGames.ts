import axios from "axios";
import { Game } from "../types/game";

const MAX_RETRIES = 4;
const RETRY_DELAY = 800;

export async function fetchGames(type: string): Promise<Game[]> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get(
        `https://api.adkey-seo.com/api/website/get-games/${type}`,
        {
          headers: {
            "Accept-Encoding": "gzip, deflate, br",
            "Cache-Control": "no-cache",
          },
          timeout: 5000,
        }
      );
      const games = response.data;

      const updatedGames = games.map((game: Game) => {
        const imageUrl = `https://api.adkey-seo.com/storage/images/games/${game.image}`;
        return {
          ...game,
          image: imageUrl,
          optimizedImage: imageUrl + "?format=webp&width=332&height=179",
        };
      });

      return updatedGames;
    } catch (error: any) {
      if (error.response?.status === 429 && retries < MAX_RETRIES) {
        retries++;
        console.warn(
          `Rate limit hit, retrying in ${RETRY_DELAY * retries}ms...`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY * retries)
        );
      } else {
        throw error;
      }
    }
  }

  throw new Error("Max retries exceeded");
}
