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

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(latLng);
      map.fitBounds(bounds);
      setMap(map);
    },
    [latLng]
  );

  const onUnmount = React.useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className={className}>
      <GoogleMap
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={latLng}
        zoom={17}
      >
        <Marker position={latLng} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(Map);
