import React, { useId, useEffect, useState } from "react";
import { computeGradient } from "../../utils/gradientUtils";

interface PlayIconProps {
  size?: number;
  color?: string;
}

const PlayIcon: React.FC<PlayIconProps> = ({
  size = 33,
  color = "var(--text-color-fourth)",
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
      viewBox="0 0 33 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {gradientElement}
      <g fill={fillValue}>
        <g clipPath="url(#clip0_392_282)">
          <path d="M16.8333 0.078125C7.96057 0.078125 0.767548 7.20629 0.767548 15.9993C0.767548 24.7924 7.96057 31.9206 16.8333 31.9206C25.7061 31.9206 32.8991 24.7924 32.8991 15.9993C32.8991 7.20629 25.7061 0.078125 16.8333 0.078125ZM22.3861 16.8433L14.3532 21.8187C14.1906 21.9192 14.0058 21.9698 13.821 21.9698C13.6536 21.9698 13.4859 21.9285 13.3341 21.8449C13.0149 21.6695 12.8169 21.3367 12.8169 20.9747V11.024C12.8169 10.662 13.0149 10.3291 13.3341 10.1538C13.6533 9.97739 14.0436 9.98808 14.3532 10.18L22.3861 15.1554C22.6795 15.3376 22.858 15.6563 22.858 15.9993C22.858 16.3423 22.6795 16.6611 22.3861 16.8433Z" />
        </g>
        <defs>
          <clipPath id="clip0_392_282">
            <rect
              x="0.767548"
              y="0.078125"
              width="32.1316"
              height="31.8424"
              rx="8"
              fill="white"
            />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
};

export default PlayIcon;
