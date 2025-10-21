import path from "node:path";
import fs from "node:fs/promises";
import HeaderSimple from "@/components/header/HeaderSimple";
import Button from "@/components/__common__/button/Button";
import "./globals.scss";

async function readManifest(): Promise<{ languages: string[]; defaultLang: string }> {
  try {
    const p = path.join(process.cwd(), "public", "content", "languages.json");
    const raw = await fs.readFile(p, "utf-8");
    const json = JSON.parse(raw) as { languages?: string[]; defaultLang?: string };
    return {
      languages: Array.isArray(json.languages) ? json.languages : [],
      defaultLang: (json.defaultLang || "en").toLowerCase(),
    };
  } catch {
    return { languages: [], defaultLang: "en" };
  }
}

export default async function Custom404() {
  const { languages, defaultLang } = await readManifest();
  const currentLang = defaultLang;

  return (
    <div className="not-found">
      <HeaderSimple languages={languages} defaultLang={defaultLang} currentLang={currentLang} />
      <h2 className="h2-heading">404</h2>
      <p>The page you were looking for does not exist.</p>
      <p>You may have mistyped the address or the page may have moved.</p>
      <Button text="Home page" variant="primary" navigateHome={true} />
    </div>
  );
}
