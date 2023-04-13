import React from "react";
import Banner from "./Banner";
import LinkButton from "../Common/Button/LinkButton";
// This is the main component for app/page.tsx aka the Landing Screen
const LandingScreen = () => {
  return (
    <section className="flex flex-col items-center">
      <Banner />
      <img
        src="/landing pic.svg"
        className="mt-[6rem] object-cover"
        alt="landing"
      />
      <LinkButton
        href="/signin"
        title="Get started"
        color="#C5A3CB"
        custom="mt-[6rem] text-lg w-full text-center"
      />
    </section>
  );
};

export default LandingScreen;
