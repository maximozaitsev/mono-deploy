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
            <Image src={aboutImage} alt="About Image" quality={100} />
          </div>
        </div>
        <div className="about-text">
          <h3 className="h3-heading">{content.about.register.title}</h3>
          <P>{content.about.register.text[0]}</P>
          <List items={content.about.register.list} />
          <P>{content.about.register.text[1]}</P>
          <P>{content.about.register.text[2]}</P>
        </div>
      </div>
    </section>
  );
}
