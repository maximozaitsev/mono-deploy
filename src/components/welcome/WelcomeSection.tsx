import Button from "../__common__/button/Button";
import styles from "./WelcomeSection.module.scss";

type WelcomeSectionProps = {
  welcomeBonus: string;
};

export default function WelcomeSection({ welcomeBonus }: WelcomeSectionProps) {
  return (
    <section
      id="welcome-section"
      className={`${styles.welcomeSection} section`}
    >
      <div className={styles.additionalBg}></div>
      <div className={styles.welcomeBg}>
        <div className={styles.welcomeHero}></div>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <h2>Welcome Bonus</h2>
              <p>Exclusive welcome offer of {welcomeBonus}</p>
              <Button text="claim bonus" variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
