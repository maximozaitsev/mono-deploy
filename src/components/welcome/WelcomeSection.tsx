"use client";

import { useEffect, useState } from "react";
import Button from "../__common__/button/Button";
import styles from "./WelcomeSection.module.scss";
import { fetchOffers } from "@/utils/fetchOffers";

export default function WelcomeSection() {
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [offerLink, setOfferLink] = useState("");
  const [offerId, setOfferId] = useState("");

  useEffect(() => {
    const fetchWelcomeBonus = async () => {
      try {
        const offersData = await fetchOffers();
        const bonus = offersData.offers[0]?.bonuses.welcome_bonus || "";
        setWelcomeBonus(bonus);
        const link = offersData.offers[0]?.link || "";
        setOfferLink(link);
        const rawId = offersData.offers[0]?.id;
        setOfferId(rawId != null ? String(rawId) : "");
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
      <div className="container">
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeText}>
            <p className={styles.offerText}>
              Exclusive welcome offer of {welcomeBonus}
            </p>
            <p className={styles.bonusText}>
              Exclusive welcome bonus of {welcomeBonus}
            </p>
            {(offerId || offerLink) && (
              <Button
                text="claim bonus"
                variant="primary"
                url={offerId ? `/casino/${offerId}` : offerLink}
                openInNewTab
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
