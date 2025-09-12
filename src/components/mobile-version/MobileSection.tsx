"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchOffers } from "@/utils/fetchOffers";
import mobileAppImage from "../../../public/block-images/phone.webp";
import mobileAppImageMobile from "../../../public/block-images/phone-mobile.webp";
import StarIcon from "../__common__/StarIcon";
import Button from "../__common__/button/Button";
import { useNavigateWithPreloader } from "@/utils/navigationUtils";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import { responsiveSizes } from "../../utils/imageOptimization";
import "./MobileSection.scss";

export default function MobileSection() {
  const { handleNavigation } = useNavigateWithPreloader();
  const [advantagesList, setAdvantagesList] = useState<string[]>([]);
  const [firstOfferId, setFirstOfferId] = useState<number | null>(null);

  useEffect(() => {
    import("../../content/content.json")
      .then((data) => {
        const advantagesSections = Object.values(data.advantages) as any[];
        if (advantagesSections.length > 0) {
          // Находим первый блок типа "list"
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
      })
      .catch((error) => console.error("Ошибка загрузки JSON:", error));
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
          <h3 className="h3-heading">Advantages</h3>
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
              text="Know more"
              variant="primary"
              url={`/casino/${firstOfferId}`}
              openInNewTab
            />
          )}
        </div>

        <div className="app-info-block">
          <h3 className="h3-heading">{PROJECT_NAME} App</h3>
          <div className="mobile-image show-1080">
            <Image
              src={mobileAppImageMobile.src}
              alt={PROJECT_NAME + " " + PROJECT_GEO + " Mobile"}
              title={PROJECT_NAME + " " + PROJECT_GEO + " Mobile"}
              width={mobileAppImageMobile.width}
              height={mobileAppImageMobile.height}
              className="app-image"
              quality={85}
              sizes={responsiveSizes.twoColumn}
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
              <Image
                src="/assets/app-store.svg"
                alt="Download on the App Store"
                title={PROJECT_NAME + " " + PROJECT_GEO + " in App Store"}
                width={181}
                height={53}
                quality={100}
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
              <Image
                src="/assets/google-play.svg"
                alt="Download on the Google Play"
                title={PROJECT_NAME + " " + PROJECT_GEO + " in Google Play"}
                width={181}
                height={53}
                quality={100}
              />
            </button>
          </div>
        </div>

        <div className="mobile-image hide-1080">
          <Image
            src={mobileAppImage.src}
            alt={PROJECT_NAME + " " + PROJECT_GEO + " Mobile"}
            title={PROJECT_NAME + " " + PROJECT_GEO + " Mobile"}
            width={mobileAppImage.width}
            height={mobileAppImage.height}
            className="app-image"
            quality={85}
              sizes={responsiveSizes.twoColumn}
          />
        </div>
      </div>
    </section>
  );
}
