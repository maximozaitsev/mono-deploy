"use client";

import { useEffect, useState } from "react";
import Button from "../__common__/button/Button";
import styles from "./WelcomeSection.module.scss";
import { fetchOffers } from "@/utils/fetchOffers";
import { useStaticT } from "@/utils/i18n";

export default function WelcomeSection() {
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [firstOfferId, setFirstOfferId] = useState<string>("");
  const [offerLink, setOfferLink] = useState<string>("");
  const { t } = useStaticT();

  useEffect(() => {
    (async () => {
      try {
        const offersData = await fetchOffers();
        const bonus = offersData.offers[0]?.bonuses.welcome_bonus || "";
        setWelcomeBonus(bonus);
        setFirstOfferId(String(offersData.offers[0]?.id ?? ""));
        setOfferLink(offersData.offers[0]?.link || "");
      } catch (e) {
        console.error("Failed to fetch welcome bonus:", e);
      }
    })();
  }, []);

  return (
    <section
      id="welcome-section"
      className={`${styles.welcomeSection} section`}
    >
      <figure className={styles.mobileFigure} aria-hidden>
        <img
          className={styles.mobileImage}
          src="/block-images/welcome-mobile.webp"
          srcSet="/block-images/welcome-mobile-412.webp 412w, /block-images/welcome-mobile.webp 576w"
          sizes="(max-width: 576px) 100vw, 576px"
          alt="Welcome Mobile"
          width={576}
          height={315}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </figure>

      {/* Десктопный фон задаётся в CSS (на мобиле — отсутствует) */}
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
              {(firstOfferId || offerLink) && (
                <Button
                  text={t.claimBonus}
                  variant="primary"
                  useNavigation
                  url={firstOfferId ? `/casino/${firstOfferId}` : offerLink}
                  openInNewTab
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
