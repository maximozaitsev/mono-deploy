// src/components/header/Logo.tsx
// Серверо-безопасный логотип без хуков
interface LogoProps {
  desktopSrc: string;
  mobileSrc?: string;
  alt?: string;
  onClick?: () => void; // поддерживается, если оборачиваешь в клиентский обработчик
}

export default function Logo({
  desktopSrc,
  mobileSrc,
  alt = "Logo",
  onClick,
}: LogoProps) {
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
