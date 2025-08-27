// серверный компонент
import WelcomeCTA from "@/components/welcome/WelcomeCTA";
import styles from "./WelcomeSection.module.scss";

export default function WelcomeSection() {
  return (
    <section
      id="welcome-section"
      className={`${styles.welcomeSection} section`}
    >
      {/* MOBILE-FIRST: видна сразу */}
      <figure
        className={styles.mobileFigure}
        aria-hidden
        style={{ width: "min(100vw, 576px)", margin: "8px auto 0" }}
      >
        <img
          className={styles.mobileImage}
          src="/block-images/welcome-mobile.webp"
          alt="Welcome Mobile"
          width={576}
          height={315}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </figure>

      {/* Десктопный фон задаётся в SCSS */}
      <div className={styles.welcomeBg}>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <WelcomeCTA />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
