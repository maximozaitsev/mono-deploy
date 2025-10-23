// src/app/[locale]/page.tsx
import { notFound } from "next/navigation";
import { locales } from "@/config/i18n";
import HomePage from "@/app/page";

export default function LocalePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  if (!locales.includes(locale)) {
    notFound();
  }
  // Render the same homepage; sections read current lang from path/cookies
  return HomePage();
}
