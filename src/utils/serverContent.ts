import fs from "fs/promises";
import path from "path";

export interface ContentData {
  [key: string]: any;
}

export async function getContentData(): Promise<ContentData> {
  try {
    const contentPath = path.join(
      process.cwd(),
      "public",
      "content",
      "content.json"
    );
    const raw = await fs.readFile(contentPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error loading content:", error);
    return {};
  }
}

export async function getSiteData(): Promise<ContentData> {
  try {
    const siteDataPath = path.join(
      process.cwd(),
      "public",
      "content",
      "siteData.json"
    );
    const raw = await fs.readFile(siteDataPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error loading site data:", error);
    return {};
  }
}

export function groupParagraphs(blocks: any[], stopAtType?: string): any[][] {
  const grouped: any[][] = [];
  let tempGroup: any[] = [];

  for (const block of blocks) {
    if (block.type === "paragraph" || block.type === "list") {
      tempGroup.push(block);
    } else if (stopAtType && block.type === stopAtType) {
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

export function parseAboutContent(data: any) {
  if (!data?.intro) return { title: "", intro: [] };

  return {
    title: data.title || "About",
    intro: data.intro,
  };
}

export function parseAdvantageContent(data: any) {
  const advantagesEntries = Object.entries(data.advantages) as [string, any][];

  if (advantagesEntries.length === 0) {
    return {
      sectionTitle: "",
      introParagraphs: [],
      advantagesTitle: "",
      advantagesList: [],
      disadvantagesTitle: "",
      disadvantagesList: [],
      closingParagraphs: [],
    };
  }

  const [firstKey, section] = advantagesEntries[0];
  const sectionTitle = firstKey;

  // Исправляем groupParagraphs для правильного возврата строк
  const introParagraphs = groupParagraphs(section, "list")
    .map((group) => group.map((block) => block.text || ""))
    .filter((group) => group.some((text) => text.trim() !== ""));

  const headingBlocks = section.filter(
    (block: any) => block.type === "heading" && block.level === 3
  );
  const listBlocks = section.filter((block: any) => block.type === "list");

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
    section.slice(section.findIndex((b: any) => b.type === "list") + 2),
    ""
  )
    .map((group) => group.map((block) => block.text || ""))
    .filter((group) => group.some((text) => text.trim() !== ""));

  return {
    sectionTitle,
    introParagraphs,
    advantagesTitle,
    advantagesList,
    disadvantagesTitle,
    disadvantagesList,
    closingParagraphs,
  };
}

export function parseFAQContent(data: any) {
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
        faqContent[i + 1]?.type === "paragraph" ? faqContent[i + 1].text : "";
      items.push({ question, answer });
    }
  }

  return { faqTitle, faqs: items };
}

export function parseLoginContent(data: any) {
  if (!data?.about)
    return { aboutSections: {}, depositSection: null, withdrawalSection: null };

  const aboutEntries = Object.entries(data.about) as [string, any][];

  if (aboutEntries.length > 2) {
    const depositTitle = aboutEntries[aboutEntries.length - 2][0];
    const withdrawalTitle = aboutEntries[aboutEntries.length - 1][0];

    const depositSection = {
      title: depositTitle,
      content: aboutEntries[aboutEntries.length - 2][1],
    };

    const withdrawalSection = {
      title: withdrawalTitle,
      content: aboutEntries[aboutEntries.length - 1][1],
    };

    const filteredAbout = aboutEntries.slice(0, aboutEntries.length - 2);
    const aboutSections = Object.fromEntries(filteredAbout);

    return { aboutSections, depositSection, withdrawalSection };
  }

  return {
    aboutSections: data.about,
    depositSection: null,
    withdrawalSection: null,
  };
}

export function parseSupportContent(data: any) {
  if (!data?.support) return { sectionTitle: "", blocks: [] };

  const supportEntries = Object.entries(data.support) as [string, any][];
  if (supportEntries.length === 0) return { sectionTitle: "", blocks: [] };

  const [sectionTitle, blocks] = supportEntries[0];
  return { sectionTitle, blocks };
}

export function parseAppContent(data: any) {
  if (!data?.sections)
    return {
      appTitle: "",
      appContent: [],
      buttons: [],
      languagesTitle: "",
      languagesContent: [],
      currenciesTitle: "",
      currenciesContent: [],
    };

  const entries = Object.entries(data.sections) as [string, any][];

  if (entries.length >= 5) {
    const titleIndex = 2;
    const langIndex = entries.length === 5 ? 3 : 4;
    const currIndex = entries.length === 5 ? 4 : 5;

    return {
      appTitle: entries[titleIndex][0],
      appContent: groupParagraphs(entries[titleIndex][1]),
      buttons: [],
      languagesTitle: entries[langIndex][0],
      languagesContent: entries[langIndex][1],
      currenciesTitle: entries[currIndex][0],
      currenciesContent: entries[currIndex][1],
    };
  }

  return {
    appTitle: "",
    appContent: [],
    buttons: [],
    languagesTitle: "",
    languagesContent: [],
    currenciesTitle: "",
    currenciesContent: [],
  };
}

export function parseSectionWithTwoColumnsData(data: any, jsonKey: string) {
  const sectionData = data[jsonKey];
  if (!sectionData) {
    console.error(`Ошибка: ключ "${jsonKey}" отсутствует в JSON`);
    return {
      sectionTitle: "",
      introContent: [],
      leftColumnContent: [],
      rightColumnContent: [],
    };
  }

  const sectionEntries = Object.entries(sectionData) as [string, any][];
  if (sectionEntries.length === 0) {
    return {
      sectionTitle: "",
      introContent: [],
      leftColumnContent: [],
      rightColumnContent: [],
    };
  }

  const [firstKey, section] = sectionEntries[0];
  const sectionTitle = firstKey;

  const firstH3Index = section.findIndex(
    (block: any) => block.type === "heading" && block.level === 3
  );
  const introBlocks =
    firstH3Index !== -1 ? section.slice(0, firstH3Index) : section;
  const introContent = groupParagraphs(introBlocks, "");

  const h3Sections = section
    .slice(firstH3Index)
    .reduce((acc: any[], block: any) => {
      if (block.type === "heading" && block.level === 3) {
        acc.push({ heading: block.text, items: [] });
      } else if (acc.length > 0) {
        acc[acc.length - 1].items.push(block);
      }
      return acc;
    }, []);

  const midIndex = Math.ceil(h3Sections.length / 2);
  const leftColumnContent = h3Sections.slice(0, midIndex);
  const rightColumnContent = h3Sections.slice(midIndex);

  return {
    sectionTitle,
    introContent,
    leftColumnContent,
    rightColumnContent,
  };
}

export function parseLicenseContent(data: any) {
  if (!data?.sections) {
    return {
      title: "",
      content: [],
    };
  }

  const entries = Object.entries(data.sections) as [string, any][];
  
  // Берем первый массив из sections
  if (entries.length === 0) {
    return {
      title: "",
      content: [],
    };
  }

  const [title, content] = entries[0];
  return {
    title,
    content: content || [],
  };
}
