import React from "react";
import styles from "./H1Block.module.scss";
import siteData from "@/content/siteData.json";

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

// Предварительно получаем h1 текст для главной страницы
const getH1Text = (pageKey?: keyof typeof siteData, blocks?: Block[]): string => {
  if (blocks) {
    return blocks.find((b) => b.type === "heading" && b.level === 1)?.text || "";
  }
  
  if (pageKey && siteData[pageKey]) {
    return siteData[pageKey].blocks?.find((b) => b.type === "heading" && b.level === 1)?.text || "";
  }
  
  return "";
};

export default function H1Section({ blocks, pageKey, className }: Props) {
  // Получаем текст синхронно, чтобы избежать CLS
  const h1Text = getH1Text(pageKey, blocks);

  return (
    <section
      id="h1-section"
      className={`${styles.h1Section} ${className ?? ""}`.trim()}
    >
      <h1>{h1Text}</h1>
    </section>
  );
}
