import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import styles from "./PromotionsSection.module.scss";
import List from "../__common__/list/List";

export default function PromotionsSection() {
  return (
    <section className={`${styles.promotionsSection} section`}>
      <div className="container">
        <h2 className="h2-heading white">{content.promotions.title}</h2>
        <div>
          <p className="paragraph-text" style={{ marginBottom: "24px" }}>
            {content.promotions.text[0]}
          </p>
          <List items={content.promotions.list} />
          <p className="paragraph-text" style={{ marginTop: "24px" }}>
            {content.promotions.text[1]}
          </p>
        </div>
        <div>
          <h3 className="h3-heading" style={{ marginBottom: "24px" }}>
            {content.promotions.leftColumnContent[0].heading}
          </h3>
          <p className="paragraph-text" style={{ marginBottom: "24px" }}>
            {content.promotions.leftColumnContent[0].text[0]}
          </p>
          <List items={content.promotions.leftColumnContent[0].list} />
          <p className="paragraph-text" style={{ marginTop: "24px" }}>
            {content.promotions.leftColumnContent[0].text[1]}
          </p>
        </div>
        {/* <TwoColumns
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
              ],
            },
          ]}
        /> */}
      </div>
    </section>
  );
}
