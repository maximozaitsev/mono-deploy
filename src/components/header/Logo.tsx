import React from "react";
import LogoSVG from "/public/logo.svg";

const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <LogoSVG />
    </div>
  );
};

export default Logo;
