"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import styles from "./Header.module.scss";
import { useNavigateWithPreloader } from "../../utils/navigationUtils";

const Header = () => {
  const projectName = "Gala Bingo";
  const { handleNavigation } = useNavigateWithPreloader();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToWelcomeSection = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  };

  const handleSignInClick = async () => {
    handleNavigation("/casino", undefined, true);
  };

  const logoPath = isMobile ? "/logo-mobile.svg" : "/logo.svg";

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Logo
          svgPath={logoPath}
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
