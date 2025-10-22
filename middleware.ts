// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const seg = url.pathname.split("/").filter(Boolean)[0] || "";
  const requestHeaders = new Headers(req.headers);
  const isLang = /^[a-z]{2}$/.test(seg);
  const cookieLang = (req.cookies.get("lang")?.value || "").toLowerCase();

  // Always provide the pathname for SSR consumers
  requestHeaders.set("x-url-pathname", url.pathname);
  requestHeaders.set("x-url-search", url.search);
  if (isLang) {
    requestHeaders.set("x-geo", seg);
    requestHeaders.set("x-geo-source", "path");
    // Inject the lang cookie into the downstream request so SSR cookies() sees it immediately
    const existingCookieHeader = req.headers.get("cookie") || "";
    const cookiesList = existingCookieHeader
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((c) => !c.toLowerCase().startsWith("lang="));
    cookiesList.push(`lang=${seg}`);
    requestHeaders.set("cookie", cookiesList.join("; "));
  } else if (cookieLang) {
    requestHeaders.set("x-geo", cookieLang);
    requestHeaders.set("x-geo-source", "cookie");
  }

  const res = NextResponse.next({ request: { headers: requestHeaders } });

  // Only set cookie when a locale segment is explicitly present
  if (isLang) {
    res.cookies.set("lang", seg, { path: "/" });
  }

  // Debug logging for language resolution on edge
  try {
    console.log(
      "[middleware]",
      JSON.stringify({
        method: req.method,
        path: url.pathname,
        seg,
        isLang,
        setHeader: isLang,
        setCookie: isLang,
      })
    );
  } catch {}
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|icons|content|og-image.webp|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
