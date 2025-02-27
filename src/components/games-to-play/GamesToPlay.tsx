import React from "react";
import content from "../../content/content.json";
import TwoColumns from "../__common__/two-columns/TwoColumns";
import "./GamesToPlay.scss";

interface Block {
  type: string;
  text?: string;
  level?: number;
  style?: string;
  items?: string[];
}

export default function GamesToPlay() {
  const betsBlocks: Block[] =
    content["games-to-play"]["Available Bets at the HPIbet"];
  const h2Heading = "Available Bets at the HPIbet";
  const firstParagraph = betsBlocks[0];
  const firstH3 = betsBlocks[1];
  const trackContentBlocks = betsBlocks.slice(2, 5);
  const secondH3 = betsBlocks[5];
  const secondSectionParagraph = betsBlocks[6];
  const classicBetsHeading = betsBlocks[7].text;
  const classicBetsBlocks = betsBlocks.slice(8, 11);
  const exoticBetsHeading = betsBlocks[11].text;
  const exoticBetsBlocks = betsBlocks.slice(12, 15);
  const combinationBetsHeading = betsBlocks[15].text;
  const combinationBetsBlocks = betsBlocks.slice(16, 19);

  const renderBlock = (block: Block, key: number) => {
    if (block.type === "paragraph") {
      return (
        <p
          key={key}
          className="paragraph-text"
          dangerouslySetInnerHTML={{ __html: block.text || "" }}
        />
      );
    } else if (block.type === "list") {
      if (block.style === "unordered") {
        return (
          <ul key={key}>
            {block.items?.map((item, i) => (
              <li
                key={i}
                className="paragraph-text"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        );
      } else if (block.style === "ordered") {
        return (
          <ol key={key}>
            {block.items?.map((item, i) => (
              <li
                key={i}
                className="paragraph-text"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ol>
        );
      }
    }
    return null;
  };

  type ColumnItem = {
    type: "text" | "list";
    content: string | string[];
    style?: "unordered" | "ordered";
  };

  const transformBlocksToColumnItems = (blocks: Block[]): ColumnItem[] =>
    blocks.map((block) => {
      if (block.type === "paragraph") {
        return { type: "text", content: block.text || "" };
      } else if (block.type === "list") {
        return {
          type: "list",
          content: block.items || [],
          style: block.style as "unordered" | "ordered",
        };
      }
      return { type: "text", content: "" };
    });

  const classicBetsColumn = {
    heading: classicBetsHeading || "",
    items: transformBlocksToColumnItems(classicBetsBlocks),
  };

  const exoticBetsColumn = {
    heading: exoticBetsHeading || "",
    items: transformBlocksToColumnItems(exoticBetsBlocks),
  };

  return (
    <section className="games-to-play-section section">
      <div className="container">
        <h2 className="h2-heading white">{h2Heading}</h2>

        {firstParagraph && firstParagraph.type === "paragraph" && (
          <p
            className="paragraph-text"
            dangerouslySetInnerHTML={{ __html: firstParagraph.text || "" }}
          />
        )}
        <div className="div">
          {firstH3 && firstH3.type === "heading" && firstH3.level === 3 && (
            <h3 className="h3-heading">{firstH3.text}</h3>
          )}

          {trackContentBlocks.map((block, index) => renderBlock(block, index))}
        </div>

        <div className="div">
          {secondH3 && secondH3.type === "heading" && secondH3.level === 3 && (
            <h3 className="h3-heading">{secondH3.text}</h3>
          )}

          {secondSectionParagraph &&
            secondSectionParagraph.type === "paragraph" && (
              <p
                className="paragraph-text"
                dangerouslySetInnerHTML={{
                  __html: secondSectionParagraph.text || "",
                }}
              />
            )}
        </div>
        <div className="games-two-columns">
          <TwoColumns
            leftColumnContent={[classicBetsColumn]}
            rightColumnContent={[exoticBetsColumn]}
          />
        </div>

        <div className="div">
          <h4 className="h4-heading white">{combinationBetsHeading}</h4>
          {combinationBetsBlocks.map((block, index) =>
            renderBlock(block, index)
          )}
        </div>
      </div>
    </section>
  );
}
