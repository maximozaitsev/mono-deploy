import React from "react";
import styles from "./H1Block.module.scss";
import siteData from "../../../public/content/siteData.json";

export interface Block {
  type: string;
  level?: number;
  text?: string;
}

interface Props {
  blocks?: Block[];
  pageKey?: keyof typeof siteData;
  className?: string;
}

export default function H1Section({ blocks, pageKey, className }: Props) {
  const contentBlocks =
    blocks ?? (pageKey ? siteData[pageKey].blocks : undefined);
  const h1Text =
    contentBlocks?.find((b) => b.type === "heading" && b.level === 1)?.text ||
    "";

  if (!h1Text) return null;

  return (
    <section
      id="h1-section"
      className={`${styles.h1Section} ${className ?? ""}`.trim()}
    >
      <h1>{h1Text}</h1>
    </section>
  );
}
