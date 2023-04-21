import React from "react";
// This is the children component for <Landing Screen/> that displays cool text
const Banner = () => {
  return (
    <div>
      <div className="flex gap-4 mt-10 items-center">
        <img src="/logo.svg" className="w-12 h-12" alt="logo" />
        <p className="font-bold text-[2rem]">TranscendCare</p>
      </div>
      <p className="font-light text-center text-xl mt-10">
        Transgender Centered Healthcare
      </p>
    </div>
  );
};

export default Banner;
