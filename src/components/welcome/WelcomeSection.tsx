"use client";

import { useEffect, useState } from "react";
import Button from "../__common__/button/Button";
import styles from "./WelcomeSection.module.scss";
import { fetchOffers } from "@/utils/fetchOffers";

export default function WelcomeSection() {
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [firstOfferId, setFirstOfferId] = useState<string>("");
  const [offerLink, setOfferLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
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
        <img
          className={styles.mobileImage}
          src="/block-images/welcome-mobile.webp"
          alt="Welcome Mobile"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={576}
          height={262}
          sizes="(max-width: 480px) 100vw, (max-width: 576px) 100vw, 576px"
        />
      </figure>

      <div className={styles.welcomeBg}>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              {isLoading ? (
                <>
                  <div className={styles.skeletonText}></div>
                  <div className={styles.skeletonText}></div>
                </>
              ) : (
                <>
                  <h2 className={styles.offerText}>
                    Exclusive welcome offer of {welcomeBonus}
                  </h2>
                  <h2 className={styles.bonusText}>
                    Exclusive welcome bonus of {welcomeBonus}
                  </h2>
                </>
              )}

              {(firstOfferId || offerLink) && !isLoading && (
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
