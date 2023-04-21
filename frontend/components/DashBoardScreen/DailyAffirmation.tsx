import React from "react";
import DashBoardCard from "../Common/Card/DashBoardCard";
//DailyAffirmation items that give user motivational quote daily
const DailyAffirmation = () => {
  return (
    <>
      <DashBoardCard
        title="Daily Affirmation"
        subtitle="I am capable of achieving my goals"
        color="#D5E1E0"
        shadow="#A7CAC7"
        pic="/dailyaff.svg"
      />
    </>
  );
};

export default DailyAffirmation;
