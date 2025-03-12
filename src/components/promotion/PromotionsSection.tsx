import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import styles from "./PromotionsSection.module.scss";
import List from "../__common__/list/List";

export default function PromotionsSection() {
  return (
    <section className={`${styles.promotionsSection} section`}>
      <div className="container">
        <div className={styles.block}>
          <h2 className="h2-heading white">{content.promotions.title[0]}</h2>
          <p className="paragraph-text">{content.promotions.text[0]}</p>
          <p className="paragraph-text">{content.promotions.text[1]}</p>
          <p className="paragraph-text">{content.promotions.text[2]}</p>
        </div>
        <div className={styles.block}>
          <h3 className="h3-heading white">{content.promotions.title[1]}</h3>
          <p className="paragraph-text">{content.promotions.text[3]}</p>
          <List items={content.promotions.list} />
          <p className="paragraph-text">{content.promotions.text[4]}</p>
        </div>
        <div className={styles.block}> 
          <h3 className="h3-heading white">{content.promotions.title[2]}</h3>
          <p className="paragraph-text">{content.promotions.text[5]}</p>
          <List items={content.promotions.list2} />
          <p className="paragraph-text">{content.promotions.text[6]}</p>
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
