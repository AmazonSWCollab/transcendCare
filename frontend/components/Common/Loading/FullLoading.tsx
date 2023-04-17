import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
// Loading cover entire screen
const FullLoading = () => {
  return (
    <div className="absolute m-[-2rem] w-[100vw] h-[100vh]">
      <AiOutlineLoading
        size={24}
        className="top-1/2 left-1/2 absolute animate-spin"
      />
    </div>
  );
};

export default FullLoading;
