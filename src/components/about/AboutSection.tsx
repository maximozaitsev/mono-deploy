import Image from "next/image";
import aboutImage from "../../../public/block-images/laptop.webp";
import P from "../__common__/Paragraph";
import List from "../__common__/list/List";
import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import "./AboutSection.scss";

export default function AboutSection() {
  return (
    <section className="about-section section">
      <div className="container">
        <h1 className="h2-heading white">{content.about.title}</h1>
        <div className="about-content">
          <div className="about-text paragraph-text">
            <ul>
              {content.about.intro.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {content.about.description.map(
              (paragraph: string, index: number) => (
                <p key={index} className="paragraph-text">
                  {paragraph}
                </p>
              )
            )}
          </div>
          <div className="about-image">
            <Image src={aboutImage} alt="About Image" />
          </div>
        </div>
        <div className="about-text">
          <h3 id="sign-in" className="h3-heading">
            {content.about.signIn.title}
          </h3>
          <P>{content.about.signIn.text[0]}</P>
          <P>{content.about.signIn.text[1]}</P>
          {/* <List items={content.about.signIn.list} ordered /> */}
          <P>{content.about.signIn.text[2]}</P>
          <P>{content.about.signIn.text[3]}</P>
          <P>{content.about.signIn.text[4]}</P>
          {/* <h3 className="h3-heading">{content.about.verification.title}</h3> */}
          {/* <P>{content.about.verification.text[0]}</P>
          <P>{content.about.verification.text[1]}</P> */}
        </div>
        <TwoColumns
          leftColumnContent={[
            {
              heading: content.about.depositMethods.title,
              items: [
                {
                  type: "text",
                  content: content.about.depositMethods.text[0],
                },
                {
                  type: "list",
                  content: content.about.depositMethods.list || [],
                },
                {
                  type: "additionalText",
                  content: content.about.depositMethods.additionalText || [],
                },
              ],
            },
          ]}
          rightColumnContent={[
            {
              heading: content.about.withdrawalMethods.title,
              items: [
                {
                  type: "text",
                  content: content.about.withdrawalMethods.text[0],
                },
                {
                  type: "list",
                  content: content.about.withdrawalMethods.list || [],
                },
                {
                  type: "text",
                  content: content.about.withdrawalMethods.text[1],
                },
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}
