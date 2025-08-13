// /hooks/useContentData.ts
import { useState, useEffect } from "react";

interface ContentData {
  [key: string]: any;
}

const useContentData = () => {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    import("../content/content.json")
      .then((module) => {
        setData(module);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки JSON:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default useContentData;
