"use client";

import React from "react";
import Logo from "./Logo";
import styles from "./Header.module.scss";
import { useNavigateWithPreloader } from "../../utils/navigationUtils";

const Header = () => {
  const projectName = "GW Casino";
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
          alt={`${projectName} Logo`}
        />

        <div className={styles.headerButtons}>
          <button
            className={`${styles.headerButton} ${styles.logIn}`}
            onClick={handleSignInClick}
          >
            Log In
          </button>
          <button
            className={`${styles.headerButton} ${styles.signUp}`}
            onClick={handleSignInClick}
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
