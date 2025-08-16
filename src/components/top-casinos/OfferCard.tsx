"use client";

import React from "react";
import Image from "next/image";
import Button from "../__common__/button/Button";
import { Offer } from "../../types/offer";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import styles from "./OfferCard.module.scss";
import { useStaticT } from "@/utils/i18n";

interface OfferCardProps {
  offer: Offer;
  priority?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, priority = false }) => {
  const { t } = useStaticT();

  const logoSrc = (offer as any).optimizedLogo || offer.logo;

  return (
    <div className={styles.offerCard}>
      <Image
        className={styles.logo}
        src={logoSrc}
        alt={offer.name}
        title={`${offer.name} in ${PROJECT_NAME} ${PROJECT_GEO}`}
        width={160}
        height={64}
        sizes="160px"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
      <h3>{offer.name}</h3>
      <p className={styles.h4heading}>{t.welcomeBonus}</p>
      <p>{offer.bonuses.welcome_bonus}</p>
      <Button
        text={t.claimBonus}
        variant="secondary"
        useNavigation={true}
        url={`/casino/${offer.id}`}
        openInNewTab
      />
    </div>
  );
};

export default OfferCard;
