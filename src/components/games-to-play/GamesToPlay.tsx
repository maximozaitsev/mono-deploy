import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import styles from "./GamesToPlay.module.scss";
import Link from "next/link";
import List from "../__common__/list/List";

export default function GamesToPlay() {
  return (
    <section className={`${styles.gamesToPlay} section `}>
      <div className="container">
        <h2 className="h2-heading white">{content.gamesToPlay.title[0]}</h2>
        <p className="paragraph-text">{content.gamesToPlay.text[0]}</p>
        <TwoColumns
          leftColumnContent={[
            {
              heading: content.gamesToPlay.leftColumnContent[0].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.leftColumnContent[0].text,
                },
              ],
            },
            {
              heading: content.gamesToPlay.leftColumnContent[1].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.leftColumnContent[1].text,
                },
              ],
            },
          ]}
          rightColumnContent={[
            {
              heading: content.gamesToPlay.gamesRightColumn[0].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.gamesRightColumn[0].text,
                },
              ],
            },
            {
              heading: content.gamesToPlay.gamesRightColumn[1].heading,
              items: [
                {
                  type: "text",
                  content: content.gamesToPlay.gamesRightColumn[1].text,
                },
              ],
            },
          ]}
        />
        <div className={styles.div2}>
          <h3 className="h3-heading white">{content.gamesToPlay.title[1]}</h3>
          <p className="paragraph-text">{content.gamesToPlay.text[1]}</p>
          <p className="paragraph-text">{content.gamesToPlay.text[2]}</p>
          <p className="paragraph-text">{content.gamesToPlay.text[3]}</p>
          <List items={content.gamesToPlay.list} />
          <p className="paragraph-text">{content.gamesToPlay.text[4]}</p>
        </div>
      </div>
    </section>
  );
}
