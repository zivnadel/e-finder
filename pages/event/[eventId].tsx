import React from "react";

import {
  SendApiAssetCommand,
  SendApiAssetCommandInput,
} from "@aws-sdk/client-dataexchange";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { dataExchangeClient, predictHQ } from "../../lib/aws-data-exchange";
import EventsResponseModel from "../../models/EventsResponseModel";

// TODO: complete this page (and use the other APIs here)
// upon clicking on an event item, the user is redirected to this page
// it displays the event details and much more

interface Props {
  eventsResponse: EventsResponseModel | null;
}

const Event: NextPage<Props> = ({ eventsResponse }) => {
  const router = useRouter();

  React.useEffect(() => {
    console.log(eventsResponse);
  }, [eventsResponse]);

  return <div>{router.query.eventId}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sendAssetPredictHQ: SendApiAssetCommandInput = {
    ...predictHQ,
    Method: "GET",
    Path: "/events",
    RequestHeaders: {
      "Content-Type": "application/json",
    },
    QueryStringParameters: {
      id: context.query.eventId as string,
    },
  };

  const sendApiAssetPredictHQCommand = new SendApiAssetCommand(
    sendAssetPredictHQ
  );

  let eventsResponse: EventsResponseModel | null = null;

  try {
    const eventsCommandOutput = await dataExchangeClient(
      process.env.PREDICTHQ_REGION
    ).send(sendApiAssetPredictHQCommand);
    if (eventsCommandOutput.Body) {
      // parse the response if there is a body
      eventsResponse = JSON.parse(eventsCommandOutput.Body);
      if (!eventsResponse || eventsResponse.error) {
        throw new Error(eventsResponse!.error || "An error occurred");
      }

      if (eventsResponse.results.length === 0) {
        throw new Error("Invalid event ID");
      }
    }
  } catch (error) {
    // error
  }

  return {
    props: {
      eventsResponse,
    },
  };
};

export default Event;
