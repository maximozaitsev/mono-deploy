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

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-geo-lang", seg);
  requestHeaders.set("x-mw-pathname", url.pathname);

  // If language segment is present but cookie is missing/mismatched, set cookie and redirect once
  if (isLangSegment(seg) && seg !== cookieLang) {
    const redirectRes = NextResponse.redirect(url, { status: 307 });
    try {
      redirectRes.cookies.set("lang", seg, { path: "/" });
      redirectRes.headers.set("x-geo-lang", seg);
      redirectRes.headers.set("x-mw-pathname", url.pathname);
      redirectRes.headers.set(
        "x-middleware-override-headers",
        "x-geo-lang,x-mw-pathname"
      );
      console.log(
        `[MW] REDIRECT path="${url.pathname}" seg="${seg}" cookieWas="${cookieLang}" -> set cookie and redirect`
      );
    } catch {}
    return redirectRes;
  }

  // Debug log: path, detected segment, header and cookie values being set
  try {
    console.log(
      `[MW] path="${url.pathname}" seg="${seg}" cookie="${cookieLang}" -> header x-geo-lang="${seg}"`
    );
  } catch {}

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Expose debug info in response headers for easy verification
  try {
    res.headers.set("x-geo-lang", seg);
    res.headers.set("x-mw-pathname", url.pathname);
    res.headers.set("x-middleware-override-headers", "x-geo-lang,x-mw-pathname");
  } catch {}

  // Keep cookie in sync for non-lang-root paths too
  if (isLangSegment(seg)) {
    res.cookies.set("lang", seg, { path: "/" });
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|icons|og-image.webp|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
