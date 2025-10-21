"use client";

import React from "react";

interface HeaderSimpleProps {
  languages: string[];
  defaultLang: string;
  currentLang: string;
}

const HeaderSimple: React.FC<HeaderSimpleProps> = ({
  languages = [],
  defaultLang = "en",
  currentLang = "en",
}) => {
  return (
    <div style={{ padding: "1rem", background: "#f0f0f0" }}>
      <h1>Header Simple</h1>
      <p>Current language: {currentLang}</p>
      <p>Available languages: {languages.join(", ")}</p>
    </div>
  );
};

export default HeaderSimple;