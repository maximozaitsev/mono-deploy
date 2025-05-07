// /components/sections/AboutSection.tsx
"use client";

import { useState, useEffect } from "react";
import aboutImage from "../../../public/block-images/laptop.webp";
import "./AboutSection.scss";
import useContentData from "../../utils/useContentData";
import BlockRenderer from "../__common__/renderers/BlockRenderer";

export default function AboutSection() {
  const { data: content, loading, error } = useContentData();
  const [aboutSections, setAboutSections] = useState<any>({});
  const [depositSection, setDepositSection] = useState<any>(null);
  const [withdrawalSection, setWithdrawalSection] = useState<any>(null);
  const projectName = "Winnita Casino";

  useEffect(() => {
    if (content) {
      const aboutEntries = Object.entries(content.about) as [string, any][];
      if (aboutEntries.length > 2) {
        const depositTitle = aboutEntries[aboutEntries.length - 2][0];
        const withdrawalTitle = aboutEntries[aboutEntries.length - 1][0];

        setDepositSection({
          title: depositTitle,
          content: aboutEntries[aboutEntries.length - 2][1],
        });
        setWithdrawalSection({
          title: withdrawalTitle,
          content: aboutEntries[aboutEntries.length - 1][1],
        });

        // Оставляем только секции до Deposits и Withdrawals
        const filteredAbout = aboutEntries.slice(0, aboutEntries.length - 2);
        setAboutSections(Object.fromEntries(filteredAbout));
      } else {
        setAboutSections(content.about);
      }
    }
  }, [content]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading content.</p>;
  if (!content) return <p>No content available.</p>;

  return (
    <section className="about-section section">
      <div className="container">
        <h1 className="h2-heading white">{content.title}</h1>

        <div className="about-content">
          <div className="about-text paragraph-text">
            {content.intro?.map((block: any, index: number) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>

          <div className="about-image">
            <img
              src={aboutImage.src}
              alt={projectName + " Desktop"}
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
