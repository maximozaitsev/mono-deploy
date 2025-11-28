import Header from "@/components/header/Header";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import H1Section from "@/components/h1-block/H1Block";
import TopCasinosSection from "@/components/top-casinos/TopCasinosSection";
import dynamic from "next/dynamic";
import { fetchGames } from "@/utils/fetchGames";

// Lazy load below-the-fold components
const TopGamesSection = dynamic(() => import("@/components/top-games/TopGamesSection"), {
  ssr: true,
});
const BonusDetailsSection = dynamic(() => import("@/components/bonus-details/BonusDetailsSection"), {
  ssr: true,
});
const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  ssr: true,
});
const AppSection = dynamic(() => import("@/components/mobile-app/AppSection"), {
  ssr: true,
});
const FAQSection = dynamic(() => import("@/components/faq/FAQSection"), {
  ssr: true,
});
const PromotionsSection = dynamic(() => import("@/components/promotion/PromotionsSection"), {
  ssr: true,
});
const AdvantageSection = dynamic(() => import("@/components/advantage/AdvantageSection"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: true,
});

import fs from "node:fs/promises";
import path from "node:path";
import { locales } from "@/config/i18n";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function LocalePage({ params }: { params: { locale: string } }) {
  const currentLang = (params.locale || "").toLowerCase();
  if (!locales.includes(currentLang)) notFound();

  type LangManifest = { languages: string[]; defaultLang: string };
  let manifest: LangManifest = { languages: [], defaultLang: "en" };
  try {
    const manifestPath = path.join(process.cwd(), "public", "content", "languages.json");
    const raw = await fs.readFile(manifestPath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<LangManifest>;
    if (Array.isArray(parsed.languages) && typeof parsed.defaultLang === "string") {
      manifest = { languages: parsed.languages, defaultLang: parsed.defaultLang };
    }
  } catch {
    manifest = { languages: ["en"], defaultLang: "en" };
  }

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
      <TopCasinosSection lang={currentLang} />
      <BonusDetailsSection />
      <AboutSection lang={currentLang} />
      <TopGamesSection games={games} lang={currentLang} />
      <AdvantageSection lang={currentLang} />
      <AppSection lang={currentLang} />
      <FAQSection lang={currentLang} />
      <PromotionsSection lang={currentLang} />
      <Footer />
    </main>
  );
}
