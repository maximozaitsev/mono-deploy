// src/components/MinusIcon.tsx
import React, { useId, useEffect, useState } from "react";
import { computeGradient } from "../../utils/gradientUtils";

interface MinusIconProps {
  size?: number;
  color?: string;
}

const MinusIcon: React.FC<MinusIconProps> = ({
  size = 32,
  color = "var(--color-faq-icon)",
}) => {
  const [computedFill, setComputedFill] = useState<string>("");
  const gradientId = useId();

  useEffect(() => {
    if (color.startsWith("var(")) {
      const varName = color.slice(4, -1).trim();
      const cssFill = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      setComputedFill(cssFill || color);
    } else {
      setComputedFill(color);
    }
  }, [color]);

  let fillValue = computedFill;
  let gradientElement = null;
  const isGradient = computedFill.startsWith("linear-gradient");

  if (isGradient) {
    const result = computeGradient(computedFill, gradientId);
    if (result) {
      fillValue = result.fill;
      gradientElement = result.gradientElement;
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
