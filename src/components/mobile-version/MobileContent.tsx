"use client";

import mobileAppImage from "../../../public/block-images/phone.webp";
import mobileAppImageMobile from "../../../public/block-images/phone-mobile.webp";
import StarIcon from "../__common__/StarIcon";
import Button from "../__common__/button/Button";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";

interface MobileContentProps {
  advantagesList: string[];
  firstOfferId: number | null;
}

const MobileContent: React.FC<MobileContentProps> = ({ advantagesList, firstOfferId }) => {
  return (
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
          <img
            src={mobileAppImageMobile.src}
            alt={PROJECT_NAME + " " + PROJECT_GEO + " Mobile"}
            title={PROJECT_NAME + " " + PROJECT_GEO + " Mobile"}
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
              title={PROJECT_NAME + " " + PROJECT_GEO + " in App Store"}
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
              title={PROJECT_NAME + " " + PROJECT_GEO + " in Google Play"}
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
          alt={PROJECT_NAME + " " + PROJECT_GEO + " Mobile"}
          title={PROJECT_NAME + " " + PROJECT_GEO + " Mobile"}
          className="app-image"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MobileContent;
