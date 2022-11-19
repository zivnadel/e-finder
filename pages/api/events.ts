import {
  SendApiAssetCommand,
  SendApiAssetCommandInput,
} from "@aws-sdk/client-dataexchange";
import { NextApiRequest, NextApiResponse } from "next";
import { dataExchangeClient, predictHQ } from "../../lib/aws-data-exchange";
import EventsResponseModel from "../../models/EventsResponseModel";

/**
 * API endpoint to fetch events from PredictHQ API
 * Practically this is a proxy to the PredictHQ API
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      // cache
      res.setHeader("Cache-Control", "s-maxage=10");

      const sendAssetPredictHQ: SendApiAssetCommandInput = {
        ...predictHQ,
        Method: "GET",
        Path: "/events",
        QueryStringParameters: req.query as any,
        RequestHeaders: {
          "Content-Type": "application/json",
        },
      };
      const sendApiAssetCommand = new SendApiAssetCommand(sendAssetPredictHQ);

      let data: EventsResponseModel;

      // Send the request using DataExchangeClient defined in aws-data-exchange.ts
      try {
        const commandOutput = await dataExchangeClient(
          process.env.PREDICTHQ_REGION
        ).send(sendApiAssetCommand);
        if (commandOutput.Body) {
          // parse the response if there is a body
          data = JSON.parse(commandOutput.Body);
          if (data.error) {
            throw new Error(data.error);
          }
        } else {
          return res.status(500).json({ message: "No data returned" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
      }

      // return the response
      return res.status(200).json(data);

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
