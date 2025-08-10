"use client";

import React from "react";
import Button from "../__common__/button/Button";
import { Offer } from "../../types/offer";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import styles from "./OfferCard.module.scss";
import staticTranslations from "../../../public/content/static.json";
type StaticTranslationsMap = Record<string, Record<string, string>>;
const ST = staticTranslations as StaticTranslationsMap;
import { useState, useEffect } from "react";

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [projectGeo, setProjectGeo] = useState<string>("");
  const t = ST[currentLang] || ST["en"];
  useEffect(() => {
    const pathLang = window.location.pathname.split("/")[1];
    if (ST[pathLang]) setCurrentLang(pathLang);
    setProjectGeo(getProjectGeoForLang(pathLang));
  }, []);

  return (
    <div className={styles.offerCard}>
      <img
        src={offer.logo}
        alt={offer.name}
        title={offer.name + " in " + PROJECT_NAME + " " + projectGeo}
        width={190}
        loading="lazy"
      />
      <h3>{offer.name}</h3>
      <h4>{t.welcomeBonus}</h4>
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
