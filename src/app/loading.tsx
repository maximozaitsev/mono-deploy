"use client";

import Spinner from "@/components/__common__/loader/Spinner";
import HeaderSimple from "@/components/header/HeaderSimple";
import { usePathname } from "next/navigation";
import manifestData from "../../public/content/languages.json";

type LangManifest = { languages: string[]; defaultLang: string };

export default function RootLoading() {
  const pathname = usePathname();
  const { languages = [], defaultLang = "en" } =
    (manifestData as LangManifest) || {};

  const firstSeg = pathname?.split("/").filter(Boolean)[0] || "";
  const currentLang = languages.includes(firstSeg) ? firstSeg : defaultLang;

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderSimple
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
