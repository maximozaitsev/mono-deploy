// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Список доступных языков
const AVAILABLE_LANGUAGES = ["en", "de", "es", "fr", "it"];
const DEFAULT_LANGUAGE = "en";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathSegments = url.pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0] || "";
  
  // Определяем язык: если первый сегмент - валидный язык, используем его
  const isLanguageSegment = AVAILABLE_LANGUAGES.includes(firstSegment);
  const detectedLang = isLanguageSegment ? firstSegment : DEFAULT_LANGUAGE;
  
  const res = NextResponse.next();

  // Устанавливаем cookie с определенным языком
  res.cookies.set("lang", detectedLang, { path: "/" });
  
  // Передаем информацию о пути и языке в headers
  res.headers.set("x-pathname", url.pathname);
  res.headers.set("x-detected-lang", detectedLang);
  res.headers.set("x-is-language-route", isLanguageSegment.toString());
  
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
