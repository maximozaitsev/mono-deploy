"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import Image from "next/image";
import styles from "./Spinner.module.scss";
import manifestData from "../../../../public/content/languages.json";
import SpinnerGif from "../../../../public/assets/loader-black.gif";

type LangManifest = { languages: string[]; defaultLang: string };

export default function Spinner() {
  const pathname = usePathname();
  const manifest = manifestData as LangManifest;

  const firstSeg = pathname?.split("/").filter(Boolean)[0] || "";
  const currentLang = manifest.languages.includes(firstSeg)
    ? firstSeg
    : manifest.defaultLang;

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.headerWrapper}>
        <Header
          languages={manifest.languages}
          defaultLang={manifest.defaultLang}
          currentLang={currentLang}
        />
      </div>

      <div className={styles.box}>
        <Image
          src={SpinnerGif}
          alt="Loading..."
          width={96}
          height={96}
          priority
        />
      </div>
    </div>
  );
}
