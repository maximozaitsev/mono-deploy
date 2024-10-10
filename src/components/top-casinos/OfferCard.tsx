"use client";

import React from "react";
import Image from "next/image";
import Button from "../../components/__common__/button/Button";
import { Offer } from "../../types/offer";
import styles from "./OfferCard.module.scss";

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div className={styles.offerCard}>
      <Image
        src={offer.logo}
        alt={offer.name}
        width={190}
        height={76}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <h3>{offer.name}</h3>
      <h4>Welcome bonus</h4>
      <p>{offer.bonuses.welcome_bonus}</p>
      <Button
        text="Claim Bonus"
        variant="secondary"
        useNavigation={true}
        url={`/casino/${offer.id}`}
      />
    </div>
  );
};

export default OfferCard;
