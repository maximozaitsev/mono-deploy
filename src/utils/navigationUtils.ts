import { useRouter } from "next/navigation";
import { useOffers } from "@/contexts/OffersContext";

export const useNavigateWithPreloader = () => {
  const router = useRouter();
  const { data: offersData } = useOffers();

  const handleNavigation = async (
    url: string,
    onClick?: () => void,
    navigateToFirstOffer?: boolean
  ) => {
    if (onClick) {
      onClick();
    }

    if (navigateToFirstOffer) {
      const offers = offersData?.offers || [];
      if (offers.length > 0) {
        const firstOfferId = offers[0].id;
        router.push(`/casino/${firstOfferId}`);
        return;
      }
    }

    router.push(url);
  };

  const replaceHistoryState = (newUrl: string) => {
    window.history.replaceState(null, "", newUrl);
  };

  return { handleNavigation, replaceHistoryState };
};
