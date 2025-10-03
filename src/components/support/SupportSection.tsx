import supportImage from "../../../public/block-images/support.webp";
import { getContentData, parseSupportData, getProjectGeo } from "../../utils/serverContent";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { PROJECT_NAME } from "@/config/projectConfig";
import styles from "./SupportSection.module.scss";

interface SupportSectionProps {
  lang: string;
}

export default async function SupportSection({ lang }: SupportSectionProps) {
  const content = await getContentData(lang);
  const supportData = parseSupportData(content);

  if (!supportData) return null;

  const currentGeo = getProjectGeo(lang);

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
