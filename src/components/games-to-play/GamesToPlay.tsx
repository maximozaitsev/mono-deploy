import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import List from "../__common__/list/List";
import styles from "./GamesToPlay.module.scss";

export default function GamesToPlay() {
  return (
    <section className={`${styles.gamesToPlay} section `}>
      <div className="container">
        <h2 className="h2-heading white">{content.gamesToPlay.title}</h2>
        <div>
          <p className="paragraph-text" style={{ marginBottom: "24px" }}>
            {content.gamesToPlay.text[0]}
          </p>
          <List items={content.gamesToPlay.list} />
          <p className="paragraph-text" style={{ marginTop: "24px" }}>
            {content.gamesToPlay.text[1]}
          </p>
        </div>
        <div>
          <h3 className="h3-heading" style={{ marginBottom: "24px" }}>
            {content.gamesToPlay.title2}
          </h3>
          <p className="paragraph-text" style={{ marginBottom: "24px" }}>
            {content.gamesToPlay.text2[0]}
          </p>
          <p className="paragraph-text" style={{ marginBottom: "24px" }}>
            {content.gamesToPlay.text2[1]}
          </p>
          <List items={content.gamesToPlay.list2} ordered />
          <p className="paragraph-text" style={{ marginBottom: "24px" }}>
            {content.gamesToPlay.text2[2]}
          </p>
        </div>
        {/* <TwoColumns
          leftColumnContent={[
            {
              heading: content.gamesToPlay.leftColumnContent[0].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.leftColumnContent[0].text[0],
                },
              ],
            },
            {
              heading: content.gamesToPlay.leftColumnContent[1].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.leftColumnContent[1].text[0],
                },
                // {
                //   type: "list",
                //   content:
                //     content.gamesToPlay.leftColumnContent[1].list || [],
                // },
                // {
                //   type: "text",
                //   content:
                //     content.gamesToPlay.leftColumnContent[1].text[1]
                // },
              ],
            },
          ]}
          rightColumnContent={[
            {
              heading: content.gamesToPlay.gamesRightColumn[0].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.gamesRightColumn[0].text[0],
                },
                // {
                //   type: "list",
                //   content:
                //     content.gamesToPlay.gamesRightColumn[0].list || [],
                // },
                // {
                //   type: "text",
                //   content:
                //     content.gamesToPlay.gamesRightColumn[0].text[1]
                // },
              ],
            },
          ]}
        /> */}
        {/* <p className="paragraph-text">{content.gamesToPlay.text[1]}</p> */}
      </div>
    </section>
  );
}
