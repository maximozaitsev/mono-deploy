import TwoColumns from "../two-columns/TwoColumns";
import { getContentData, parseSectionWithTwoColumnsData } from "../../../utils/serverContent";
import { replaceCurrentYear } from "../../../utils/yearReplacer";
import styles from "./SectionWithTwoColumns.module.scss";

interface SectionWithTwoColumnsProps {
  jsonKey: string;
  lang: string;
}

export default async function SectionWithTwoColumns({
  jsonKey,
  lang,
}: SectionWithTwoColumnsProps) {
  const content = await getContentData(lang);
  const sectionData = parseSectionWithTwoColumnsData(content, jsonKey);

  return (
    <section className={`${styles.sectionContainer} section`}>
      <div className="container">
        <h2 className="h2-heading white">{replaceCurrentYear(sectionData.sectionTitle || "Section")}</h2>

        {sectionData.introContent.length > 0 &&
          sectionData.introContent.map((group, index) => (
            <div key={index} className={styles.paragraphGroup}>
              {group.map((text, i) => (
                <p
                  key={i}
                  className="paragraph-text"
                  dangerouslySetInnerHTML={{ __html: replaceCurrentYear(text) }}
                />
              ))}
            </div>
          ))}

        <TwoColumns
          leftColumnContent={sectionData.leftColumnContent.map((section: any) => ({
            heading: section.heading,
            items: section.items.map((block: any) => ({
              type: block.type === "list" ? "list" : "text",
              content: block.type === "list" ? block.items : block.text,
              style: block.style,
            })),
          }))}
          rightColumnContent={sectionData.rightColumnContent.map((section: any) => ({
            heading: section.heading,
            items: section.items.map((block: any) => ({
              type: block.type === "list" ? "list" : "text",
              content: block.type === "list" ? block.items : block.text,
              style: block.style,
            })),
          }))}
        />
      </div>
    </section>
  );
}
