"use client";

import licenceImage from "../../../public/block-images/license.webp";
import useContentData from "../../utils/useContentData";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { useParsedSections } from "../../utils/parseSections";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import styles from "./LicensesSection.module.scss";

export default function LicensesSection() {
  const { data: content, loading, error } = useContentData();
  const { licenses } = useParsedSections(content?.sections || {});

  if (loading) return <p></p>;
  if (error) return <p>Error loading content.</p>;
  if (!licenses) return <p>Licenses section data is not available.</p>;

  return (
    <section className={`${styles.licensesSection} section`}>
      <div className="container">
        {licenses.mainTitle && (
          <h2 className={`h3-heading ${styles.headingMobile}`}>
            {licenses.mainTitle}
          </h2>
        )}

        {licenses.mainContent && licenses.mainContent.length > 0 && (
          <div className={styles.licensesContent}>
            <div className={styles.leftContent}>
              <h2 className={`h3-heading ${styles.headingDesktop}`}>
                {licenses.mainTitle}
              </h2>
              {licenses.mainContent.map((block, index) => (
                <BlockRenderer key={index} block={block} />
              ))}
            </div>
            {/* {licenses.showImage && (
              <div className={styles.rightImage}>
                <img
                  src={licenceImage.src}
                  alt={`${PROJECT_NAME} License`}
                  title={`${PROJECT_NAME} ${PROJECT_GEO} License`}
                  width={240}
                  height={240}
                  loading="lazy"
                />
              </div>
            )} */}
          </div>
        )}

        <div className={styles.licensesColumns}>
          <div className={styles.column}>
            <h3 className="h3-heading">{licenses.securityTitle}</h3>
            {licenses.securityContent.map((block, index) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>

          <div className={styles.column}>
            <h3 className="h3-heading">{licenses.softwareTitle}</h3>
            {licenses.softwareContent.map((block, index) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
