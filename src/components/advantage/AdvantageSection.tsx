import styles from "./AdvantageSection.module.scss";
import { content } from "@/content/content";
import P from "../__common__/Paragraph";

export default function AdvantageSection() {
  const { advantages, disadvantages, subTitle, text } = content.advantages;

  return (
    <section className={`${styles.advantageSection} section`}>
      <div className="container">
        <h2 className="h2-heading">{subTitle}</h2>
        <P>{content.advantages.text[0]}</P>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h4 className="h4-heading">{content.advantages.advantagesTitle}</h4>
            <ul className="paragraph-text black">
              {advantages.map((advantage, index) => (
                <li key={index}>{advantage}</li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className="h4-heading">
              {content.advantages.disadvantagesTitle}
            </h4>
            <ul className="paragraph-text black">
              {disadvantages.map((disadvantage, index) => (
                <li key={index}>{disadvantage}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
