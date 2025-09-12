"use client";

import { useState } from "react";
import { Game } from "@/types/game";
import Button from "../__common__/button/Button";
import PlayIcon from "../__common__/PlayIcon";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import { imageOptimizations, responsiveSizes } from "../../utils/imageOptimization";
import styles from "./TopGamesSection.module.scss";
import Image from "next/image";
import Link from "next/link";

interface TopGamesProps {
  games: Game[];
}

export default function TopGamesSection({ games }: TopGamesProps) {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  return (
    <section id="games" className={`${styles.topGames} container`}>
      <h2 className="h2-heading">Top Games</h2>
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
                  title={`${game.name} in ${PROJECT_NAME} ${PROJECT_GEO}`}
                  width={264}
                  height={142}
                  sizes={responsiveSizes.gameGrid}
                  priority={idx < 2}
                  quality={85}
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
                  <span className={styles.playIcon}>
                    <PlayIcon />
                  </span>
                  Play Now
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Button text="All Games" variant="primary" openInNewTab />
    </section>
  );
}
