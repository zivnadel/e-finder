import React from "react";
import { Element } from "react-scroll";
import useGeocode from "../../hooks/useGeocode";

import EventsContext from "../../store/EventsContext";
import FetchContext from "../../store/FetchContext";
import ErrorSection from "../ui/ErrorSection";
import LoadingEvents from "../ui/loading/LoadingEvents";
import LoadingTitle from "../ui/loading/LoadingTitle";
import NavigatePages from "../ui/nav/NavigatePages";
import Title from "../ui/Title";
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

  // a function to calculate the shifting in the grid for the last elements
  const calcShift = (index: number) => {
    const len = events!.results.length;

    if (index % 3 === 0 && index === len - 1) {
      return "col-start-2";
    }

    if (index % 3 === 1 && index === len - 1) {
      return "col-start-3";
    }

    return undefined;
  };

  // display the events in a grid layout
  return (
    <Element name="events">
      {/** The search and control panel of the events grid */}
      {error ? (
        <ErrorSection error={error} />
      ) : isLoading || !location || !events ? (
        <>
          {/* If the location is loading, show the loading title animation **/}
          {location ? <EventsTitle location={location} /> : <LoadingTitle />}
          {events && <EventsControl />}
          <LoadingEvents />
        </>
      ) : (
        <div className="bg-white flex flex-col w-full items-center justify-center">
          <EventsTitle location={location} />
          <EventsControl />
          {events.results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5 items-center">
              {events.results.map((event, index) => (
                <EventItem
                  key={event.id}
                  className={calcShift(index)}
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
          ) : (
            <Title text="No events found." />
          )}
        </div>
      )}
      {events && !error && <NavigatePages />}
    </Element>
  );
};

export default Events;
