"use client";

import React, { useEffect, useRef } from "react";
import { useNavigateWithPreloader } from "../../../utils/navigationUtils";
import "./Button.scss";
import { fetchOffers } from "../../../utils/fetchOffers";

// простой in-memory кэш, чтобы не ждать сеть при каждом клике
let offersCache: Array<{ id: string | number; link?: string }> | null = null;
const getOffersCached = async () => {
  if (offersCache) return offersCache;
  const { offers } = await fetchOffers();
  offersCache = offers ?? [];
  return offersCache;
};

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
  const lastOpenedWinRef = useRef<Window | null>(null);

  // префетчим офферы при маунте, чтобы клики были синхронными
  useEffect(() => {
    getOffersCached().catch(() => {});
  }, []);

  const openCasinoByOfferSync = (desiredLink?: string) => {
    // пытаемся синхронно определить целевой оффер из кэша
    const list = offersCache ?? [];
    const target =
      (desiredLink && list.find((o) => o.link === desiredLink)) ||
      list[0] ||
      null;

    if (target?.id != null) {
      window.open(
        `/casino/${String(target.id)}`,
        "_blank",
        "noopener,noreferrer"
      );
      return true;
    }
    return false;
  };

  const handleClick = async () => {
    if (openInNewTab) {
      if (url?.startsWith("http")) {
        if (onClick) onClick();

        // 1) пытаемся открыть сразу (синхронно) из кэша
        const opened = openCasinoByOfferSync(url);
        if (opened) return;

        // 2) fallback для Safari: открываем вкладку прямо сейчас,
        // затем асинхронно редиректим её, когда дотянем офферы
        const win = window.open("/casino", "_blank", "noopener,noreferrer");
        lastOpenedWinRef.current = win;
        try {
          const offers = await getOffersCached();
          const target =
            (url && offers.find((o) => o.link === url)) || offers[0];
          if (target?.id != null && win) {
            win.location.href = `/casino/${String(target.id)}`;
          }
        } catch (error) {
          console.error("Error fetching offers for new tab:", error);
        }
      } else if (useNavigation && url) {
        // внутренние ссылки можно открывать сразу
        window.open(url, "_blank", "noopener,noreferrer");
      } else if (useNavigation && navigateHome) {
        window.open("/", "_blank", "noopener,noreferrer");
      } else if (useNavigation) {
        // открыть сразу /casino, потом попытаться редиректнуть по офферу (опционально)
        const win = window.open("/casino", "_blank", "noopener,noreferrer");
        lastOpenedWinRef.current = win;
        try {
          const offers = await getOffersCached();
          if (offers.length > 0 && win) {
            win.location.href = `/casino/${String(offers[0].id)}`;
          }
        } catch (error) {
          console.error("Error fetching first offer for new tab:", error);
        }
      } else if (onClick) {
        onClick();
      }
      return;
    }

    // НЕ new tab — оставляем прежнюю логика, но без блокируемых вызовов
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