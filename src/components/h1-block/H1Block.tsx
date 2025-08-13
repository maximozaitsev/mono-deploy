"use client";

import useContentData from "../../utils/useContentData";
import styles from "./H1Block.module.scss";

export default function H1Section() {
  const { data: content, loading, error } = useContentData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading content.</p>;
  if (!content) return <p>No content available.</p>;

  return (
    <section id="h1-section" className={`${styles.h1Section}`}>
      <h1>{content.title}</h1>
    </section>
  );
}
