"use client";

import { useState } from "react";
import { Game } from "@/types/game";
import Button from "../__common__/button/Button";
import PlayIcon from "../__common__/PlayIcon";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import styles from "./TopGamesSection.module.scss";

interface TopGamesProps {
  games: Game[];
}

export default function TopGamesSection({ games }: TopGamesProps) {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  return (
    <section id="games" className={`${styles.topGames} container`}>
      <h2 className="h2-heading">Top Games</h2>
      <div className={styles.grid}>
        {games.map((game) => (
          <div
            key={game.id}
            className={styles.gameItem}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
          >
            <img
              src={game.image}
              alt={game.name}
              title={game.name + " in " + PROJECT_NAME + " " + PROJECT_GEO}
              className={styles.gameImage}
              width={300}
              height={200}
            />
            <div
              className={`${styles.overlay} ${
                hoveredGame === game.id ? styles.visible : ""
              }`}
              onClick={() => {
                window.open(
                  `/casino/${game.id}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              <h3 className={styles.gameName}>{game.name}</h3>
              <p className={styles.playButton}>
                <span className={styles.playIcon}>
                  <PlayIcon />
                </span>
                Play Now
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button text="All Games" variant="primary" openInNewTab />
    </section>
  );
}
