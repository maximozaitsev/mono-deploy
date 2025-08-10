import React from "react";

export interface GradientResult {
  fill: string;
  gradientElement: React.ReactNode;
}

export function computeGradient(
  gradientString: string,
  gradientId: string
): GradientResult | null {
  const cleanedGradient = gradientString.replace(/;$/, "");

  const gradientRegex = /linear-gradient\(([^,]+),\s*(.+)\)/i;
  const match = cleanedGradient.match(gradientRegex);
  if (!match) return null;

  const angleString = match[1].trim();
  const stopsString = match[2].trim();

  const angleDeg = parseFloat(angleString);
  const rad = (angleDeg - 90) * (Math.PI / 180);
  const x2 = 0.5 + 0.5 * Math.cos(rad);
  const y2 = 0.5 + 0.5 * Math.sin(rad);
  const x1 = 1 - x2;
  const y1 = 1 - y2;

  const rawStops = stopsString.split(/,\s*/);

  // Parse stops: [color [offset]] and normalize offsets if missing
  type Stop = { color: string; offset?: string };
  const parsed: Stop[] = rawStops.map((stop) => {
    const parts = stop.trim().split(/\s+/);
    const color = parts[0];
    const offset = parts[1];
    return { color, offset };
  });

  // If some offsets are missing, distribute them evenly from 0%..100%
  // respecting any explicitly provided offsets.
  const n = parsed.length;
  for (let i = 0; i < n; i++) {
    if (!parsed[i].offset) {
      const pct = (i / (n - 1)) * 100;
      parsed[i].offset = `${pct}%`;
    }
  }

  const gradientElement = (
    <defs>
      <linearGradient
        id={gradientId}
        x1={`${x1 * 100}%`}
        y1={`${y1 * 100}%`}
        x2={`${x2 * 100}%`}
        y2={`${y2 * 100}%`}
      >
        {parsed.map((s, index) => (
          <stop key={index} offset={s.offset} stopColor={s.color} />
        ))}
      </linearGradient>
    </defs>
  );

  return {
    fill: `url(#${gradientId})`,
    gradientElement,
  };
}
