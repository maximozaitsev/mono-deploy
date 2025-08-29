import axios from "axios";
import { HomePageProps, Offer } from "../types/offer";

export async function fetchOffers(): Promise<HomePageProps> {
  try {
    const siteId = process.env.NEXT_PUBLIC_SITE_ID;
    if (!siteId) throw new Error("Missing SITE_ID in environment variables");

    const response = await axios.get(
      `https://api.adkey-seo.com/api/website/get-website/${siteId}`
    );

    const { website, offers } = response.data;

    const updatedOffers = offers.map((offer: Offer) => ({
      ...offer,
      logo: `https://api.adkey-seo.com/storage/images/offers/${offer.logo}`,
    }));

    return {
      country: website.country_name,
      offers: updatedOffers,
    };
  } catch (error) {
    console.error("Error fetching offers:", error);
    return {
      country: "",
      offers: [],
    };
  }
}
