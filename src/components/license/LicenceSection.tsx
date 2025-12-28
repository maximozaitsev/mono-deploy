import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { getContentData, parseLicenseContent } from "../../utils/serverContent";
import { replaceCurrentYear } from "../../utils/yearReplacer";
import styles from "./LicenceSection.module.scss";

interface LicenceSectionProps {
  lang: string;
}

export default async function LicenceSection({ lang }: LicenceSectionProps) {
  const contentData = await getContentData(lang);
  const content = parseLicenseContent(contentData);

  if (!content.title || !content.content || content.content.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.licensesSection} section`}>
      <div className="container">
        <h3 className={`h3-heading ${styles.heading}`}>
          {replaceCurrentYear(content.title)}
        </h3>
        <div className={styles.content}>
          {content.content.map((block: any, index: number) => (
            <BlockRenderer key={index} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}

