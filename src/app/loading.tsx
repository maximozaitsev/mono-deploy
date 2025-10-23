"use client";

import Spinner from "@/components/__common__/loader/Spinner";
import Header from "@/components/header/Header";
import { usePathname } from "next/navigation";
import { locales as languages, defaultLocale } from "@/config/i18n";

export default function RootLoading() {
  const pathname = usePathname();
  const defaultLang = defaultLocale;

  const firstSeg = pathname?.split("/").filter(Boolean)[0] || "";
  const currentLang = languages.includes(firstSeg as any) ? firstSeg : defaultLang;

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        languages={languages}
        defaultLang={defaultLang}
        currentLang={currentLang}
      />
      <div
        style={{
          flex: 1,
          position: "relative",
          minHeight: 0,
          padding: "2rem 1rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "100%",
            pointerEvents: "none",
          }}
        >
          <Spinner variant="inline" size={96} />
        </div>
      </div>
    </div>
  );
}
