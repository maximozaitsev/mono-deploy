"use client";

import { useState, useEffect } from "react";
import AppImage from "../../../public/block-images/app.webp";
import AppImageMobile from "../../../public/block-images/app-mobile.webp";
import { fetchOffers } from "@/utils/fetchOffers";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import styles from "./AppSection.module.scss";

interface AppSectionProps {
  content: any;
}

export default function AppSection({ content }: AppSectionProps) {
  const [firstOfferId, setFirstOfferId] = useState<number | null>(null);

  useEffect(() => {
    fetchOffers()
      .then(({ offers }) => {
        if (offers.length > 0) {
          setFirstOfferId(offers[0].id);
        }
      })
      .catch((error) => console.error("Error fetching first offer ID:", error));
  }, []);

  return (
    <section id="mobile" className={`${styles.appSection} section`}>
      <div className="container">
        <div className={styles.topRow}>
          <div className={styles.textBlock}>
            {content.appTitle && (
              <h3 className="h3-heading">{content.appTitle}</h3>
            )}
            <img
              src={AppImageMobile.src}
              alt={PROJECT_NAME + " App"}
              title={PROJECT_NAME + " " + PROJECT_GEO}
              className={styles.imageMobile}
              loading="lazy"
              width={496}
              height={210}
            />
            {content.appContent.map((group: any, index: number) => (
              <div key={index} className={styles.paragraphGroup}>
                {group.map((block: any, i: number) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            ))}
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  if (firstOfferId) {
                    window.open(
                      `/casino/${firstOfferId}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                }}
              >
                <img
                  className={styles.googlePlay}
                  src="/assets/google-play.svg"
                  alt="Download on the Google Play"
                  title={PROJECT_NAME + " " + PROJECT_GEO + " in Google Play"}
                  loading="lazy"
                />
              </button>
              <button
                onClick={() => {
                  if (firstOfferId) {
                    window.open(
                      `/casino/${firstOfferId}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                }}
              >
                <img
                  className={styles.appStore}
                  src="/assets/app-store.svg"
                  alt="Download on the App Store"
                  title={PROJECT_NAME + " " + PROJECT_GEO + " in App Store"}
                  loading="lazy"
                />
              </button>
            </div>
          </div>
          <div className={styles.imageBlock}>
            <img
              src={AppImage.src}
              alt={PROJECT_NAME + " " + PROJECT_GEO + " App"}
              title={PROJECT_NAME + " " + PROJECT_GEO + " Mobile"}
              className={styles.image}
              loading="lazy"
            />
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            {content.languagesTitle && (
              <h3 className="h3-heading">{content.languagesTitle}</h3>
            )}
            {content.languagesContent.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
          <div className={styles.column}>
            {content.currenciesTitle && (
              <h3 className="h3-heading">{content.currenciesTitle}</h3>
            )}
            {content.currenciesContent.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
