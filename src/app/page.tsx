"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { fetchOffers } from "@/utils/fetchOffers";
import { fetchGames } from "@/utils/fetchGames";
import { fetchProviders } from "@/utils/fetchProviders";
import { fetchPayments } from "@/utils/fetchPayments";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import H1Block from "@/components/h1-block/H1Block";

// Lazy load non-critical components
const TopCasinosSection = dynamic(() => import("@/components/top-casinos/TopCasinosSection"), {
  loading: () => <div style={{ minHeight: '400px', background: '#1e1e20' }} />,
  ssr: false
});

const TopGamesSection = dynamic(() => import("@/components/top-games/TopGamesSection"), {
  loading: () => <div style={{ minHeight: '300px', background: '#1e1e20' }} />,
  ssr: false
});

const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const MobileSection = dynamic(() => import("@/components/mobile-version/MobileSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const AppSection = dynamic(() => import("@/components/mobile-app/AppSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const AdvantageSection = dynamic(() => import("@/components/advantage/AdvantageSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const PaymentMethodSection = dynamic(() => import("@/components/payment-methods/PaymentMethodSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const ProvidersSection = dynamic(() => import("@/components/providers/ProvidersSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const BonusDetailsSection = dynamic(() => import("@/components/bonus-details/BonusDetailsSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const PromotionsSection = dynamic(() => import("@/components/promotion/PromotionsSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const LicensesSection = dynamic(() => import("@/components/license/LicensesSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const SupportSection = dynamic(() => import("@/components/support/SupportSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const FAQSection = dynamic(() => import("@/components/faq/FAQSection"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

const Footer = dynamic(() => import("@/components/footer/Footer"), {
  loading: () => <div style={{ minHeight: '200px', background: '#1e1e20' }} />,
  ssr: false
});

// Critical CSS for layout
const layoutCSS = `
  body {
    margin: 0;
    padding: 0;
    background: #1e1e20;
    color: #ffffff;
    font-family: var(--font-primary), Arial, sans-serif;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .section {
    padding: 40px 0;
  }
  @media (max-width: 768px) {
    .section {
      padding: 20px 0;
    }
  }
`;

export default function HomePageOptimized() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: layoutCSS }} />
      <main>
        {/* Critical above-the-fold content */}
        <WelcomeSection />
        <H1Block />
        
        {/* Lazy loaded content */}
        <Suspense fallback={<div style={{ minHeight: '400px', background: '#1e1e20' }} />}>
          <TopCasinosSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '300px', background: '#1e1e20' }} />}>
          <TopGamesSection games={[]} />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <MobileSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <AppSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <AdvantageSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <PaymentMethodSection initialPaymentMethods={[]} />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <ProvidersSection initialProviders={[]} />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <BonusDetailsSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <PromotionsSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <LicensesSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <SupportSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <FAQSection />
        </Suspense>
        
        <Suspense fallback={<div style={{ minHeight: '200px', background: '#1e1e20' }} />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
