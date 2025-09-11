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

    // Delay non-critical data fetching to improve LCP - wait for page to be fully loaded
    const timeoutId = setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (document.readyState === 'complete') {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(fetchWelcomeBonus, { timeout: 3000 });
          } else {
            fetchWelcomeBonus();
          }
        } else {
          window.addEventListener('load', () => {
            if ('requestIdleCallback' in window) {
              requestIdleCallback(fetchWelcomeBonus, { timeout: 3000 });
            } else {
              fetchWelcomeBonus();
            }
          }, { once: true });
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
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
          width="576"
          height="315"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
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
