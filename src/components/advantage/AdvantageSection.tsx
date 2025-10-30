import styles from "./AdvantageSection.module.scss";
import { getContentData, parseAdvantageContent } from "../../utils/serverContent";
import { replaceCurrentYear } from "../../utils/yearReplacer";

export default async function AdvantageSection() {
  const contentData = await getContentData();
  const content = parseAdvantageContent(contentData);

  return (
    <section className={`${styles.advantageSection} section`}>
      <div className="container">
        <h2 className="h2-heading white">{replaceCurrentYear(content.sectionTitle || "Advantages")}</h2>

        {content.introParagraphs.length > 0 &&
          content.introParagraphs.map((group, index) => (
            <div key={index} className={styles.paragraphGroup}>
              {group.map((text, i) => (
                <p key={i} className="paragraph-text white">
                  {replaceCurrentYear(text)}
                </p>
              ))}
            </div>
          ))}

        <div className={styles.columns}>
          <div className={styles.column}>
            {content.advantagesTitle && (
              <h4 className="h4-heading white">{replaceCurrentYear(content.advantagesTitle) || content.advantagesTitle}</h4>
            )}
            <ul className="paragraph-text white">
              {content.advantagesList.map((advantage, index) => (
                <li key={index}>{replaceCurrentYear(advantage)}</li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            {content.disadvantagesTitle && (
              <h4 className="h4-heading white">{replaceCurrentYear(content.disadvantagesTitle) || content.disadvantagesTitle}</h4>
            )}
            <ul className="paragraph-text white">
              {content.disadvantagesList.map((disadvantage, index) => (
                <li key={index}>{replaceCurrentYear(disadvantage)}</li>
              ))}
            </ul>
          </div>
        </div>

        {content.closingParagraphs.length > 0 &&
          content.closingParagraphs.map((group, index) => (
            <div key={index} className={styles.paragraphGroup}>
              {group.map((text, i) => (
                <p key={i} className="paragraph-text black">
                  {replaceCurrentYear(text)}
                </p>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
