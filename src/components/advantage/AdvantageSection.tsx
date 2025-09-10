import styles from "./AdvantageSection.module.scss";

// Импортируем контент напрямую
import content from "../../content/content.json";

function groupParagraphs(blocks: any[], stopAtType: string) {
  const grouped: string[][] = [];
  let tempGroup: string[] = [];

  for (const block of blocks) {
    if (block.type === "paragraph") {
      tempGroup.push(block.text);
    } else if (block.type === stopAtType) {
      break;
    } else {
      if (tempGroup.length > 0) {
        grouped.push(tempGroup);
        tempGroup = [];
      }
    }
  }

  if (tempGroup.length > 0) {
    grouped.push(tempGroup);
  }

  return grouped;
}

export default function AdvantageSection() {
  // Обрабатываем данные на сервере
  const advantagesEntries = Object.entries(content.advantages) as [string, any][];
  
  let sectionTitle = "";
  let introParagraphs: string[][] = [];
  let advantagesTitle = "";
  let advantagesList: string[] = [];
  let disadvantagesTitle = "";
  let disadvantagesList: string[] = [];
  let closingParagraphs: string[][] = [];

  if (advantagesEntries.length > 0) {
    const [firstKey, section] = advantagesEntries[0];
    sectionTitle = firstKey;

    introParagraphs = groupParagraphs(section, "list");

    const headingBlocks = section.filter(
      (block: any) => block.type === "heading" && block.level === 3
    );
    const listBlocks = section.filter(
      (block: any) => block.type === "list"
    );

    if (headingBlocks.length >= 2 && listBlocks.length >= 2) {
      advantagesTitle = headingBlocks[0].text;
      advantagesList = listBlocks[0].items;
      disadvantagesTitle = headingBlocks[1].text;
      disadvantagesList = listBlocks[1].items;
    }

    closingParagraphs = groupParagraphs(
      section.slice(
        section.findIndex((b: any) => b.type === "list") + 2
      ),
      ""
    );
  }

  return (
    <section className={`${styles.advantageSection} section`}>
      <div className="container">
        <h2 className="h2-heading">{sectionTitle || "Advantages"}</h2>

        {introParagraphs.length > 0 &&
          introParagraphs.map((group, index) => (
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
            {advantagesTitle && (
              <h4 className="h4-heading">{advantagesTitle}</h4>
            )}
            <ul className="paragraph-text black">
              {advantagesList.map((advantage, index) => (
                <li key={index}>{advantage}</li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            {disadvantagesTitle && (
              <h4 className="h4-heading">{disadvantagesTitle}</h4>
            )}
            <ul className="paragraph-text black">
              {disadvantagesList.map((disadvantage, index) => (
                <li key={index}>{disadvantage}</li>
              ))}
            </ul>
          </div>
        </div>

        {closingParagraphs.length > 0 &&
          closingParagraphs.map((group, index) => (
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
