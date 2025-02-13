"use client";

import { useMemo } from "react";
import Image from "next/image";
import supportImage from "../../../public/block-images/support.webp";
import styles from "./SupportSection.module.scss";
import useContentData from "../../utils/useContentData";
import BlockRenderer from "../__common__/renderers/BlockRenderer";

export default function SupportSection() {
  const { data, loading, error } = useContentData();

  const supportData = useMemo(() => {
    if (!data?.support) return null;
    const supportEntries = Object.entries(data.support) as [string, any][];
    if (supportEntries.length === 0) return null;
    const [sectionTitle, blocks] = supportEntries[0];
    return { sectionTitle, blocks };
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading content.</p>;
  if (!supportData) return <p>Support section data is not available.</p>;

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
            <Image src={supportImage} alt="Support" quality={100} />
          </div>
        </div>
      </div>
    </section>
  );
}
