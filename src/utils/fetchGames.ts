import axios from "axios";
import { Game } from "../types/game";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export async function fetchGames(type: string): Promise<Game[]> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get(
        `https://api.adkey-seo.com/api/website/get-games/${type}`
      );
      const games = response.data;

      const updatedGames = games.map((game: Game) => ({
        ...game,
        image: `https://api.adkey-seo.com/storage/images/games/${game.image}`,
      }));

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
