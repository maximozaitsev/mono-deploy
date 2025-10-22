// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isLangSegment(seg: string): boolean {
  return /^[a-z]{2}$/.test(seg);
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const seg = url.pathname.split("/").filter(Boolean)[0] || "";
  const cookieLang = req.cookies.get("lang")?.value || "";

  // Keep cookie in sync with first path segment if present
  const res = NextResponse.next();
  if (isLangSegment(seg) && seg !== cookieLang) {
    res.cookies.set("lang", seg, { path: "/" });
  }

  try {
    console.log(`[MW] path="${url.pathname}" seg="${seg}" cookieWas="${cookieLang}"`);
  } catch {}

  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
