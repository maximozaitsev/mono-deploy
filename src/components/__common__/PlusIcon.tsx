import React, { useId, useEffect, useState } from "react";
import { computeGradient } from "../../utils/gradientUtils";

interface PlusIconProps {
  size?: number;
  color?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
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
      width={size}
      height={size}
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
