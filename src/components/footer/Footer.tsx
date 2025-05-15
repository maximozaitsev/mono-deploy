"use client";

import React, { useState, useEffect } from "react";
import Logo from "../header/Logo";
import styles from "./Footer.module.scss";

const projectName = "Gala Bingo";
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

  const logoPath = isMobile ? "/logo-mobile.svg" : "/logo.svg";

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
                    alt={`${projectName} Logo`}
                  />
                </div>
              )}
              {partnerLogos
                .slice(start, start + (start === 0 ? 7 : 5))
                .map((logo, idx) => {
                  const index = start + idx;
                  return (
                    <img
                      key={index}
                      src={logo.src}
                      alt={logo.name}
                      title={`${logo.name} in ${projectName}`}
                      className={styles.partnerLogo}
                      style={{
                        mixBlendMode:
                          hoveredLogoIndex === index ? "normal" : "luminosity",
                      }}
                      onMouseEnter={() => setHoveredLogoIndex(index)}
                      onMouseLeave={() => setHoveredLogoIndex(null)}
                      loading="lazy"
                    />
                  );
                })}
            </div>
          ))}
        </div>
        <p className={styles.copyright}>
          <span>18+</span>{" "}
          <span className={styles.hiddenSpan}>Copyright © {currentYear}</span>
          {/* &nbsp;<span>{projectName}</span> */}
          &nbsp;<span>{projectName} Casino</span>
        </p>
      </div>
    </footer>
  );
}
