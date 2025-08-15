"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchOffers } from "../../../utils/fetchOffers";
import Header from "../../../components/header/Header";
import Footer from "@/components/footer/Footer";
import styles from "./PreloaderPage.module.scss";
import manifestData from "../../../../public/content/languages.json";
import { usePathname } from "next/navigation";
import Spinner from "@/components/__common__/loader/Spinner";
import SpinnerGif from "../../../../public/assets/loader-light.gif";

type LangManifest = { languages: string[]; defaultLang: string };
const manifest = manifestData as LangManifest;

const PreloaderPage = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const firstSeg = pathname?.split("/").filter(Boolean)[0] || "";
  const currentLang = manifest.languages.includes(firstSeg)
    ? firstSeg
    : manifest.defaultLang;

  useEffect(() => {
    async function redirectToOffer() {
      try {
        const { offers } = await fetchOffers();

        if (offers.length > 0) {
          let targetOfferLink;

          if (id) {
            const offer = offers.find((o) => o.id === Number(id));
            if (offer) {
              targetOfferLink = offer.link;
            } else {
              console.error(
                "Offer with this ID not found, redirecting to the first offer"
              );
              targetOfferLink = offers[0].link;
            }
          } else {
            targetOfferLink = offers[0].link;
          }

          await new Promise((resolve) => setTimeout(resolve, 1500));

          if (targetOfferLink) {
            window.location.replace(targetOfferLink);
          }
        } else {
          console.error("No offers available");
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    }

    redirectToOffer();
  }, [id]);

  return (
    <div className={styles.preloaderPage}>
      <Header
        languages={(manifestData as any).languages || []}
        defaultLang={(manifestData as any).defaultLang || "en"}
        currentLang={currentLang}
      />
      <div className={styles.spinnerContainer}>
        <Spinner variant="inline" size={96} />
      </div>
      <Footer />
    </div>
  );
};

export default PreloaderPage;
