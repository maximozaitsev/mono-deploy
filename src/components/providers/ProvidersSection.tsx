"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Provider } from "@/types/provider";
import { fetchProviders } from "@/utils/fetchProviders";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import "@/components/providers/ProvidersSection.scss";
import translations from "@/../public/content/static.json";
import manifest from "@/../public/content/languages.json";

type LangManifest = { languages: string[]; defaultLang: string };
const mf = manifest as unknown as LangManifest;
const ST = translations as Record<string, Record<string, string>>;

interface ProvidersSectionProps {
  initialProviders: Provider[];
}

export default function ProvidersSection({
  initialProviders,
}: ProvidersSectionProps) {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);

  useEffect(() => {
    async function updateProviders() {
      const updatedProviders = await fetchProviders();
      setProviders(updatedProviders);
    }

    if (!initialProviders.length) {
      updateProviders();
    }
  }, [initialProviders]);

  const pathname = usePathname();
  const firstSeg = pathname?.split("/").filter(Boolean)[0] || "";
  const currentLang = mf.languages.includes(firstSeg)
    ? firstSeg
    : mf.defaultLang;
  const PROJECT_GEO = getProjectGeoForLang(currentLang);
  const t = ST[currentLang] || ST[mf.defaultLang] || ST["en"] || {};

  return (
    <section className="providers-section section container">
      <h2 className="h2-heading">{t.softwareProviders}</h2>
      <div className="providers-grid">
        {providers.map((provider) => (
          <div key={provider.id} className="provider-block">
            <img
              src={provider.image}
              alt={provider.name}
              title={`${provider.name} in ${PROJECT_NAME} ${PROJECT_GEO}`}
              className="provider-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
