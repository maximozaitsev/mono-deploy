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
import { locales } from '@/i18n';

export default async function LocalePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  const games = await fetchGames("gambling");

  return (
    <main>
      <Header
        languages={[...locales]}
        defaultLang="en"
        currentLang={locale}
      />
      <WelcomeSection />
      <H1Section lang={locale} />
      <TopCasinosSection />
      <BonusDetailsSection />
      <AboutSection lang={locale} />
      <TopGamesSection games={games} lang={locale} />
      <AdvantageSection lang={locale} />
      <LoginSection lang={locale} />
      <AppSection lang={locale} />
      <FAQSection lang={locale} />
      <GamesToPlay lang={locale} />
      <SupportSection lang={locale} />
      <PromotionsSection lang={locale} />
      <Footer />
    </main>
  );
}