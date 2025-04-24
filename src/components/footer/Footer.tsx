"use client";

import React, { useState, useEffect } from "react";
import Logo from "../header/Logo";
import styles from "./Footer.module.scss";

const projectName = "Hyper Casino";
const partnerLogos = [
  { color: "/footer-assets/master-card.svg" },
  { color: "/footer-assets/visa.svg" },
  { color: "/footer-assets/neteller.svg" },
  { color: "/footer-assets/skrill.svg" },
  { color: "/footer-assets/btc.svg" },
  { color: "/footer-assets/ltc.svg" },
  { color: "/footer-assets/eth.svg" },
  { color: "/footer-assets/gpwa.svg" },
  { color: "/footer-assets/gambleaware.svg" },
  { color: "/footer-assets/gamcare.svg" },
  { color: "/footer-assets/gambling-therapy.svg" },
  { color: "/footer-assets/gamban.svg" },
  { color: "/footer-assets/betblocker.svg" },
  { color: "/footer-assets/itech-labs.svg" },
  { color: "/footer-assets/ecogra.svg" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLogoIndex, setHoveredLogoIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

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
          <div className={styles.row}>
            <div className={styles.logoWrapper}>
              <Logo
                svgPath={logoPath}
                gradientIdPrefix="footer"
                onClick={scrollToWelcomeSection}
                alt={`${projectName} Logo`}
              />
            </div>
            {partnerLogos.slice(0, 7).map((logo, index) => (
              <img
                key={index}
                src={logo.color}
                alt={`Partner ${index + 1}`}
                className={styles.partnerLogo}
                style={{
                  mixBlendMode:
                    hoveredLogoIndex === index ? "normal" : "luminosity",
                }}
                onMouseEnter={() => setHoveredLogoIndex(index)}
                onMouseLeave={() => setHoveredLogoIndex(null)}
                loading="lazy"
              />
            ))}
          </div>
          <div className={styles.row}>
            {partnerLogos.slice(7, 12).map((logo, index) => {
              const logoIndex = index + 7;
              return (
                <img
                  key={logoIndex}
                  src={logo.color}
                  alt={`Partner ${logoIndex + 1}`}
                  className={styles.partnerLogo}
                  style={{
                    mixBlendMode:
                      hoveredLogoIndex === logoIndex ? "normal" : "luminosity",
                  }}
                  onMouseEnter={() => setHoveredLogoIndex(logoIndex)}
                  onMouseLeave={() => setHoveredLogoIndex(null)}
                  loading="lazy"
                />
              );
            })}
          </div>
          <div className={styles.row}>
            {partnerLogos.slice(12, 15).map((logo, index) => {
              const logoIndex = index + 12;
              return (
                <img
                  key={logoIndex}
                  src={logo.color}
                  alt={`Partner ${logoIndex + 1}`}
                  className={styles.partnerLogo}
                  style={{
                    mixBlendMode:
                      hoveredLogoIndex === logoIndex ? "normal" : "luminosity",
                  }}
                  onMouseEnter={() => setHoveredLogoIndex(logoIndex)}
                  onMouseLeave={() => setHoveredLogoIndex(null)}
                  loading="lazy"
                />
              );
            })}
          </div>
        </div>
        <p className={styles.copyright}>
          <span>18+</span>{" "}
          <span className={styles.hiddenSpan}>Copyright © {currentYear}</span>
          &nbsp;<span>{projectName}</span>
          {/* &nbsp;<span>{projectName} Casino</span> */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
