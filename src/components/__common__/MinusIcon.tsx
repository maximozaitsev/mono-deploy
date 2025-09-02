// src/components/__common__/MinusIcon.tsx
import React, { useEffect, useId, useState } from "react";

interface GradientResult {
  fill: string;
  gradientElement: React.ReactElement | null;
}

function computeGradient(gradient: string, id: string): GradientResult | null {
  const linearMatch = gradient.match(/^linear-gradient\((.+)\)$/);
  if (!linearMatch) return null;

  const parts = linearMatch[1].split(",").map((p) => p.trim());
  if (parts.length < 2) return null;

  const direction = parts[0];
  const colorStops = parts.slice(1);

  let x1 = "0%",
    y1 = "0%",
    x2 = "100%",
    y2 = "0%";
  if (/to bottom/i.test(direction)) {
    x1 = "0%";
    y1 = "0%";
    x2 = "0%";
    y2 = "100%";
  } else if (/to right/i.test(direction)) {
    x1 = "0%";
    y1 = "0%";
    x2 = "100%";
    y2 = "0%";
  } else if (/to left/i.test(direction)) {
    x1 = "100%";
    y1 = "0%";
    x2 = "0%";
    y2 = "0%";
  } else if (/to top/i.test(direction)) {
    x1 = "0%";
    y1 = "100%";
    x2 = "0%";
    y2 = "0%";
  } else if (/deg/i.test(direction)) {
    const deg = parseFloat(direction);
    const rad = (deg - 90) * (Math.PI / 180);
    const x2f = 0.5 + 0.5 * Math.cos(rad);
    const y2f = 0.5 + 0.5 * Math.sin(rad);
    const x1f = 1 - x2f;
    const y1f = 1 - y2f;
    x1 = `${x1f * 100}%`;
    y1 = `${y1f * 100}%`;
    x2 = `${x2f * 100}%`;
    y2 = `${y2f * 100}%`;
  }

  const stops = colorStops.map((stop, i) => {
    const [color, pos] = stop.split(/\s+/);
    const offset = pos || `${(i / (colorStops.length - 1)) * 100}%`;
    return <stop key={i} offset={offset} stopColor={color} />;
  });

  return {
    fill: `url(#${id})`,
    gradientElement: (
      <defs>
        <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
          {stops}
        </linearGradient>
      </defs>
    ),
  };
}

interface MinusIconProps {
  fill?: string; // can be a solid color, CSS var, or linear-gradient(...)
  width?: number;
  height?: number;
}

const MinusIcon: React.FC<MinusIconProps> = ({
  fill,
  width = 32,
  height = 32,
}) => {
  const [computedFill, setComputedFill] = useState<string>("");
  const gradientId = useId();

  useEffect(() => {
    let src = fill ?? "var(--color-faq-icon)";
    if (src.startsWith("var(")) {
      const varName = src.slice(4, -1).trim();
      const cssFill = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      setComputedFill(cssFill || src);
    } else {
      setComputedFill(src);
    }
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
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
      aria-hidden="true"
      focusable="false"
    >
      {gradientElement}
      <path
        d="M28 16.0005C28 16.3825 27.8483 16.7487 27.5782 17.0188C27.3082 17.2888 26.9419 17.4405 26.56 17.4405H16H5.44C5.05809 17.4405 4.69182 17.2888 4.42177 17.0188C4.15171 16.7487 4 16.3825 4 16.0005C4 15.6186 4.15171 15.2524 4.42177 14.9823C4.69182 14.7123 5.05809 14.5605 5.44 14.5605H16H26.56C26.9419 14.5605 27.3082 14.7123 27.5782 14.9823C27.8483 15.2524 28 15.6186 28 16.0005Z"
        fill={fillValue}
      />
    </svg>
  );
};

export default MinusIcon;
