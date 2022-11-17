import React from "react";
import { Element } from "react-scroll";
import useGoogleMaps from "../../hooks/useGoogleMaps";

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
  const { location, events } = React.useContext(EventsContext)!;
  const { isLoading, error } = React.useContext(FetchContext)!;

  const { getCurrentPosition } = useGoogleMaps();

  React.useEffect(() => {
    if (!events) {
      getCurrentPosition();
    }
  }, [events, getCurrentPosition]);

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
        <div className="bg-white flex flex-col overflow-auto items-center justify-center">
          <EventsTitle location={location} />
          <EventsControl />
          {events.results.length > 0 ? (
            <div className="flex flex-wrap gap-5 m-5 items-stretch justify-center">
              {events.results.map((event) => (
                <EventItem
                  key={event.id}
                  className="basis-full md:basis-[47%] lg:basis-[30%] grow-0"
                  event={event}
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
