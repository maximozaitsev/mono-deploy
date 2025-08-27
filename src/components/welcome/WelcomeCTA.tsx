"use client";

import { useEffect, useState } from "react";
import Button from "../__common__/button/Button";
import { fetchOffers } from "@/utils/fetchOffers";
import { useStaticT } from "@/utils/i18n";

export default function WelcomeCTA() {
  const { t } = useStaticT();
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [firstOfferId, setFirstOfferId] = useState<string>("");
  const [offerLink, setOfferLink] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const offersData = await fetchOffers();
        const first = offersData.offers?.[0];
        if (!mounted || !first) return;
        setWelcomeBonus(first.bonuses?.welcome_bonus || "");
        setFirstOfferId(String(first.id ?? ""));
        setOfferLink(first.link || "");
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <h2 className="welcome-offer">
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
