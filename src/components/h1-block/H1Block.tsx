import styles from "./H1Block.module.scss";
import { getContentData } from "../../utils/serverContent";
import { replaceCurrentYear } from "../../utils/yearReplacer";

interface H1SectionProps {
  lang: string;
}

export default async function H1Section({ lang }: H1SectionProps) {
  const content = await getContentData(lang);

  if (!content?.title) return null;

  return (
    <section id="h1-section" className={styles.h1Section}>
      <h1 className="h2-heading">{replaceCurrentYear(content.title)}</h1>
    </section>
  );
}
