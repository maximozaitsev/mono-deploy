import React, { useEffect, useId, useState } from "react";

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

  type Stop = { color: string; offset?: string };
  const parsed: Stop[] = rawStops.map((stop) => {
    const parts = stop.trim().split(/\s+/);
    const color = parts[0];
    const offset = parts[1];
    return { color, offset };
  });

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

interface StarIconProps {
  fill?: string;
  width?: number;
  height?: number;
}

const StarIcon: React.FC<StarIconProps> = ({
  fill,
  width = 30,
  height = 30,
}) => {
  const [computedFill, setComputedFill] = useState<string>("");
  const gradientId = useId();

  useEffect(() => {
    let src = fill;
    if (!src) {
      const cssFill = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-star-icon")
        .trim();
      src = cssFill || "#F6C946";
    } else if (src.startsWith("var(")) {
      const varName = src.slice(4, -1).trim();
      const cssFill = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      src = cssFill || src;
    }
    setComputedFill(src || "#F6C946");
  }, [fill]);

  let gradientElement: React.ReactNode = null;
  let fillValue = computedFill;

  if (computedFill && computedFill.startsWith("linear-gradient")) {
    const result = computeGradient(computedFill, gradientId);
    if (result) {
      fillValue = result.fill;
      gradientElement = result.gradientElement;
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: `${width}px`, height: `${height}px`, flexShrink: 0 }}
      aria-hidden="true"
      focusable="false"
    >
      {gradientElement}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.5491 9.85283C29.1866 9.91078 29.7253 10.346 29.9217 10.9588C30.1193 11.5727 29.9355 12.2436 29.4541 12.6684L22.9091 18.4573L24.8391 27.0329C24.9803 27.662 24.7379 28.3141 24.219 28.6934C23.7015 29.0718 23.0128 29.102 22.4664 28.7705L15.0001 24.2676L7.53107 28.7705C7.27861 28.9229 6.99731 29 6.71372 29C6.3848 29 6.05864 28.8966 5.77986 28.6934C5.2612 28.3152 5.01858 27.6634 5.1598 27.0329L7.08978 18.4573L0.544748 12.6673C0.063398 12.2436 -0.119025 11.5715 0.0785045 10.9588C0.276034 10.346 0.813461 9.91217 1.44977 9.85283L10.1099 9.05976L13.5339 0.977318C13.7863 0.383493 14.3613 0 15.0001 0C15.6389 0 16.2139 0.383493 16.4664 0.975933L19.8903 9.05976L28.5491 9.85283ZM17.8283 11.8835L25.0641 12.5462L19.5928 17.3854L21.1939 24.4997L15.0004 20.7645L8.80499 24.4995L10.406 17.3856L4.93557 12.5462L12.1718 11.8835L15.0003 5.20665L17.8283 11.8835Z"
        fill={fillValue}
      />
    </svg>
  );
};

export default StarIcon;
