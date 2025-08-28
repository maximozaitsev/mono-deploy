// src/components/header/ClientHeaderControls.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { fetchOffers } from "@/utils/fetchOffers";
import { useStaticT, applyLocaleToDOM } from "@/utils/i18n";
import GlobeIcon from "@/components/__common__/Globe";
import ArrowDownIcon from "@/components/__common__/ArrowDown";
import styles from "./Header.module.scss";

interface Props {
  languages: string[];
  defaultLang: string;
  currentLang: string;
}

export default function ClientHeaderControls({
  languages = [],
  defaultLang = "en",
  currentLang = "en",
}: Props) {
  const [selectedLang, setSelectedLang] = useState(currentLang || "en");
  const selectRef = useRef<HTMLSelectElement>(null);
  const { t } = useStaticT();

  useEffect(() => {
    applyLocaleToDOM?.(selectedLang);
  }, [selectedLang]);

  useEffect(() => {
    setSelectedLang(currentLang || "en");
  }, [currentLang]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    // Сохраняем выбор до навигации, чтобы сервер сразу видел язык
    document.cookie = `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
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
      el.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          code: "ArrowDown",
          bubbles: true,
        })
      );
    } catch {}
  };

  const handleSignInClick = async () => {
    try {
      const { offers } = await fetchOffers();
      const id = offers?.[0]?.id;
      if (id) window.open(`/casino/${id}`, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening preloader:", error);
    }
  };

  return (
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
              <option value={selectedLang}>{selectedLang.toUpperCase()}</option>
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
  );
}
