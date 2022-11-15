import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import EventsContext from "../../store/EventsContext";
import FetchContext from "../../store/FetchContext";
import EventsResponseModel from "../../models/EventsResponseModel";
import Map from "../../components/Map";
import ErrorSection from "../../components/ui/ErrorSection";
import LoadingSpinner from "../../components/ui/loading/LoadingSpinner";
import Showcase from "../../components/events/innerPage/Showcase";
import Details from "../../components/events/innerPage/Details";

const Event: NextPage = () => {
  const router = useRouter();

  const { eventId } = router.query;

  const { error, setError, isLoading, sendRequest } =
    React.useContext(FetchContext)!;

  const { selectedEvent, setSelectedEvent } = React.useContext(EventsContext)!;

  const generateBackgroundClass = () => {
    switch (selectedEvent?.category) {
      case "sports":
        return "bg-sports";
      case "academic":
        return "bg-academic";
      case "conferences":
        return "bg-conferences";
      case "community":
        return "bg-community";
      case "concerts":
        return "bg-concerts";
      case "performing-arts":
        return "bg-performing-arts";
      case "expos":
        return "bg-expos";
      case "festivals":
        return "bg-festivals";
      case "daylight-savings":
        return "bg-daylight-savings";
      case "public-holidays":
        return "bg-public-holidays";
      case "school-holidays":
        return "bg-school-holidays";
      case "observances":
        return "bg-observances";
      case "politics":
        return "bg-politics";
      case "severe-weather":
        return "bg-severe-weather";
      case "airport-delays":
        return "bg-airport-delays";
      case "disasters":
        return "bg-disasters";
      case "terror-attacks":
        return "bg-terror-attacks";
      case "health-warnings":
        return "bg-health-warnings";
      case "protests":
        return "bg-protests";
      default:
        return "";
    }
  };

  React.useEffect(() => {
    if (!selectedEvent && eventId) {
      sendRequest<EventsResponseModel>(
        `/api/events?id=${router.query.eventId}`
      ).then((response) => {
        if (response && response.results.length > 0) {
          setSelectedEvent(response.results[0]);
        } else {
          setError("Invalid ID!");
        }
      });
    }
  }, [eventId, selectedEvent]);

  return error ? (
    <ErrorSection full error={error} />
  ) : isLoading ? (
    <LoadingSpinner asOverlay />
  ) : (
    selectedEvent && (
      <div className="flex flex-col gap-3">
        <Showcase
          title={selectedEvent.title}
          description={selectedEvent.description}
          className={generateBackgroundClass()}
        />
        <Details event={selectedEvent} />
        <Map
          className="h-[50vh]"
          latLng={{
            lat: selectedEvent?.location[1]!,
            lng: selectedEvent?.location[0]!,
          }}
        />
      </div>
    )
  );
};

export default Event;
