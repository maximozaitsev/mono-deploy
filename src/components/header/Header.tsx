"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import styles from "./Header.module.scss";
import { useNavigateWithPreloader } from "../../utils/navigationUtils";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleNavigation } = useNavigateWithPreloader();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleResize = () => {
    const isMobileView = window.innerWidth <= 768;

    if (!isMobileView) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToWelcomeSection = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
    closeMenu();
  };

  const handleSignInClick = async () => {
    handleNavigation("/casino", closeMenu, true);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.navbar}`}>
        <Logo onClick={scrollToWelcomeSection} />

        <button
          className={`${styles["burger-menu"]} ${menuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className={styles["burger-lines"]}></span>
        </button>

        <ul className={`${styles["nav-links"]} ${menuOpen ? styles.open : ""}`}>
          <NavItem
            href="/"
            label="Main"
            closeMenu={scrollToWelcomeSection}
            isScrollToTop={true}
          />

          <NavItem href="/#games" label="Games" closeMenu={closeMenu} />
          <NavItem href="/#bonuses" label="Bonuses" closeMenu={closeMenu} />
          <NavItem
            href="/#mobile"
            label="Mobile Version"
            closeMenu={closeMenu}
          />
          <li>
            <a
              href="/casino"
              onClick={(e) => {
                e.preventDefault();
                handleSignInClick();
              }}
            >
              Sign In
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const NavItem = ({
  href,
  label,
  closeMenu,
  isScrollToTop = false,
}: {
  href: string;
  label: string;
  closeMenu: () => void;
  isScrollToTop?: boolean;
}) => (
  <li>
    <a
      href={href}
      onClick={(e) => {
        if (isScrollToTop) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.replaceState(null, "", window.location.pathname);
        }
        closeMenu();
      }}
    >
      {label}
    </a>
  </li>
);

export default Header;
