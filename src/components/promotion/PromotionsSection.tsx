import SectionWithTwoColumns from "../__common__/section-two-columns/SectionWithTwoColumns";

interface PromotionsSectionProps {
  lang: string;
}

export default function PromotionsSection({ lang }: PromotionsSectionProps) {
  return <SectionWithTwoColumns jsonKey="bonuses-and-promotions" lang={lang} />;
}
