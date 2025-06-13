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
  openGraph: {
    title: siteData.bonus.title,
    description: siteData.bonus.description,
  },
  twitter: {
    title: siteData.bonus.title,
    description: siteData.bonus.description,
  },
};

export default function LoginPage() {
  const { blocks } = siteData.bonus;
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
