"use client";

import React from "react";
import Image from "next/image";
import Button from "../__common__/button/Button";
import { Offer } from "../../types/offer";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import { imageOptimizations, responsiveSizes } from "../../utils/imageOptimization";
import styles from "./OfferCard.module.scss";

interface OfferCardProps {
  offer: Offer;
  priority?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, priority = false }) => {
  // Use optimized logo URL
  const logoSrc = (offer as any).optimizedLogo || imageOptimizations.offerLogo(offer.logo);

  return (
    <div className={styles.offerCard}>
      <Image
        className={styles.logo}
        src={logoSrc}
        alt={offer.name}
        title={`${offer.name} in ${PROJECT_NAME} ${PROJECT_GEO}`}
        width={190}
        height={76}
        sizes={responsiveSizes.offerCard}
        priority={priority}
        quality={85}
      />
      <h3>{offer.name}</h3>
      <h4>Welcome bonus</h4>
      <p>{offer.bonuses.welcome_bonus}</p>
      <Button
        text="Claim Bonus"
        variant="secondary"
        useNavigation={true}
        url={`/casino/${offer.id}`}
        openInNewTab
      />
    </div>
  );
};

export default OfferCard;
