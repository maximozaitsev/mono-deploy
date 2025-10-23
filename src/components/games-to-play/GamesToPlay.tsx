import SectionWithTwoColumns from "../__common__/section-two-columns/SectionWithTwoColumns";

interface GamesToPlayProps {
  lang: string;
}

export default function GamesToPlay({ lang }: GamesToPlayProps) {
  return <SectionWithTwoColumns jsonKey="games-to-play" lang={lang} />;
}
