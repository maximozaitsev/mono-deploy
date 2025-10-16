import aboutImage from "../../../public/block-images/laptop.webp";
import { getContentData, getStaticTranslations, getProjectGeo } from "../../utils/serverContent";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { replaceCurrentYear } from "../../utils/yearReplacer";
import { PROJECT_NAME } from "@/config/projectConfig";
import "./AboutSection.scss";

interface AboutSectionProps {
  lang: string;
}

export default async function AboutSection({ lang }: AboutSectionProps) {
  const [content, translations] = await Promise.all([
    getContentData(lang),
    getStaticTranslations(lang)
  ]);

  if (!content?.intro) return null;

  const projectGeo = getProjectGeo(lang);
  const t = translations;

  return (
    <section className="about-section section">
      <div className="container">
        <h2 className="h2-heading white">
          {replaceCurrentYear(`${PROJECT_NAME} ${t.overview || "Overview"}`)}
        </h2>

        <div className="about-content">
          <div className="about-text paragraph-text">
            {content.intro?.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>

          <div className="about-image">
            <img
              src={aboutImage.src}
              alt={`${PROJECT_NAME} ${projectGeo || "Global"} Desktop`}
              title={`${PROJECT_NAME} ${projectGeo || "Global"} Desktop`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
