import React from "react";
import DashBoardCard from "../Common/Card/DashBoardCard";
//HealthcareNearMe items that suggest trans friendly healthcare nearby them
const HealthcareNearMe = () => {
  return (
    <div className="mt-10">
      {/* This should be dynamic with data from API */}
      <DashBoardCard
        header="Healthcare Near Me"
        title="Transcend Health Clinic"
        subtitle="4567 Main Street"
        color="#E9D5EC"
        shadow="#C5A3CB"
        pic="/location.svg"
        additionalText="Click to see more"
        link="/healthcare"
      />
    </div>
  );
};

export default HealthcareNearMe;
