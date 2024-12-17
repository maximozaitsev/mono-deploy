"use client";

import Image from "next/image";
import AppImage from "../../../public/block-images/app.webp";
import AppImageMobile from "../../../public/block-images/app-mobile.webp";
import TwoColumns from "../__common__/two-columns/TwoColumns";
import { useNavigateWithPreloader } from "@/utils/navigationUtils";
import { content } from "@/content/content";

import styles from "./AppSection.module.scss";

export default function AppSection() {
  const { handleNavigation } = useNavigateWithPreloader();

  return (
    <section id="mobile" className={`${styles.appSection} section`}>
      <div className="container">
        <div className={styles.topRow}>
          <div className={styles.textBlock}>
            <h3 className="h3-heading">{content.app.title}</h3>
            <Image
              src={AppImageMobile}
              alt="App preview"
              className={styles.imageMobile}
              quality={100}
            />
            <p className="paragraph-text">{content.app.text[0]}</p>
            <div className={styles.buttons}>
              <button
                className="google-play"
                onClick={() => handleNavigation("/casino", undefined, true)}
              >
                <Image
                  src="/assets/google-play.svg"
                  alt="Download on the Google Play"
                  width={175}
                  height={53}
                  quality={100}
                />
              </button>
              <button
                className="app-store"
                onClick={() => handleNavigation("/casino", undefined, true)}
              >
                <Image
                  src="/assets/app-store.svg"
                  alt="Download on the App Store"
                  width={175}
                  height={53}
                  quality={100}
                />
              </button>
            </div>
          </div>
          <div className={styles.imageBlock}>
            <Image src={AppImage} alt="App preview" className={styles.image} />
          </div>
        </div>
        <TwoColumns
          leftColumnContent={[
            {
              heading: content.app.languages,
              items: [
                {
                  type: "text",
                  content: content.app.languagesText[0],
                },
              ],
            },
          ]}
          rightColumnContent={[
            {
              heading: content.app.currencies,
              items: [
                {
                  type: "text",
                  content: content.app.currenciesText[0],
                },
              ],
            },
          ]}
          columnGap="48px"
        />
      </div>
    </section>
  );
}
