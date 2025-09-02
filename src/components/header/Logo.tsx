import React, { useEffect, useState } from "react";

interface LogoProps {
  svgPath?: string;
  desktopSrc?: string;
  mobileSrc?: string;
  gradientIdPrefix?: string;
  onClick?: () => void;
  alt?: string;
  loading?: "eager" | "lazy";
}

const Logo: React.FC<LogoProps> = ({
  svgPath,
  desktopSrc,
  mobileSrc,
  gradientIdPrefix = "logo",
  onClick,
  alt = "Logo",
}) => {
  if (desktopSrc) {
    return (
      <picture
        onClick={onClick}
        style={{
          cursor: onClick ? "pointer" : "default",
          display: "inline-block",
        }}
      >
        {mobileSrc && <source media="(max-width: 768px)" srcSet={mobileSrc} />}
        <img
          src={desktopSrc}
          alt={alt}
          loading="eager"
          decoding="async"
          style={{ display: "block" }}
        />
      </picture>
    );
  }

  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    if (!svgPath) return;

    let isCancelled = false;

    fetch(svgPath)
      .then((response) => response.text())
      .then((svgText) => {
        if (isCancelled) return;

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

    return () => {
      isCancelled = true;
    };
  }, [svgPath, gradientIdPrefix]);

  if (!svgPath) {
    return null;
  }

  if (!svgContent) {
    return <span aria-label={alt} role="img" />;
  }

  return (
    <div
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      role="img"
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default Logo;
