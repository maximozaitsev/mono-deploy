"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Provider } from "@/types/provider";
import { fetchProviders } from "@/utils/fetchProviders";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import "@/components/providers/ProvidersSection.scss";
import { useStaticT } from "@/utils/i18n";

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

  const { t, currentLang } = useStaticT();
  const PROJECT_GEO = getProjectGeoForLang(currentLang);

  return (
    <section className="providers-section section container">
      <h2 className="h2-heading">{t.softwareProviders}</h2>
      <div className="providers-grid">
        {providers.map((provider, idx) => {
          const logoSrc = (provider as any).optimizedLogo || provider.image;
          return (
            <div key={provider.id} className="provider-block">
              <Image
                className="provider-image"
                src={logoSrc}
                alt={provider.name}
                title={`${provider.name} in ${PROJECT_NAME} ${PROJECT_GEO}`}
                width={135}
                height={60}
                sizes="(min-width: 1180px) 25vw, (min-width: 768px) 33vw, 50vw"
                priority={idx < 4}
                loading={idx < 4 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={idx < 4 ? "high" : "auto"}
                style={{ height: "auto", maxWidth: "100%" }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
