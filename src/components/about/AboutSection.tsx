import aboutImage from "../../../public/block-images/laptop.webp";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import "./AboutSection.scss";

// Импортируем контент напрямую
import content from "../../content/content.json";

export default function AboutSection() {
  // Обрабатываем данные на сервере
  const aboutEntries = Object.entries(content.about) as [string, any][];
  
  let aboutSections: any = {};
  let depositSection: any = null;
  let withdrawalSection: any = null;

  if (aboutEntries.length > 2) {
    const depositTitle = aboutEntries[aboutEntries.length - 2][0];
    const withdrawalTitle = aboutEntries[aboutEntries.length - 1][0];

    depositSection = {
      title: depositTitle,
      content: aboutEntries[aboutEntries.length - 2][1],
    };
    withdrawalSection = {
      title: withdrawalTitle,
      content: aboutEntries[aboutEntries.length - 1][1],
    };

    // Оставляем только секции до Deposits и Withdrawals
    const filteredAbout = aboutEntries.slice(0, aboutEntries.length - 2);
    aboutSections = Object.fromEntries(filteredAbout);
  } else {
    aboutSections = content.about;
  }

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

        {Object.entries(aboutSections).map(
          ([sectionTitle, sectionContent]: [string, any], index) => (
            <div key={index} className="about-text">
              <h3 className="h3-heading">{sectionTitle}</h3>
              {sectionContent.map((block: any, idx: number) => (
                <BlockRenderer key={idx} block={block} />
              ))}
            </div>
          )
        )}

        {(depositSection || withdrawalSection) && (
          <div className="deposit-withdrawal">
            {depositSection && (
              <div className="deposit-section">
                <h3 className="h3-heading">{depositSection.title}</h3>
                {depositSection.content.map((block: any, idx: number) => (
                  <BlockRenderer key={idx} block={block} />
                ))}
              </div>
            )}
            {withdrawalSection && (
              <div className="withdrawal-section">
                <h3 className="h3-heading">{withdrawalSection.title}</h3>
                {withdrawalSection.content.map((block: any, idx: number) => (
                  <BlockRenderer key={idx} block={block} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
