export type Offer = {
  id: number;
  name: string;
  logo: string;
  bonuses: {
    country: string;
    rate: string;
    amount: string;
    free_spins: number;
    welcome_bonus: string;
  };
  wager: string;
  bonus_code: string;
  link: string;
};

export type HomePageProps = {
  country: string;
  offers: Offer[];
};

export type TopCasinosSectionProps = {
  country: string;
  offers: Offer[];
};
