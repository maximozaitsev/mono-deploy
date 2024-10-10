import { useRouter } from "next/navigation";
import { fetchOffers } from "@/utils/fetchOffers"; // Assuming you already have this function

export const useNavigateWithPreloader = () => {
  const router = useRouter();

  const handleNavigation = async (
    url: string,
    onClick?: () => void,
    navigateToFirstOffer?: boolean
  ) => {
    if (onClick) {
      onClick();
    }

    if (navigateToFirstOffer) {
      try {
        const { offers } = await fetchOffers();
        if (offers.length > 0) {
          const firstOfferId = offers[0].id;
          router.push(`/casino/${firstOfferId}`);
          return;
        }
      } catch (error) {
        console.error("Error fetching first offer:", error);
      }
    }

    router.push(url);
  };

  const replaceHistoryState = (newUrl: string) => {
    window.history.replaceState(null, "", newUrl);
  };

  return { handleNavigation, replaceHistoryState };
};
