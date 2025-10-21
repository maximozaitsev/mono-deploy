// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SUPPORTED_LANGUAGES = ["en", "de", "es", "fr", "it"];
const DEFAULT_LANG = "en";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] || "";
  
  // Определяем язык
  let lang = DEFAULT_LANG;
  if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
    lang = firstSegment;
  }
  
  // Создаем ответ
  const res = NextResponse.next();
  
  // Устанавливаем cookie и заголовки
  res.cookies.set("lang", lang, { path: "/" });
  res.headers.set("x-lang", lang);
  res.headers.set("x-pathname", pathname);
  
  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml|sw.js|sw.js.map|swe-worker-development.js|workbox-*.js|workbox-*.js.map).*)",
  ],
};
