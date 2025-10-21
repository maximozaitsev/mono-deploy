// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const seg = url.pathname.split("/").filter(Boolean)[0] || "";
  const res = NextResponse.next();

  // Устанавливаем cookie для совместимости
  res.cookies.set("lang", seg, { path: "/" });
  
  // Добавляем заголовок с языком для использования в layout
  res.headers.set("x-lang", seg);
  
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
