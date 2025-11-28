import styles from "./WelcomeSection.module.scss";
import DynamicWelcomeCta from "./_client/DynamicWelcomeCta";

export default function WelcomeSection() {
  return (
    <section id="welcome-section" className={styles.welcomeSection}>
      <figure className={styles.mobileFigure} aria-hidden>
        <img
          className={styles.mobileImage}
          src="/block-images/welcome-mobile.webp"
          alt="Welcome Mobile"
          loading="eager"
          decoding="async"
          fetchPriority="high"
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
