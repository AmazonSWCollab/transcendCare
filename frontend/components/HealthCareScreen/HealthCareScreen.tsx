"use client";
import { geoLocation, HealthcareType } from "@/interface/interface";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HealthcareMap from "./HealthcareMap";
import providers from "../../utils/providers.json";
import MyLocation from "./MyLocation";
import getProviders from "@/utils/getProviders";

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
  const [healthcareLocation, setHealthcare] =
    useState<HealthcareType[]>(providers);
  return (
    <section className="mt-8 min-h-screen">
      <MyLocation geoLocation={geoLocation} setGeoLocation={setGeoLocation} />
      {geoLocation == initState ? (
        <p className="mt-4">Map Loading...</p>
      ) : (
        <HealthcareMap
          geoLocation={geoLocation}
          providerLocation={healthcareLocation}
        />
      )}
    </section>
  );
};

export default HealthCareScreen;
