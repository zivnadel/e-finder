import React from "react";

import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import EventsContext from "../../store/EventsContext";
import FetchContext from "../../store/FetchContext";
import EventsResponseModel from "../../models/EventsResponseModel";

const Event: NextPage = () => {
  const router = useRouter();

  const { eventId } = router.query;

  const { error, isLoading, sendRequest } = React.useContext(FetchContext)!;

  const { selectedEvent, setSelectedEvent } = React.useContext(EventsContext)!;

  React.useEffect(() => {
    if (!selectedEvent && eventId) {
      sendRequest<EventsResponseModel>(
        `/api/events?id=${router.query.eventId}`
      ).then((response) => {
        if (response) {
          setSelectedEvent(response?.results[0]);
        }
      });
    }
  }, [eventId]);

  return error ? (
    <div>ERROR</div>
  ) : isLoading ? (
    <div>LOADING</div>
  ) : (
    <div>
      <div className="w-full h-[50vh] bg-academic bg-no-repeat bg-center bg-cover"></div>
    </div>
  );
};

export default Event;
