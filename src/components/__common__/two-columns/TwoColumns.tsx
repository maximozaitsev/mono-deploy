import React from "react";
import styles from "./TwoColumns.module.scss";
import List from "../list/List";

type ColumnItem = {
  type: "text" | "list" | "additionalText";
  content: string | string[];
};

type ColumnContent = {
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
    return items.map((item, index) => {
      switch (item.type) {
        case "text":
          return (
            <p key={index} className="paragraph-text">
              {item.content as string}
            </p>
          );
        case "list":
          return <List key={index} items={item.content as string[]} />;
        case "additionalText":
          return (
            <p key={index} className="paragraph-text">
              {item.content as string}
            </p>
          );
        default:
          return null;
      }
    });
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
