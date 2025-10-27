"use client";

import { useState, useEffect } from "react";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import styles from "./AppSection.module.scss";

interface AppButtonsProps {
  lang: string;
  firstOfferId: number | null;
}

export default function AppButtons({ lang, firstOfferId }: AppButtonsProps) {
  const projectGeo = getProjectGeoForLang(lang);

  const handleButtonClick = () => {
    if (firstOfferId) {
      window.open(
        `/casino/${firstOfferId}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className={styles.buttons}>
      <button onClick={handleButtonClick}>
        <img
          className={styles.googlePlay}
          src="/assets/google-play.svg"
          alt="Download on the Google Play"
          title={`${PROJECT_NAME} ${projectGeo} in Google Play`}
          loading="lazy"
        />
      </button>
      <button onClick={handleButtonClick}>
        <img
          className={styles.appStore}
          src="/assets/app-store.svg"
          alt="Download on the App Store"
          title={`${PROJECT_NAME} ${projectGeo} in App Store`}
          loading="lazy"
        />
      </button>
    </div>
  );
}
