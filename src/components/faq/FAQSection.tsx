import { getContentData, parseFAQContent } from "../../utils/serverContent";
import FAQSectionClient from "./FAQSectionClient";
import "./FAQSection.scss";

export default async function FAQSection() {
  const contentData = await getContentData();
  const content = parseFAQContent(contentData);

  return <FAQSectionClient content={content} />;
}
