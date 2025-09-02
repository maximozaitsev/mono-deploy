"use client";

import React from "react";
import { usePathname } from "next/navigation";
import staticTranslations from "@/../public/content/static.json";
import languages from "@/../public/content/languages.json";
import { useNavigateWithPreloader } from "../../../utils/navigationUtils";
import "./Button.scss";
import { fetchOffers } from "../../../utils/fetchOffers";

type LanguagesManifest = { languages: string[]; defaultLang: string };
const manifest = languages as LanguagesManifest;
const translations = staticTranslations as Record<
  string,
  Record<string, string>
>;

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  navigateHome?: boolean;
  useNavigation?: boolean;
  url?: string;
  openInNewTab?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  navigateHome = false,
  useNavigation = true,
  openInNewTab = false,
  url,
}) => {
  const { handleNavigation } = useNavigateWithPreloader();

  const pathname = usePathname();
  let currentLang: string = manifest.defaultLang || "en";
  if (pathname) {
    const parts = pathname.split("/").filter(Boolean);
    const maybeLang = parts[0];
    if (manifest.languages.includes(maybeLang)) {
      currentLang = maybeLang;
    }
  }
  const displayText = translations[currentLang]?.[text] ?? text;

  const handleClick = async () => {
    if (openInNewTab) {
      if (url?.startsWith("http")) {
        if (onClick) onClick();
        try {
          const { offers } = await fetchOffers();
          const targetOffer = offers.find((o) => o.link === url) || offers[0];
          window.open(
            `/casino/${targetOffer.id}`,
            "_blank",
            "noopener,noreferrer"
          );
        } catch (error) {
          console.error("Error fetching offers for new tab:", error);
        }
      } else if (useNavigation && url) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else if (useNavigation && navigateHome) {
        window.open("/", "_blank", "noopener,noreferrer");
      } else if (useNavigation) {
        try {
          const { offers } = await fetchOffers();
          if (offers.length > 0) {
            window.open(
              `/casino/${offers[0].id}`,
              "_blank",
              "noopener,noreferrer"
            );
          }
        } catch (error) {
          console.error("Error fetching first offer for new tab:", error);
        }
      } else if (onClick) {
        onClick();
      }
      return;
    }

    if (url?.startsWith("http")) {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.click();
      return;
    } else if (useNavigation && url) {
      handleNavigation(url, onClick);
    } else if (useNavigation && navigateHome) {
      handleNavigation("/", onClick);
    } else if (useNavigation) {
      handleNavigation("/casino", onClick, true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`button ${variant}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {displayText}
    </button>
  );
};

export default Button;
