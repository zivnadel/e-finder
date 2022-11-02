import React from "react";

import Location from "../../models/Location";
import AppContext from "../../store/AppContext";
import LoadingEvents from "../ui/loading/LoadingEvents";
import EventItem from "./EventItem";

interface Props {}

// The event section in the page (grid layout)

const Events: React.FC<Props> = ({}) => {
  const { sendRequest, setLocation, isLoading, location } =
    React.useContext(AppContext)!;

  // Fetch the current address of the user using geolocation and Google's Geocoding API
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const currentLocation = await sendRequest<Location>(
        `/api/geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
      );
      if (currentLocation) {
        setLocation(currentLocation);
      }
    });
  }, [sendRequest, setLocation]);

  return isLoading || !location ? (
    <LoadingEvents />
  ) : (
    <section
      id="events"
      className="bg-white flex flex-col w-full items-center justify-center"
    >
      <div className="text-center mt-5 mx-3 md:mx-0 p-3 bg-gradient-to-r from-primary to-secondary rounded-3xl font-quicksand font-bold text-white text-2xl">
        <h1>{`You are in ${location?.city}, ${location?.state}, ${location?.country}`}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
        <EventItem />
        <EventItem />
        <EventItem />
      </div>
    </section>
  );
};

export default Events;
