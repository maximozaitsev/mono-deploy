"use client";

import React from "react";
import Image from "next/image";
import Button from "../__common__/button/Button";
import { Offer } from "../../types/offer";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import styles from "./OfferCard.module.scss";

interface OfferCardProps {
  offer: Offer;
  priority?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, priority = false }) => {
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
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
