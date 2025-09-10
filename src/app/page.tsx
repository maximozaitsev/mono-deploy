import dynamic from "next/dynamic";
import Header from "../components/header/Header";
import WelcomeSection from "../components/welcome/WelcomeSection";
import H1Section from "../components/h1-block/H1Block";
import TopCasinosSection from "../components/top-casinos/TopCasinosSection";
import BonusDetailsSection from "../components/bonus-details/BonusDetailsSection";
import { fetchGames } from "@/utils/fetchGames";
import { fetchProviders } from "@/utils/fetchProviders";
import { fetchOffers } from "@/utils/fetchOffers";
import { Provider } from "@/types/provider";

// Lazy load components that are below the fold
const MobileSection = dynamic(() => import("@/components/mobile-version/MobileSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const TopGamesSection = dynamic(() => import("@/components/top-games/TopGamesSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const PaymentMethodsSection = dynamic(() => import("@/components/payment-methods/PaymentMethodSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const LicensesSection = dynamic(() => import("@/components/license/LicensesSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const ProvidersSection = dynamic(() => import("@/components/providers/ProvidersSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const AppSection = dynamic(() => import("@/components/mobile-app/AppSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const FAQSection = dynamic(() => import("@/components/faq/FAQSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const GamesToPlay = dynamic(() => import("@/components/games-to-play/GamesToPlay"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const SupportSection = dynamic(() => import("@/components/support/SupportSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const PromotionsSection = dynamic(() => import("@/components/promotion/PromotionsSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const AdvantageSection = dynamic(() => import("@/components/advantage/AdvantageSection"), {
  loading: () => <div style={{ height: "200px" }} />,
});
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  loading: () => <div style={{ height: "200px" }} />,
});

import "./globals.scss";

export default async function HomePage() {
  const games = await fetchGames("gambling");
  const providers: Provider[] = await fetchProviders();
  const { offers } = await fetchOffers();

  return (
    <main>
      <Header />
      <WelcomeSection />
      <H1Section pageKey="home" />
      <TopCasinosSection />
      <BonusDetailsSection offers={offers} />
      <MobileSection />
      <TopGamesSection games={games} />
      <AboutSection />
      <PaymentMethodsSection initialPaymentMethods={[]} />
      <LicensesSection />
      <ProvidersSection initialProviders={providers} />
      <AppSection />
      <FAQSection />
      <GamesToPlay />
      <SupportSection />
      <PromotionsSection />
      <AdvantageSection />
      <Footer />
    </main>
  );
}
