"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LangUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    const urlLang = pathname.split("/").filter(Boolean)[0] || "";
    
    // Hardcoded language mapping
    let htmlLang = "en-US"; // default
    if (urlLang === "de") htmlLang = "de-DE";
    else if (urlLang === "es") htmlLang = "es-ES";
    else if (urlLang === "fr") htmlLang = "fr-FR";
    else if (urlLang === "it") htmlLang = "it-IT";
    
    // Update the html lang attribute after hydration
    document.documentElement.setAttribute("lang", htmlLang);
    
    console.log("LangUpdater:", { pathname, urlLang, htmlLang });
  }, [pathname]);

  return null;
}
