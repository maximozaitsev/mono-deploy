import aboutImage from "../../../public/block-images/laptop.webp";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import { getContentData, parseAboutContent } from "../../utils/serverContent";
import "./AboutSection.scss";

export default async function AboutSection() {
  const contentData = await getContentData();
  const content = parseAboutContent(contentData);

  return (
    <section className="about-section section">
      <div className="container">
        <h2 className="h2-heading white">{content.title}</h2>

        <div className="about-content">
          <div className="about-text paragraph-text">
            {content.intro?.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>

          <div className="about-image">
            <img
              src={aboutImage.src}
              alt={PROJECT_NAME + " " + PROJECT_GEO + " Desktop"}
              title={PROJECT_NAME + " " + PROJECT_GEO + " Desktop"}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
