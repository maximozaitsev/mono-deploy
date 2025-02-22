import React, { useEffect, useState } from "react";

interface LogoProps {
  svgPath: string;
  gradientIdPrefix: string;
  onClick: () => void;
}

const Logo = ({ svgPath, gradientIdPrefix, onClick }: LogoProps) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(svgPath)
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.querySelector("svg");

        if (!svgElement) {
          console.error("Invalid SVG file");
          return;
        }

        const gradients = svgElement.querySelectorAll(
          "linearGradient, radialGradient"
        );
        gradients.forEach((gradient) => {
          const originalId = gradient.getAttribute("id");
          if (originalId) {
            const newId = `${gradientIdPrefix}_${originalId}`;
            gradient.setAttribute("id", newId);

            svgElement
              .querySelectorAll(`[fill="url(#${originalId})"]`)
              .forEach((el) => {
                el.setAttribute("fill", `url(#${newId})`);
              });
            svgElement
              .querySelectorAll(`[stroke="url(#${originalId})"]`)
              .forEach((el) => {
                el.setAttribute("stroke", `url(#${newId})`);
              });
          }

          const stops = gradient.querySelectorAll("stop");
          stops.forEach((stop, index) => {
            if (!stop.hasAttribute("offset")) {
              const offsetValue =
                stops.length > 1 ? index / (stops.length - 1) : 0;
              stop.setAttribute("offset", offsetValue.toString());
            }
          });
        });

        const serializer = new XMLSerializer();
        const updatedSvgText = serializer.serializeToString(svgElement);
        setSvgContent(updatedSvgText);
      })
      .catch((error) => console.error("Error loading SVG:", error));
  }, [svgPath, gradientIdPrefix]);

  if (!svgContent) {
    return <div>Logo</div>;
  }

  return (
    <div
      onClick={onClick}
      style={{ cursor: "pointer" }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default Logo;
