import Image from "next/image";
import styles from "./WelcomeSection.module.scss";
import WelcomeMobile from "../../../public/block-images/welcome-mobile.webp";
import DynamicWelcomeCta from "./_client/DynamicWelcomeCta";

export default function WelcomeSection() {
  return (
    <section id="welcome-section" className={styles.welcomeSection}>
      <figure className={styles.mobileFigure} aria-hidden>
        <Image
          className={styles.mobileImage}
          src={WelcomeMobile}
          alt="Welcome Mobile"
          priority
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 520px, 0px"
          placeholder="empty"
          quality={80}
        />
      </figure>

      <div className={styles.welcomeBg}>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <DynamicWelcomeCta />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
