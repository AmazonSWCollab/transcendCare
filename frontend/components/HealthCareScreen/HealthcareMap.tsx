import { geoLocation } from "@/interface/interface";
import React from "react";
import Map, { Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";

interface MapProps {
  geoLocation: geoLocation;
}

const HealthcareMap: React.FC<MapProps> = ({ geoLocation }) => {
  const myLongitude = geoLocation.geometry.coordinates[0];
  const myLatitude = geoLocation.geometry.coordinates[1];
  return (
    <div className="my-8 h-[400px]">
      <Map
        initialViewState={{
          longitude: myLongitude,
          latitude: myLatitude,
          zoom: 14,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          offset={[-20, -10]}
          longitude={myLongitude}
          latitude={myLatitude}
        >
          <FaMapMarkerAlt size={36} color="red" />
        </Marker>
      </Map>
    </div>
  );
};

export default HealthcareMap;
