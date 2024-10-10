"use client";

import React, { useEffect, useState } from "react";
import { Offer } from "../../types/offer";
import OfferCard from "./OfferCard";
import Button from "../../components/__common__/button/Button";
import { fetchOffers } from "@/utils/fetchOffers";
import "./TopCasinosSection.scss";

const TopCasinosSection: React.FC = () => {
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
      <h2 className="h2-heading">Top Casinos {country}</h2>
      <div className="offers-grid">
        {visibleOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
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
