import supportImage from "../../../public/block-images/support.webp";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { getContentData, parseSupportContent } from "../../utils/serverContent";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import { replaceCurrentYear } from "../../utils/yearReplacer";
import styles from "./SupportSection.module.scss";

export default async function SupportSection() {
  const contentData = await getContentData();
  const content = parseSupportContent(contentData);

  return (
    <section className={`${styles.supportSection} section`}>
      <div className="container">
        <div className={styles.supportContent}>
          <div className={styles.leftContent}>
            {content.sectionTitle && (
              <h2 className="h2-heading">{replaceCurrentYear(content.sectionTitle)}</h2>
            )}
            {content.blocks.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
          <div className={styles.rightImage}>
            <img
              src={supportImage.src}
              alt={PROJECT_NAME + " " + PROJECT_GEO + " Support"}
              title={PROJECT_NAME + " " + PROJECT_GEO + " Support"}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
