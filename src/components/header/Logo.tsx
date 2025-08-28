// src/components/header/Logo.tsx
interface LogoProps {
  desktopSrc: string;
  mobileSrc?: string;
  alt?: string;
  onClick?: () => void;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
}

export default function Logo({
  desktopSrc,
  mobileSrc,
  alt = "Logo",
  onClick,
  loading = "eager",
  width,
  height,
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
        loading={loading}
        decoding="async"
        style={{ display: "block" }}
        {...(width && height ? { width, height } : {})}
      />
    </picture>
  );
}
