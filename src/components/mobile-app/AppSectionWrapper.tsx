import { getContentData, parseAppContent } from "../../utils/serverContent";
import AppSection from "./AppSection";

export default async function AppSectionWrapper() {
  const contentData = await getContentData();
  const content = parseAppContent(contentData);

  return <AppSection content={content} />;
}
