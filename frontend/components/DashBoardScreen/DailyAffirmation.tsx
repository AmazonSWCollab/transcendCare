import React from "react";
import DashBoardCard from "../Common/Card/DashBoardCard";
import getRandomQuote from "@/utils/getRandomQuote";
//DailyAffirmation items that give user motivational quote daily
const DailyAffirmation = () => {
  let quote = getRandomQuote();
  return (
    <>
      <DashBoardCard
        title="Daily Affirmation"
        subtitle={quote.text}
        color="#D5E1E0"
        shadow="#A7CAC7"
        pic="/dailyaff.svg"
      />
    </>
  );
};

export default DailyAffirmation;
