import React from "react";
import { Element } from "react-scroll";
import useGeocode from "../../hooks/useGeocode";

import EventsContext from "../../store/EventsContext";
import FetchContext from "../../store/FetchContext";
import ErrorSection from "../ui/ErrorSection";
import LoadingEvents from "../ui/loading/LoadingEvents";
import LoadingTitle from "../ui/loading/LoadingTitle";
import NavigatePages from "../ui/nav/NavigatePages";
import EventItem from "./eventItem/EventItem";
import EventsControl from "./eventsControl/EventsControl";
import EventsTitle from "./eventsControl/EventsTitle";

// The event section in the page (grid layout)

const Events: React.FC = () => {
  const { location, setLocation, events } = React.useContext(EventsContext)!;
  const { isLoading, error, setError } = React.useContext(FetchContext)!;

  const geocode = useGeocode();

  // callback for fetching the location using Google Geocode API
  const handleCurrentPosition = React.useCallback(
    async (position: GeolocationPosition) => {
      const location = await geocode(
        position.coords.latitude,
        position.coords.longitude
      );

      setLocation(location);
    },
    [geocode, setLocation]
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
    if (!events) {
      navigator.geolocation.getCurrentPosition(
        handleCurrentPosition,
        handleGeolocationError
      );
    }
  }, [events, handleCurrentPosition, handleGeolocationError]);

  // display the events in a grid layout
  return (
    <Element name="events">
      {error ? (
        <ErrorSection error={error} />
      ) : isLoading || !location || !events ? (
        <>
          {/* If the location is loading, show the loading title animation **/}
          {location ? (
            <div className="flex items-center justify-center w-full">
              <EventsTitle location={location} />
            </div>
          ) : (
            <LoadingTitle />
          )}

          <LoadingEvents />
        </>
      ) : (
        <div className="bg-white flex flex-col w-full items-center justify-center">
          <EventsTitle location={location} />
          <EventsControl />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5 items-center">
            {events.results.map((event, index) => (
              <EventItem
                key={event.id}
                className={
                  index === events.results.length - 1 ? "col-start-2" : ""
                }
                id={event.id}
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
      {events && <NavigatePages />}
    </Element>
  );
};

export default Events;
