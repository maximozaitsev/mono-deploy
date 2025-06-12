// template-multi/src/app/login/page.tsx
import React from "react";
import Header from "@/components/header/Header";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import TopCasinosSection from "@/components/top-casinos/TopCasinosSection";
import Footer from "@/components/footer/Footer";
import siteData from "@/content/siteData.json";
import { PageRenderer } from "@/components/PageRenderer";

export const metadata = {
  title: siteData.login.title,
  description: siteData.login.description,
  openGraph: {
    title: siteData.login.title,
    description: siteData.login.description,
  },
  twitter: {
    title: siteData.login.title,
    description: siteData.login.description,
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
