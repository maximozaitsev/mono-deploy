import React, { useEffect, useId, useState } from "react";
// GradientResult interface and computeGradient function from StarIcon.tsx
interface GradientResult {
  fill: string;
  gradientElement: React.ReactElement;
}

function computeGradient(gradient: string, id: string): GradientResult | null {
  // Only linear gradients are supported in this example
  const linearMatch = gradient.match(/^linear-gradient\((.+)\)$/);
  if (!linearMatch) return null;
  const [direction, ...colorStops] = linearMatch[1].split(",");
  // Convert CSS direction to SVG
  let x1 = "0%";
  let y1 = "0%";
  let x2 = "100%";
  let y2 = "0%";
  if (direction.includes("to bottom")) {
    x1 = "0%";
    y1 = "0%";
    x2 = "0%";
    y2 = "100%";
  } else if (direction.includes("to right")) {
    x1 = "0%";
    y1 = "0%";
    x2 = "100%";
    y2 = "0%";
  } else if (direction.includes("to left")) {
    x1 = "100%";
    y1 = "0%";
    x2 = "0%";
    y2 = "0%";
  } else if (direction.includes("to top")) {
    x1 = "0%";
    y1 = "100%";
    x2 = "0%";
    y2 = "0%";
  }
  const stops = colorStops.map((stop, i) => {
    const [color, pos] = stop.trim().split(" ");
    return (
      <stop
        key={i}
        offset={pos || `${(i / (colorStops.length - 1)) * 100}%`}
        stopColor={color}
      />
    );
  });
  return {
    fill: `url(#${id})`,
    gradientElement: (
      <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
        {stops}
      </linearGradient>
    ),
  };
}

interface PlusIconProps {
  fill?: string;
  width?: number;
  height?: number;
}

const PlusIcon: React.FC<PlusIconProps> = ({
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

  let gradientElement = null;
  let fillValue = computedFill;

  if (computedFill.startsWith("linear-gradient")) {
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
      style={{ width, height }}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {gradientElement}
      <path
        d="M28 16C28 16.3819 27.8483 16.7482 27.5782 17.0182C27.3082 17.2883 26.9419 17.44 26.56 17.44H17.44V26.56C17.44 26.9419 17.2883 27.3082 17.0182 27.5782C16.7482 27.8483 16.3819 28 16 28C15.6181 28 15.2518 27.8483 14.9818 27.5782C14.7117 27.3082 14.56 26.9419 14.56 26.56V17.44H5.44C5.05809 17.44 4.69182 17.2883 4.42177 17.0182C4.15171 16.7482 4 16.3819 4 16C4 15.6181 4.15171 15.2518 4.42177 14.9818C4.69182 14.7117 5.05809 14.56 5.44 14.56H14.56V5.44C14.56 5.05809 14.7117 4.69182 14.9818 4.42177C15.2518 4.15171 15.6181 4 16 4C16.3819 4 16.7482 4.15171 17.0182 4.42177C17.2883 4.69182 17.44 5.05809 17.44 5.44V14.56H26.56C26.9419 14.56 27.3082 14.7117 27.5782 14.9818C27.8483 15.2518 28 15.6181 28 16Z"
        fill={fillValue}
      />
    </svg>
  );
};

export default PlusIcon;
