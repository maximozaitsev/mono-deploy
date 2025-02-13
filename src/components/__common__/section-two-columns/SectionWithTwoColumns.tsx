"use client";

import { useEffect, useState } from "react";
import TwoColumns from "../two-columns/TwoColumns";
import styles from "./SectionWithTwoColumns.module.scss";

interface SectionWithTwoColumnsProps {
  jsonKey: string;
}

export default function SectionWithTwoColumns({
  jsonKey,
}: SectionWithTwoColumnsProps) {
  const [sectionTitle, setSectionTitle] = useState<string>("");
  const [introContent, setIntroContent] = useState<string[][]>([]);
  const [leftColumnContent, setLeftColumnContent] = useState<any[]>([]);
  const [rightColumnContent, setRightColumnContent] = useState<any[]>([]);

  useEffect(() => {
    import("../../../content/content.json")
      .then((data) => {
        const sectionData = data[jsonKey];
        if (!sectionData) {
          console.error(`Ошибка: ключ "${jsonKey}" отсутствует в JSON`);
          return;
        }
        const sectionEntries = Object.entries(sectionData) as [string, any][];

        if (sectionEntries.length > 0) {
          const [firstKey, section] = sectionEntries[0];
          setSectionTitle(firstKey);

          const firstH3Index = section.findIndex(
            (block: any) => block.type === "heading" && block.level === 3
          );

          const introBlocks =
            firstH3Index !== -1 ? section.slice(0, firstH3Index) : section;
          setIntroContent(groupParagraphs(introBlocks));

          const h3Sections = section
            .slice(firstH3Index)
            .reduce((acc: any[], block: any) => {
              if (block.type === "heading" && block.level === 3) {
                acc.push({ heading: block.text, items: [] });
              } else if (acc.length > 0) {
                acc[acc.length - 1].items.push(block);
              }
              return acc;
            }, []);

          const midIndex = Math.ceil(h3Sections.length / 2);
          setLeftColumnContent(h3Sections.slice(0, midIndex));
          setRightColumnContent(h3Sections.slice(midIndex));
        }
      })
      .catch((error) => console.error("Ошибка загрузки JSON:", error));
  }, [jsonKey]);

  function groupParagraphs(blocks: any[]): string[][] {
    const grouped: string[][] = [];
    let tempGroup: string[] = [];

    for (const block of blocks) {
      if (block.type === "paragraph") {
        tempGroup.push(block.text);
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

  return (
    <section className={`${styles.sectionContainer} section `}>
      <div className="container">
        {sectionTitle && <h2 className="h2-heading white">{sectionTitle}</h2>}

        {introContent.length > 0 &&
          introContent.map((group, index) => (
            <div key={index} className={styles.paragraphGroup}>
              {group.map((text, i) => (
                <p
                  key={i}
                  className="paragraph-text"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ))}
            </div>
          ))}

        <TwoColumns
          leftColumnContent={leftColumnContent.map((section) => ({
            heading: section.heading,
            items: section.items.map((block: any) => ({
              type: block.type === "list" ? "list" : "text",
              content: block.type === "list" ? block.items : block.text,
              style: block.style,
            })),
          }))}
          rightColumnContent={rightColumnContent.map((section) => ({
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
