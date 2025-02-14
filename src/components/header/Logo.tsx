import React from "react";
import Image from "next/image";

const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="logo" onClick={onClick}>
      <Image src="/logo.svg" alt="Logo" width={275} height={48} priority />
    </div>
  );
};

export default Logo;
