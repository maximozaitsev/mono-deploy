"use client";

import { useMemo } from "react";
import supportImage from "../../../public/block-images/support.webp";
import useContentData from "../../utils/useContentData";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import { useParams } from "next/navigation";
import styles from "./SupportSection.module.scss";

export default function SupportSection() {
  const { data, loading, error } = useContentData();
  const params = useParams();
  const currentGeo = getProjectGeoForLang(params?.lang as string);

  const supportData = useMemo(() => {
    if (!data?.support) return null;
    const supportEntries = Object.entries(data.support) as [string, any][];
    if (supportEntries.length === 0) return null;
    const [sectionTitle, blocks] = supportEntries[0];
    return { sectionTitle, blocks };
  }, [data]);

  if (loading) return null;
  if (error) return null;
  if (!supportData) return null;

  return (
    <section className={`${styles.supportSection} section`}>
      <div className="container">
        <div className={styles.supportContent}>
          <div className={styles.leftContent}>
            {supportData.sectionTitle && (
              <h2 className="h2-heading">{supportData.sectionTitle}</h2>
            )}
            {supportData.blocks.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
          <div className={styles.rightImage}>
            <img
              src={supportImage.src}
              alt={`${PROJECT_NAME} ${currentGeo} Support`}
              title={`${PROJECT_NAME} ${currentGeo} Support`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
