"use client";

import React, { useEffect, useState, useRef } from "react";
import { PROJECT_NAME } from "@/config/projectConfig";
import { fetchOffers } from "../../utils/fetchOffers";
import { useStaticT, applyLocaleToDOM } from "@/utils/i18n";
import Logo from "./Logo";
import GlobeIcon from "@/components/__common__/Globe";
import ArrowDownIcon from "@/components/__common__/ArrowDown";

import styles from "./Header.module.scss";

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
  const [selectedLang, setSelectedLang] = useState(currentLang || "en");
  const selectRef = useRef<HTMLSelectElement>(null);

  const { t } = useStaticT();

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

  const handleSignInClick = async () => {
    try {
      const { offers } = await fetchOffers();
      window.open(`/casino/${offers[0].id}`, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening preloader:", error);
    }
  };

  const scrollToWelcomeSection = () => {
    const el = document.getElementById("welcome-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <button
          type="button"
          onClick={scrollToWelcomeSection}
          className={styles.logoButton}
          aria-label={`${PROJECT_NAME} Logo - Scroll to welcome section`}
          style={{ background: "none", border: "none" }}
        >
          <Logo
            desktopSrc="/logo.svg"
            mobileSrc="/logo-mobile.svg"
            alt={`${PROJECT_NAME} Logo`}
            onClick={() => {}}
          />
        </button>

        <div className={styles.headerButtons}>
          <div className={styles.langControl}>
            <GlobeIcon size={24} color="var(--text-color-fourth)" />
            <div className={styles.langPicker}>
              <select
                ref={selectRef}
                className={styles.languageSelector}
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                aria-label="Language"
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
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="Open language menu"
                onMouseDown={(e) => {
                  e.preventDefault();
                  openSelect();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  openSelect();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openSelect();
                  }
                }}
              >
                <ArrowDownIcon size={24} color="var(--text-color-fourth)" />
              </button>
            </div>
          </div>
          <button
            className={`${styles.headerButton} ${styles.login}`}
            onClick={handleSignInClick}
          >
            {t.logIn}
          </button>
          <button
            className={`${styles.headerButton} ${styles.signup}`}
            onClick={handleSignInClick}
          >
            {t.signUp}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
