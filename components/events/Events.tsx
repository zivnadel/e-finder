import React from "react";
import { Element } from "react-scroll";
import EventsRequestModel from "../../models/EventsRequestModel";

import Location from "../../models/Location";
import AppContext from "../../store/AppContext";
import LoadingEvents from "../ui/loading/LoadingEvents";
import EventItem from "./EventItem";
import EventsTitle from "./EventsTitle";

interface Props {}

// The event section in the page (grid layout)

const Events: React.FC<Props> = ({}) => {
  const { sendRequest, setLocation, isLoading, location } =
    React.useContext(AppContext)!;

  const [events, setEvents] = React.useState<EventsRequestModel | null>(null);

  // fetch the current location and the events in the area when the component mounts
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const response = await sendRequest<{
        data: EventsRequestModel;
        currentLocation: Location;
      }>(
        `/api/events?lat=${position.coords.latitude}&lng=${
          position.coords.longitude
        }&radius=10&active=${new Date().toISOString()}`
      );
      if (response) {
        setLocation(response.currentLocation);
        console.log(response);
        setEvents(response.data);
      }
    });
  }, [sendRequest, setLocation]);

  // display the events in a grid layout
  return (
    <Element name="events">
      {isLoading || !location || !events ? (
        <LoadingEvents />
      ) : (
        <div className="bg-white flex flex-col w-full items-center justify-center">
          <EventsTitle location={location} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
            {events.results.map((event, index) => (
              <EventItem
                /* Move box to the middle if it is the last item **/
                className={`${
                  index === events.results.length - 1 ? "lg:col-start-2" : ""
                }`}
                key={event.id}
                start={event.start}
                end={event.end}
                location={{ lat: event.location[1], lng: event.location[0] }}
                category={event.category}
                title={event.title}
                description={event.description}
                isPrivate={event.private}
                labels={event.labels}
                rank={event.rank}
              />
            ))}
          </div>
        </div>
      )}
    </Element>
  );
};

export default Events;
