"use client";

import { useEffect } from "react";
import { getLocaleMeta } from "@/utils/localeMap";

interface LanguageSetterProps {
  languages: string[];
  defaultLang: string;
}

export default function LanguageSetter({ languages, defaultLang }: LanguageSetterProps) {
  useEffect(() => {
    // Определяем язык из URL
    const pathname = window.location.pathname;
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0] || "";
    
    const currentLang = languages.includes(firstSegment) ? firstSegment : defaultLang;
    const { htmlLang } = getLocaleMeta(currentLang);
    
    // Устанавливаем язык в HTML
    document.documentElement.setAttribute("lang", htmlLang);
    
    console.log("LanguageSetter: pathname=", pathname, "firstSegment=", firstSegment, "currentLang=", currentLang, "htmlLang=", htmlLang);
  }, [languages, defaultLang]);

  return null;
}
