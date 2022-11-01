import { NextApiRequest, NextApiResponse } from "next";

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

const dataExchangeClient = new DataExchangeClient(dataExchangeClientConfig);

// Product (API) info
const productInfo: SendApiAssetCommandInput = {
  DataSetId: "3b5152ecb840cecdf16e11094e3d30ee",
  RevisionId: "ac6f67fb460338e1a0be98b9741061aa",
  AssetId: "49ba158448435313f103976b4862789f",
};

// Practically the request object
const sendApiAssetCommandInput: SendApiAssetCommandInput = {
  ...productInfo,
  Method: "GET",
  Path: "/events",
  QueryStringParameters: {
    q: "jazz",
    country: "US",
  },
  RequestHeaders: {
    "Content-Type": "application/json",
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sendApiAssetCommand = new SendApiAssetCommand(sendApiAssetCommandInput);

  let commandOutput: SendApiAssetCommandOutput;

  // Send the request using DataExchangeClient
  try {
    commandOutput = await dataExchangeClient.send(sendApiAssetCommand);
    console.log("Output");
    console.log(commandOutput);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }

  return res.status(200).json(commandOutput!);
}
