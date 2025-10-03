import styles from "./AdvantageSection.module.scss";
import { getContentData, parseAdvantageData } from "../../utils/serverContent";

interface AdvantageSectionProps {
  lang: string;
}

export default async function AdvantageSection({ lang }: AdvantageSectionProps) {
  const content = await getContentData(lang);
  const advantageData = parseAdvantageData(content);

  return (
    <section className={`${styles.advantageSection} section`}>
      <div className="container">
        <h2 className="h2-heading">{advantageData.sectionTitle || "Advantages"}</h2>

        {advantageData.introParagraphs.length > 0 &&
          advantageData.introParagraphs.map((group, index) => (
            <div key={index} className={styles.paragraphGroup}>
              {group.map((text, i) => (
                <p key={i} className="paragraph-text black">
                  {text}
                </p>
              ))}
            </div>
          ))}

        <div className={styles.columns}>
          <div className={styles.column}>
            {advantageData.advantagesTitle && <p className="h4-heading">{advantageData.advantagesTitle}</p>}
            <ul className="paragraph-text black">
              {advantageData.advantagesList.map((advantage, index) => (
                <li key={index}>{advantage}</li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            {advantageData.disadvantagesTitle && (
              <p className="h4-heading">{advantageData.disadvantagesTitle}</p>
            )}
            <ul className="paragraph-text black">
              {advantageData.disadvantagesList.map((disadvantage, index) => (
                <li key={index}>{disadvantage}</li>
              ))}
            </ul>
          </div>
        </div>

        {advantageData.closingParagraphs.length > 0 &&
          advantageData.closingParagraphs.map((group, index) => (
            <div key={index} className={styles.paragraphGroup}>
              {group.map((text, i) => (
                <p key={i} className="paragraph-text black">
                  {text}
                </p>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
