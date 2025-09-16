"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../header/Logo";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import styles from "./Footer.module.scss";

const partnerLogos = [
  { name: "MasterCard", src: "/footer-assets/master-card.svg" },
  { name: "Visa", src: "/footer-assets/visa.svg" },
  { name: "Neteller", src: "/footer-assets/neteller.svg" },
  { name: "Skrill", src: "/footer-assets/skrill.svg" },
  { name: "Bitcoin", src: "/footer-assets/btc.svg" },
  { name: "Litecoin", src: "/footer-assets/ltc.svg" },
  { name: "Ethereum", src: "/footer-assets/eth.svg" },
  { name: "GPWA", src: "/footer-assets/gpwa.svg" },
  { name: "GambleAware", src: "/footer-assets/gambleaware.svg" },
  { name: "GamCare", src: "/footer-assets/gamcare.svg" },
  { name: "Gambling-Therapy", src: "/footer-assets/gambling-therapy.svg" },
  { name: "Gamban", src: "/footer-assets/gamban.svg" },
  { name: "BetBlocker", src: "/footer-assets/betblocker.svg" },
  { name: "iTech-Labs", src: "/footer-assets/itech-labs.svg" },
  { name: "eCOGRA", src: "/footer-assets/ecogra.svg" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoveredLogoIndex, setHoveredLogoIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToWelcomeSection = () => {
    document
      .getElementById("welcome-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const logoPath = isMobile ? "/logo-footer-mobile.svg" : "/logo-footer.svg";

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.partners}>
          {[0, 7, 12].map((start) => (
            <div key={start} className={styles.row}>
              {start === 0 && (
                <div className={styles.logoWrapper}>
                  <Logo
                    svgPath={logoPath}
                    gradientIdPrefix="footer"
                    onClick={scrollToWelcomeSection}
                    alt={`${PROJECT_NAME} Logo`}
                  />
                </div>
              )}
              {partnerLogos
                .slice(start, start + (start === 0 ? 7 : 5))
                .map((logo, idx) => {
                  const index = start + idx;
                  const sizeMap: Record<
                    string,
                    { w: number; h: number; wm: number; hm: number }
                  > = {
                    MasterCard: { w: 54, h: 32, wm: 38, hm: 22 },
                    Visa: { w: 96, h: 32, wm: 66, hm: 22 },
                    Neteller: { w: 180, h: 32, wm: 124, hm: 22 },
                    Skrill: { w: 96, h: 32, wm: 66, hm: 22 },
                    Bitcoin: { w: 32, h: 32, wm: 22, hm: 22 },
                    Litecoin: { w: 32, h: 32, wm: 22, hm: 22 },
                    Ethereum: { w: 32, h: 32, wm: 22, hm: 22 },
                    GPWA: { w: 90, h: 32, wm: 62, hm: 22 },
                    GambleAware: { w: 128, h: 16, wm: 94, hm: 12 },
                    GamCare: { w: 116, h: 32, wm: 80, hm: 22 },
                    "Gambling-Therapy": { w: 78, h: 28, wm: 56, hm: 20 },
                    Gamban: { w: 108, h: 32, wm: 74, hm: 22 },
                    BetBlocker: { w: 200, h: 32, wm: 138, hm: 22 },
                    "iTech-Labs": { w: 32, h: 32, wm: 22, hm: 22 },
                    eCOGRA: { w: 108, h: 32, wm: 74, hm: 22 },
                  };
                  const s = sizeMap[logo.name] ?? {
                    w: 96,
                    h: 32,
                    wm: 80,
                    hm: 24,
                  };
                  return (
                    <Image
                      key={index}
                      src={logo.src}
                      alt={logo.name}
                      title={`${logo.name} in ${PROJECT_NAME} ${PROJECT_GEO}`}
                      className={styles.partnerLogo}
                      style={{
                        mixBlendMode:
                          hoveredLogoIndex === index ? "normal" : "luminosity",
                      }}
                      onMouseEnter={() => setHoveredLogoIndex(index)}
                      onMouseLeave={() => setHoveredLogoIndex(null)}
                      width={isMobile ? s.wm : s.w}
                      height={isMobile ? s.hm : s.h}
                      quality={100}
                    />
                  );
                })}
            </div>
          ))}
        </div>
        <p className={styles.copyright}>
          <span>18+</span>{" "}
          <span className={styles.hiddenSpan}>Copyright © {currentYear}</span>
          &nbsp;<span>{PROJECT_NAME}</span>
          {/* &nbsp;<span>{PROJECT_NAME} Casino</span> */}
        </p>
      </div>
    </footer>
  );
}
