"use client";
import { geoLocation, HealthcareType } from "@/interface/interface";
import React, { useEffect, useState } from "react";
import HealthcareMap from "./HealthcareMap";
import providers from "../../utils/providers.json";
import MyLocation from "./MyLocation";
import HealthCareCard from "./HealthCareCard";

const HealthCareScreen = () => {
  const initState: geoLocation = {
    geometry: {
      type: "",
      coordinates: [],
    },
    properties: {
      category: "",
      city: "",
      country: "",
      country_code: "",
      county: "",
      house_number: "",
      label: "",
      macroregion: "",
      name: "",
      postcode: "",
      score: 0,
      street: "",
      town: "",
      type: "",
    },
  };
  const [geoLocation, setGeoLocation] = useState<geoLocation>(initState);
  const [currentOption, setOption] = useState("map");
  const [healthcareLocation, setHealthcare] =
    useState<HealthcareType[]>(providers);
  return (
    <section className="mt-8 min-h-screen">
      <MyLocation geoLocation={geoLocation} setGeoLocation={setGeoLocation} />
      <div className="flex gap-4 my-4 items-center">
        <p>View by:</p>
        <select
          onChange={(e) => setOption(e.target.value)}
          className="p-2"
          name=""
          id=""
        >
          <option value="map">Map</option>
          <option value="card">Card</option>
        </select>
      </div>
      {currentOption == "map" ? (
        <>
          {geoLocation == initState ? (
            <p className="mt-4">Map Loading...</p>
          ) : (
            <HealthcareMap
              geoLocation={geoLocation}
              providerLocation={healthcareLocation}
            />
          )}
        </>
      ) : (
        <>
          <HealthCareCard
            geoLocation={geoLocation}
            providerLocation={healthcareLocation}
          />
        </>
      )}
    </section>
  );
};

export default HealthCareScreen;
