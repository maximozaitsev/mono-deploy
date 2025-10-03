import Header from "@/components/header/Header";
import { notFound, redirect } from "next/navigation";
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
import fs from "node:fs/promises";
import path from "node:path";

export default async function LangPage({
  params,
}: {
  params: { lang: string };
}) {
  type LangManifest = { languages: string[]; defaultLang: string };
  let manifest: LangManifest = { languages: [], defaultLang: "en" };
  try {
    const manifestPath = path.join(
      process.cwd(),
      "public",
      "content",
      "languages.json"
    );
    const raw = await fs.readFile(manifestPath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<LangManifest>;
    if (
      Array.isArray(parsed.languages) &&
      typeof parsed.defaultLang === "string"
    ) {
      manifest = {
        languages: parsed.languages,
        defaultLang: parsed.defaultLang,
      };
    }
  } catch {
    manifest = { languages: ["en"], defaultLang: "en" };
  }

  const { languages, defaultLang } = manifest;
  const lang = params.lang;

  if (lang === defaultLang) {
    redirect("/");
  }
  if (!languages.includes(lang)) {
    notFound();
  }

  const games = await fetchGames("gambling");

  return (
    <main>
      <Header
        languages={languages}
        defaultLang={defaultLang}
        currentLang={lang}
      />
      <WelcomeSection />
      <H1Section lang={lang} />
      <TopCasinosSection />
      <BonusDetailsSection />
      <AboutSection lang={lang} />
      <TopGamesSection games={games} lang={lang} />
      <AdvantageSection lang={lang} />
      <LoginSection lang={lang} />
      <AppSection lang={lang} />
      <FAQSection />
      <GamesToPlay lang={lang} />
      <SupportSection lang={lang} />
      <PromotionsSection lang={lang} />
      <Footer />
    </main>
  );
}
