"use client";

import React from "react";
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

function buildSrcSet(url: string): { src: string; srcSet: string } {
  try {
    const u = new URL(url);
    // Base 1x
    const oneX = new URL(u.toString());
    oneX.searchParams.set("format", "webp");
    oneX.searchParams.set("width", "160");
    oneX.searchParams.set("height", "64");
    // 2x for retina
    const twoX = new URL(u.toString());
    twoX.searchParams.set("format", "webp");
    twoX.searchParams.set("width", "320");
    twoX.searchParams.set("height", "128");
    return { src: oneX.toString(), srcSet: `${oneX.toString()} 1x, ${twoX.toString()} 2x` };
  } catch {
    return { src: url, srcSet: `${url} 1x` };
  }
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, priority = false, lang = "en" }) => {
  const t = useTranslations();
  const currentLang = lang;

  const logoBase = (offer as any).optimizedLogo || offer.logo;
  const { src: logoSrc, srcSet: logoSrcSet } = buildSrcSet(logoBase);
  const geo = getProjectGeoForLang(currentLang);

  return (
    <div className={styles.offerCard}>
      <img
        className={styles.logo}
        src={logoSrc}
        srcSet={logoSrcSet}
        alt={offer.name}
        title={`${offer.name} in ${PROJECT_NAME} ${geo}`}
        width={160}
        height={64}
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
