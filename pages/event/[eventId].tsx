import React from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import EventsContext from "../../store/EventsContext";
import FetchContext from "../../store/FetchContext";
import EventsResponseModel from "../../models/EventsResponseModel";
import Map from "../../components/ui/map/Map";
import ErrorSection from "../../components/ui/ErrorSection";
import LoadingSpinner from "../../components/ui/loading/LoadingSpinner";
import Showcase from "../../components/events/innerPage/Showcase";
import Details from "../../components/events/innerPage/Details";
import WorldChart from "../../components/WorldChart";
import useGoogleMaps from "../../hooks/useGoogleMaps";
import { getCategoryDetails } from "../../components/events/Category";

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

  const { location } = React.useContext(EventsContext)!;

  const { error, setError, isLoading, sendRequest } =
    React.useContext(FetchContext)!;

  const { selectedEvent, setSelectedEvent } = React.useContext(EventsContext)!;

  const [address, setAddress] = React.useState("");

  const { formattedAddressByLatLng } = useGoogleMaps();

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
    }
  }, [selectedEvent, address, eventId]);

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
          className={getCategoryDetails(selectedEvent.category).image}
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
          <>
            <Map
              className="h-[60vh]"
              latLng={{
                lat: selectedEvent?.location[1]!,
                lng: selectedEvent?.location[0]!,
              }}
              showButtons={!!location}
            />
          </>
        ) : (
          <WorldChart country={selectedEvent.country} className="h-[60vh]" />
        )}
      </div>
    )
  );
};

export default Event;
