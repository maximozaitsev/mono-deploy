import { Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "../components/header/Header";
import WelcomeSection from "../components/welcome/WelcomeSection";
import H1Section from "../components/h1-block/H1Block";
import TopCasinosSection from "../components/top-casinos/TopCasinosSection";
import { fetchGames } from "@/utils/fetchGames";
import { fetchProviders } from "@/utils/fetchProviders";
import { Provider } from "@/types/provider";

// Lazy load non-critical components
const MobileSection = dynamic(() => import("@/components/mobile-version/MobileSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const TopGamesSection = dynamic(() => import("@/components/top-games/TopGamesSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const BonusDetailsSection = dynamic(() => import("@/components/bonus-details/BonusDetailsSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const PaymentMethodsSection = dynamic(() => import("@/components/payment-methods/PaymentMethodSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const LicensesSection = dynamic(() => import("@/components/license/LicensesSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const ProvidersSection = dynamic(() => import("@/components/providers/ProvidersSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const AppSection = dynamic(() => import("@/components/mobile-app/AppSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const FAQSection = dynamic(() => import("@/components/faq/FAQSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const GamesToPlay = dynamic(() => import("@/components/games-to-play/GamesToPlay"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const SupportSection = dynamic(() => import("@/components/support/SupportSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const PromotionsSection = dynamic(() => import("@/components/promotion/PromotionsSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const AdvantageSection = dynamic(() => import("@/components/advantage/AdvantageSection"), {
  loading: () => <div style={{ height: '200px' }} />,
});
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  loading: () => <div style={{ height: '200px' }} />,
});

import "./globals.scss";

export default async function HomePage() {
  const games = await fetchGames("gambling");
  const providers: Provider[] = await fetchProviders();

  return (
    <main>
      <Header />
      <WelcomeSection />
      <H1Section pageKey="home" />
      <TopCasinosSection />
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <BonusDetailsSection />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <MobileSection />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <TopGamesSection games={games} />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <PaymentMethodsSection initialPaymentMethods={[]} />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <LicensesSection />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <ProvidersSection initialProviders={providers} />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <AppSection />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <FAQSection />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <GamesToPlay />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <SupportSection />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <PromotionsSection />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <AdvantageSection />
      </Suspense>
      
      <Suspense fallback={<div style={{ height: '200px' }} />}>
        <Footer />
      </Suspense>
    </main>
  );
}
