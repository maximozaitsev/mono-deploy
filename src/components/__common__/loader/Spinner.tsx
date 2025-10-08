"use client";

import styles from "./Spinner.module.scss";

type SpinnerProps = {
  variant?: "fullscreen" | "inline";
  size?: number;
  color?: string;
};
export default function Spinner({
  variant = "fullscreen",
  size = 48,
  color,
}: SpinnerProps) {
  const wrapperClass =
    variant === "fullscreen" ? styles.overlay : styles.inline;
  const arcStyle: React.CSSProperties = color
    ? { width: `${size}px`, height: `${size}px`, color }
    : { width: `${size}px`, height: `${size}px` };
  return (
    <div className={wrapperClass} role="status" aria-live="polite">
      <div className={styles.box}>
        <span className={styles.arc} aria-hidden="true" style={arcStyle} />
        <span className={styles.visuallyHidden}>Loading…</span>
      </div>
    </div>
  );
}
