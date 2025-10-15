"use client";

import React from "react";
import Button from "../__common__/button/Button";
import { Offer } from "../../types/offer";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import { createSrcSet } from "@/utils/imageOptimization";
import styles from "./OfferCard.module.scss";

interface OfferCardProps {
  offer: Offer;
  priority?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, priority = false }) => {
  const logoSrc = (offer as any).optimizedLogo || offer.logo;
  const mobileLogoSrc = (offer as any).mobileLogo;
  const logoSizes = (offer as any).optimizedLogoSizes;
  
  // Создаем более точный srcSet с правильными размерами
  const srcSet = logoSizes ? 
    `${logoSizes.mobile} 160w, ${logoSizes.desktop} 190w, ${logoSizes.retina} 380w` : 
    undefined;

  return (
    <div className={styles.offerCard}>
      <img
        className={styles.logo}
        src={logoSrc}
        srcSet={srcSet}
        alt={offer.name}
        title={`${offer.name} in ${PROJECT_NAME} ${PROJECT_GEO}`}
        width={190}
        height={76}
        sizes="(max-width: 768px) 160px, (max-width: 1200px) 190px, 190px"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
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
