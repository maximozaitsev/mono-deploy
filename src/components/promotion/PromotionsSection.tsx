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
                  content: content.promotions.leftColumnContent[0].text[0],
                },
              ],
            },
            {
              heading: content.promotions.leftColumnContent[1].heading,
              items: [
                {
                  type: "text",
                  content: content.promotions.leftColumnContent[1].text[0],
                },
              ],
            },
            {
              heading: content.promotions.leftColumnContent[2].heading,
              items: [
                {
                  type: "text",
                  content: content.promotions.leftColumnContent[2].text[0],
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
                  content: content.promotions.rightColumnContent[0].text[0],
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
                  type: "text",
                  content: content.promotions.rightColumnContent[1].text[1],
                },
                {
                  type: "text",
                  content: content.promotions.rightColumnContent[1].text[2],
                },
                {
                  type: "list",
                  content: content.promotions.rightColumnContent[1].list || [],
                },
                {
                  type: "text",
                  content: content.promotions.rightColumnContent[1].text[3],
                },
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}
