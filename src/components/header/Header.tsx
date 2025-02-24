"use client";

import React from "react";
import Logo from "./Logo";
import styles from "./Header.module.scss";
import { useNavigateWithPreloader } from "../../utils/navigationUtils";

const Header = () => {
  const { handleNavigation } = useNavigateWithPreloader();

  const scrollToWelcomeSection = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  };

  const handleSignInClick = async () => {
    handleNavigation("/casino", undefined, true);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Logo
          svgPath="/logo.svg"
          gradientIdPrefix="header"
          onClick={scrollToWelcomeSection}
        />

        <div className={styles.headerButtons}>
          <button
            className={`${styles.headerButton} ${styles.logIn}`}
            onClick={handleSignInClick}
          >
            Sign up
          </button>
          <button
            className={`${styles.headerButton} ${styles.signUp}`}
            onClick={handleSignInClick}
          >
            Play now
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
