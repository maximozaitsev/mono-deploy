import aboutImage from "../../../public/block-images/laptop.webp";
import { getContentData, getProjectGeo } from "../../utils/serverContent";
import { getTranslations } from 'next-intl/server';
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { replaceCurrentYear } from "../../utils/yearReplacer";
import { PROJECT_NAME } from "@/config/projectConfig";
import "./AboutSection.scss";

interface AboutSectionProps {
  lang: string;
}

export default async function AboutSection({ lang }: AboutSectionProps) {
  const [content, t] = await Promise.all([
    getContentData(lang),
    getTranslations()
  ]);

  if (!content?.intro) return null;

  const projectGeo = getProjectGeo(lang);

  return (
    <section className="about-section section">
      <div className="container">
        <h2 className="h2-heading white">
          {replaceCurrentYear(`${PROJECT_NAME} ${t('overview')}`)}
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
