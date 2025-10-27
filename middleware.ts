import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/config/i18n";
import type { NextRequest } from "next/server";

const intl = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export default function middleware(req: NextRequest) {
  const res = intl(req);
  try {
    const pathname = req.nextUrl.pathname || "/";
    const seg = pathname.split("/").filter(Boolean)[0]?.toLowerCase() || "";
    const locale = locales.includes(seg) ? seg : defaultLocale;
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
  } catch {}
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api).*)",
  ],
};
