"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import Button from "../__common__/button/Button";
import styles from "./WelcomeSection.module.scss";
import { fetchOffers } from "@/utils/fetchOffers";
import { useStaticT } from "@/utils/i18n";

export default function WelcomeSection() {
  const [welcomeBonus, setWelcomeBonus] = useState("");
  const [firstOfferId, setFirstOfferId] = useState<string>("");
  const [offerLink, setOfferLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useStaticT();

  // Memoize the button URL to prevent unnecessary re-renders
  const buttonUrl = useMemo(() => {
    return firstOfferId ? `/casino/${firstOfferId}` : offerLink;
  }, [firstOfferId, offerLink]);

  // Intersection Observer for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchWelcomeBonus = async () => {
      try {
        setIsLoading(true);
        const offersData = await fetchOffers();
        const bonus = offersData.offers[0]?.bonuses.welcome_bonus || "";
        setWelcomeBonus(bonus);
        setFirstOfferId(String(offersData.offers[0]?.id ?? ""));
        setOfferLink(offersData.offers[0]?.link || "");
      } catch (error) {
        console.error("Failed to fetch welcome bonus:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWelcomeBonus();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="welcome-section"
      className={`${styles.welcomeSection} section`}
    >
      <figure className={styles.mobileFigure} aria-hidden>
        {isVisible && (
          <Image
            className={styles.mobileImage}
            src="/block-images/welcome-mobile.webp"
            alt="Welcome Mobile"
            fill
            priority
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        )}
      </figure>

      <div className={styles.welcomeBg}>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <h2 className={styles.offerText}>
                {t.exclusiveWelcomeOfferOf} {welcomeBonus}
              </h2>
              <h2 className={styles.bonusText}>
                {t.exclusiveWelcomeOfferOf} {welcomeBonus}
              </h2>
              {(firstOfferId || offerLink) && !isLoading && (
                <Button
                  text={t.claimBonus}
                  variant="primary"
                  useNavigation={true}
                  url={buttonUrl}
                  openInNewTab
                />
              )}
              {isLoading && (
                <div className="h-12 bg-gray-200 animate-pulse rounded" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
