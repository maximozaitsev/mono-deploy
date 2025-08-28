// src/components/h1-block/H1Block.tsx
import path from "node:path";
import fs from "node:fs/promises";
import styles from "./H1Block.module.scss";
import { cookies } from "next/headers";

type LangManifest = { languages: string[]; defaultLang: string };
type ContentJSON = { title?: string };

async function readJSON<T>(p: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(p, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function readManifest(): Promise<LangManifest> {
  const p = path.join(process.cwd(), "public", "content", "languages.json");
  return readJSON<LangManifest>(p, { languages: [], defaultLang: "au" });
}

export default async function H1Section({
  langFromRoute,
}: {
  langFromRoute?: string;
}) {
  const manifest = await readManifest();
  const cookieLang = cookies().get("lang")?.value?.toLowerCase() || "";
  const routeLang = langFromRoute?.toLowerCase();

  const activeLang =
    (routeLang && manifest.languages.includes(routeLang) && routeLang) ||
    (cookieLang && manifest.languages.includes(cookieLang) && cookieLang) ||
    manifest.defaultLang;

  const contentPath = path.join(
    process.cwd(),
    "public",
    "content",
    `content.${activeLang}.json`
  );

  const content = await readJSON<ContentJSON>(contentPath, {});
  const title = (content.title ?? " ").trim() || " ";

  return (
    <section id="h1-section" className={styles.h1Section}>
      <h1 className="h2-heading">{title}</h1>
    </section>
  );
}
