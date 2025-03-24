"use client";

import { useEffect, useState } from "react";
import mobileAppImage from "../../../public/block-images/phone.webp";
import mobileAppImageMobile from "../../../public/block-images/phone-mobile.webp";
import StarIcon from "../__common__/StarIcon";
import Button from "../__common__/button/Button";
import { useNavigateWithPreloader } from "@/utils/navigationUtils";

import "./MobileSection.scss";

export default function MobileSection() {
  const { handleNavigation } = useNavigateWithPreloader();
  const [advantagesList, setAdvantagesList] = useState<string[]>([]);
  const projectName = "The Crown Casino";

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
          <Button text="Know more" variant="primary" />
        </div>

        <div className="app-info-block">
          <h3 className="h3-heading">{projectName} App</h3>
          <div className="mobile-image show-1080">
            <img
              src={mobileAppImageMobile.src}
              alt={projectName + " Mobile"}
              width={mobileAppImageMobile.width}
              height={mobileAppImageMobile.height}
              className="app-image"
              loading="lazy"
            />
          </div>
          <div className="app-buttons">
            <button
              className="app-store"
              onClick={() => handleNavigation("/casino", undefined, true)}
            >
              <img
                src="/assets/app-store.svg"
                alt="Download on the App Store"
                width={181}
                height={53}
                loading="lazy"
              />
            </button>
            <button
              className="google-play"
              onClick={() => handleNavigation("/casino", undefined, true)}
            >
              <img
                src="/assets/google-play.svg"
                alt="Download on the Google Play"
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
            alt={projectName + " Mobile"}
            className="app-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
