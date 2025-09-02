"use client";

import React from "react";
import Logo from "../header/Logo";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import styles from "./Footer.module.scss";
import { usePathname } from "next/navigation";
import manifestData from "../../../public/content/languages.json";

type LangManifest = { languages: string[]; defaultLang: string };
const manifest = manifestData as LangManifest;

const partnerLogos = [
  { name: "MasterCard", src: "/footer-assets/master-card.svg", w: 54, h: 32 },
  { name: "Visa", src: "/footer-assets/visa.svg", w: 90, h: 32 },
  { name: "Neteller", src: "/footer-assets/neteller.svg", w: 180, h: 32 },
  { name: "Skrill", src: "/footer-assets/skrill.svg", w: 96, h: 32 },
  { name: "Bitcoin", src: "/footer-assets/btc.svg", w: 32, h: 32 },
  { name: "Litecoin", src: "/footer-assets/ltc.svg", w: 32, h: 32 },
  { name: "Ethereum", src: "/footer-assets/eth.svg", w: 32, h: 32 },
  { name: "GPWA", src: "/footer-assets/gpwa.svg", w: 90, h: 32 },
  { name: "GambleAware", src: "/footer-assets/gambleaware.svg", w: 128, h: 16 },
  { name: "GamCare", src: "/footer-assets/gamcare.svg", w: 116, h: 32 },
  { name: "Gambling-Therapy", src: "/footer-assets/gambling-therapy.svg", w: 78, h: 28 },
  { name: "Gamban", src: "/footer-assets/gamban.svg", w: 108, h: 32 },
  { name: "BetBlocker", src: "/footer-assets/betblocker.svg", w: 200, h: 32 },
  { name: "iTech-Labs", src: "/footer-assets/itech-labs.svg", w: 32, h: 32 },
  { name: "eCOGRA", src: "/footer-assets/ecogra.svg", w: 108, h: 32 },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const pathname = usePathname();
  const firstSeg = pathname?.split("/").filter(Boolean)[0] || "";
  const currentLang = manifest.languages.includes(firstSeg)
    ? firstSeg
    : manifest.defaultLang;
  const dynamicGeo = getProjectGeoForLang(currentLang);

  const scrollToWelcomeSection = () => {
    document
      .getElementById("welcome-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.partners}>
          {[0, 7, 12].map((start) => (
            <div key={start} className={styles.row}>
              {start === 0 && (
                <div className={styles.logoWrapper}>
                  <Logo
                    desktopSrc="/logo.svg"
                    mobileSrc="/logo-mobile.svg"
                    alt={`${PROJECT_NAME} Logo`}
                    onClick={scrollToWelcomeSection}
                    loading="lazy"
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
                      width={logo.w}
                      height={logo.h}
                      decoding="async"
                      className={styles.partnerLogo}
                      loading="lazy"
                      title={`${logo.name} in ${PROJECT_NAME} ${dynamicGeo}`}
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
