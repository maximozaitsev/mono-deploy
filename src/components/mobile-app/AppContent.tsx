"use client";

import AppImage from "../../../public/block-images/app.webp";
import AppImageMobile from "../../../public/block-images/app-mobile.webp";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import styles from "./AppSection.module.scss";

interface AppContentProps {
  firstOfferId: number | null;
  app: any;
}

const AppContent: React.FC<AppContentProps> = ({ firstOfferId, app }) => {
  return (
    <section id="mobile" className={`${styles.appSection} section`}>
      <div className="container">
        <div className={styles.topRow}>
          <div className={styles.textBlock}>
            {app.appTitle && <h3 className="h3-heading">{app.appTitle}</h3>}
            <img
              src={AppImageMobile.src}
              alt={PROJECT_NAME + " App"}
              title={PROJECT_NAME + " " + PROJECT_GEO}
              className={styles.imageMobile}
              loading="lazy"
            />
            {app.appContent.map((group: any, index: number) => (
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
            {app.languagesTitle && (
              <h3 className="h3-heading">{app.languagesTitle}</h3>
            )}
            {app.languagesContent.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
          <div className={styles.column}>
            {app.currenciesTitle && (
              <h3 className="h3-heading">{app.currenciesTitle}</h3>
            )}
            {app.currenciesContent.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppContent;
