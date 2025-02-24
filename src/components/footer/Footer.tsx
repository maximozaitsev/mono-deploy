"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../header/Logo";
import styles from "./Footer.module.scss";

const projectName = "Moose Jaw";
const partnerLogos = [
  {
    mono: "/footer-assets/masterCard.svg",
    color: "/footer-assets/masterCard--color.svg",
  },
  { mono: "/footer-assets/visa.svg", color: "/footer-assets/visa--color.svg" },
  {
    mono: "/footer-assets/neteller.svg",
    color: "/footer-assets/neteller--color.svg",
  },
  {
    mono: "/footer-assets/skrill.svg",
    color: "/footer-assets/skrill--color.svg",
  },
  {
    mono: "/footer-assets/bitcoin.svg",
    color: "/footer-assets/bitcoin--color.svg",
  },
  {
    mono: "/footer-assets/litecoin.svg",
    color: "/footer-assets/litecoin--color.svg",
  },
  {
    mono: "/footer-assets/ethereum.svg",
    color: "/footer-assets/ethereum--color.svg",
  },
  { mono: "/footer-assets/gpwa.svg", color: "/footer-assets/gpwa--color.svg" },
  {
    mono: "/footer-assets/gambleaware.svg",
    color: "/footer-assets/gambleaware--color.svg",
  },
  {
    mono: "/footer-assets/gamcare.svg",
    color: "/footer-assets/gamcare--color.svg",
  },
  {
    mono: "/footer-assets/gambling-therapy.svg",
    color: "/footer-assets/gambling-therapy--color.svg",
  },
  {
    mono: "/footer-assets/gamban.svg",
    color: "/footer-assets/gamban--color.svg",
  },
  {
    mono: "/footer-assets/betblocker.svg",
    color: "/footer-assets/betblocker--color.svg",
  },
  {
    mono: "/footer-assets/itech_labs.svg",
    color: "/footer-assets/itech_labs--color.svg",
  },
  {
    mono: "/footer-assets/ecogra.svg",
    color: "/footer-assets/ecogra--color.svg",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLogoIndex, setHoveredLogoIndex] = useState<number | null>(null);

  const scrollToWelcomeSection = () => {
    document
      .getElementById("welcome-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.partners}>
          <div className={styles.row}>
            <div className={styles.logoWrapper}>
              <Logo
                svgPath="/logo.svg"
                gradientIdPrefix="footer"
                onClick={scrollToWelcomeSection}
              />
            </div>

            {partnerLogos.slice(0, 7).map((logo, index) => (
              <Image
                key={index}
                src={hoveredLogoIndex === index ? logo.color : logo.mono}
                alt={`Partner ${index + 1}`}
                width={100}
                height={32}
                className={styles.partnerLogo}
                onMouseEnter={() => setHoveredLogoIndex(index)}
                onMouseLeave={() => setHoveredLogoIndex(null)}
                style={{ width: "auto", height: "32px" }}
              />
            ))}
          </div>
          <div className={styles.row}>
            {partnerLogos.slice(7, 12).map((logo, index) => (
              <Image
                key={index + 7}
                src={hoveredLogoIndex === index + 7 ? logo.color : logo.mono}
                alt={`Partner ${index + 8}`}
                width={100}
                height={32}
                className={styles.partnerLogo}
                onMouseEnter={() => setHoveredLogoIndex(index + 7)}
                onMouseLeave={() => setHoveredLogoIndex(null)}
                style={{ width: "auto", height: "32px" }}
              />
            ))}
          </div>
          <div className={styles.row}>
            {partnerLogos.slice(12, 15).map((logo, index) => (
              <Image
                key={index + 12}
                src={hoveredLogoIndex === index + 12 ? logo.color : logo.mono}
                alt={`Partner ${index + 13}`}
                width={100}
                height={32}
                className={styles.partnerLogo}
                onMouseEnter={() => setHoveredLogoIndex(index + 12)}
                onMouseLeave={() => setHoveredLogoIndex(null)}
                style={{ width: "auto", height: "32px" }}
              />
            ))}
          </div>
        </div>
        <p className={styles.copyright}>
          <span>18+</span>{" "}
          <span className={styles.hiddenSpan}>Copyright © {currentYear}</span>
          &nbsp;<span>{projectName} Casino</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
