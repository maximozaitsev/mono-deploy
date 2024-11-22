import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import styles from "./PromotionsSection.module.scss";

export default function PromotionsSection() {
  return (
    <section className={`${styles.promotionsSection} section`}>
      <div className="container">
        <h2 className="h2-heading white">{content.promotions.title}</h2>
        <p className="paragraph-text">{content.promotions.text[0]}</p>
        <TwoColumns
          leftColumnContent={[
            {
              heading: content.promotions.leftColumnContent[0].heading,
              items: [
                {
                  type: "text",
                  content: content.promotions.leftColumnContent[0].text,
                },
              ],
            },
            {
              heading: content.promotions.leftColumnContent[1].heading,
              items: [
                {
                  type: "text",
                  content: content.promotions.leftColumnContent[1].text,
                },
              ],
            },
            {
              heading: content.promotions.leftColumnContent[2].heading,
              items: [
                {
                  type: "text",
                  content: content.promotions.leftColumnContent[2].text,
                },
              ],
            },
          ]}
          rightColumnContent={[
            {
              heading: content.promotions.rightColumnContent[0].heading,
              items: [
                {
                  type: "text",
                  content: content.promotions.rightColumnContent[0].text,
                },
              ],
            },
            {
              heading: content.promotions.rightColumnContent[1].heading,
              items: [
                {
                  type: "text",
                  content: content.promotions.rightColumnContent[1].text[0],
                },
                {
                  type: "list",
                  content: content.promotions.rightColumnContent[1].list || [],
                },
                {
                  type: "text",
                  content: content.promotions.rightColumnContent[1].text[1],
                },
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}
