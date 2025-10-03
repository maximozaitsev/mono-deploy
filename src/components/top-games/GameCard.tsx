"use client";

import { useState } from "react";
import { useStaticT } from "@/utils/i18n";
import { Game } from "@/types/game";
import Button from "../__common__/button/Button";
import PlayIcon from "../__common__/PlayIcon";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import styles from "./TopGamesSection.module.scss";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  game: Game;
  priority?: boolean;
}

export default function GameCard({ game, priority = false }: GameCardProps) {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);
  const { t } = useStaticT();

  return (
    <div
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
            sizes="
              (min-width: 1200px) 25vw,
              (min-width: 890px) 33vw,
              (min-width: 768px) 50vw,
              100vw
            "
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
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
            {t.playNow || "Play Now"}
          </p>
        </div>
      </Link>
    </div>
  );
}
