"use client";

import { useState, useEffect } from "react";
import aboutImage from "../../../public/block-images/laptop.webp";
import useContentData from "../../utils/useContentData";
import BlockRenderer from "../__common__/renderers/BlockRenderer";
import { PROJECT_NAME } from "@/config/projectConfig";
import { usePathname } from "next/navigation";
import { getProjectGeoForLang } from "@/utils/localeMap";
import { useStaticT } from "@/utils/i18n";
import "./AboutSection.scss";

export default function AboutSection() {
  const { data: content, loading, error } = useContentData();
  const pathname = usePathname();
  const [projectGeo, setProjectGeo] = useState<string>("");

  const { t } = useStaticT();

  useEffect(() => {
    async function resolveGeo() {
      try {
        const res = await fetch("/content/languages.json", {
          cache: "no-cache",
        });
        const manifest = await res.json();
        const seg = (pathname || "").split("/").filter(Boolean)[0];
        const lang =
          seg && manifest.languages.includes(seg) ? seg : manifest.defaultLang;
        setProjectGeo(getProjectGeoForLang(lang));
      } catch {
        setProjectGeo("");
      }
    }
    resolveGeo();
  }, [pathname]);

  if (loading) return null;
  if (error) return null;
  if (!content) return null;

  return (
    <section className="about-section section">
      <div className="container">
        <h2 className="h2-heading white">
          {PROJECT_NAME} {t.overview || "Overview"}
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
