import axios from "axios";
import { Provider } from "../types/provider";

export async function fetchProviders(): Promise<Provider[]> {
  try {
    const response = await axios.get(
      "https://api.adkey-seo.com/api/website/get-providers/"
    );
    const providers = response.data;

    const updatedProviders = providers.map((provider: Provider) => ({
      ...provider,
      image: `https://api.adkey-seo.com/storage/images/providers/${provider.image}`,
    }));

    return updatedProviders;
  } catch (error) {
    console.error("Error fetching providers:", error);
    return [];
  }
}
