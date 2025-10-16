import AppImage from "../../../public/block-images/app.webp";
import AppImageMobile from "../../../public/block-images/app-mobile.webp";
import { getContentData, parseAppData, getProjectGeo, getFirstOfferId } from "../../utils/serverContent";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { replaceCurrentYear } from "../../utils/yearReplacer";
import { PROJECT_NAME } from "@/config/projectConfig";
import AppButtons from "./AppButtons";
import styles from "./AppSection.module.scss";

interface AppSectionProps {
  lang: string;
}

export default async function AppSection({ lang }: AppSectionProps) {
  const [content, firstOfferId] = await Promise.all([
    getContentData(lang),
    getFirstOfferId()
  ]);
  
  const app = parseAppData(content);

  if (!app) return null;

  const projectGeo = getProjectGeo(lang);

  return (
    <section id="mobile" className={`${styles.appSection} section`}>
      <div className="container">
        <div className={styles.topRow}>
          <div className={styles.textBlock}>
            {app.appTitle && <h3 className="h3-heading">{replaceCurrentYear(app.appTitle)}</h3>}
            <img
              src={AppImageMobile.src}
              alt={`${PROJECT_NAME} App`}
              title={`${PROJECT_NAME} ${projectGeo}`}
              className={styles.imageMobile}
              loading="lazy"
            />
            {app.appContent.map((group, index) => (
              <div key={index} className={styles.paragraphGroup}>
                {group.map((block: any, i: number) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            ))}
            <AppButtons lang={lang} firstOfferId={firstOfferId} />
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

        <div className={styles.columns}>
          <div className={styles.column}>
            {app.languagesTitle && (
              <h3 className="h3-heading">{replaceCurrentYear(app.languagesTitle)}</h3>
            )}
            {app.languagesContent.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
          <div className={styles.column}>
            {app.currenciesTitle && (
              <h3 className="h3-heading">{replaceCurrentYear(app.currenciesTitle)}</h3>
            )}
            {app.currenciesContent.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
