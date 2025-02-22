import React, { useEffect, useState } from "react";

interface LogoProps {
  svgPath: string; 
  gradientIdPrefix: string;
  onClick: () => void;
}

const Logo = ({ svgPath, gradientIdPrefix, onClick }: LogoProps) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    // Загружаем SVG-файл динамически
    fetch(svgPath)
      .then((response) => response.text())
      .then((svgText) => {
        // Парсим SVG как DOM-элемент
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.querySelector("svg");

        if (!svgElement) {
          console.error("Invalid SVG file");
          return;
        }

        // Обрабатываем градиенты: добавляем уникальные ID и исправляем <stop>
        const gradients = svgElement.querySelectorAll(
          "linearGradient, radialGradient"
        );
        gradients.forEach((gradient) => {
          const originalId = gradient.getAttribute("id");
          if (originalId) {
            // Добавляем уникальный префикс к ID градиента
            const newId = `${gradientIdPrefix}_${originalId}`;
            gradient.setAttribute("id", newId);

            // Обновляем ссылки на этот градиент в атрибутах fill и stroke
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

          // Исправляем <stop> элементы, добавляя offset, если его нет
          const stops = gradient.querySelectorAll("stop");
          stops.forEach((stop, index) => {
            if (!stop.hasAttribute("offset")) {
              // Если offset отсутствует, добавляем значение по умолчанию
              // Например, равномерно распределяем между 0 и 1
              const offsetValue =
                stops.length > 1 ? index / (stops.length - 1) : 0;
              stop.setAttribute("offset", offsetValue.toString());
            }
          });
        });

        // Сериализуем обработанный SVG обратно в строку
        const serializer = new XMLSerializer();
        const updatedSvgText = serializer.serializeToString(svgElement);
        setSvgContent(updatedSvgText);
      })
      .catch((error) => console.error("Error loading SVG:", error));
  }, [svgPath, gradientIdPrefix]);

  if (!svgContent) {
    return <div>Loading logo...</div>; // Заглушка на время загрузки
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
