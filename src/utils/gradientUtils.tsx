// src/utils/gradientUtils.tsx
import React from "react";

interface GradientStop {
  color: string;
  offset: string;
}

export interface GradientResult {
  fill: string;
  gradientElement: React.ReactNode;
}

/**
 * Парсит строку градиента вида:
 * "linear-gradient(270deg, #ff1a4c 0%, #ff3d00 100%)"
 * и возвращает объект с вычисленным fill и элементом <defs> для SVG.
 *
 * @param gradientString - Строка градиента.
 * @param gradientId - Уникальный id для градиента.
 * @returns Объект с полями fill и gradientElement или null, если парсинг не удался.
 */
export function computeGradient(
  gradientString: string,
  gradientId: string
): GradientResult | null {
  // Удаляем завершающую точку с запятой, если она есть
  const cleanedGradient = gradientString.replace(/;$/, "");

  const gradientRegex = /linear-gradient\(([^,]+),\s*(.+)\)/i;
  const match = cleanedGradient.match(gradientRegex);
  if (!match) return null;

  const angleString = match[1].trim(); // например, "270deg"
  const stopsString = match[2].trim(); // например, "#ff1a4c 0%, #ff3d00 100%"
  const angleDeg = parseFloat(angleString);

  // Вычисляем координаты для linearGradient
  const rad = (angleDeg - 90) * (Math.PI / 180);
  const x2 = 0.5 + 0.5 * Math.cos(rad);
  const y2 = 0.5 + 0.5 * Math.sin(rad);
  const x1 = 1 - x2;
  const y1 = 1 - y2;

  // Разбиваем строку остановок по запятой
  const stopsArray = stopsString.split(/,\s*/);
  const stops = stopsArray.map((stop: string) => {
    const parts = stop.trim().split(" ");
    const color = parts[0];
    // Если offset не задан или пустой, используем "0%"
    const offset = parts[1] && parts[1].trim() !== "" ? parts[1].trim() : "0%";
    return { color, offset };
  });

  const gradientElement = (
    <defs>
      <linearGradient
        id={gradientId}
        x1={`${x1 * 100}%`}
        y1={`${y1 * 100}%`}
        x2={`${x2 * 100}%`}
        y2={`${y2 * 100}%`}
      >
        {stops.map((s, index) => (
          <stop key={index} offset={s.offset} stopColor={s.color} />
        ))}
      </linearGradient>
    </defs>
  );

  return {
    fill: `url(#${gradientId})`,
    gradientElement,
  };
}
