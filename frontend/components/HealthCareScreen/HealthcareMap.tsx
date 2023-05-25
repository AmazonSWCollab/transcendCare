import { geoLocation, HealthcareType } from "@/interface/interface";
import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";

interface MapProps {
  geoLocation: geoLocation;
  providerLocation: HealthcareType[];
}

const HealthcareMap: React.FC<MapProps> = ({
  geoLocation,
  providerLocation,
}) => {
  const myLongitude = geoLocation.geometry.coordinates[0];
  const myLatitude = geoLocation.geometry.coordinates[1];
  const [currentPlaceId, setCurrentPlaceId] = useState<number>();
  let [viewport, setViewport] = useState({
    longitude: myLongitude,
    latitude: myLatitude,
    zoom: 8,
  });
  const handleMarkerClick = (id: number, long: number, lat: number) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };
  return (
    <div className="my-8 h-[400px]">
      <Map
        {...viewport}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(evt) => setViewport(evt.viewState)}
        keyboard
      >
        <Marker
          offset={[-20, -10]}
          longitude={myLongitude}
          latitude={myLatitude}
        >
          <FaMapMarkerAlt size={36} color="red" />
        </Marker>
        {providerLocation.map((provider: HealthcareType) => {
          return (
            <div key={provider.id}>
              <Marker
                offset={[-20, -10]}
                longitude={provider.location[0]}
                latitude={provider.location[1]}
                onClick={() =>
                  handleMarkerClick(
                    provider.id,
                    provider.location[0],
                    provider.location[1],
                  )
                }
              ></Marker>
              {provider.id == currentPlaceId && (
                <Popup
                  key={provider.id}
                  longitude={provider.location[0]}
                  latitude={provider.location[1]}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(0)}
                  anchor="left"
                  className="p-2"
                >
                  <div className="flex flex-col p-2 font-sans">
                    <p className="text-lg font-bold">{provider.title}</p>
                    <p className="mt-2">{provider.address}</p>
                  </div>
                </Popup>
              )}
            </div>
          );
        })}
      </Map>
    </div>
  );
};

export default HealthcareMap;
