"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Logo from "./Logo";
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
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [offerId, setOfferId] = useState("");
  const [offerLink, setOfferLink] = useState("");
  const pathname = usePathname();

  // Memoize resize handler
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Memoize offer fetching
  const fetchOffersData = useCallback(async () => {
    try {
      const { offers } = await fetchOffers();
      const first = offers?.[0];
      setOfferId(first && first.id != null ? String(first.id) : "");
      setOfferLink(first?.link || "");
    } catch (e) {
      console.error("Failed to prefetch offers in header:", e);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    fetchOffersData();

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, fetchOffersData]);

  const handleSignInClick = useCallback(() => {
    try {
      window.open(`/casino/${offerId}`, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening Play Now:", error);
    }
  }, [offerId]);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  
  // Memoize logo path
  const logoPath = useMemo(() => isMobile ? "/logo-mobile.svg" : "/logo.svg", [isMobile]);

  const handleLogoClick: React.MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    if (pathname === "/") {
      e.preventDefault();
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

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
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label={`${PROJECT_NAME} home`}
        >
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
