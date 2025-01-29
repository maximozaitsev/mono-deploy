import React from "react";
import Image from "next/image";

const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <Image
        src="/logo-footer.svg"
        alt="Logo"
        width={190}
        height={48}
        priority
      />
    </div>
  );
};

export default Logo;
