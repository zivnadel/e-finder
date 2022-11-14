import React from "react";
import LocationModel from "../models/LocationModel";
import EventsContext from "../store/EventsContext";
import FetchContext from "../store/FetchContext";

/** 
This react hook wraps the functionality to get the location of the user
using the Google Geocode API
*/

const useGoogleMaps = () => {
  const { sendRequest, setError, setIsLoading } =
    React.useContext(FetchContext)!;

  const { setLocation } = React.useContext(EventsContext)!;

  const geocodeByLatLng = React.useCallback(
    async (lat: number, lng: number) => {
      const locationData = await sendRequest<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );

      if (!locationData || locationData.status === "ZERO_RESULTS") {
        // if no results, inform the user
        setError("No address found for this location.");
        return;
      }

      // aquire the city, state and country if exists from the address,
      // and return those. Formatting of the output is done on the frontend.
      let exists = locationData.results[0].address_components.find(
        (component: any) => component.types.includes("locality")
      );
      const city = exists ? exists.long_name : "";

      exists = locationData.results[0].address_components.find(
        (component: any) => component.types.includes("country")
      );
      const country = exists ? exists.long_name : "";

      let location: LocationModel = {
        lat,
        lng,
        city,
        country,
      };

      // This is to prevent flickering for a second between the
      // fetch location and fetch events
      setIsLoading(true);
      setLocation(location);
    },
    [sendRequest, setError, setIsLoading, setLocation]
  );

  const geocodeByAddress = React.useCallback(
    async (address: string) => {
      const locationData = await sendRequest<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );

      if (!locationData || locationData.status === "ZERO_RESULTS") {
        // if no results, inform the user
        setError("No address found for this location.");
        return;
      }

      // aquire the city, state and country if exists from the address,
      // and return those. Formatting of the output is done on the frontend.
      let exists = locationData.results[0].address_components.find(
        (component: any) => component.types.includes("locality")
      );
      const city = exists ? exists.long_name : "";

      exists = locationData.results[0].address_components.find(
        (component: any) => component.types.includes("country")
      );
      const country = exists ? exists.long_name : "";

      let location: LocationModel = {
        q: address,
        lat: locationData.results[0].geometry.location.lat,
        lng: locationData.results[0].geometry.location.lng,
        city,
        country,
      };

      // This is to prevent flickering for a second between the
      // fetch location and fetch events
      setIsLoading(true);
      setLocation(location);
    },
    [sendRequest, setError, setIsLoading, setLocation]
  );

  // callback for fetching the location using Google Geocode API
  const handleCurrentPosition = React.useCallback(
    async (position: GeolocationPosition) => {
      await geocodeByLatLng(
        position.coords.latitude,
        position.coords.longitude
      );
    },
    [geocodeByLatLng]
  );

  // callback for handling error when requesting the user's location
  const handleGeolocationError = React.useCallback(
    (error: GeolocationPositionError) => {
      if (error.message === "User denied Geolocation") {
        setError(
          "Location access denied. Please allow location access to explore events near you."
        );
      } else {
        setError("An error occurred while fetching your location.");
      }
      setIsLoading(false);
    },
    [setError, setIsLoading]
  );

  // fetch the current location and the events in the area when the component mounts

  const getCurrentPosition = React.useCallback(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      handleCurrentPosition,
      handleGeolocationError
    );
  }, [handleCurrentPosition, handleGeolocationError, setIsLoading]);

  return { geocodeByAddress, geocodeByLatLng, getCurrentPosition };
};

export default useGoogleMaps;
