"use client";

import { useEffect, useState } from "react";
import Button from "../__common__/button/Button";
import styles from "./WelcomeSection.module.scss";
import { fetchOffers } from "@/utils/fetchOffers";

export default function WelcomeSection() {
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [firstOfferId, setFirstOfferId] = useState<string>("");
  const [offerLink, setOfferLink] = useState<string>("");

  useEffect(() => {
    const fetchWelcomeBonus = async () => {
      try {
        const offersData = await fetchOffers();
        const first = offersData?.offers?.[0];

        const bonus = first?.bonuses?.welcome_bonus || "";
        setWelcomeBonus(bonus);

        setFirstOfferId(String(first?.id ?? ""));
        setOfferLink(first?.link || "");
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
      <figure className={styles.mobileFigure} aria-hidden>
        <picture>
          {/* AVIF format - лучший сжатие */}
          <source
            media="(max-width: 240px)"
            srcSet="/block-images/welcome-mobile-240.avif"
            type="image/avif"
          />
          <source
            media="(max-width: 320px)"
            srcSet="/block-images/welcome-mobile-320.avif"
            type="image/avif"
          />
          <source
            media="(max-width: 480px)"
            srcSet="/block-images/welcome-mobile-480.avif"
            type="image/avif"
          />
          <source
            srcSet="/block-images/welcome-mobile-576.avif"
            type="image/avif"
          />
          
          {/* WebP format - хорошее сжатие */}
          <source
            media="(max-width: 240px)"
            srcSet="/block-images/welcome-mobile-240.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 320px)"
            srcSet="/block-images/welcome-mobile-320.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 480px)"
            srcSet="/block-images/welcome-mobile-480.webp"
            type="image/webp"
          />
          <source
            srcSet="/block-images/welcome-mobile-576.webp"
            type="image/webp"
          />
          
          {/* Fallback для старых браузеров */}
          <img
            className={styles.mobileImage}
            src="/block-images/welcome-mobile-576.webp"
            alt="Welcome Mobile"
            width="576"
            height="315"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => {
              console.log('Welcome image loaded successfully');
            }}
            onError={(e) => {
              console.error('Failed to load welcome image:', e);
            }}
          />
        </picture>
      </figure>

      <div className={styles.welcomeBg}>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <h2 className={styles.offerText}>
                Exclusive welcome offer of {welcomeBonus}
              </h2>
              <h2 className={styles.bonusText}>
                Exclusive welcome bonus of {welcomeBonus}
              </h2>

              {(firstOfferId || offerLink) && (
                <Button
                  text="claim bonus"
                  variant="primary"
                  useNavigation={true}
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
