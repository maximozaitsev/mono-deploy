"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleMeta } from "@/utils/localeMap";

interface HtmlLangSyncProps {
  defaultLocale?: string;
}

export default function HtmlLangSync({ defaultLocale = "en" }: HtmlLangSyncProps) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const seg =
        (pathname || "/").split("/").filter(Boolean)[0]?.toLowerCase() || "";
      const locale = seg || defaultLocale;
      const { htmlLang } = getLocaleMeta(locale);
      document.documentElement.setAttribute("lang", htmlLang);
      document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    } catch {}
  }, [pathname, defaultLocale]);

  return null;
}
