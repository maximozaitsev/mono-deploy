interface ArrowDownProps {
  size?: number;
  color?: string;
}

const ArrowDown = ({
  size = 24,
  color = "currentColor",
}: ArrowDownProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.99979 8.5C6.80204 8.50004 6.60874 8.55871 6.44433 8.6686C6.27992 8.77848 6.15178 8.93465 6.07611 9.11735C6.00044 9.30005 5.98064 9.50108 6.0192 9.69503C6.05777 9.88898 6.15298 10.0671 6.29279 10.207L11.2928 15.207C11.4803 15.3945 11.7346 15.4998 11.9998 15.4998C12.265 15.4998 12.5193 15.3945 12.7068 15.207L17.7068 10.207C17.8466 10.0671 17.9418 9.88898 17.9804 9.69503C18.0189 9.50108 17.9991 9.30005 17.9235 9.11735C17.8478 8.93465 17.7197 8.77848 17.5552 8.6686C17.3908 8.55871 17.1975 8.50004 16.9998 8.5H6.99979Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowDown;
