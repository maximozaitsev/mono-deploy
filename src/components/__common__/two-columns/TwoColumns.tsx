import React from "react";
import styles from "./TwoColumns.module.scss";

export type ColumnItem = {
  type: "text" | "list";
  content: string | string[];
  style?: "unordered" | "ordered";
};

export type ColumnContent = {
  heading: string;
  items: ColumnItem[];
};

interface TwoColumnsProps {
  leftColumnContent: ColumnContent[];
  rightColumnContent: ColumnContent[];
  columnGap?: string;
}

const TwoColumns: React.FC<TwoColumnsProps> = ({
  leftColumnContent,
  rightColumnContent,
  columnGap = "64px",
}) => {
  const renderContent = (items: ColumnItem[]) => {
    return (
      <>
        {items.map((item, index) => {
          if (item.type === "text") {
            return (
              <p
                key={index}
                className="paragraph-text"
                dangerouslySetInnerHTML={{ __html: item.content as string }}
              />
            );
          } else if (item.type === "list") {
            const ListTag = item.style === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={index} className={styles["styled-list"]}>
                {(item.content as string[]).map((listItem, i) => (
                  <li
                    key={i}
                    className="paragraph-text"
                    dangerouslySetInnerHTML={{ __html: listItem }}
                  />
                ))}
              </ListTag>
            );
          }
          return null;
        })}
      </>
    );
  };

  return (
    <div className={styles["two-columns-container"]} style={{ gap: columnGap }}>
      <div className={styles.column}>
        {leftColumnContent.map((content, index) => (
          <div className={styles.innerDiv} key={index}>
            <h3 className="h3-heading">{content.heading}</h3>
            {renderContent(content.items)}
          </div>
        ))}
      </div>

      <div className={styles.column}>
        {rightColumnContent.map((content, index) => (
          <div className={styles.innerDiv} key={index}>
            <h3 className="h3-heading">{content.heading}</h3>
            {renderContent(content.items)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwoColumns;
