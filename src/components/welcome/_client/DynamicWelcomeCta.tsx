"use client";

import { useEffect, useState } from "react";
import Button from "../../__common__/button/Button";
import { fetchOffers } from "@/utils/fetchOffers";
import styles from "../WelcomeSection.module.scss";
import { useTranslations } from "next-intl";

export default function DynamicWelcomeCta() {
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [firstOfferId, setFirstOfferId] = useState<string>("");
  const [offerLink, setOfferLink] = useState<string>("");
  const t = useTranslations();

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

    // Defer to next tick to avoid competing with initial render
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => fetchWelcomeBonus())
      : window.setTimeout(() => fetchWelcomeBonus(), 0);

    return () => {
      if (window.cancelIdleCallback && typeof id === "number") {
        window.cancelIdleCallback(id as unknown as number);
      } else {
        clearTimeout(id as unknown as number);
      }
    };
  }, []);

  return (
    <>
      <h2 className={styles.offerText}>
        {t("exclusiveWelcomeOfferOf")} {welcomeBonus}
      </h2>
      <h2 className={styles.bonusText}>
        {t("exclusiveWelcomeOfferOf")} {welcomeBonus}
      </h2>

      {(firstOfferId || offerLink) && (
        <Button
          text={t("claimBonus")}
          variant="primary"
          useNavigation={true}
          url={firstOfferId ? `/casino/${firstOfferId}` : offerLink}
          openInNewTab
        />
      )}
    </>
  );
}

