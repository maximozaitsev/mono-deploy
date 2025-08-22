"use client";

import useContentData from "../../utils/useContentData";
import styles from "./H1Block.module.scss";

export default function H1Section() {
  const { data: content, loading, error } = useContentData();

  if (loading || error || !content) return null;

  return (
    <section id="h1-section" className={styles.h1Section}>
      <h1>{content.title}</h1>
    </section>
  );
}
