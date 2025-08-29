"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [offerId, setOfferId] = useState<string>("");
  const pathname = usePathname();

  // держим ссылку на последнюю открытую вкладку для возможного редиректа
  const lastOpenedWinRef = useRef<Window | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    // префетчим офферы заранее, чтобы к моменту клика у нас был id
    (async () => {
      try {
        const { offers } = await fetchOffers();
        const first = offers?.[0];
        setOfferId(first && first.id != null ? String(first.id) : "");
      } catch (e) {
        console.error("Failed to prefetch offers in header:", e);
      }
    })();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignInClick = async () => {
    // ВАЖНО: window.open вызываем синхронно в ответ на клик (popup-safe).
    // Если id уже известен — открываем сразу конечный URL.
    // Если нет — открываем промежуточно /casino и позже редиректим.
    try {
      if (offerId) {
        window.open(`/casino/${offerId}`, "_blank", "noopener,noreferrer");
        return;
      }

      // fallback: открываем окно сразу, чтобы Safari не заблокировал,
      // а потом пытаемся узнать оффер и редиректим это же окно.
      const win = window.open("/casino", "_blank", "noopener,noreferrer");
      lastOpenedWinRef.current = win;

      // пробуем дотянуть офферы ещё раз (может не успели на маунте)
      try {
        const { offers } = await fetchOffers();
        const first = offers?.[0];
        if (first?.id != null && win) {
          win.location.href = `/casino/${String(first.id)}`;
        }
      } catch (e) {
        // ничего — останется просто /casino
        console.error("Failed to fetch offers after opening window:", e);
      }
    } catch (error) {
      console.error("Error opening Play Now:", error);
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
