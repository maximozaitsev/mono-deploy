import React from "react";
import Image from "next/image";

const LogoFooter = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <Image
        src="/logo-footer.svg"
        alt="Footer Logo"
        width={128}
        height={48}
        priority
      />
    </div>
  );
};

export default LogoFooter;
