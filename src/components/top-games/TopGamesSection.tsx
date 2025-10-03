import { Game } from "@/types/game";
import { getStaticTranslations } from "../../utils/serverContent";
import Button from "../__common__/button/Button";
import GameCard from "./GameCard";
import styles from "./TopGamesSection.module.scss";

interface TopGamesProps {
  games: Game[];
  lang: string;
}

export default async function TopGamesSection({ games, lang }: TopGamesProps) {
  const translations = await getStaticTranslations(lang);
  const t = translations;

  return (
    <section id="games" className={`${styles.topGames} container`}>
      <h2 className="h2-heading">{t.topGames || "Top Games"}</h2>
      <div className={styles.grid}>
        {games.map((game, idx) => (
          <GameCard key={game.id} game={game} priority={idx < 2} />
        ))}
      </div>
      <Button text={t.allGames || "All Games"} variant="primary" openInNewTab />
    </section>
  );
}
