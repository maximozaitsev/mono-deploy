"use client";

import React from "react";
import { useNavigateWithPreloader } from "../../../utils/navigationUtils";
import "./Button.scss";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  navigateHome?: boolean;
  useNavigation?: boolean;
  url?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  navigateHome = false,
  useNavigation = true,
  url,
}) => {
  const { handleNavigation } = useNavigateWithPreloader();

  const handleClick = () => {
    if (url?.startsWith("http")) {
      const a = document.createElement("a");
      a.href = url;
      a.rel = "noopener noreferrer";
      a.click();
    } else if (useNavigation && url) {
      handleNavigation(url, onClick);
    } else if (useNavigation && navigateHome) {
      handleNavigation("/", onClick);
    } else if (useNavigation) {
      handleNavigation("/casino", onClick, true); // Set true to navigate to the first offer
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
