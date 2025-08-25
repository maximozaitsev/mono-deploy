"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";
import { fetchOffers } from "@/utils/fetchOffers";
import Spinner from "@/components/__common__/loader/Spinner";
import manifestData from "../../../../public/content/languages.json";

const Header = dynamic(() => import("@/components/header/Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

type LangManifest = { languages: string[]; defaultLang: string };
const manifest = manifestData as LangManifest;

export default function PreloaderPage() {
  const { id } = useParams();
  const pathname = usePathname();
  const firstSeg = pathname?.split("/").filter(Boolean)[0] || "";
  const currentLang = manifest.languages.includes(firstSeg)
    ? firstSeg
    : manifest.defaultLang;

  useEffect(() => {
    let cancelled = false;

    async function redirectToOffer() {
      try {
        const { offers } = await fetchOffers();
        if (!offers?.length) return;

        let targetOfferLink = offers[0].link;
        if (id) {
          const found = offers.find((o) => o.id === Number(id));
          if (found?.link) targetOfferLink = found.link;
        }
        await new Promise((r) => setTimeout(r, 600));

        if (!cancelled && targetOfferLink) {
          window.location.replace(targetOfferLink);
        }
      } catch (error) {
        console.error("Preloader redirect error:", error);
      }
    }

    redirectToOffer();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div
      style={{
        height: "calc(100vh + 268px)",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
      }}
    >
      <Header
        languages={manifest.languages || []}
        defaultLang={manifest.defaultLang || "en"}
        currentLang={currentLang}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
        }}
        aria-live="polite"
        aria-busy="true"
      >
        <Spinner variant="inline" size={96} />
      </div>
      <Footer />
    </div>
  );
}
