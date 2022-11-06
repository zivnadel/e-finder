import React from "react";
import { Element } from "react-scroll";
import EventsResponseModel from "../../models/EventsResponseModel";

import LocationModel from "../../models/LocationModel";
import AppContext from "../../store/AppContext";
import ErrorSection from "../ui/ErrorSection";
import LoadingEvents from "../ui/loading/LoadingEvents";
import LoadingTitle from "../ui/loading/LoadingTitle";
import EventItem from "./EventItem";
import EventsTitle from "./EventsTitle";

interface Props {}

// The event section in the page (grid layout)

const Events: React.FC<Props> = ({}) => {
  const { sendRequest, setLocation, isLoading, location, error, setError } =
    React.useContext(AppContext)!;

  const [events, setEvents] = React.useState<EventsResponseModel | null>(null);

  // callback for fetching data from the API
  // after receiving the current location of the user
  const handleCurrentPosition = React.useCallback(
    async (position: GeolocationPosition) => {
      const response = await sendRequest<{
        data: EventsResponseModel;
        currentLocation: LocationModel;
      }>(
        `/api/events?lat=${position.coords.latitude}&lng=${
          position.coords.longitude
        }&radius=100&active=${new Date().toISOString()}`
      );
      if (response) {
        setLocation(response.currentLocation);
        setEvents(response.data);
      }
    },
    [sendRequest, setLocation]
  );

  // callback for handling error when requesting the user's location
  const handleGeolocationError = React.useCallback(
    (error: GeolocationPositionError) => {
      if (error.message === "User denied Geolocation") {
        setError(
          "Location access denied. Please allow location access to explore events near you."
        );
      } else {
        setError("An error occurred while fetching your location.");
      }
    },
    [setError]
  );

  // fetch the current location and the events in the area when the component mounts
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      handleCurrentPosition,
      handleGeolocationError
    );
  }, [handleCurrentPosition, handleGeolocationError]);

  // display the events in a grid layout
  return (
    <Element name="events">
      {error ? (
        <ErrorSection error={error} />
      ) : isLoading || !location || !events ? (
        <>
          {/* If the location is loading, show the loading title animation **/}
          {!location && <LoadingTitle />}

          {/* If the events are loading, show the loading events animation **/}
          {!events && <LoadingEvents />}
        </>
      ) : (
        <div className="bg-white flex flex-col w-full items-center justify-center">
          <EventsTitle location={location} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5 items-center">
            {events.results.map((event) => (
              <EventItem
                key={event.id}
                start={event.start}
                end={event.end}
                location={{ lat: event.location[1], lng: event.location[0] }}
                category={event.category}
                title={event.title}
                description={event.description}
                isPrivate={event.private}
                labels={event.labels}
                rank={event.local_rank}
              />
            ))}
          </div>
        </div>
      )}
    </Element>
  );
};

export default Events;
