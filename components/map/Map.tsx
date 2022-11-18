import React from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Element } from "react-scroll";
import { LatLng } from "../../models/LocationModel";
import ErrorSection from "../ui/ErrorSection";
import MapButtons from "./MapButtons";

interface Props {
  className?: string;
  latLng: LatLng;
  userLocation: LatLng;
}

// A Google map component from the react-google-maps library

const Map: React.FC<Props> = ({ className, latLng, userLocation }) => {
  const [showRoute, setShowRoute] = React.useState(false);
  const [travelMode, setTravelMode] = React.useState("DRIVING");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  const [directionsResponse, setDirectionsResponse] = React.useState<any>(null);

  const directionsCallback = React.useCallback((res: any) => {
    if (res !== null) {
      setDirectionsResponse(res);
    }
    if (res.status !== "OK") {
      setShowRoute!(false);
      setDirectionsResponse(null);
    }
  }, []);

  React.useEffect(() => {
    // reset the response if showRoute or the travel mode is changed
    setDirectionsResponse(null);
  }, [showRoute, travelMode]);

  return loadError ? (
    <ErrorSection error="Map Loading Failed!" />
  ) : isLoaded ? (
    <Element name="map" className="relative">
      <MapButtons setShowRoute={setShowRoute} setTravelMode={setTravelMode} />

      <div className={className}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={latLng}
          zoom={14}
        >
          {!showRoute && <Marker position={latLng} />}
          {showRoute && !directionsResponse && (
            <DirectionsService
              options={{
                destination: latLng,
                origin: { lat: userLocation.lat, lng: userLocation.lng },
                travelMode: travelMode as any,
              }}
              callback={directionsCallback}
            />
          )}
          {showRoute && directionsResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsResponse,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </Element>
  ) : (
    <></>
  );
};

export default React.memo(Map);
