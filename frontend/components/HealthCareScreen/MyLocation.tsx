"use client";
import React, { useEffect, useState } from "react";
import { HiMapPin } from "react-icons/hi2";
import axios from "axios";
import { cache } from "react";
import { geoLocation } from "@/interface/interface";
interface location {
  latitude: number;
  longitude: number;
}
const MyLocation = () => {
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
  const [location, setLocation] = useState<location>();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: any) {
    const crd = pos.coords;
    const { latitude, longitude } = crd;
    setLocation({ latitude, longitude });
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const fetchApiData = cache(async ({ latitude, longitude }: location) => {
    const body = {
      latitude: latitude,
      longitude: longitude,
    };
    const res = await axios.post("/api/location", body);
    setGeoLocation({
      geometry: res.data.features[0].geometry,
      properties: res.data.features[0].properties,
    });
  });
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, []);
  useEffect(() => {
    // Fetch data from API if `location` object is set
    if (location) {
      fetchApiData(location);
    }
  }, [location]);

  return (
    <div className="flex flex-col gap-4">
      <p className="font-light">Current Location</p>
      <div className="flex flex-wrap items-center gap-4">
        <HiMapPin color="#C5A3CB" size={32} />
        <p>{geoLocation.properties.label}</p>
      </div>
    </div>
  );
};

export default MyLocation;
