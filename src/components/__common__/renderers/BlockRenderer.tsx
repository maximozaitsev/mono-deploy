import React from "react";
import ListRenderer from "./ListRenderer";

interface BlockRendererProps {
  block: any;
  className?: string;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  className = "",
}) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          className={`paragraph-text ${className}`}
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
    case "heading":
      if (block.level === 3) {
        return <h4 className={`h4-heading ${className}`}>{block.text}</h4>;
      }
      return <h3 className={`h3-heading ${className}`}>{block.text}</h3>;
    case "list":
      return (
        <ListRenderer
          items={block.items}
          styleType={block.style as "ordered" | "unordered"}
          className={className}
        />
      );
    default:
      return null;
  }
};

export default BlockRenderer;
