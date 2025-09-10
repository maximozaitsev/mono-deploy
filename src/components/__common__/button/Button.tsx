"use client";

import React from "react";
import { useNavigateWithPreloader } from "../../../utils/navigationUtils";
import "./Button.scss";
import { fetchOffers } from "../../../utils/fetchOffers";

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
      {text}
    </button>
  );
};

export default Button;
