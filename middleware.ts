// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const seg = url.pathname.split("/").filter(Boolean)[0] || "";
  
  console.log("Middleware:", { pathname: url.pathname, seg });
  
  // Set language cookie and header based on URL segment
  const res = NextResponse.next();
  if (seg && ['de', 'es', 'fr', 'it'].includes(seg)) {
    // Non-default languages
    res.cookies.set("lang", seg, { path: "/" });
    res.headers.set("x-lang", seg);
  } else {
    // Default language (root path or /en)
    res.cookies.set("lang", "en", { path: "/" });
    res.headers.set("x-lang", "en");
  }
  
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
