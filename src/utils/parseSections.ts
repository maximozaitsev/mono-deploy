import { useMemo } from "react";

export interface ParsedAppSections {
  appTitle: string;
  appContent: any[][];
  languagesTitle: string;
  languagesContent: any[];
  currenciesTitle: string;
  currenciesContent: any[];
}

export interface ParsedLicensesSections {
  mainTitle?: string;
  mainContent?: any[];
  softwareTitle: string;
  softwareContent: any[];
  securityTitle: string;
  securityContent: any[];
  showImage: boolean;
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

export function parseSections(sections: any): {
  app: ParsedAppSections | null;
  licenses: ParsedLicensesSections | null;
} {
  const entries = Object.entries(sections) as [string, any][];
  let app: ParsedAppSections | null = null;
  let licenses: ParsedLicensesSections | null = null;

  if (entries.length >= 5) {
    const titleIndex = 2;
    const langIndex = entries.length === 5 ? 3 : 4;
    const currIndex = entries.length === 5 ? 4 : 5;
    app = {
      appTitle: entries[titleIndex][0],
      appContent: groupContent(entries[titleIndex][1]),
      languagesTitle: entries[langIndex][0],
      languagesContent: entries[langIndex][1],
      currenciesTitle: entries[currIndex][0],
      currenciesContent: entries[currIndex][1],
    };
  }

  if (entries.length === 5) {
    licenses = {
      softwareTitle: entries[0][0],
      softwareContent: entries[0][1],
      securityTitle: entries[1][0],
      securityContent: entries[1][1],
      showImage: false,
    };
  } else if (entries.length === 6) {
    licenses = {
      mainTitle: entries[3][0],
      mainContent: entries[3][1],
      softwareTitle: entries[0][0],
      softwareContent: entries[0][1],
      securityTitle: entries[1][0],
      securityContent: entries[1][1],
      showImage: true,
    };
  }

  return { app, licenses };
}

export function useParsedSections(sections: any) {
  return useMemo(() => {
    if (!sections) return { app: null, licenses: null };
    return parseSections(sections);
  }, [sections]);
}
