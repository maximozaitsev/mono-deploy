import { getContentData, parseSectionWithTwoColumnsData } from "../../../utils/serverContent";
import TwoColumns from "../two-columns/TwoColumns";
import { replaceCurrentYear } from "../../../utils/yearReplacer";
import styles from "./SectionWithTwoColumns.module.scss";

interface SectionWithTwoColumnsProps {
  jsonKey: string;
}

export default async function SectionWithTwoColumns({
  jsonKey,
}: SectionWithTwoColumnsProps) {
  const contentData = await getContentData();
  const sectionData = parseSectionWithTwoColumnsData(contentData, jsonKey);

  const isGamesToPlayOrPromotion = jsonKey === "games-to-play" || jsonKey === "bonuses-and-promotions";
  const sectionClass = isGamesToPlayOrPromotion 
    ? `${styles.sectionContainer} ${styles.sectionWithDarkText}`
    : styles.sectionContainer;

  return (
    <section className={`${sectionClass} section`}>
      <div className="container">
        <h2 className="h2-heading">
          {replaceCurrentYear(sectionData.sectionTitle || "Section")}
        </h2>

        {sectionData.introContent.length > 0 &&
          sectionData.introContent.map((group: any, index: number) => (
            <div key={index} className={styles.paragraphGroup}>
              {group.map((block: any, i: number) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={i}
                      className="paragraph-text black"
                      dangerouslySetInnerHTML={{ __html: replaceCurrentYear(block.text ?? "") }}
                    />
                  );
                } else if (block.type === "list") {
                  const ListTag = block.style === "ordered" ? "ol" : "ul";
                  return (
                    <ListTag key={i} className="styled-list">
                      {block.items.map((item: string, itemIndex: number) => (
                        <li
                          key={itemIndex}
                          className="paragraph-text black"
                          dangerouslySetInnerHTML={{ __html: replaceCurrentYear(item) }}
                        />
                      ))}
                    </ListTag>
                  );
                }
                return null;
              })}
            </div>
          ))}

        <TwoColumns
          leftColumnContent={sectionData.leftColumnContent.map(
            (section: any) => ({
              heading: section.heading,
              items: section.items.map((block: any) => ({
                type: block.type === "list" ? "list" : "text",
                content: block.type === "list" ? block.items : block.text,
                style: block.style,
              })),
            })
          )}
          rightColumnContent={sectionData.rightColumnContent.map(
            (section: any) => ({
              heading: section.heading,
              items: section.items.map((block: any) => ({
                type: block.type === "list" ? "list" : "text",
                content: block.type === "list" ? block.items : block.text,
                style: block.style,
              })),
            })
          )}
        />
      </div>
    </section>
  );
}
