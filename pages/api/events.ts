import { NextApiRequest, NextApiResponse } from "next";

// import required components from the SDK
import {
  DataExchangeClient,
  DataExchangeClientConfig,
  SendApiAssetCommand,
  SendApiAssetCommandInput,
  SendApiAssetCommandOutput,
} from "@aws-sdk/client-dataexchange";

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
      const { lat, lng, radius, active, country } = req.query;

      if (!lat || !lng || !radius || !active) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      /* Construct the request command to the PredictHQ API
         Attributes:
         within: the radius of the circle to search within (in meters). The radius is from the given coord, in lat and lng
         active.gte: filters only events that are active during the given date (will be the current day for the frontend user). gte = greater than (and) equal.
         country: filters only events that are in the given country. not required.

      **/
      const sendAssetPredictHQ: SendApiAssetCommandInput = {
        ...predictHQ,
        Method: "GET",
        Path: "/events",
        QueryStringParameters: {
          within: `${radius}km@${lat},${lng}`,
          "active.gte": active as string,
          country: country as string,
        },
        RequestHeaders: {
          "Content-Type": "application/json",
        },
      };
      const sendApiAssetCommand = new SendApiAssetCommand(sendAssetPredictHQ);

      let commandOutput: SendApiAssetCommandOutput;

      // Send the request using DataExchangeClient
      try {
        commandOutput = await dataExchangeClient.send(sendApiAssetCommand);
        console.log(commandOutput);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }

      return res.status(200).json(commandOutput!);

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
