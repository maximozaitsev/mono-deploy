"use client";

import { useState, useEffect } from "react";
import AppImage from "../../../public/block-images/app.webp";
import AppImageMobile from "../../../public/block-images/app-mobile.webp";
import { fetchOffers } from "@/utils/fetchOffers";
import useContentData from "../../utils/useContentData";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { useParsedSections } from "../../utils/parseSections";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import styles from "./AppSection.module.scss";

export default function AppSection() {
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

  const { data: content, loading, error } = useContentData();
  const { app } = useParsedSections(content?.sections || {});

  if (loading) return <p></p>;
  if (error) return <p>Error loading content.</p>;
  if (!app) return <p>App section data is not available.</p>;

  return (
    <section id="mobile" className={`${styles.appSection} section`}>
      <div className="container">
        <div className={styles.topRow}>
          <div className={styles.textBlock}>
            {app.appTitle && (
              <h2 className="h2-heading white">{app.appTitle}</h2>
            )}
            <img
              src={AppImageMobile.src}
              alt={PROJECT_NAME + " App"}
              title={PROJECT_NAME + " " + PROJECT_GEO}
              className={styles.imageMobile}
              loading="lazy"
            />
            {app.appContent.map((group, index) => (
              <div key={index} className={styles.paragraphGroup}>
                {group.map((block: any, i: number) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
