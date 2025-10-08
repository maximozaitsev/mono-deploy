import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { getContentData, parseLoginContent } from "../../utils/serverContent";
import "./LoginSection.scss";

export default async function LoginSection() {
  const contentData = await getContentData();
  const content = parseLoginContent(contentData);

  return (
    <section className="login-section section">
      <div className="container">
        {Object.entries(content.aboutSections).map(
          ([sectionTitle, sectionContent]: [string, any], index) => (
            <div key={index} className="about-text">
              <h3 className="h3-heading">{sectionTitle}</h3>
              {sectionContent.map((block: any, idx: number) => (
                <BlockRenderer key={idx} block={block} />
              ))}
            </div>
          )
        )}

        {(content.depositSection || content.withdrawalSection) && (
          <div className="deposit-withdrawal">
            {content.depositSection && (
              <div className="deposit-section">
                <h3 className="h3-heading">{content.depositSection.title}</h3>
                {content.depositSection.content.map((block: any, idx: number) => (
                  <BlockRenderer key={idx} block={block} />
                ))}
              </div>
            )}
            {content.withdrawalSection && (
              <div className="withdrawal-section">
                <h3 className="h3-heading">{content.withdrawalSection.title}</h3>
                {content.withdrawalSection.content.map((block: any, idx: number) => (
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
