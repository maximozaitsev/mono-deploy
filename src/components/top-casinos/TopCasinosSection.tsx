"use client";

import React, { useEffect, useState } from "react";
import { Offer } from "../../types/offer";
import OfferCard from "./OfferCard";
import Button from "../__common__/button/Button";
import { fetchOffers } from "@/utils/fetchOffers";
import TopCasinosSkeleton from "./TopCasinosSkeleton";
import "./TopCasinosSection.scss";

const TopCasinosSection: React.FC = () => {
  const [country, setCountry] = useState<string>("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const { country, offers } = await fetchOffers();
        setCountry(country);
        setOffers(offers);
      } finally {
        setIsLoading(false);
      }
    };

    loadOffers();
  }, []);

  const visibleOffers = showAll ? offers : offers.slice(0, 8);

  if (isLoading) {
    return <TopCasinosSkeleton />;
  }

  return (
    <section
      id="top-casinos-section"
      className="top-casinos-section section container"
    >
      <h2 className="h2-heading">Top Casinos {country}</h2>
      <div className="offers-grid">
        {visibleOffers.map((offer, idx) => (
          <OfferCard key={offer.id} offer={offer} priority={idx < 2} />
        ))}
      </div>
      {!showAll && (
        <Button
          text="All Casino"
          variant="primary"
          onClick={() => setShowAll(true)}
          useNavigation={false}
        />
      )}
    </section>
  );
};

export default TopCasinosSection;
