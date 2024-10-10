"use client";

import Image from "next/image";
import mobileAppImage from "../../../public/block-images/mobile.webp";
import StarIcon from "../../../public/assets/Vector.png";
import Button from "../../components/__common__/button/Button";
import { useNavigateWithPreloader } from "@/utils/navigationUtils";
import { content } from "@/content/content";

import "./MobileSection.scss";

export default function MobileSection() {
  const { handleNavigation } = useNavigateWithPreloader();

  return (
    <section className="mobile-section">
      <div className="container mobile-content">
        <div className="advantages-block">
          <h3 className="h3-heading">Advantages</h3>
          <ul className="advantages-list">
            {content.advantages.advantages.map((advantage, index) => (
              <li key={index}>
                <Image src={StarIcon} alt="Star" width={30} height={30} />
                {advantage}
              </li>
            ))}
          </ul>
          <Button text="Know more" variant="primary" />
        </div>

        <div className="app-info-block">
          <h3 className="h3-heading">{content.projectName} App</h3>
          <div className="mobile-image show-1080">
            <Image
              src={mobileAppImage}
              alt="Mobile App"
              className="app-image"
              priority
            />
          </div>
          <div className="app-buttons">
            <button
              className="app-store"
              onClick={() => handleNavigation("/casino", undefined, true)}
            >
              <Image
                src="/assets/app-store.svg"
                alt="Download on the App Store"
                width={181}
                height={53}
              />
            </button>
            <button
              className="google-play"
              onClick={() => handleNavigation("/casino", undefined, true)}
            >
              <Image
                src="/assets/google-play.svg"
                alt="Download on the Google Play"
                width={181}
                height={53}
              />
            </button>
          </div>
        </div>

        <div className="mobile-image hide-1080">
          <Image
            src={mobileAppImage}
            alt="Mobile App"
            className="app-image"
            priority
          />
        </div>
      </div>
    </section>
  );
}
