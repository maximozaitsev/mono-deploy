import styles from "./WelcomeSection.module.scss";
import DynamicWelcomeCta from "./_client/DynamicWelcomeCta";

export default function WelcomeSection() {
  const baseImage = "/block-images/welcome-mobile.webp";
  const smallImage = `/api/img?src=${encodeURIComponent(baseImage)}&w=390&h=214&f=webp&q=75&fit=cover`;
  const mediumImage = `/api/img?src=${encodeURIComponent(baseImage)}&w=480&h=262&f=webp&q=80&fit=cover`;
  
  return (
    <section id="welcome-section" className={styles.welcomeSection}>
      <figure className={styles.mobileFigure} aria-hidden>
        <picture>
          <source
            media="(max-width: 390px)"
            srcSet={smallImage}
            type="image/webp"
          />
          <source
            media="(max-width: 480px)"
            srcSet={mediumImage}
            type="image/webp"
          />
          <img
            className={styles.mobileImage}
            src={baseImage}
            srcSet={`${smallImage} 390w, ${mediumImage} 480w, ${baseImage} 550w`}
            sizes="(max-width: 390px) 390px, (max-width: 480px) 480px, 550px"
            alt="Welcome Mobile"
            width={550}
            height={302}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
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
