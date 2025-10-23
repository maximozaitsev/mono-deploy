"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {getLocaleMeta} from "@/utils/localeMap";

export default function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const seg = (pathname || "/").split("/").filter(Boolean)[0]?.toLowerCase() || "";
      const {htmlLang} = getLocaleMeta(seg || "en");
      document.documentElement.setAttribute("lang", htmlLang);
      document.cookie = `NEXT_LOCALE=${seg || "en"}; path=/`;
    } catch {}
  }, [pathname]);

  return null;
}


