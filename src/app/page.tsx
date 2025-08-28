import Header from "../components/header/Header";
import WelcomeSection from "../components/welcome/WelcomeSection";
import H1Section from "../components/h1-block/H1Block";

import dynamic from "next/dynamic";
import { fetchGames } from "@/utils/fetchGames";
import { fetchProviders } from "@/utils/fetchProviders";
import { Provider } from "@/types/provider";

import fs from "node:fs/promises";
import path from "node:path";

const TopCasinosSection = dynamic(
  () => import("@/components/top-casinos/TopCasinosSection"),
  { ssr: false, loading: () => null }
);
const MobileSection = dynamic(
  () => import("@/components/mobile-version/MobileSection"),
  { ssr: false, loading: () => null }
);
const TopGamesSection = dynamic(
  () => import("@/components/top-games/TopGamesSection"),
  { ssr: false, loading: () => null }
);
const BonusDetailsSection = dynamic(
  () => import("@/components/bonus-details/BonusDetailsSection"),
  { ssr: false, loading: () => null }
);
const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  ssr: false,
  loading: () => null,
});
const PaymentMethodsSection = dynamic(
  () => import("@/components/payment-methods/PaymentMethodSection"),
  { ssr: false, loading: () => null }
);
const LicensesSection = dynamic(
  () => import("@/components/license/LicensesSection"),
  { ssr: false, loading: () => null }
);
const ProvidersSection = dynamic(
  () => import("@/components/providers/ProvidersSection"),
  { ssr: false, loading: () => null }
);
const AppSection = dynamic(() => import("@/components/mobile-app/AppSection"), {
  ssr: false,
  loading: () => null,
});
const FAQSection = dynamic(() => import("@/components/faq/FAQSection"), {
  ssr: false,
  loading: () => null,
});
const GamesToPlay = dynamic(
  () => import("@/components/games-to-play/GamesToPlay"),
  { ssr: false, loading: () => null }
);
const SupportSection = dynamic(
  () => import("@/components/support/SupportSection"),
  { ssr: false, loading: () => null }
);
const PromotionsSection = dynamic(
  () => import("@/components/promotion/PromotionsSection"),
  { ssr: false, loading: () => null }
);
const AdvantageSection = dynamic(
  () => import("@/components/advantage/AdvantageSection"),
  { ssr: false, loading: () => null }
);
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
  loading: () => null,
});

export default async function HomePage() {
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

  const currentLang = manifest.defaultLang;
  const games = await fetchGames("gambling");
  const providers: Provider[] = await fetchProviders();

  return (
    <main>
      <Header
        languages={manifest.languages}
        defaultLang={manifest.defaultLang}
        currentLang={currentLang}
      />
      <WelcomeSection />
      <H1Section />
      <TopCasinosSection />
      <BonusDetailsSection />
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
