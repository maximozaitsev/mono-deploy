// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const seg = url.pathname.split("/").filter(Boolean)[0] || "";
  const res = NextResponse.next();

  res.cookies.set("lang", seg, { path: "/" });
  res.headers.set("x-pathname", url.pathname);
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
