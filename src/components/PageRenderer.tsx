import React from "react";
import ListRenderer from "@/components/__common__/renderers/ListRenderer";
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
}

export const PageRenderer: React.FC<Props> = ({ blocks }) => {
  const sections: Block[][] = [];
  let currentSection: Block[] = [];
  blocks.forEach((b) => {
    if (b.type === "heading" && b.level === 2) {
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
        {sections.map((sec, i) => (
          <div key={i} className="section">
            {sec.map((b, idx) => {
              if (b.type === "heading") {
                switch (b.level) {
                  case 1:
                    return (
                      <h1 className="h2-heading white" key={idx}>
                        {b.text}
                      </h1>
                    );
                  case 2:
                    return (
                      <h2 className="h2-heading white" key={idx}>
                        {b.text}
                      </h2>
                    );
                  case 3:
                    return (
                      <h3 className="h3-heading" key={idx}>
                        {b.text}
                      </h3>
                    );
                  case 4:
                    return (
                      <h4 className="h4-heading" key={idx}>
                        {b.text}
                      </h4>
                    );
                  default:
                    return <h5 key={idx}>{b.text}</h5>;
                }
              } else if (b.type === "paragraph") {
                if (
                  typeof b.text === "string" &&
                  /^\s*(Title|Description):/i.test(b.text)
                ) {
                  return null;
                }
                return (
                  <p
                    className="paragraph-text"
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: b.text || "" }}
                  />
                );
              } else if (b.type === "list") {
                return (
                  <ListRenderer
                    key={idx}
                    items={b.items || []}
                    styleType={b.style === "ordered" ? "ordered" : "unordered"}
                    className={`paragraph-text styled-list ${
                      b.style === "ordered" ? "ordered" : "unordered"
                    }`}
                  />
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </main>
  );
};
