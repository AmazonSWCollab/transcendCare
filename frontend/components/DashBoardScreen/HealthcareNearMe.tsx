import React from "react";
import GeneralCard from "../Common/Card/GeneralCard";

const HealthcareNearMe = () => {
  return (
    <div className="mt-10">
      {/* This should be dynamic with data from API */}
      <GeneralCard
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
