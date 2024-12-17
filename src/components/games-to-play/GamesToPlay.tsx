import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import styles from "./GamesToPlay.module.scss";

export default function GamesToPlay() {
  return (
    <section className={`${styles.gamesToPlay} section `}>
      <div className="container">
        <h2 className="h2-heading white">{content.gamesToPlay.title}</h2>
        <p className="paragraph-text">{content.gamesToPlay.text[0]}</p>
        <TwoColumns
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
                {
                  type: "list",
                  content: content.gamesToPlay.leftColumnContent[1].list || [],
                },
                {
                  type: "text",
                  content: content.gamesToPlay.leftColumnContent[1].text[1],
                },
              ],
            },
          ]}
          rightColumnContent={[
            {
              heading: content.gamesToPlay.leftColumnContent[2].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.leftColumnContent[2].text[0],
                },
              ],
            },
            {
              heading: content.gamesToPlay.gamesRightColumn[0].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.gamesRightColumn[0].text[0],
                },
              ],
            },
            {
              heading: content.gamesToPlay.gamesRightColumn[1].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.gamesRightColumn[1].text[0],
                },
              ],
            },
            {
              heading: content.gamesToPlay.gamesRightColumn[2].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.gamesRightColumn[2].text[0],
                },
              ],
            },
          ]}
        />
        {/* <p className="paragraph-text">{content.gamesToPlay.text[1]}</p> */}
      </div>
    </section>
  );
}
