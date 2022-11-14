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
  const { location, events } = React.useContext(EventsContext)!;
  const { isLoading, error } = React.useContext(FetchContext)!;

  const { getCurrentPosition } = useGeocode();

  React.useEffect(() => {
    if (!events) {
      getCurrentPosition();
    }
  }, [events, getCurrentPosition]);

  // a function to calculate the shifting in the grid for the last elements
  const calcShift = (index: number) => {
    const len = events!.results.length;

    if (index % 3 === 0 && index === len - 1) {
      return "lg:col-start-2";
    }

    if (index % 3 === 1 && index === len - 1) {
      return "lg:col-start-3";
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
