import React from "react";
import FetchContext from "../store/FetchContext";

/** 
This react hook wraps the functionality to get the location of the user
using the Google Geocode API
*/
const useGeocode = () => {
  const { sendRequest } = React.useContext(FetchContext)!;

  const geocode = React.useCallback(
    async (lat: number, lng: number) => {
      const locationData = await sendRequest<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );

      if (!locationData || locationData.status === "ZERO_RESULTS") {
        // if no results, inform the user
        throw new Error("No address found for this location.");
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

      return {
        lat,
        lng,
        city,
        country,
      };
    },
    [sendRequest]
  );

  return geocode;
};

export default useGeocode;
