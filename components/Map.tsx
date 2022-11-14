import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import { LatLng } from "../models/LocationModel";

interface Props {
  className?: string;
  latLng: LatLng;
}

// A Google map component from the react-google-maps library

const Map: React.FC<Props> = ({ className, latLng }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  return isLoaded ? (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={latLng}
        zoom={14}
      >
        <Marker position={latLng} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(Map);
