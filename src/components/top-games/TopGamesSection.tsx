"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Game } from "@/types/game";
import Button from "../__common__/button/Button";
import PlayIcon from "../__common__/PlayIcon";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import styles from "./TopGamesSection.module.scss";

interface TopGamesProps {
  games: Game[];
}

export default function TopGamesSection({ games }: TopGamesProps) {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);
  const [t, setT] = useState<any>({
    topGames: "Top Games",
    playNow: "Play Now",
    allGames: "All Games",
  });
  const [projectGeo, setProjectGeo] = useState<string>("");

  const pathname = usePathname();

  useEffect(() => {
    async function loadTranslations() {
      try {
        const mfRes = await fetch("/content/languages.json", {
          cache: "no-cache",
        });
        const manifest = await mfRes.json();

        const seg = (pathname || "").split("/").filter(Boolean)[0];
        const lang =
          seg && manifest.languages.includes(seg) ? seg : manifest.defaultLang;

        const trRes = await fetch("/content/static.json", {
          cache: "no-cache",
        });
        const all = await trRes.json();
        setT(all[lang] || all[manifest.defaultLang] || all.en || {});

        setProjectGeo(getProjectGeoForLang(lang));
      } catch {
        setT({
          topGames: "Top Games",
          playNow: "Play Now",
          allGames: "All Games",
        });
        setProjectGeo("");
      }
    }
    loadTranslations();
  }, [pathname]);

  return (
    <section id="games" className={`${styles.topGames} container`}>
      <h2 className="h2-heading">{t.topGames}</h2>
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
              title={`${game.name} in ${PROJECT_NAME} ${
                projectGeo || "Global"
              }`}
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
                {t.playNow}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button text={t.allGames} variant="primary" openInNewTab />
    </section>
  );
}
