"use client";

import {useEffect} from "react";
import {getLocaleMeta} from "@/utils/localeMap";

export default function HtmlLangSync() {
  useEffect(() => {
    try {
      const seg = window.location.pathname.split("/").filter(Boolean)[0]?.toLowerCase() || "";
      const {htmlLang} = getLocaleMeta(seg || "en");
      document.documentElement.setAttribute("lang", htmlLang);
      // Also set NEXT_LOCALE cookie for subsequent SSR requests
      document.cookie = `NEXT_LOCALE=${seg || "en"}; path=/`;
    } catch {}
  }, []);
  return null;
}


