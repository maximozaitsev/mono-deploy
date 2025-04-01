import React, { useId } from "react";

interface PlayIconProps {
  size?: number;
}

const PlayIcon: React.FC<PlayIconProps> = ({ size = 33 }) => {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0.5%" stopColor="#830012" />
          <stop offset="46%" stopColor="#FF405B" />
          <stop offset="100%" stopColor="#830012" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId})`}>
        <g clipPath="url(#clip0_392_282)">
          <path d="M16.8333 0.078125C7.96057 0.078125 0.767548 7.20629 0.767548 15.9993C0.767548 24.7924 7.96057 31.9206 16.8333 31.9206C25.7061 31.9206 32.8991 24.7924 32.8991 15.9993C32.8991 7.20629 25.7061 0.078125 16.8333 0.078125ZM22.3861 16.8433L14.3532 21.8187C14.1906 21.9192 14.0058 21.9698 13.821 21.9698C13.6536 21.9698 13.4859 21.9285 13.3341 21.8449C13.0149 21.6695 12.8169 21.3367 12.8169 20.9747V11.024C12.8169 10.662 13.0149 10.3291 13.3341 10.1538C13.6533 9.97739 14.0436 9.98808 14.3532 10.18L22.3861 15.1554C22.6795 15.3376 22.858 15.6563 22.858 15.9993C22.858 16.3423 22.6795 16.6611 22.3861 16.8433Z" />
        </g>
        <defs>
          <clipPath id="clip0_392_282">
            <rect
              x="0.767548"
              y="0.078125"
              width="32.1316"
              height="31.8424"
              rx="8"
              fill="white"
            />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
};

export default PlayIcon;
