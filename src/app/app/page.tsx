// template-multi/src/app/login/page.tsx
import React from "react";
import Header from "@/components/header/Header";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import TopCasinosSection from "@/components/top-casinos/TopCasinosSection";
import Footer from "@/components/footer/Footer";
import siteData from "@/content/siteData.json";
import { PageRenderer } from "@/components/__common__/renderers/PageRenderer";

export const metadata = {
  title: siteData.app.title,
  description: siteData.app.description,
  openGraph: {
    title: siteData.app.title,
    description: siteData.app.description,
    images: [`https://${process.env.NEXT_PUBLIC_SITE_URL}/og-image.webp`],
  },
  twitter: {
    title: siteData.app.title,
    description: siteData.app.description,
    images: [`https://${process.env.NEXT_PUBLIC_SITE_URL}/og-image.webp`],
  },
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_SITE_URL}/app`,
  },
};

export default function LoginPage() {
  const { blocks } = siteData.app;
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
