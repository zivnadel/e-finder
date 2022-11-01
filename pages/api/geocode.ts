import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// A NextJS API Route to handle geocode requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // Allow only GET requests
    case "GET":
      const { lat, lng } = req.query;

      // require having the right params
      if (!lat || !lng) {
        return res.status(400).json({ message: "Invalid request" });
      }

      let data: any;
      try {
        // fetch the address from geocode API
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`
        );
        data = response.data;
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
      }

      if (!data || data.status === "ZERO_RESULTS") {
        // if no results, inform the user
        return res
          .status(404)
          .json({ message: "No address found for this location." });
      }

      // aquire the city, state and country if exists from the address,
      // and return those. Formatting of the output is done on the frontend.
      let exists = data.results[0].address_components.find((component: any) =>
        component.types.includes("locality")
      );
      const city = exists ? exists.long_name : "";

      exists = data.results[0].address_components.find((component: any) =>
        component.types.includes("administrative_area_level_1")
      );
      const state = exists ? exists.long_name : "";

      exists = data.results[0].address_components.find((component: any) =>
        component.types.includes("country")
      );
      const country = exists ? exists.long_name : "";

      const location = {
        lat: +lat,
        lng: +lng,
        city,
        state,
        country,
      };

      return res.status(200).json(location);
    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}
