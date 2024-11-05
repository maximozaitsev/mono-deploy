import React from "react";
import Image from "next/image";

const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <Image src="/footer-logo.svg" alt="Logo" width={128} height={48} priority />
    </div>
  );
};

export default Logo;
