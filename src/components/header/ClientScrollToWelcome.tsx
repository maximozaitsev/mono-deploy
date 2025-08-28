// src/components/header/ClientScrollToWelcome.tsx
"use client";

import React from "react";

type Props = {
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
};

export default function ClientScrollToWelcome({
  ariaLabel,
  className,
  children,
}: Props) {
  const scrollToWelcomeSection = () => {
    const el = document.getElementById("welcome-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToWelcomeSection}
      aria-label={ariaLabel}
      className={className}
      style={{ background: "none", border: "none" }}
    >
      {children}
    </button>
  );
}
