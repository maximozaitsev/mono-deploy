import { useState, useEffect } from "react";

interface ContentData {
  [key: string]: any;
}

const useContentData = () => {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const manifestRes = await fetch("/content/languages.json", {
          cache: "no-cache",
        });
        const manifest = await manifestRes.json();
        const parts = window.location.pathname.split("/").filter(Boolean);
        const first = parts[0];
        const lang =
          first &&
          manifest.languages.includes(first) &&
          first !== manifest.defaultLang
            ? first
            : manifest.defaultLang;
        const res = await fetch(`/content/content.${lang}.json`, {
          cache: "no-cache",
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Ошибка загрузки JSON:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading, error };
};

export default useContentData;
