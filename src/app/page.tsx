import Header from "../components/header/Header";
import WelcomeSection from "../components/welcome/WelcomeSection";
import H1Section from "../components/h1-block/H1Block";
import TopCasinosSection from "../components/top-casinos/TopCasinosSection";
import TopGamesSection from "@/components/top-games/TopGamesSection";
import BonusDetailsSection from "@/components/bonus-details/BonusDetailsSection";
import AboutSection from "@/components/about/AboutSection";
import LoginSection from "@/components/login/LoginSection";
import AppSectionWrapper from "@/components/mobile-app/AppSectionWrapper";
import FAQSection from "@/components/faq/FAQSection";
import GamesToPlay from "@/components/games-to-play/GamesToPlay";
import SupportSection from "@/components/support/SupportSection";
import PromotionsSection from "@/components/promotion/PromotionsSection";
import AdvantageSection from "@/components/advantage/AdvantageSection";
import Footer from "@/components/footer/Footer";
import { fetchGames } from "@/utils/fetchGames";

import "./globals.scss";

export default async function HomePage() {
  const games = await fetchGames("gambling");

  return (
    <main>
      <Header />
      <WelcomeSection />
      <H1Section pageKey="home" />
      <TopCasinosSection />
      <BonusDetailsSection />
      <AboutSection />
      <TopGamesSection games={games} />
      <AdvantageSection />
      <LoginSection />
      <AppSectionWrapper />
      <FAQSection />
      <GamesToPlay />
      <SupportSection />
      <PromotionsSection />
      <Footer />
    </main>
  );
}
