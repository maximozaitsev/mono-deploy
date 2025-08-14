import React from "react";
import { PROJECT_NAME } from "@/config/projectConfig";
import ListRenderer from "@/components/__common__/renderers/ListRenderer";
import TwoColumns, {
  ColumnItem,
  ColumnContent,
} from "@/components/__common__/two-columns/TwoColumns";
import styles from "./PageRenderer.module.scss";

export interface Block {
  type: string;
  level?: number;
  text?: string;
  style?: string;
  items?: string[];
}

interface Props {
  blocks: Block[];
  pageKey?: string;
}

export const PageRenderer: React.FC<Props> = ({ blocks, pageKey }) => {
  const sections: Block[][] = [];
  let currentSection: Block[] = [];
  blocks.forEach((b) => {
    if (b.type === "heading" && (b.level === 1 || b.level === 2)) {
      if (currentSection.length) sections.push(currentSection);
      currentSection = [b];
    } else {
      currentSection.push(b);
    }
  });
  if (currentSection.length) sections.push(currentSection);

  return (
    <main className={styles.renderer}>
      <div className="container">
        {sections.map((sec, i) => {
          const titleBlock = sec[0];
          const restBlocks = sec.slice(1);

          const subSections: Array<{ heading: string; items: Block[] }> = [];
          let currentSubSection: { heading: string; items: Block[] } | null =
            null;

          restBlocks.forEach((block) => {
            if (block.type === "heading" && block.level === 3) {
              if (currentSubSection) subSections.push(currentSubSection);
              currentSubSection = { heading: block.text || "", items: [] };
            } else {
              if (!currentSubSection) {
                currentSubSection = { heading: "", items: [] };
              }
              currentSubSection.items.push(block);
            }
          });
          if (currentSubSection) subSections.push(currentSubSection);

          let introItems: Block[] = [];
          if (subSections[0] && subSections[0].heading === "") {
            introItems = subSections[0].items;
            subSections.shift();
          }

          if (subSections.length >= 4) {
            const half = Math.ceil(subSections.length / 2);
            const leftSubSections = subSections.slice(0, half);
            const rightSubSections = subSections.slice(half);

            const transformSubSections = (
              subs: typeof subSections
            ): ColumnContent[] =>
              subs.map(({ heading, items }) => ({
                heading,
                items: items.map(
                  (block): ColumnItem => ({
                    type: block.type === "list" ? "list" : "text",
                    content: block.type === "list" ? block.items! : block.text!,
                    style: (block.style === "ordered"
                      ? "ordered"
                      : "unordered") as "ordered" | "unordered",
                  })
                ),
              }));

            return (
              <div key={i} className="section">
                {titleBlock.level === 1 ? (
                  <h1 className="h2-heading white">
                    {`${PROJECT_NAME} ${pageKey ?? ""}`.trim()}
                  </h1>
                ) : (
                  <h2 className="h2-heading white">{titleBlock.text}</h2>
                )}
                {introItems.map((b, idx) => {
                  if (b.type === "paragraph") {
                    return (
                      <p
                        key={idx}
                        className="paragraph-text"
                        dangerouslySetInnerHTML={{ __html: b.text! }}
                      />
                    );
                  } else if (b.type === "list") {
                    return (
                      <ListRenderer
                        key={idx}
                        items={b.items!}
                        styleType={
                          b.style === "ordered" ? "ordered" : "unordered"
                        }
                        className="paragraph-text styled-list"
                      />
                    );
                  }
                  return null;
                })}
                <TwoColumns
                  leftColumnContent={transformSubSections(leftSubSections)}
                  rightColumnContent={transformSubSections(rightSubSections)}
                />
              </div>
            );
          } else {
            return (
              <div key={i} className="section">
                {titleBlock.level === 1 ? (
                  <h1 className="h2-heading white">
                    {`${PROJECT_NAME} ${pageKey ?? ""}`.trim()}
                  </h1>
                ) : (
                  <h2 className="h2-heading white">{titleBlock.text}</h2>
                )}
                {introItems.map((b, idx) => {
                  if (b.type === "paragraph") {
                    return (
                      <p
                        key={idx}
                        className="paragraph-text"
                        dangerouslySetInnerHTML={{ __html: b.text! }}
                      />
                    );
                  } else if (b.type === "list") {
                    return (
                      <ListRenderer
                        key={idx}
                        items={b.items!}
                        styleType={
                          b.style === "ordered" ? "ordered" : "unordered"
                        }
                        className="paragraph-text styled-list"
                      />
                    );
                  }
                  return null;
                })}
                {subSections.map(({ heading, items }, subIdx) => (
                  <React.Fragment key={subIdx}>
                    {heading && <h3 className="h3-heading">{heading}</h3>}
                    {items.map((block, idx) => {
                      if (block.type === "paragraph") {
                        return (
                          <p
                            key={idx}
                            className="paragraph-text"
                            dangerouslySetInnerHTML={{
                              __html: block.text || "",
                            }}
                          />
                        );
                      } else if (block.type === "list") {
                        return (
                          <ListRenderer
                            key={idx}
                            items={block.items || []}
                            styleType={
                              block.style === "ordered"
                                ? "ordered"
                                : "unordered"
                            }
                            className="paragraph-text styled-list"
                          />
                        );
                      }
                      return null;
                    })}
                  </React.Fragment>
                ))}
              </div>
            );
          }
        })}
      </div>
    </main>
  );
};
