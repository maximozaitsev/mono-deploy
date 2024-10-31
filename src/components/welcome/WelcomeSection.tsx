import Button from "../__common__/button/Button";
import styles from "./WelcomeSection.module.scss";

export default function WelcomeSection() {
  return (
    <section
      id="welcome-section"
      className={`${styles.welcomeSection} section`}
    >
      {" "}
      <div className={styles.additionalBg}></div>
      <div className={styles.welcomeBg}>
        <div className={styles.welcomeHero}></div>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <h2>Welcome Bonus</h2>
              <div>
                <p className={styles.offerText}>
                  Exclusive welcome offer of 2’000{" "}
                </p>
                <p className={styles.bonusText}>
                  Exclusive welcome bonus of 2’000{" "}
                </p>
                <p className={styles.offerText}>AUD and 275 FREE SPINS</p>
                <p className={styles.bonusText}> AUD and 275 FREE SPINS</p>
              </div>
              <Button text="claim bonus" variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
