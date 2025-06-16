import React from "react";
import { Metadata } from "next";
import Header from "@/components/header/Header";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import TopCasinosSection from "@/components/top-casinos/TopCasinosSection";
import Footer from "@/components/footer/Footer";
import siteData from "@/content/siteData.json";
import { PageRenderer } from "@/components/__common__/renderers/PageRenderer";
import { PROJECT_URL, PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${PROJECT_URL}`),
  title: siteData.login.title,
  description: siteData.login.description,
  alternates: {
    canonical: `https://${PROJECT_URL}/login`,
  },

  openGraph: {
    title: siteData.login.title,
    description: siteData.login.description,
    url: `https://${PROJECT_URL}/login`,
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
    title: siteData.login.title,
    description: siteData.login.description,
    images: [`https://${PROJECT_URL}/og-image.webp`],
  },
};

export default function LoginPage() {
  const { blocks } = siteData.login;
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
