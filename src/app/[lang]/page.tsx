import Header from "@/components/header/Header";
import { notFound, redirect } from "next/navigation";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import H1Section from "@/components/h1-block/H1Block";

import dynamic from "next/dynamic";
import { fetchGames } from "@/utils/fetchGames";
import { fetchProviders } from "@/utils/fetchProviders";
import { Provider } from "@/types/provider";
import fs from "node:fs/promises";
import path from "node:path";

const TopCasinosSection = dynamic(
  () => import("@/components/top-casinos/TopCasinosSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 560 }} /> }
);
const MobileSection = dynamic(
  () => import("@/components/mobile-version/MobileSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 420 }} /> }
);
const TopGamesSection = dynamic(
  () => import("@/components/top-games/TopGamesSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 560 }} /> }
);
const BonusDetailsSection = dynamic(
  () => import("@/components/bonus-details/BonusDetailsSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 420 }} /> }
);
const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  ssr: true,
  loading: () => <div style={{ minHeight: 560 }} />,
});
const PaymentMethodsSection = dynamic(
  () => import("@/components/payment-methods/PaymentMethodSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 480 }} /> }
);
const LicensesSection = dynamic(
  () => import("@/components/license/LicensesSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 320 }} /> }
);
const ProvidersSection = dynamic(
  () => import("@/components/providers/ProvidersSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 560 }} /> }
);
const AppSection = dynamic(() => import("@/components/mobile-app/AppSection"), {
  ssr: true,
  loading: () => <div style={{ minHeight: 420 }} />,
});
const FAQSection = dynamic(() => import("@/components/faq/FAQSection"), {
  ssr: true,
  loading: () => <div style={{ minHeight: 560 }} />,
});
const GamesToPlay = dynamic(
  () => import("@/components/games-to-play/GamesToPlay"),
  { ssr: true, loading: () => <div style={{ minHeight: 420 }} /> }
);
const SupportSection = dynamic(
  () => import("@/components/support/SupportSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 320 }} /> }
);
const PromotionsSection = dynamic(
  () => import("@/components/promotion/PromotionsSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 560 }} /> }
);
const AdvantageSection = dynamic(
  () => import("@/components/advantage/AdvantageSection"),
  { ssr: true, loading: () => <div style={{ minHeight: 420 }} /> }
);
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: true,
  loading: () => <div style={{ minHeight: 280 }} />,
});

export const revalidate = 180;

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

  if (lang === defaultLang) redirect("/");
  if (!languages.includes(lang)) notFound();

  const games = await fetchGames("gambling");
  const providers: Provider[] = await fetchProviders();

  return (
    <main>
      <Header
        languages={languages}
        defaultLang={defaultLang}
        currentLang={lang}
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
