import { getContentData } from "../../utils/serverContent";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { replaceCurrentYear } from "../../utils/yearReplacer";
import styles from "./PromotionsSection.module.scss";

interface PromotionsSectionProps {
  lang: string;
}

export default async function PromotionsSection({ lang }: PromotionsSectionProps) {
  const content = await getContentData(lang);

  if (!content?.["bonuses-and-promotions"]) return null;

  const bonusesData = content["bonuses-and-promotions"];
  const sectionEntries = Object.entries(bonusesData) as [string, any][];
  
  if (sectionEntries.length === 0) return null;

  const [sectionTitle, sectionContent] = sectionEntries[0];

  return (
    <section className={`${styles.promotionsSection} section`}>
      <div className="container">
        <h2 className="h2-heading white">{replaceCurrentYear(sectionTitle)}</h2>
        
        <div className={styles.promotionsContent}>
          {Array.isArray(sectionContent) &&
            sectionContent.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
        </div>
      </div>
    </section>
  );
}
