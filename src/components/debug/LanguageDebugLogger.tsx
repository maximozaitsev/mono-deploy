"use client";

import { useEffect } from "react";

export default function LanguageDebugLogger() {
  useEffect(() => {
    function onChange(e: Event) {
      try {
        const detail = (e as CustomEvent).detail;
        // eslint-disable-next-line no-console
        console.debug("[LanguageDebugLogger] monomat:langchange", detail);
      } catch {}
    }
    window.addEventListener("monomat:langchange", onChange as EventListener);
    return () => {
      window.removeEventListener(
        "monomat:langchange",
        onChange as EventListener
      );
    };
  }, []);
  return null;
}


