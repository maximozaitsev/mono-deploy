import styles from "./List.module.scss";
import React from "react";

interface ListProps {
  items: string[];
  ordered?: boolean;
}

const List: React.FC<ListProps> = ({ items, ordered = false }) => {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag className={styles.list}>
      {items.map((item, index) => (
        <li key={index} className={`${styles.listItem} paragraph-text`}>
          {item}
        </li>
      ))}
    </ListTag>
  );
};

export default List;
