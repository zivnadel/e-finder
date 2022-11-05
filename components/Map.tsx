import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import { LatLng } from "../models/LocationModel";

interface Props {
  width: string;
  height: string;
  latLng: LatLng;
}

const Map: React.FC<Props> = ({ width, height, latLng }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
      <GoogleMap
        mapContainerStyle={{ width, height }}
        center={latLng}
        zoom={17}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={latLng} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
