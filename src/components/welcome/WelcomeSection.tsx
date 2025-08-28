// src/components/welcome/WelcomeSection.tsx
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./WelcomeSection.module.scss";
import mobileImg from "../../../public/block-images/welcome-mobile.webp";

const WelcomeBonusClient = dynamic(() => import("./WelcomeBonusClient"), {
  ssr: false,
});

export default function WelcomeSection() {
  return (
    <section
      id="welcome-section"
      className={`${styles.welcomeSection} section`}
    >
      <figure className={styles.mobileFigure} aria-hidden>
        <Image
          className={styles.mobileImage}
          src={mobileImg}
          alt="Welcome Mobile"
          sizes="(max-width: 768px) 100vw, 0"
          unoptimized
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
        />
      </figure>

      <div className={styles.welcomeBg}>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <WelcomeBonusClient />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
