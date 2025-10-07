import { getContentData, parseFAQContent } from "../../utils/serverContent";
import FAQSection from "./FAQSection";

export default async function FAQSectionWrapper() {
  const contentData = await getContentData();
  const content = parseFAQContent(contentData);

  return <FAQSection content={content} />;
}
