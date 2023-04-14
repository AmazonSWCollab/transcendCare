import React from "react";

interface BannerProps {
  title: string;
  subtitle: string;
}
const Banner: React.FC<BannerProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <img src="/logo.svg" className="w-12 h-12" alt="logo" />
      <p className="text-xl font-bold">{title}</p>
      <p>{subtitle}</p>
    </div>
  );
};

export default Banner;
