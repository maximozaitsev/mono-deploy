"use client";

import React, { useState, useMemo } from "react";
import { Offer } from "../../types/offer";
import OfferCard from "./OfferCard";
import Button from "../__common__/button/Button";
import { useOffers } from "@/contexts/OffersContext";
import "./TopCasinosSection.scss";

const TopCasinosSection: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const { data: offersData } = useOffers();

  const country = offersData?.country || "";
  const offers = offersData?.offers || [];
  
  const visibleOffers = useMemo(() => {
    return showAll ? offers : offers.slice(0, 8);
  }, [showAll, offers]);

  return (
    <section
      id="top-casinos-section"
      className="top-casinos-section section container"
    >
      <h2 className="h2-heading">Top Casinos {country}</h2>
      <div className="offers-grid">
        {visibleOffers.map((offer, idx) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            priority={idx < 2}
          />
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
