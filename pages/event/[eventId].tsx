import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import EventsContext from "../../store/EventsContext";
import FetchContext from "../../store/FetchContext";
import EventsResponseModel from "../../models/EventsResponseModel";
import Map from "../../components/map/Map";
import ErrorSection from "../../components/ui/ErrorSection";
import LoadingSpinner from "../../components/ui/loading/LoadingSpinner";
import Showcase from "../../components/events/innerPage/Showcase";
import Details from "../../components/events/innerPage/Details";
import WorldMap from "../../components/map/WorldMap";
import useGoogleMaps from "../../hooks/useGoogleMaps";
import { getCategoryDetails } from "../../components/events/Category";
import Head from "next/head";

/**
 * This is the inner event page, it shows the details of the event.
 * It is accessed by clicking on an event in the events grid.
 * It has a showcase section displaying on the entire screen, the title and the description of the event.
 * It has a details section displaying the details of the event.
 * It has a map section displaying the location of the event.
 */

const Event: NextPage = () => {
  const router = useRouter();

  const { eventId } = router.query;

  const { userLocation } = React.useContext(EventsContext)!;

  const { error, setError, isLoading, sendRequest } =
    React.useContext(FetchContext)!;

  const { selectedEvent, setSelectedEvent } = React.useContext(EventsContext)!;

  const [address, setAddress] = React.useState("");

  const { getCurrentPosition, formattedAddressByLatLng } = useGoogleMaps();

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
        setAddress(address);
      }

      if (!userLocation) {
        getCurrentPosition("USER");
      }
    }
  }, [
    selectedEvent,
    eventId,
    address,
    sendRequest,
    router.query.eventId,
    setSelectedEvent,
    setError,
    userLocation,
    formattedAddressByLatLng,
    getCurrentPosition,
  ]);

  React.useEffect(() => {
    fetchRequiredData();
  }, [fetchRequiredData]);

  return (
    <>
      <Head>
        <title>{selectedEvent?.title || "E-Finder"}</title>
      </Head>
      {error ? (
        <ErrorSection full error={error} />
      ) : // this ORs are for preventing loading flickering
      isLoading || !userLocation || !selectedEvent ? (
        <LoadingSpinner asOverlay />
      ) : (
        selectedEvent && (
          <div className="flex flex-col gap-3">
            <Showcase
              title={selectedEvent.title}
              description={selectedEvent.description}
              className={getCategoryDetails(selectedEvent.category).image}
            />
            <Details
              event={selectedEvent}
              userLocation={userLocation!}
              address={address}
            />
            {![
              "public-holidays",
              "school-holidays",
              "observances",
              "politics",
              "daylight-savings",
              "academic",
            ].includes(selectedEvent.category) ? (
              <Map
                className="h-[70vh] md:h-[60vh]"
                latLng={{
                  lat: selectedEvent?.location[1]!,
                  lng: selectedEvent?.location[0]!,
                }}
                userLocation={{
                  lat: userLocation?.lat!,
                  lng: userLocation?.lng!,
                }}
              />
            ) : (
              <WorldMap country={selectedEvent.country} />
            )}
          </div>
        )
      )}
    </>
  );
};

export default Event;
