import React from "react";
import Image from "next/image";

const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <Image src="/logo.svg" alt="Logo" width={109} height={24} priority />
    </div>
  );
};

export default Logo;
