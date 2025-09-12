"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../__common__/button/Button";
import styles from "./WelcomeSection.module.scss";
import { fetchOffers } from "@/utils/fetchOffers";

export default function WelcomeSection() {
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [firstOfferId, setFirstOfferId] = useState<string>("");
  const [offerLink, setOfferLink] = useState<string>("");

  useEffect(() => {
    const fetchWelcomeBonus = async () => {
      try {
        const offersData = await fetchOffers();
        const first = offersData?.offers?.[0];

        const bonus = first?.bonuses?.welcome_bonus || "";
        setWelcomeBonus(bonus);

        setFirstOfferId(String(first?.id ?? ""));
        setOfferLink(first?.link || "");
      } catch (error) {
        console.error("Failed to fetch welcome bonus:", error);
      }
    };

    fetchWelcomeBonus();
  }, []);

  return (
    <section
      id="welcome-section"
      className={`${styles.welcomeSection} section`}
    >
      <figure className={styles.mobileFigure} aria-hidden>
        <picture>
          {/* AVIF format - лучший сжатие */}
          <source
            media="(max-width: 320px)"
            srcSet="/block-images/welcome-mobile-320.avif"
            type="image/avif"
          />
          <source
            media="(max-width: 480px)"
            srcSet="/block-images/welcome-mobile-480.avif"
            type="image/avif"
          />
          <source
            srcSet="/block-images/welcome-mobile-576.avif"
            type="image/avif"
          />
          
          {/* WebP format - хорошее сжатие */}
          <source
            media="(max-width: 320px)"
            srcSet="/block-images/welcome-mobile-320.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 480px)"
            srcSet="/block-images/welcome-mobile-480.webp"
            type="image/webp"
          />
          <source
            srcSet="/block-images/welcome-mobile-576.webp"
            type="image/webp"
          />
          
          {/* Fallback для старых браузеров */}
          <Image
            className={styles.mobileImage}
            src="/block-images/welcome-mobile-576.webp"
            alt="Welcome Mobile"
            width={576}
            height={315}
            priority
            quality={85}
            sizes="(max-width: 320px) 320px, (max-width: 480px) 480px, 576px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onLoad={() => {
              console.log('Welcome image loaded successfully');
            }}
            onError={(e) => {
              console.error('Failed to load welcome image:', e);
            }}
          />
        </picture>
      </figure>

      <div className={styles.welcomeBg}>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <h2 className={styles.offerText}>
                Exclusive welcome offer of {welcomeBonus}
              </h2>
              <h2 className={styles.bonusText}>
                Exclusive welcome bonus of {welcomeBonus}
              </h2>

              {(firstOfferId || offerLink) && (
                <Button
                  text="claim bonus"
                  variant="primary"
                  useNavigation={true}
                  url={firstOfferId ? `/casino/${firstOfferId}` : offerLink}
                  openInNewTab
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
