import { NextApiRequest, NextApiResponse } from "next";

// import required components from the SDK
import {
  DataExchangeClient,
  DataExchangeClientConfig,
  SendApiAssetCommand,
  SendApiAssetCommandInput,
} from "@aws-sdk/client-dataexchange";
import EventsResponseModel from "../../models/EventsResponseModel";
import axios from "axios";

// dataExchangeClientConfig is the configuration object for the DataExchangeClient
const dataExchangeClientConfig: DataExchangeClientConfig = {
  region: process.env.PREDICTHQ_REGION || "us-west-2",
  logger: {
    debug: console.debug,
    info: console.log,
    warn: console.warn,
    error: console.error,
  },
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

// instantiate the DataExchangeClient
const dataExchangeClient = new DataExchangeClient(dataExchangeClientConfig);

// PredictHQ API info
const predictHQ: SendApiAssetCommandInput = {
  DataSetId: process.env.PREDICTHQ_DATASET_ID,
  RevisionId: process.env.PREDICTHQ_REVISION_ID,
  AssetId: process.env.PREDICTHQ_ASSET_ID,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      // cache
      res.setHeader("Cache-Control", "s-maxage=10");

      const { lat, lng, radius, active, country, sort } = req.query;

      if (!lat || !lng || !radius || !active) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      // fetch the actual address of the coordinates using the Google Maps API (geocoder)

      let locationData: any;
      try {
        // fetch the address from geocode API
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLUC_GOOGLE_API_KEY}`
        );
        locationData = response.data;
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
      }

      if (!locationData || locationData.status === "ZERO_RESULTS") {
        // if no results, inform the user
        return res
          .status(404)
          .json({ message: "No address found for this location." });
      }

      // aquire the city, state and country if exists from the address,
      // and return those. Formatting of the output is done on the frontend.
      let exists = locationData.results[0].address_components.find(
        (component: any) => component.types.includes("locality")
      );
      const currentCity = exists ? exists.long_name : "";

      exists = locationData.results[0].address_components.find(
        (component: any) =>
          component.types.includes("administrative_area_level_1")
      );
      const currentState = exists ? exists.long_name : "";

      exists = locationData.results[0].address_components.find(
        (component: any) => component.types.includes("country")
      );
      const currentCountry = exists ? exists.long_name : "";

      const currentLocation = {
        lat: +lat!,
        lng: +lng!,
        city: currentCity,
        state: currentState,
        country: currentCountry,
      };

      /* Construct the request command to the PredictHQ API
         Attributes:
         country: filters only events that are in the given country. not required.
         within: the radius of the circle to search within (in meters). The radius is from the given coord, in lat and lng
         active.gte: filters only events that are active during the given date (will be the current day for the frontend user). gte = greater than (and) equal.

      **/
      const sendAssetPredictHQ: SendApiAssetCommandInput = {
        ...predictHQ,
        Method: "GET",
        Path: "/events",
        QueryStringParameters: {
          within: `${radius}km@${lat},${lng}`,
          "active.gte": active as string,
          country: country as string,
          sort: (sort as string) || "start",
          limit: "200",
        },
        RequestHeaders: {
          "Content-Type": "application/json",
        },
      };
      const sendApiAssetCommand = new SendApiAssetCommand(sendAssetPredictHQ);

      let data: EventsResponseModel & { error: string; status: number };

      // Send the request using DataExchangeClient
      try {
        const commandOutput = await dataExchangeClient.send(
          sendApiAssetCommand
        );
        if (commandOutput.Body) {
          // parse the response if there is a body
          data = JSON.parse(commandOutput.Body!);
          if (data.error) {
            throw new Error(data.error);
          }
        } else {
          return res.status(500).json({ message: "No data returned" });
        }
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
      }

      // return the response
      return res.status(200).json({ data, currentLocation });

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
