import React, { useId, useEffect, useState, useMemo } from "react";
import { computeGradient } from "../../utils/gradientUtils";

interface StarIconProps {
  fill?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ fill }) => {
  const [computedFill, setComputedFill] = useState<string>("");
  const gradientId = useId();
  const safeGradientId = useMemo(
    () => `grad_${String(gradientId).replace(/[^a-zA-Z0-9_-]/g, "_")}`,
    [gradientId]
  );

  useEffect(() => {
    let cssFill = "";
    let resolved = false;
    if (fill) {
      if (fill.startsWith("var(")) {
        const varName = fill.slice(4, -1).trim();
        cssFill = getComputedStyle(document.documentElement)
          .getPropertyValue(varName)
          .trim();
        resolved = true;
        // If resolved value is a gradient, use it as is.
        if (cssFill.startsWith("linear-gradient")) {
          setComputedFill(cssFill);
        } else if (!cssFill) {
          const s1 = getComputedStyle(document.documentElement)
            .getPropertyValue("--star-icon-stop-1")
            .trim();
          const s2 = getComputedStyle(document.documentElement)
            .getPropertyValue("--star-icon-stop-2")
            .trim();
          const ang = getComputedStyle(document.documentElement)
            .getPropertyValue("--star-icon-angle")
            .trim();
          if (s1 && s2) {
            const angle = ang || "180";
            setComputedFill(`linear-gradient(${angle}deg, ${s1} 0%, ${s2} 100%)`);
          } else {
            if (process.env.NODE_ENV === "development") {
              console.warn(`[StarIcon] CSS variable ${varName} not found or empty.`);
            }
            setComputedFill(fill);
          }
        } else {
          setComputedFill(cssFill);
        }
      } else {
        setComputedFill(fill);
      }
    } else {
      cssFill = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-star-icon")
        .trim();
      resolved = true;
      if (cssFill.startsWith("linear-gradient")) {
        setComputedFill(cssFill);
      } else if (!cssFill) {
        const s1 = getComputedStyle(document.documentElement)
          .getPropertyValue("--star-icon-stop-1")
          .trim();
        const s2 = getComputedStyle(document.documentElement)
          .getPropertyValue("--star-icon-stop-2")
          .trim();
        const ang = getComputedStyle(document.documentElement)
          .getPropertyValue("--star-icon-angle")
          .trim();
        if (s1 && s2) {
          const angle = ang || "180";
          setComputedFill(`linear-gradient(${angle}deg, ${s1} 0%, ${s2} 100%)`);
        } else {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              "[StarIcon] CSS variable --color-star-icon not found or empty."
            );
          }
          setComputedFill("#F6C946");
        }
      } else {
        setComputedFill(cssFill);
      }
    }
  }, [fill]);

  let gradientElement = null;
  let fillValue = computedFill;

  if (computedFill.startsWith("linear-gradient")) {
    const result = computeGradient(computedFill, safeGradientId);
    if (result) {
      fillValue = result.fill;
      gradientElement = result.gradientElement;
    }
  }

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "30px", height: "30px", flexShrink: 0 }}
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
