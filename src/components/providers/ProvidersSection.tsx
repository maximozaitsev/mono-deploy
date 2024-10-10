"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Provider } from "@/types/provider";
import { fetchProviders } from "@/utils/fetchProviders";
import { useNavigateWithPreloader } from "@/utils/navigationUtils";
import "@/components/providers/ProvidersSection.scss";

interface ProvidersSectionProps {
  initialProviders: Provider[];
}

export default function ProvidersSection({
  initialProviders,
}: ProvidersSectionProps) {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const { handleNavigation } = useNavigateWithPreloader();

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
          <div
            key={provider.id}
            className="provider-block"
            onClick={() => handleNavigation("/casino", undefined, true)}
          >
            <Image
              src={provider.image}
              alt={provider.name}
              width={140}
              height={100}
              style={{ maxWidth: "100%", height: "auto" }}
              className="provider-image"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
