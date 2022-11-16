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
import WorldChart from "../../components/WorldChart";
import useGoogleMaps from "../../hooks/useGoogleMaps";

const Event: NextPage = () => {
  const router = useRouter();

  const { eventId } = router.query;

  const { error, setError, isLoading, sendRequest } =
    React.useContext(FetchContext)!;

  const { selectedEvent, setSelectedEvent } = React.useContext(EventsContext)!;

  const [address, setAddress] = React.useState("");

  const { formattedAddressByLatLng } = useGoogleMaps();

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

  const fetchRequiredData = React.useCallback(async () => {
    if (!selectedEvent && eventId) {
      const response = await sendRequest<EventsResponseModel>(
        `/api/events?id=${router.query.eventId}`
      );
      if (response?.results[0]) {
        setSelectedEvent(response.results[0]);
      } else {
        setError("Invalid ID!");
        return;
      }
    }

    if (selectedEvent && !address) {
      const entity = selectedEvent.entities.find(
        (entity) => entity.type === "venue" || entity.type === "airport"
      );

      if (entity) {
        setAddress(entity.formatted_address);
      } else {
        const address = await formattedAddressByLatLng(
          selectedEvent.location[1],
          selectedEvent.location[0]
        );
        console.log(address);
        setAddress(address);
      }
    }
  }, [
    address,
    eventId,
    formattedAddressByLatLng,
    router.query.eventId,
    selectedEvent,
    sendRequest,
    setError,
    setSelectedEvent,
  ]);

  React.useEffect(() => {
    fetchRequiredData();
  }, [fetchRequiredData]);

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
        <Details event={selectedEvent} address={address} />
        {![
          "public-holidays",
          "school-holidays",
          "observances",
          "politics",
          "daylight-savings",
          "academic",
        ].includes(selectedEvent.category) ? (
          <Map
            className="h-[50vh]"
            latLng={{
              lat: selectedEvent?.location[1]!,
              lng: selectedEvent?.location[0]!,
            }}
            markerLabel={address}
          />
        ) : (
          <WorldChart
            country={selectedEvent.country}
            className="h-[50vh] w-full"
          />
        )}
      </div>
    )
  );
};

export default Event;
