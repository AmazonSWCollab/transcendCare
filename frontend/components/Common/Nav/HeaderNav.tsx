"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
const HeaderNav = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-between">
      <BsArrowLeftShort
        className="cursor-pointer"
        size={32}
        onClick={() => router.push("/")}
      />
      <img
        onClick={() => router.back()}
        src="/logo.svg"
        className="cursor-pointer"
        alt="logo"
      />
    </nav>
  );
};

export default HeaderNav;
