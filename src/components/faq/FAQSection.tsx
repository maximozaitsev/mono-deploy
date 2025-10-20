import { getContentData, parseFAQData } from "../../utils/serverContent";
import FAQClient from "./FAQClient";
import "./FAQSection.scss";

interface FAQSectionProps {
  lang: string;
}

export default async function FAQSection({ lang }: FAQSectionProps) {
  const content = await getContentData(lang);
  const { faqTitle, faqs } = parseFAQData(content);

  return <FAQClient faqTitle={faqTitle} faqs={faqs} />;
}
