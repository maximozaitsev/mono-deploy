// middleware.ts
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/config/i18n";

const intl = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export default function middleware(req: any) {
  return intl(req);
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api).*)",
  ],
};
