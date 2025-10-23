"use client";

import React from "react";
import Image from "next/image";
import Button from "../__common__/button/Button";
import { Offer } from "../../types/offer";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import styles from "./OfferCard.module.scss";
import { useTranslations } from "next-intl";

interface OfferCardProps {
  offer: Offer;
  priority?: boolean;
  lang?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, priority = false, lang = "en" }) => {
  const t = useTranslations();
  const currentLang = lang;

  const logoSrc = (offer as any).optimizedLogo || offer.logo;
  const geo = getProjectGeoForLang(currentLang);

  return (
    <div className={styles.offerCard}>
      <Image
        className={styles.logo}
        src={logoSrc}
        alt={offer.name}
        title={`${offer.name} in ${PROJECT_NAME} ${geo}`}
        width={160}
        height={64}
        sizes="160px"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
      <h3>{offer.name}</h3>
      <p className={styles.h4Heading}>{t("welcomeBonus")}</p>
      <p>{offer.bonuses.welcome_bonus}</p>
      <Button
        text={t("claimBonus")}
        variant="secondary"
        useNavigation={true}
        url={`/casino/${offer.id}`}
        openInNewTab
      />
    </div>
  );
};

export default OfferCard;
