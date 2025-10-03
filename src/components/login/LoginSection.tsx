"use client";

import { useState, useEffect } from "react";
import useContentData from "../../utils/useContentData";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { useStaticT } from "@/utils/i18n";
import "./LoginSection.scss";

export default function LoginSection() {
  const { data: content, loading, error } = useContentData();
  const [aboutSections, setAboutSections] = useState<any>({});
  const [depositSection, setDepositSection] = useState<any>(null);
  const [withdrawalSection, setWithdrawalSection] = useState<any>(null);

  const { t } = useStaticT();

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

        const filteredAbout = aboutEntries.slice(0, aboutEntries.length - 2);
        setAboutSections(Object.fromEntries(filteredAbout));
      } else {
        setAboutSections(content.about);
      }
    }
  }, [content]);

  if (loading) return null;
  if (error) return null;
  if (!content) return null;

  return (
    <section className="login-section section">
      <div className="container">
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
