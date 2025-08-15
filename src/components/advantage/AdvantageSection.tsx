"use client";

import { useEffect, useState } from "react";
import styles from "./AdvantageSection.module.scss";

export default function AdvantageSection() {
  const [sectionTitle, setSectionTitle] = useState<string>("");
  const [introParagraphs, setIntroParagraphs] = useState<string[][]>([]);
  const [advantagesTitle, setAdvantagesTitle] = useState<string>("");
  const [advantagesList, setAdvantagesList] = useState<string[]>([]);
  const [disadvantagesTitle, setDisadvantagesTitle] = useState<string>("");
  const [disadvantagesList, setDisadvantagesList] = useState<string[]>([]);
  const [closingParagraphs, setClosingParagraphs] = useState<string[][]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const manifestRes = await fetch("/content/languages.json", {
          cache: "no-cache",
        });
        const manifest = await manifestRes.json();
        const parts = window.location.pathname.split("/").filter(Boolean);
        const first = parts[0];
        const lang =
          first &&
          manifest.languages.includes(first) &&
          first !== manifest.defaultLang
            ? first
            : manifest.defaultLang;
        const res = await fetch(`/content/content.${lang}.json`, {
          cache: "no-cache",
        });
        const data = await res.json();

        const advantagesEntries = Object.entries(data.advantages) as [
          string,
          any
        ][];
        if (advantagesEntries.length > 0) {
          const [firstKey, section] = advantagesEntries[0];
          setSectionTitle(firstKey);

          setIntroParagraphs(groupParagraphs(section, "list"));

          const headingBlocks = section.filter(
            (block: any) => block.type === "heading" && block.level === 3
          );
          const listBlocks = section.filter(
            (block: any) => block.type === "list"
          );

          if (headingBlocks.length >= 2 && listBlocks.length >= 2) {
            setAdvantagesTitle(headingBlocks[0].text);
            setAdvantagesList(listBlocks[0].items);
            setDisadvantagesTitle(headingBlocks[1].text);
            setDisadvantagesList(listBlocks[1].items);
          }

          setClosingParagraphs(
            groupParagraphs(
              section.slice(
                section.findIndex((b: any) => b.type === "list") + 2
              ),
              ""
            )
          );
        }
      } catch (error) {
        console.error("Ошибка загрузки JSON:", error);
      }
    };

    load();
  }, []);

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
