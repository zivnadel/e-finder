import React from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Element } from "react-scroll";
import { LatLng } from "../models/LocationModel";
import EventsContext from "../store/EventsContext";

interface Props {
  className?: string;
  latLng: LatLng;
  showRoute?: boolean;
  setShowRoute?: React.Dispatch<React.SetStateAction<boolean>>;
  travelMode?: string;
}

// A Google map component from the react-google-maps library

const Map: React.FC<Props> = ({
  className,
  latLng,
  showRoute,
  travelMode,
  setShowRoute,
}) => {
  const { location } = React.useContext(EventsContext)!;

  const { isLoaded } = useJsApiLoader({
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

  return isLoaded ? (
    <Element name="map" className={className}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={latLng}
        zoom={14}
      >
        {!showRoute && <Marker position={latLng} />}
        {showRoute && !directionsResponse && location && (
          <DirectionsService
            options={{
              destination: latLng,
              origin: { lat: location?.lat!, lng: location?.lng! },
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
    </Element>
  ) : (
    <></>
  );
};

export default React.memo(Map);
