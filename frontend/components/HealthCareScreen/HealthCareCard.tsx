import { geoLocation, HealthcareType } from "@/interface/interface";
import React from "react";
interface CardProps {
  geoLocation: geoLocation;
  providerLocation: HealthcareType[];
}
const HealthCareCard: React.FC<CardProps> = ({
  geoLocation,
  providerLocation,
}) => {
  return (
    <>
      {providerLocation.map((provider: HealthcareType) => {
        return (
          <div
            key={provider.id}
            className="flex p-4 mb-10 flex-col bg-pink_bg rounded-md"
          >
            <p className="text-xl font-bold">{provider.title}</p>
            <p>{provider.address}</p>
          </div>
        );
      })}
    </>
  );
};

export default HealthCareCard;
