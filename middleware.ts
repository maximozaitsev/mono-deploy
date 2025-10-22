// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const seg = url.pathname.split("/").filter(Boolean)[0] || "";

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-geo-lang", seg);

  // Debug log: path, detected segment, header and cookie values being set
  try {
    console.log(
      `[MW] path="${url.pathname}" seg="${seg}" -> header x-geo-lang="${seg}", cookie lang="${seg}"`
    );
  } catch {}

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  res.cookies.set("lang", seg, { path: "/" });
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
