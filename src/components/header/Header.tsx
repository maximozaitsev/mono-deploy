"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useNavigateWithPreloader } from "../../utils/navigationUtils";
import { PROJECT_NAME } from "@/config/projectConfig";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { fetchOffers } from "../../utils/fetchOffers";

const navItems = [
  { label: "Games", path: "/games" },
  { label: "Bonus", path: "/bonus" },
  { label: "App", path: "/app" },
  { label: "Log In", path: "/login" },
];

const Header = () => {
  const { handleNavigation } = useNavigateWithPreloader();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignInClick = async () => {
    const newWindow = window.open(
      "about:blank",
      "_blank",
      "noopener,noreferrer"
    );
    try {
      const { offers } = await fetchOffers();
      const target = offers?.[0];
      if (newWindow && target) {
        newWindow.location.href = `/casino/${target.id}`;
      } else if (newWindow) {
        newWindow.close();
      }
    } catch (error) {
      console.error("Error opening preloader:", error);
      if (newWindow) {
        newWindow.close();
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logoPath = isMobile ? "/logo-mobile.svg" : "/logo.svg";

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {isMobile && (
          <button
            className={`${styles.burger} ${isMenuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        )}

        <Link href="/">
          <Logo
            svgPath={logoPath}
            gradientIdPrefix="header"
            alt={`${PROJECT_NAME} Logo`}
            onClick={() => {}}
          />
        </Link>
        <div className={styles.spacer} />

        {!isMobile && (
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  href={item.path}
                  className={`${styles.navLink} ${
                    pathname === item.path ? styles.activeNavLink : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.headerButtons}>
          <button
            className={`${styles.headerButton} ${styles.playNow}`}
            onClick={handleSignInClick}
          >
            Play Now
          </button>
        </div>

        {isMobile && (
          <div
            className={`${styles.menuItems} ${isMenuOpen ? styles.open : ""}`}
          >
            <ul className={styles.navListMobile}>
              {navItems.map((item) => (
                <li key={item.path} className={styles.navItem}>
                  <Link
                    href={item.path}
                    className={`${styles.navLink} ${
                      pathname === item.path ? styles.activeNavLink : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
