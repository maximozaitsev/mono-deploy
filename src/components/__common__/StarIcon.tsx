import React, { useId } from "react";

interface StarIconProps {
  fill?: string;
}

const StarIcon: React.FC<StarIconProps> = () => {
  const gradientId = useId();

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "30px", height: "30px", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0.5%" stopColor="#830012" />
          <stop offset="46%" stopColor="#FF405B" />
          <stop offset="100%" stopColor="#830012" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.5491 9.85283C29.1866 9.91078 29.7253 10.346 29.9217 10.9588C30.1193 11.5727 29.9355 12.2436 29.4541 12.6684L22.9091 18.4573L24.8391 27.0329C24.9803 27.662 24.7379 28.3141 24.219 28.6934C23.7015 29.0718 23.0128 29.102 22.4664 28.7705L15.0001 24.2676L7.53107 28.7705C7.27861 28.9229 6.99731 29 6.71372 29C6.3848 29 6.05864 28.8966 5.77986 28.6934C5.2612 28.3152 5.01858 27.6634 5.1598 27.0329L7.08978 18.4573L0.544748 12.6673C0.063398 12.2436 -0.119025 11.5715 0.0785045 10.9588C0.276034 10.346 0.813461 9.91217 1.44977 9.85283L10.1099 9.05976L13.5339 0.977318C13.7863 0.383493 14.3613 0 15.0001 0C15.6389 0 16.2139 0.383493 16.4664 0.975933L19.8903 9.05976L28.5491 9.85283ZM17.8283 11.8835L25.0641 12.5462L19.5928 17.3854L21.1939 24.4997L15.0004 20.7645L8.80499 24.4995L10.406 17.3856L4.93557 12.5462L12.1718 11.8835L15.0003 5.20665L17.8283 11.8835Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export default StarIcon;
