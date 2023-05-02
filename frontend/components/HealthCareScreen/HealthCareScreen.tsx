"use client";
import { geoLocation } from "@/interface/interface";
import React, { useState } from "react";
import HealthcareMap from "./HealthcareMap";
import MyLocation from "./MyLocation";

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
  return (
    <section className="mt-8 min-h-screen">
      <MyLocation geoLocation={geoLocation} setGeoLocation={setGeoLocation} />
      {geoLocation == initState ? (
        <p className="mt-4">Map Loading...</p>
      ) : (
        <HealthcareMap geoLocation={geoLocation} />
      )}
    </section>
  );
};

export default HealthCareScreen;
