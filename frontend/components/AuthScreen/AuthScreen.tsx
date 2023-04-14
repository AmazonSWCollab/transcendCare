"use client";
import React from "react";
import Banner from "./Banner";
import { usePathname } from "next/navigation";
const AuthScreen: React.FC = () => {
  const name = usePathname();
  const isSigninPage = name == "/signin" ? true : false;
  return (
    <div>
      {isSigninPage ? (
        <>
          <Banner
            title="Welcome back"
            subtitle="Let’s make your healthcare easier with us"
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AuthScreen;
