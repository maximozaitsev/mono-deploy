"use client";

import React, { useEffect, useState } from "react";
import { Offer } from "../../types/offer";
import OfferCard from "./OfferCard";
import Button from "../__common__/button/Button";
import { fetchOffers } from "@/utils/fetchOffers";
import "./TopCasinosSection.scss";
import staticTranslations from "../../../public/content/static.json";
type StaticTranslationsMap = Record<string, Record<string, string>>;
const ST = staticTranslations as StaticTranslationsMap;

const TopCasinosSection: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<string>("en");
  const t = ST[currentLang] || ST["en"];
  useEffect(() => {
    const pathLang = window.location.pathname.split("/")[1];
    if (ST[pathLang]) setCurrentLang(pathLang);
  }, []);

  const [country, setCountry] = useState<string>("");
  const [offers, setOffers] = useState<Offer[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const loadOffers = async () => {
      const { country, offers } = await fetchOffers();
      setCountry(country);
      setOffers(offers);
      // setLoading(false);
    };

    loadOffers();
  }, []);

  const visibleOffers = showAll ? offers : offers.slice(0, 8);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <section
      id="top-casinos-section"
      className="top-casinos-section section container"
    >
      <h2 className="h2-heading">
        {t.topCasinos} {country}
      </h2>
      <div className="offers-grid">
        {visibleOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
      {!showAll && (
        <Button
          text={t.allCasino}
          variant="primary"
          onClick={() => setShowAll(true)}
          useNavigation={false}
        />
      )}
    </section>
  );
};

export default TopCasinosSection;
