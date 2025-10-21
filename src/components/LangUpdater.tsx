"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { applyLocaleToDOM } from "@/utils/i18n";

export default function LangUpdater({ languages }: { languages: string[] }) {
  const pathname = usePathname();

  useEffect(() => {
    const langFromPath = pathname.split("/").filter(Boolean)[0] || "";
    if (languages.includes(langFromPath)) {
      applyLocaleToDOM(langFromPath);
    }
  }, [pathname, languages]);

  return null;
}

