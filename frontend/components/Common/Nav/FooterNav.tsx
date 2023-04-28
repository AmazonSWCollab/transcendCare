"use client";
import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterNav = () => {
  const pathname = usePathname();
  console.log(pathname);
  const navItems = [
    {
      id: "01",
      name: "home",
      logo: <AiFillHome size={28} />,
      path: "/",
    },
    {
      id: "02",
      name: "profile",
      logo: <BsPersonFill size={28} />,
      path: "/profile",
    },
  ];
  return (
    <div className="z-[4] text-[#5FA4B4] sticky justify-between w-screen flex py-4 px-8 bg-[#D5E1E0] rounded-t-lg bottom-0 m-[-2rem]">
      {navItems.map((item) => {
        return (
          <Link
            className={`${item.path == pathname ? "text-black" : ""}`}
            key={item.id}
            href={item.path}
          >
            {item.logo}
          </Link>
        );
      })}
    </div>
  );
};

export default FooterNav;
