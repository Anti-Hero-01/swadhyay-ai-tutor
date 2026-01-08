import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "w-10 h-10", // 40px
  md: "w-11 h-11", // 44px
  lg: "w-12 h-12",
};

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  return (
    <img
      src="/LOGO.jpeg"
      alt="Swadhyay logo"
      className={`${sizeMap[size]} rounded-full object-cover border border-border bg-transparent`}
      loading="lazy"
      draggable={false}
    />
  );
};

export default Logo;
