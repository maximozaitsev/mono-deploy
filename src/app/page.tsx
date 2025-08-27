export const dynamic = "force-dynamic";
export const revalidate = 0;

import dynamicImport from "next/dynamic";
import Header from "../components/header/Header";
import WelcomeSection from "../components/welcome/WelcomeSection";
import H1Section from "../components/h1-block/H1Block";
import TopCasinosSection from "../components/top-casinos/TopCasinosSection";
import { fetchGames } from "@/utils/fetchGames";
import { fetchProviders } from "@/utils/fetchProviders";
import { Provider } from "@/types/provider";

import fs from "node:fs/promises";
import path from "node:path";

import "./globals.scss";

// Dynamic imports for non-critical components
const MobileSection = dynamicImport(() => import("@/components/mobile-version/MobileSection"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const TopGamesSection = dynamicImport(() => import("@/components/top-games/TopGamesSection"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const BonusDetailsSection = dynamicImport(() => import("@/components/bonus-details/BonusDetailsSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const AboutSection = dynamicImport(() => import("@/components/about/AboutSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const PaymentMethodsSection = dynamicImport(() => import("@/components/payment-methods/PaymentMethodSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const LicensesSection = dynamicImport(() => import("@/components/license/LicensesSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const ProvidersSection = dynamicImport(() => import("@/components/providers/ProvidersSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const AppSection = dynamicImport(() => import("@/components/mobile-app/AppSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const FAQSection = dynamicImport(() => import("@/components/faq/FAQSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const GamesToPlay = dynamicImport(() => import("@/components/games-to-play/GamesToPlay"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const SupportSection = dynamicImport(() => import("@/components/support/SupportSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const PromotionsSection = dynamicImport(() => import("@/components/promotion/PromotionsSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const AdvantageSection = dynamicImport(() => import("@/components/advantage/AdvantageSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const Footer = dynamicImport(() => import("@/components/footer/Footer"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
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
  } catch (_) {
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
