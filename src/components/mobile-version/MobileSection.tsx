import { fetchOffers } from "@/utils/fetchOffers";
import MobileContent from "./MobileContent";
import "./MobileSection.scss";

// Импортируем контент напрямую
import content from "../../content/content.json";

export default async function MobileSection() {
  // Загружаем данные на сервере
  const { offers } = await fetchOffers();
  const firstOfferId = offers.length > 0 ? offers[0].id : null;

  // Обрабатываем данные на сервере
  const advantagesSections = Object.values(content.advantages) as any[];
  let advantagesList: string[] = [];

  if (advantagesSections.length > 0) {
    // Находим первый блок типа "list"
    for (const section of advantagesSections) {
      const listBlock = section.find(
        (block: any) => block.type === "list"
      );
      if (listBlock) {
        advantagesList = listBlock.items;
        break;
      }
    }
  }

  return (
    <section className="mobile-section">
      <MobileContent advantagesList={advantagesList} firstOfferId={firstOfferId} />
    </section>
  );
}