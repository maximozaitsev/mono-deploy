// import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import styles from "./PromotionsSection.module.scss";
import List from "../__common__/list/List";

export default function PromotionsSection() {
  return (
    <section className={`${styles.promotionsSection} section`}>
      <div className="container">
        <h2 className="h2-heading white">{content.promotions.title[0]}</h2>
        <p className="paragraph-text">{content.promotions.text[0]}</p>
        <h3 className="h3-heading white">{content.promotions.title[1]}</h3>
        <p className="paragraph-text">{content.promotions.text[1]}</p>
        <h2 className="h2-heading white">{content.promotions.title[2]}</h2>
        <p className="paragraph-text">{content.promotions.text[2]}</p>
        <List items={content.promotions.list} />
        <p className="paragraph-text">{content.promotions.text[3]}</p>
      </div>
    </section>
  );
}
