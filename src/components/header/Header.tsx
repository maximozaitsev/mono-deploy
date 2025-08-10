"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { PROJECT_NAME } from "@/config/projectConfig";
import styles from "./Header.module.scss";
import { fetchOffers } from "../../utils/fetchOffers";
import GlobeIcon from "@/components/__common__/Globe";
import ArrowDown from "@/components/__common__/Arrow-down";
import staticTranslations from "../../../public/content/static.json";
import { applyLocaleToDOM } from "@/utils/i18n";

type StaticTranslationsMap = Record<string, Record<string, string>>;
const ST = staticTranslations as StaticTranslationsMap;

interface HeaderProps {
  languages: string[];
  defaultLang: string;
  currentLang: string;
}

const Header: React.FC<HeaderProps> = ({
  languages = [],
  defaultLang = "en",
  currentLang = "en",
}) => {
  const [isMobile] = useState(false);
  const [selectedLang, setSelectedLang] = useState(currentLang || "en");
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    applyLocaleToDOM(selectedLang);
  }, [selectedLang]);

  useEffect(() => {
    setSelectedLang(currentLang || "en");
  }, [currentLang]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    if (lang === defaultLang) {
      window.location.href = "/";
    } else {
      window.location.href = `/${lang}/`;
    }
  };

  const handleSignInClick = async () => {
    try {
      const { offers } = await fetchOffers();
      window.open(`/casino/${offers[0].id}`, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening preloader:", error);
    }
  };

  const openSelect = () => {
    const el = selectRef.current;
    if (!el) return;
    el.focus();
    try {
      (el as any).showPicker?.();
    } catch {}
    try {
      el.click();
    } catch {}
    try {
      const ev = new KeyboardEvent("keydown", {
        key: "ArrowDown",
        code: "ArrowDown",
        bubbles: true,
      });
      el.dispatchEvent(ev);
    } catch {}
  };

  const logoPath = isMobile ? "/logo-mobile.svg" : "/logo.svg";

  const translations = ST[selectedLang] || ST["en"];

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/">
          <Logo
            svgPath={logoPath}
            gradientIdPrefix="header"
            alt={`${PROJECT_NAME} Logo`}
            onClick={() => {}}
          />
        </Link>
        <div className={styles.spacer} />

        <div className={styles.headerButtons}>
          <div className={styles.langControl}>
            <GlobeIcon size={24} color="var(--text-color-fourth)" />
            <select
              ref={selectRef}
              id="lang-select"
              className={styles.languageSelector}
              value={selectedLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              {languages.length > 0 ? (
                languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))
              ) : (
                <option value={selectedLang}>
                  {selectedLang.toUpperCase()}
                </option>
              )}
            </select>
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                openSelect();
              }}
              onClick={(e) => {
                e.preventDefault();
                openSelect();
              }}
              className={styles.arrowWrap}
              aria-hidden
            >
              <ArrowDown size={24} />
            </div>
          </div>
          <button
            className={`${styles.headerButton} ${styles.login}`}
            onClick={handleSignInClick}
          >
            {translations.logIn}
          </button>
          <button
            className={`${styles.headerButton} ${styles.signup}`}
            onClick={handleSignInClick}
          >
            {translations.signUp}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
