// src/components/header/Header.tsx
// Серверный компонент (без "use client")
import dynamic from "next/dynamic";
import { PROJECT_NAME } from "@/config/projectConfig";
import styles from "./Header.module.scss";
import Logo from "./Logo";

// Клиентские острова
const ClientScrollToWelcome = dynamic(() => import("./ClientScrollToWelcome"), {
  ssr: false,
});
const ClientHeaderControls = dynamic(() => import("./ClientHeaderControls"), {
  ssr: false,
});

interface HeaderProps {
  languages: string[];
  defaultLang: string;
  currentLang: string;
}

export default function Header({
  languages = [],
  defaultLang = "en",
  currentLang = "en",
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ClientScrollToWelcome
          ariaLabel={`${PROJECT_NAME} Logo - Scroll to welcome section`}
          className={styles.logoButton}
        >
          <Logo
            desktopSrc="/logo.svg"
            mobileSrc="/logo-mobile.svg"
            alt={`${PROJECT_NAME} Logo`}
          />
        </ClientScrollToWelcome>

        <ClientHeaderControls
          languages={languages}
          defaultLang={defaultLang}
          currentLang={currentLang}
        />
      </nav>
    </header>
  );
}
