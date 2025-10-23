"use client";

import { useState } from "react";
import Button from "../__common__/button/Button";
import styles from "./TopGamesSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Game } from "@/types/game";

interface TopGamesProps {
  games: Game[];
  lang: string;
}

export default function TopGamesSection({ games, lang }: TopGamesProps) {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);
  const t = useTranslations();

  return (
    <section id="games" className={`${styles.topGames} container`}>
      <h2 className="h2-heading">{t("topGames", { default: "Top Games" })}</h2>
      <div className={styles.grid}>
        {games.map((game, idx) => (
          <div
            key={game.id}
            className={styles.gameItem}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
          >
            <Link
              href={`/casino/${game.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              aria-label={`${game.name} – open offer`}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={(game as any).optimizedImage || game.image}
                  alt={game.name}
                  title={`${game.name}`}
                  width={264}
                  height={142}
                  sizes="
                    (min-width: 1200px) 25vw,
                    (min-width: 890px) 33vw,
                    (min-width: 768px) 50vw,
                    100vw
                  "
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={idx < 2 ? "high" : "auto"}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
              <div
                className={`${styles.overlay} ${
                  hoveredGame === game.id ? styles.visible : ""
                }`}
              >
                <h3 className={styles.gameName}>{game.name}</h3>
                <p className={styles.playButton}>
                  {t("playNow", { default: "Play Now" })}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Button text={t("allGames", { default: "All Games" })} variant="primary" openInNewTab />
    </section>
  );
}
