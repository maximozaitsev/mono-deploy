import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import P from "../__common__/Paragraph";
import List from "../__common__/list/List";
import styles from "./PromotionsSection.module.scss";

export default function PromotionsSection() {
  return (
    <section className={`${styles.promotionsSection} section`}>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h2 className="h2-heading white">{content.promotions.title}</h2>
          <p className="paragraph-text">{content.promotions.text[0]}</p>
          <p className="paragraph-text">{content.promotions.text[1]}</p>
        </div>
        <TwoColumns
          leftColumnContent={[
            {
              heading: content.promotions.leftColumnContent[0].heading,
              items: [
                {
                  type: "text",
                  content: content.promotions.leftColumnContent[0].text[0],
                },
                {
                  type: "text",
                  content: content.promotions.leftColumnContent[0].text[1],
                },
                {
                  type: "text",
                  content: content.promotions.leftColumnContent[0].text[2],
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
                {
                  type: "text",
                  content: content.promotions.rightColumnContent[0].text[1],
                },
                {
                  type: "text",
                  content: content.promotions.rightColumnContent[0].text[2],
                },
              ],
            },
          ]}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h3 className="h3-heading white">
            {" "}
            {content.about.depositMethods.title}{" "}
          </h3>
          <P>{content.about.depositMethods.text[0]}</P>
          <P>{content.about.depositMethods.text[1]}</P>
          <List items={content.about.depositMethods.list} />
          <P>{content.about.depositMethods.text[2]}</P>
          <P>{content.about.depositMethods.text[3]}</P>
        </div>
        {/* <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h3 className="h3-heading white">
            {" "}
            {content.about.withdrawalMethods.title}{" "}
          </h3>
          <P>{content.about.withdrawalMethods.text[0]}</P>
          <List items={content.about.withdrawalMethods.list} />
          <P>{content.about.withdrawalMethods.text[1]}</P>
        </div> */}
      </div>
    </section>
  );
}
