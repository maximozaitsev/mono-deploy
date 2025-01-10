"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../header/Logo";
import { content } from "@/content/content";
import styles from "./Footer.module.scss";

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

  const renderLogos = (logos: typeof partnerLogos, startIndex: number) =>
    logos.map((logo, index) => (
      <Image
        key={index + startIndex}
        src={hoveredLogoIndex === index + startIndex ? logo.color : logo.mono}
        alt={`Partner ${index + startIndex + 1}`}
        width={100}
        height={32}
        className={styles.partnerLogo}
        onMouseEnter={() => setHoveredLogoIndex(index + startIndex)}
        onMouseLeave={() => setHoveredLogoIndex(null)}
        style={{ width: "auto", height: "32px" }}
      />
    ));

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.partners}>
          <div className={styles.row}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoBg}></div>
              <Logo
                onClick={() =>
                  document
                    .getElementById("welcome-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              />
            </div>
            {renderLogos(partnerLogos.slice(0, 7), 0)}
          </div>
          <div className={styles.row}>
            {renderLogos(partnerLogos.slice(7, 12), 7)}
          </div>
          <div className={styles.row}>
            {renderLogos(partnerLogos.slice(12, 15), 12)}
          </div>
        </div>
        <p className={styles.copyright}>
          <span>18+</span>{" "}
          <span className={styles.hiddenSpan}>
            Copyright &copy; {currentYear}
          </span>{" "}
          <span>&nbsp;{content.projectName}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
