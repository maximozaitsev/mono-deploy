import { fetchOffers } from "@/utils/fetchOffers";
import AppContent from "./AppContent";
import { parseSections } from "../../utils/parseSections";

// Импортируем контент напрямую
import content from "../../content/content.json";

export default async function AppSection() {
  // Загружаем данные на сервере
  const { offers } = await fetchOffers();
  const firstOfferId = offers.length > 0 ? offers[0].id : null;

  // Обрабатываем данные на сервере
  const { app } = parseSections(content.sections || {});

  if (!app) {
    return <p>App section data is not available.</p>;
  }

  return <AppContent firstOfferId={firstOfferId} app={app} />;
}