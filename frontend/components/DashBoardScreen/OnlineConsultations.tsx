import React from "react";
import DashBoardCard from "../Common/Card/DashBoardCard";

const OnlineConsultations = () => {
  return (
    <div className="mt-10">
      {/* This should be dynamic with data from API */}
      <DashBoardCard
        header="Online Consultations"
        title="Dr. John Doe"
        subtitle="Available now"
        color="#AAE3F6"
        shadow="#7CD0ED"
        pic="/onlinecons.svg"
        additionalText="Click to see more"
        link="/consultation"
      />
    </div>
  );
};

export default OnlineConsultations;
