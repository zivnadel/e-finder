import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import EventsContext from "../../store/EventsContext";
import FetchContext from "../../store/FetchContext";
import EventsResponseModel from "../../models/EventsResponseModel";
import Map from "../../components/Map";
import ErrorSection from "../../components/ui/ErrorSection";

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
  }, [eventId]);

  return error ? (
    <ErrorSection full error={error} />
  ) : isLoading ? (
    <div>LOADING</div>
  ) : (
    <div>
      <div
        className={`w-full relative min-h-[50vh] backdrop-blur-md ${generateBackgroundClass()} bg-no-repeat bg-center bg-cover shadow-md text-white flex flex-col items-center justify-center p-10 gap-3`}
      >
        {/* Image Backdrop */}
        <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-50"></div>
        <h1 className="mt-nav font-bold text-4xl md:text-5xl text-center drop-shadow-md">
          {selectedEvent?.title}
        </h1>
        <p className="text-center text-lg md:text-xl max-h-[20vh] overflow-auto font-medium drop-shadow-md">
          {selectedEvent?.description}
        </p>
      </div>
      <div className="w-full h-full md:h-[50vh] flex flex-col md:flex-row">
        <div className="w-full h-64 md:h-full"></div>
        <Map
          className="w-full h-96 md:h-full"
          latLng={{
            lat: selectedEvent?.location[1]!,
            lng: selectedEvent?.location[0]!,
          }}
        />
      </div>
    </div>
  );
};

export default Event;
