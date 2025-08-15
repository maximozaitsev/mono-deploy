import React, { useId, useEffect, useState } from "react";
import { computeGradient } from "@/utils/gradientUtils";

interface GlobeIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const GlobeIcon: React.FC<GlobeIconProps> = ({
  size = 20,
  color = "var(--text-color-fourth)",
  strokeWidth = 1.5,
}) => {
  const [computedStroke, setComputedStroke] = useState<string>("");
  const gradientId = useId();

  useEffect(() => {
    if (color.startsWith("var(")) {
      const varName = color.slice(4, -1).trim();
      const cssColor = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      setComputedStroke(cssColor || color);
    } else {
      setComputedStroke(color);
    }
  }, [color]);

  let gradientElement = null;
  let strokeValue = computedStroke;

  if (computedStroke.startsWith("linear-gradient")) {
    const result = computeGradient(computedStroke, gradientId);
    if (result) {
      strokeValue = result.fill;
      gradientElement = result.gradientElement;
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {gradientElement}
      <path
        d="M12 21C16.9705 21 21 16.9705 21 12C21 7.02955 16.9705 3 12 3M12 21C7.02955 21 3 16.9705 3 12C3 7.02955 7.02955 3 12 3M12 21C14.4545 21 15.2727 16.9091 15.2727 12C15.2727 7.09091 14.4545 3 12 3M12 21C9.54545 21 8.72727 16.9091 8.72727 12C8.72727 7.09091 9.54545 3 12 3M3.81818 15.2727H20.1818M3.81818 8.72727H20.1818"
        stroke={strokeValue}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GlobeIcon;
