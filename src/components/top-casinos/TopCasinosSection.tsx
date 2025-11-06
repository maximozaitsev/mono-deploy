"use client";

import React, { useEffect, useState } from "react";
import { Offer } from "../../types/offer";
import OfferCard from "./OfferCard";
import Button from "../__common__/button/Button";
import "./TopCasinosSection.scss";
import { useTranslations } from "next-intl";
import { fetchOffers } from "@/utils/fetchOffers";

type Props = {
  lang: string;
};

const TopCasinosSection: React.FC<Props> = ({ lang }) => {
  const [country, setCountry] = useState<string>("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const t = useTranslations();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { country, offers } = await fetchOffers();
        if (!cancelled) {
          setCountry(country);
          setOffers(offers);
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleOffers = showAll ? offers : offers.slice(0, 8);

  return (
    <section id="top-casinos-section" className="top-casinos-section section container">
      <h2 className="h2-heading">{t("topCasinos", { default: "Top Casinos" })} {country}</h2>
      <div className="offers-grid">
        {visibleOffers.map((offer, idx) => (
          <OfferCard key={offer.id} offer={offer} priority={idx < 2} lang={lang} />
        ))}
      </div>
      {!showAll && (
        <Button
          text={t("allCasino", { default: "All Casino" })}
          variant="primary"
          onClick={() => setShowAll(true)}
          useNavigation={false}
        />
      )}
    </section>
  );
};

export default TopCasinosSection;
