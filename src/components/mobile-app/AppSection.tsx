import AppImage from "../../../public/block-images/app.webp";
import AppImageMobile from "../../../public/block-images/app-mobile.webp";
import { getContentData, getProjectGeo, groupContent } from "../../utils/serverContent";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { replaceCurrentYear } from "../../utils/yearReplacer";
import { PROJECT_NAME } from "@/config/projectConfig";
import styles from "./AppSection.module.scss";

interface AppSectionProps {
  lang: string;
}

export default async function AppSection({ lang }: AppSectionProps) {
  const content = await getContentData(lang);

  if (!content?.sections) return null;

  const projectGeo = getProjectGeo(lang);

  return (
    <section id="mobile" className={`${styles.appSection} section`}>
      <div className="container">
        <div className={styles.topRow}>
          <div className={styles.textBlock}>
            {content.sections && Object.entries(content.sections).map(
              ([sectionTitle, sectionContent]: [string, any], index) => {
                const groupedContent = Array.isArray(sectionContent) ? groupContent(sectionContent) : [];
                return (
                  <div key={index}>
                    <h3 className="h3-heading">{replaceCurrentYear(sectionTitle)}</h3>
                    {index === 0 && (
                      <img
                        src={AppImageMobile.src}
                        alt={`${PROJECT_NAME} App`}
                        title={`${PROJECT_NAME} ${projectGeo}`}
                        className={styles.imageMobile}
                        loading="lazy"
                      />
                    )}
                    {groupedContent.map((group, groupIndex) => (
                      <div key={groupIndex} className={styles.paragraphGroup}>
                        {group.map((block: any, idx: number) => (
                          <BlockRenderer key={idx} block={block} />
                        ))}
                      </div>
                    ))}
                  </div>
                );
              }
            )}
          </div>
          <div className={styles.imageBlock}>
            <img
              src={AppImage.src}
              alt={`${PROJECT_NAME} ${projectGeo} App`}
              title={`${PROJECT_NAME} ${projectGeo} Mobile`}
              className={styles.image}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
