export function computeGradient(
  gradientString: string,
  gradientId: string
): GradientResult | null {
  console.log("Raw gradient input:", gradientString);

  const cleanedGradient = gradientString.replace(/;$/, "");
  console.log("Cleaned gradient:", cleanedGradient);

  const gradientRegex = /linear-gradient\(([^,]+),\s*(.+)\)/i;
  const match = cleanedGradient.match(gradientRegex);
  if (!match) {
    console.warn("Gradient regex failed to match:", cleanedGradient);
    return null;
  }

  const angleString = match[1].trim();
  const stopsString = match[2].trim();
  console.log("Parsed angle:", angleString);
  console.log("Parsed stops:", stopsString);

  const stopsArray = stopsString.split(/,\s*/);
  const stops = stopsArray.map((stop: string) => {
    const parts = stop.trim().split(" ");
    const color = parts[0];
    const offset = parts[1] || "0%";
    return { color, offset };
  });

  console.log("Final stops:", stops);

  const gradientElement = (
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
        {stops.map((s, index) => (
          <stop key={index} offset={s.offset} stopColor={s.color} />
        ))}
      </linearGradient>
    </defs>
  );

  console.log("Generated gradient element:", gradientElement);

  return {
    fill: `url(#${gradientId})`,
    gradientElement,
  };
}
