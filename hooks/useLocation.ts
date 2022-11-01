import React from "react";

import { SendRequest } from "./useAxios";
import Location from "../models/Location";

// custom hook to get the current location using
// Google's Geocoder API
const useLocation = (sendRequest: SendRequest) => {
  const [location, setLocation] = React.useState<Location | null>(null);

  // store in a ref wether we already fetched or not
  const fetched = React.useRef(false);

  // function to get the current location
  // wrapped in useCallback to avoid infinite rerender cycles
  const getCurrentLocation = React.useCallback(() => {
    if (!fetched.current && !location) {
      fetched.current = true;
      navigator.geolocation.getCurrentPosition(async (position) => {
        const location = await sendRequest<Location>(
          `/api/geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        );
        setLocation(location!);
        fetched.current = false;
      });
    }
  }, [sendRequest, location]);

  // bind the getCurrentLocation function to onscroll event
  React.useEffect(() => {
    window.addEventListener("scroll", getCurrentLocation);
  }, [getCurrentLocation]);

  return { location, setLocation };
};

export default useLocation;
