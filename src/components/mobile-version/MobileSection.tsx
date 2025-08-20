"use client";

import { useEffect, useState } from "react";
import { fetchOffers } from "@/utils/fetchOffers";
import mobileAppImage from "../../../public/block-images/phone.webp";
import mobileAppImageMobile from "../../../public/block-images/phone-mobile.webp";
import StarIcon from "../__common__/StarIcon";
import Button from "../__common__/button/Button";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import { useStaticT } from "@/utils/i18n";
import "./MobileSection.scss";

export default function MobileSection() {
  const [advantagesList, setAdvantagesList] = useState<string[]>([]);
  const [firstOfferId, setFirstOfferId] = useState<number | null>(null);
  const { t, currentLang } = useStaticT();

  const projectGeo = getProjectGeoForLang(currentLang);

  useEffect(() => {
    const load = async () => {
      try {
        const manifestRes = await fetch("/content/languages.json", {
          cache: "no-cache",
        });
        const manifest = await manifestRes.json();
        const parts = window.location.pathname.split("/").filter(Boolean);
        const first = parts[0];
        const lang =
          first &&
          manifest.languages.includes(first) &&
          first !== manifest.defaultLang
            ? first
            : manifest.defaultLang;
        const res = await fetch(`/content/content.${lang}.json`, {
          cache: "no-cache",
        });
        const data = await res.json();
        const advantagesSections = Object.values(data.advantages) as any[];
        if (advantagesSections.length > 0) {
          for (const section of advantagesSections) {
            const listBlock = section.find(
              (block: any) => block.type === "list"
            );
            if (listBlock) {
              setAdvantagesList(listBlock.items);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки JSON:", error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    fetchOffers()
      .then(({ offers }) => {
        if (offers.length > 0) {
          setFirstOfferId(offers[0].id);
        }
      })
      .catch((error) => console.error("Error fetching first offer ID:", error));
  }, []);

  return (
    <section className="mobile-section">
      <div className="container mobile-content">
        <div className="advantages-block">
          <h3 className="h3-heading">{t.advantages}</h3>
          <ul className="advantages-list">
            {advantagesList.map((advantage, index) => (
              <li key={index}>
                <StarIcon />
                {advantage}
              </li>
            ))}
          </ul>
          {firstOfferId && (
            <Button
              text={t.knowMore}
              variant="primary"
              url={`/casino/${firstOfferId}`}
              openInNewTab
            />
          )}
        </div>

        <div className="app-info-block">
          <h3 className="h3-heading">
            {PROJECT_NAME} {t.app}
          </h3>
          <div className="mobile-image show-1080">
            <img
              src={mobileAppImageMobile.src}
              alt={PROJECT_NAME + " " + projectGeo + " Mobile"}
              title={PROJECT_NAME + " " + projectGeo + " Mobile"}
              width={mobileAppImageMobile.width}
              height={mobileAppImageMobile.height}
              className="app-image"
              loading="lazy"
            />
          </div>
          <div className="app-buttons">
            <button
              className="app-store"
              onClick={() => {
                if (firstOfferId) {
                  window.open(
                    `/casino/${firstOfferId}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
            >
              <img
                src="/assets/app-store.svg"
                alt="Download on the App Store"
                title={PROJECT_NAME + " " + projectGeo + " in App Store"}
                width={181}
                height={53}
                loading="lazy"
              />
            </button>
            <button
              className="google-play"
              onClick={() => {
                if (firstOfferId) {
                  window.open(
                    `/casino/${firstOfferId}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
            >
              <img
                src="/assets/google-play.svg"
                alt="Download on the Google Play"
                title={PROJECT_NAME + " " + projectGeo + " in Google Play"}
                width={181}
                height={53}
                loading="lazy"
              />
            </button>
          </div>
        </div>

        <div className="mobile-image hide-1080">
          <img
            src={mobileAppImage.src}
            alt={PROJECT_NAME + " " + projectGeo + " Mobile"}
            title={PROJECT_NAME + " " + projectGeo + " Mobile"}
            className="app-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
