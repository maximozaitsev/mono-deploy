import Header from "../components/header/Header";
import WelcomeSection from "../components/welcome/WelcomeSection";
import TopCasinosSection from "../components/top-casinos/TopCasinosSection";
import MobileSection from "@/components/mobile-version/MobileSection";
import TopGamesSection from "@/components/top-games/TopGamesSection";
import BonusDetailsSection from "@/components/bonus-details/BonusDetailsSection";
import AboutSection from "@/components/about/AboutSection";
import PaymentMethodsSection from "@/components/payment-methods/PaymentMethodSection";
// import LicensesSection from "@/components/license/LicensesSection";
import ProvidersSection from "@/components/providers/ProvidersSection";
import AppSection from "@/components/mobile-app/AppSection";
import FAQSection from "@/components/faq/FAQSection";
import GamesToPlay from "@/components/games-to-play/GamesToPlay";
import SupportSection from "@/components/support/SupportSection";
import PromotionsSection from "@/components/promotion/PromotionsSection";
import AdvantageSection from "@/components/advantage/AdvantageSection";
import Footer from "@/components/footer/Footer";
import { fetchGames } from "@/utils/fetchGames";
import { fetchProviders } from "@/utils/fetchProviders";
import { Provider } from "@/types/provider";
import { faqs } from "@/components/faq/faqContent";

import "./globals.scss";

export default async function HomePage() {
  const games = await fetchGames("gambling");
  const providers: Provider[] = await fetchProviders();

  return (
    <main>
      <Header />
      <WelcomeSection />
      <TopCasinosSection />
      <BonusDetailsSection />
      <MobileSection />
      <TopGamesSection games={games} />
      <AboutSection />
      <PaymentMethodsSection initialPaymentMethods={[]} />
      {/* <LicensesSection /> */}
      <ProvidersSection initialProviders={providers} />
      <AppSection />
      <FAQSection faqs={faqs} />
      <GamesToPlay />
      <SupportSection />
      <PromotionsSection />
      <AdvantageSection />
      <Footer />
    </main>
  );
}
