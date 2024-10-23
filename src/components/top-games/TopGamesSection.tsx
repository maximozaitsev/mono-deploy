"use client";

import { useState } from "react";
import Image from "next/image";
import { Game } from "@/types/game";
import Button from "../__common__/button/Button";
import { useNavigateWithPreloader } from "@/utils/navigationUtils";
import styles from "./TopGamesSection.module.scss";

interface TopGamesProps {
  games: Game[];
}

export default function TopGamesSection({ games }: TopGamesProps) {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);
  const { handleNavigation } = useNavigateWithPreloader();

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
            <Image
              src={game.image}
              alt={game.name}
              className={styles.gameImage}
              width={300}
              height={200}
              quality={100}
            />
            <div
              className={`${styles.overlay} ${
                hoveredGame === game.id ? styles.visible : ""
              }`}
              onClick={() => handleNavigation("/casino", undefined, true)}
            >
              <h3 className={styles.gameName}>{game.name}</h3>
              <p className={styles.playButton}>
                <Image
                  src="/assets/play-button.svg"
                  alt="Play Icon"
                  className={styles.playIcon}
                  width={32}
                  height={32}
                />
                Play Now
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button text="All Games" variant="primary" />
    </section>
  );
}
