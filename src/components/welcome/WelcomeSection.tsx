"use client";

import { useEffect, useState } from "react";
import Button from "../__common__/button/Button";
import styles from "./WelcomeSection.module.scss";
import { fetchOffers } from "@/utils/fetchOffers";
import { usePathname } from "next/navigation";
import languages from "../../../public/content/languages.json";
import staticContent from "../../../public/content/static.json";

type LangManifest = { languages: string[]; defaultLang: string };
const manifest = languages as LangManifest;
const translations = staticContent as Record<string, Record<string, string>>;

export default function WelcomeSection() {
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const pathname = usePathname();
  const firstSeg = pathname?.split("/").filter(Boolean)[0] || "";
  const currentLang = manifest.languages.includes(firstSeg)
    ? firstSeg
    : manifest.defaultLang;
  const t =
    translations[currentLang] || translations[manifest.defaultLang] || {};

  useEffect(() => {
    const fetchWelcomeBonus = async () => {
      try {
        const offersData = await fetchOffers();
        const bonus = offersData.offers[0]?.bonuses.welcome_bonus || "";
        setWelcomeBonus(bonus);
      } catch (error) {
        console.error("Failed to fetch welcome bonus:", error);
      }
    };

    fetchWelcomeBonus();
  }, []);

  return (
    <section
      id="welcome-section"
      className={`${styles.welcomeSection} section`}
    >
      <div className={styles.welcomeBg}>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <h2 className={styles.offerText}>
                {t.exclusiveWelcomeOfferOf} {welcomeBonus}
              </h2>
              <h2 className={styles.bonusText}>
                {t.exclusiveWelcomeOfferOf} {welcomeBonus}
              </h2>
              <Button text="claimBonus" variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
