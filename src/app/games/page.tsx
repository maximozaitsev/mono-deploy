// template-multi/src/app/games/page.tsx
import React from "react";
import Header from "@/components/header/Header";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import TopCasinosSection from "@/components/top-casinos/TopCasinosSection";
import Footer from "@/components/footer/Footer";
import siteData from "@/content/siteData.json";
import { PageRenderer } from "@/components/__common__/renderers/PageRenderer";

export const metadata = {
  title: siteData.games.title,
  description: siteData.games.description,
  openGraph: {
    title: siteData.games.title,
    description: siteData.games.description,
  },
  twitter: {
    title: siteData.games.title,
    description: siteData.games.description,
  },
};

export default function GamesPage() {
  const { blocks } = siteData.games;
  return (
    <>
      <Header />
      <WelcomeSection />
      <TopCasinosSection />
      <PageRenderer blocks={blocks} />
      <Footer />
    </>
  );
}
