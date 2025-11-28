import fs from "node:fs/promises";
import path from "node:path";
import { getProjectGeoForLang } from "./localeMap";

export interface ContentData {
  [key: string]: any;
}

export async function getContentData(lang: string): Promise<ContentData> {
  try {
    const contentPath = path.join(
      process.cwd(),
      "public",
      "content",
      `content.${lang}.json`
    );
    const raw = await fs.readFile(contentPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error loading content for lang ${lang}:`, error);
    return {};
  }
}

export async function getStaticTranslations(lang: string) {
  try {
    const staticPath = path.join(
      process.cwd(),
      "public",
      "content",
      "static.json"
    );
    const raw = await fs.readFile(staticPath, "utf-8");
    const staticData = JSON.parse(raw);
    return staticData[lang] || {};
  } catch (error) {
    console.error(`Error loading static translations for lang ${lang}:`, error);
    return {};
  }
}

export function getProjectGeo(lang: string): string {
  return getProjectGeoForLang(lang);
}

export function groupParagraphs(blocks: any[], stopAtType: string): string[][] {
  const grouped: string[][] = [];
  let tempGroup: string[] = [];

  for (const block of blocks) {
    if (block.type === "paragraph") {
      tempGroup.push(block.text);
    } else if (block.type === stopAtType) {
      break;
    } else {
      if (tempGroup.length > 0) {
        grouped.push(tempGroup);
        tempGroup = [];
      }
    }
  }

  if (tempGroup.length > 0) {
    grouped.push(tempGroup);
  }

  return grouped;
}

export function parseAdvantageData(data: any) {
  const advantagesEntries = Object.entries(data.advantages) as [string, any][];
  
  if (advantagesEntries.length === 0) {
    return {
      sectionTitle: "",
      introParagraphs: [],
      advantagesTitle: "",
      advantagesList: [],
      disadvantagesTitle: "",
      disadvantagesList: [],
      closingParagraphs: []
    };
  }

  const [firstKey, section] = advantagesEntries[0];
  const sectionTitle = firstKey;
  const introParagraphs = groupParagraphs(section, "list");

  const headingBlocks = section.filter(
    (block: any) => block.type === "heading" && block.level === 3
  );
  const listBlocks = section.filter(
    (block: any) => block.type === "list"
  );

  let advantagesTitle = "";
  let advantagesList: string[] = [];
  let disadvantagesTitle = "";
  let disadvantagesList: string[] = [];

  if (headingBlocks.length >= 2 && listBlocks.length >= 2) {
    advantagesTitle = headingBlocks[0].text;
    advantagesList = listBlocks[0].items;
    disadvantagesTitle = headingBlocks[1].text;
    disadvantagesList = listBlocks[1].items;
  }

  const closingParagraphs = groupParagraphs(
    section.slice(
      section.findIndex((b: any) => b.type === "list") + 2
    ),
    ""
  );

  return {
    sectionTitle,
    introParagraphs,
    advantagesTitle,
    advantagesList,
    disadvantagesTitle,
    disadvantagesList,
    closingParagraphs
  };
}

export function groupContent(blocks: any[]): any[][] {
  const grouped: any[][] = [];
  let tempGroup: any[] = [];

  for (const block of blocks) {
    if (block.type === "paragraph" || block.type === "list") {
      tempGroup.push(block);
    } else {
      if (tempGroup.length > 0) {
        grouped.push(tempGroup);
        tempGroup = [];
      }
    }
  }
  if (tempGroup.length > 0) {
    grouped.push(tempGroup);
  }
  return grouped;
}

export function parseFAQData(data: any) {
  if (!data?.faq) return { faqTitle: "", faqs: [] };

  const faqEntries = Object.entries(data.faq) as [string, any][];
  if (faqEntries.length === 0) return { faqTitle: "", faqs: [] };

  const [title, faqContent] = faqEntries[0];
  const faqTitle = title;

  const items: { question: string; answer: string }[] = [];
  for (let i = 0; i < faqContent.length; i++) {
    if (faqContent[i].type === "heading" && faqContent[i].level === 3) {
      const question = faqContent[i].text;
      const answer =
        faqContent[i + 1]?.type === "paragraph"
          ? faqContent[i + 1].text
          : "";
      items.push({ question, answer });
    }
  }

  return { faqTitle, faqs: items };
}

