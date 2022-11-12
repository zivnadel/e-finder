// A file to store all the functionality relevant to the AWS Data Ecxchange API
// The backend can use the exported members to access the API

import {
  DataExchangeClient,
  SendApiAssetCommandInput,
} from "@aws-sdk/client-dataexchange";

const logger = {
  debug: console.debug,
  info: console.log,
  warn: console.warn,
  error: console.error,
};

const credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID!,
  secretAccessKey: process.env.SECRET_ACCESS_KEY!,
};

// instantiate the DataExchangeClient
export const dataExchangeClient = (region: string = "us-west-2") => {
  return new DataExchangeClient({ region, logger, credentials });
};

// PredictHQ API info
export const predictHQ: SendApiAssetCommandInput = {
  DataSetId: process.env.PREDICTHQ_DATASET_ID,
  RevisionId: process.env.PREDICTHQ_REVISION_ID,
  AssetId: process.env.PREDICTHQ_ASSET_ID,
};
