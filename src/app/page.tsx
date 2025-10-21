import Header from "@/components/header/Header";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import H1Section from "@/components/h1-block/H1Block";
import TopCasinosSection from "@/components/top-casinos/TopCasinosSection";
import TopGamesSection from "@/components/top-games/TopGamesSection";
import BonusDetailsSection from "@/components/bonus-details/BonusDetailsSection";
import AboutSection from "@/components/about/AboutSection";
import LoginSection from "@/components/login/LoginSection";
import AppSection from "@/components/mobile-app/AppSection";
import FAQSection from "@/components/faq/FAQSection";
import GamesToPlay from "@/components/games-to-play/GamesToPlay";
import SupportSection from "@/components/support/SupportSection";
import PromotionsSection from "@/components/promotion/PromotionsSection";
import AdvantageSection from "@/components/advantage/AdvantageSection";
import Footer from "@/components/footer/Footer";
import { fetchGames } from "@/utils/fetchGames";

export default async function RootPage() {
  // Hardcoded to avoid file reading errors
  const manifest = { languages: ['en', 'de', 'es', 'fr', 'it'], defaultLang: "en" };
  const currentLang = manifest.defaultLang;
  const games = await fetchGames("gambling");

  return (
    <main>
      <Header
        languages={manifest.languages}
        defaultLang={manifest.defaultLang}
        currentLang={currentLang}
      />
      <WelcomeSection />
      <H1Section lang={currentLang} />
      <TopCasinosSection />
      <BonusDetailsSection />
      <AboutSection lang={currentLang} />
      <TopGamesSection games={games} lang={currentLang} />
      <AdvantageSection lang={currentLang} />
      <LoginSection lang={currentLang} />
      <AppSection lang={currentLang} />
      <FAQSection lang={currentLang} />
      <GamesToPlay lang={currentLang} />
      <SupportSection lang={currentLang} />
      <PromotionsSection lang={currentLang} />
      <Footer />
    </main>
  );
}
