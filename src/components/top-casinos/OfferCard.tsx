"use client";

import React from "react";
import Button from "../__common__/button/Button";
import { Offer } from "../../types/offer";
import styles from "./OfferCard.module.scss";

const projectName = "Baba Ijebu";

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div className={styles.offerCard}>
      <img
        src={offer.logo}
        alt={offer.name}
        title={offer.name + " in " + projectName}
        width={190}
        loading="lazy"
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
