"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { UserResource } from "@clerk/types";
interface HeaderProps {
  user: UserResource | null | undefined;
}
const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-4 text-xl">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox:
              "shadow-lg shadow-[rgba(0, 0, 0, 0.25)] rounded-[20%] w-12 h-12 object-cover",
            userButtonPopoverCard: "w-[80%]",
          },
        }}
      />
      <div className="flex flex-col">
        <p>Hello,</p>
        <p>{user?.fullName}</p>
      </div>
    </div>
  );
};

export default Header;
