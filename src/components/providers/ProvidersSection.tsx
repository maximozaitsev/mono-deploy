"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Provider } from "@/types/provider";
import { fetchProviders } from "@/utils/fetchProviders";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import { imageOptimizations } from "../../utils/imageOptimization";
import "@/components/providers/ProvidersSection.scss";

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

  return (
    <section className="providers-section section container">
      <h2 className="h2-heading">Software Providers</h2>
      <div className="providers-grid">
        {providers.map((provider) => (
          <div key={provider.id} className="provider-block">
            <Image
              src={imageOptimizations.providerImage(provider.image)}
              alt={provider.name}
              title={provider.name + " in " + PROJECT_NAME + " " + PROJECT_GEO}
              className="provider-image"
              width={120}
              height={60}
              quality={85}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
