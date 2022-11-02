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
  DataSetId: process.env.PREDICTHQ_DATASET_ID,
  RevisionId: process.env.PREDICTHQ_REVISION_ID,
  AssetId: process.env.PREDICTHQ_ASSET_ID,
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
