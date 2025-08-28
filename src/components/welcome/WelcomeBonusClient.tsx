"use client";

import { useEffect, useState } from "react";
import Button from "../__common__/button/Button";
import { fetchOffers } from "@/utils/fetchOffers";
import { useStaticT } from "@/utils/i18n";

export default function WelcomeBonusClient() {
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [firstOfferId, setFirstOfferId] = useState<string>("");
  const [offerLink, setOfferLink] = useState<string>("");
  const { t } = useStaticT();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const offersData = await fetchOffers();
        if (cancelled) return;
        const bonus = offersData.offers[0]?.bonuses.welcome_bonus || "";
        setWelcomeBonus(bonus);
        setFirstOfferId(String(offersData.offers[0]?.id ?? ""));
        setOfferLink(offersData.offers[0]?.link || "");
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <h2 className="h2-heading">
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
    </>
  );
}
