// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

// Читаем языки из languages.json
function getLanguages() {
  try {
    const languagesPath = path.join(process.cwd(), "public", "content", "languages.json");
    const languagesData = JSON.parse(fs.readFileSync(languagesPath, "utf-8"));
    return {
      languages: languagesData.languages || ["en"],
      defaultLang: languagesData.defaultLang || "en"
    };
  } catch {
    // Fallback если файл не найден
    return {
      languages: ["en"],
      defaultLang: "en"
    };
  }
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] || "";
  
  console.log("Middleware: pathname=", pathname, "firstSegment=", firstSegment);
  
  const { languages, defaultLang } = getLanguages();
  
  // Если первый сегмент не является поддерживаемым языком, редиректим на дефолтный
  if (firstSegment && !languages.includes(firstSegment)) {
    return NextResponse.redirect(new URL(`/${defaultLang}${pathname}`, req.url));
  }
  
  // Устанавливаем cookie с языком
  const response = NextResponse.next();
  response.cookies.set("lang", firstSegment || defaultLang, { path: "/" });
  
  console.log("Middleware: setting cookie lang=", firstSegment || defaultLang);
  
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml|sw.js|sw.js.map|swe-worker-development.js|workbox-*.js|workbox-*.js.map).*)",
    "/de",
    "/fr",
    "/es",
    "/it"
  ],
};
