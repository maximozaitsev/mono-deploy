"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchOffers } from "../../../utils/fetchOffers";
import Header from "../../../components/header/Header";
import Footer from "@/components/footer/Footer";
import "../../../components/header/Header.module.scss";
import styles from "./PreloaderPage.module.scss";
import Spinner from "@/components/__common__/loader/Spinner";

const PreloaderPage = () => {
  const { id } = useParams();

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
      <Header />
      <div className={styles.spinnerContainer}>
        <Spinner variant="inline" size={96} />
      </div>
      <Footer />
    </div>
  );
};

export default PreloaderPage;
