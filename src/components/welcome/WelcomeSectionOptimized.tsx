"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../__common__/button/Button";
import { fetchOffers } from "@/utils/fetchOffers";

// Inline critical CSS for maximum performance
const criticalCSS = `
  .welcome-section-optimized {
    background: #1e1e20;
    margin-bottom: 140px;
    width: 100%;
  }
  .welcome-mobile-figure {
    display: none;
    margin: 0;
    width: 100%;
    text-align: center;
    min-height: 200px;
    aspect-ratio: 3 / 2;
    contain: layout style paint;
  }
  .welcome-mobile-image {
    display: inline-block;
    width: 100vw;
    max-width: 400px;
    height: auto;
    will-change: auto;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
  .welcome-bg {
    display: flex;
    justify-content: center;
    width: 100%;
    background-image: url("/block-images/welcome.webp");
    background-repeat: no-repeat;
    background-position: right 110px center;
    max-width: 90rem;
    margin: 0 auto;
    height: 540px;
  }
  .welcome-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    position: relative;
    z-index: 1;
    max-width: 72.5rem;
  }
  .welcome-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 48px;
    width: 410px;
    max-width: 50%;
  }
  .welcome-text h2 {
    font-family: var(--font-secondary);
    color: #ffffff;
    font-size: 32px;
    font-weight: 900;
    line-height: normal;
    text-transform: uppercase;
  }
  @media (max-width: 768px) {
    .welcome-section-optimized {
      margin-bottom: 62px;
    }
    .welcome-mobile-figure {
      display: block;
    }
    .welcome-bg {
      height: auto;
      justify-content: flex-end;
      background-image: none;
      margin: 0 auto 24px auto;
    }
    .welcome-text {
      width: 100%;
      max-width: 100%;
      gap: 24px;
      align-items: center;
      text-align: center;
    }
    .welcome-text h2 {
      font-size: 24px;
    }
  }
`;

export default function WelcomeSectionOptimized() {
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
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      <section id="welcome-section" className="welcome-section-optimized section">
        <figure className="welcome-mobile-figure" aria-hidden>
          <Image
            className="welcome-mobile-image"
            src="/block-images/welcome-mobile.webp"
            alt="Welcome Mobile"
            width={400}
            height={267}
            priority
            quality={60}
            sizes="(max-width: 768px) 100vw, 400px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            decoding="sync"
            loading="eager"
            fetchPriority="high"
          />
        </figure>

        <div className="welcome-bg">
          <div className="container">
            <div className="welcome-content">
              <div className="welcome-text">
                <h2 className="offer-text">
                  Exclusive welcome offer of {welcomeBonus}
                </h2>
                <h2 className="bonus-text" style={{ display: 'none' }}>
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
    </>
  );
}
