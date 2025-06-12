import React from "react";

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
            dangerouslySetInnerHTML={{ __html: item }}
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
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ul>
    );
  }
};

export default ListRenderer;
