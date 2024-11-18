// import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import styles from "./PromotionsSection.module.scss";
import List from "../__common__/list/List";

export default function PromotionsSection() {
  return (
    <section className={`${styles.promotionsSection} section`}>
      <div className="container">
        <h2 className="h2-heading white">{content.promotions.title[1]}</h2>
        <div className={styles.promotionsContent}>
          <p className="paragraph-text">{content.promotions.text2[0]}</p>
          <List items={content.promotions.list2} />
          <p className="paragraph-text">{content.promotions.text2[1]}</p>
        </div>
        <h2 className="h2-heading white">{content.promotions.title[0]}</h2>
        <div className={styles.promotionsContent}>
          <p className="paragraph-text">{content.promotions.text[0]}</p>
          <List items={content.promotions.list} />
          <p className="paragraph-text">{content.promotions.text[1]}</p>
        </div>
      </div>
    </section>
  );
}
