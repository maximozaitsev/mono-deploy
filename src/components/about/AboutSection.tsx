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
            <p>{content.about.description[0]}</p>
            <List items={content.about.list} />
            <p>{content.about.description[1]}</p>
          </div>
          <div className="about-image">
            <Image src={aboutImage} alt="About Image" quality={100} />
          </div>
        </div>
        <div className="about-text">
          <h3 className="h3-heading">{content.about.register.title}</h3>
          <P>{content.about.register.text[0]}</P>
          <P>{content.about.register.text[1]}</P>
          <List items={content.about.register.list} ordered />
          <P>{content.about.register.text[2]}</P>
        </div>
        <div className="about-text">
          <h3 id="sign-in" className="h3-heading">
            {content.about.signIn.title}
          </h3>
          <P>{content.about.signIn.text[0]}</P>
          <List items={content.about.signIn.list} ordered />
          <P>{content.about.signIn.text[1]}</P>
          {/* <h4 className="h4-heading white">
            {content.about.verification.title}
          </h4>
          <P>{content.about.verification.text[0]}</P>
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
                  type: "text",
                  content: content.about.depositMethods.text[1],
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
