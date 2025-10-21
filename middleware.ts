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
  
  // Если первый сегмент - это поддерживаемый язык
  if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
    const res = NextResponse.next();
    res.cookies.set("lang", firstSegment, { path: "/" });
    res.headers.set("x-lang", firstSegment);
    return res;
  }
  
  // Если это корневой путь, перенаправляем на дефолтный язык
  if (pathname === "/") {
    const res = NextResponse.redirect(new URL(`/${DEFAULT_LANG}`, req.url));
    res.cookies.set("lang", DEFAULT_LANG, { path: "/" });
    res.headers.set("x-lang", DEFAULT_LANG);
    return res;
  }
  
  // Если первый сегмент не является поддерживаемым языком, но это не корневой путь
  // (например, статические файлы), просто продолжаем
  if (!SUPPORTED_LANGUAGES.includes(firstSegment)) {
    const res = NextResponse.next();
    res.cookies.set("lang", DEFAULT_LANG, { path: "/" });
    res.headers.set("x-lang", DEFAULT_LANG);
    return res;
  }
  
  // Для всех остальных случаев
  const res = NextResponse.next();
  res.cookies.set("lang", DEFAULT_LANG, { path: "/" });
  res.headers.set("x-lang", DEFAULT_LANG);
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
