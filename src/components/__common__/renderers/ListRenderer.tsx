import React from "react";
import { replaceCurrentYear } from "../../../utils/yearReplacer";

interface ListRendererProps {
  items: string[];
  styleType: "ordered" | "unordered";
  className?: string;
}

export const ListRenderer: React.FC<ListRendererProps> = ({
  items,
  styleType,
  className = "",
}) => {
  if (styleType === "ordered") {
    return (
      <ol className={className}>
        {items.map((item, index) => (
          <li
            key={index}
            className="paragraph-text"
            dangerouslySetInnerHTML={{ __html: replaceCurrentYear(item) }}
          />
        ))}
      </ol>
    );
  } else {
    return (
      <ul className={className}>
        {items.map((item, index) => (
          <li
            key={index}
            className="paragraph-text"
            dangerouslySetInnerHTML={{ __html: replaceCurrentYear(item) }}
          />
        ))}
      </ul>
    );
  }
};

export default ListRenderer;
