// template-multi/src/app/login/page.tsx
import React from "react";
import Header from "@/components/header/Header";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import TopCasinosSection from "@/components/top-casinos/TopCasinosSection";
import Footer from "@/components/footer/Footer";
import siteData from "@/content/siteData.json";
import { PageRenderer } from "@/components/__common__/renderers/PageRenderer";

export const metadata = {
  title: siteData.bonus.title,
  description: siteData.bonus.description,
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_SITE_URL}/login`,
  },
  openGraph: {
    title: siteData.bonus.title,
    description: siteData.bonus.description,
    images: [
      {
        url: `https://${process.env.NEXT_PUBLIC_SITE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: siteData.bonus.title,
      },
    ],
  },
  twitter: {
    title: siteData.bonus.title,
    description: siteData.bonus.description,
    images: [`https://${process.env.NEXT_PUBLIC_SITE_URL}/og-image.webp`],
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
