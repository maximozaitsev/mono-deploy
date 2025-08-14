import React from "react";
import { Metadata } from "next";
import Header from "@/components/header/Header";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import H1Section from "@/components/h1-block/H1Block";
import TopCasinosSection from "@/components/top-casinos/TopCasinosSection";
import Footer from "@/components/footer/Footer";
import siteData from "@/content/siteData.json";
import { PageRenderer } from "@/components/__common__/renderers/PageRenderer";
import { PROJECT_URL, PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${PROJECT_URL}`),
  title: siteData.games.title,
  description: siteData.games.description,
  alternates: {
    canonical: `https://${PROJECT_URL}/games`,
  },

  openGraph: {
    title: siteData.games.title,
    description: siteData.games.description,
    url: `https://${PROJECT_URL}/games`,
    siteName: PROJECT_NAME,
    images: [
      {
        url: `https://${PROJECT_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: `${PROJECT_NAME} ${PROJECT_GEO}`,
      },
    ],
  },
  twitter: {
    title: siteData.games.title,
    description: siteData.games.description,
    images: [`https://${PROJECT_URL}/og-image.webp`],
  },
};

export default function LoginPage() {
  const { blocks } = siteData.games;
  return (
    <>
      <Header />
      <WelcomeSection />
      <H1Section blocks={blocks} />
      <TopCasinosSection />
      <PageRenderer blocks={blocks} pageKey="games" />
      <Footer />
    </>
  );
}
