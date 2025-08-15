import axios from "axios";
import { Provider } from "../types/provider";

export async function fetchProviders(): Promise<Provider[]> {
  try {
    const response = await axios.get(
      "https://api.adkey-seo.com/api/website/get-providers/",
      {
        headers: {
          "Cache-Control": "no-cache",
        },
        timeout: 5000,
      }
    );

    const providers = response.data;

    const updatedProviders = providers.map((provider: Provider) => {
      const logoUrl = `https://api.adkey-seo.com/storage/images/providers/${provider.image}`;
      return {
        ...provider,
        image: logoUrl,
        optimizedLogo: `${logoUrl}?format=webp&width=135&height=60`,
      };
    });

    return updatedProviders;
  } catch (error) {
    console.error("Error fetching providers:", error);
    return [];
  }
}
