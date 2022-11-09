import React from "react";
import useEvents from "../hooks/useEvents";
import EventsResponseModel from "../models/EventsResponseModel";
import LocationModel from "../models/LocationModel";

type EventsContextModel = {
  events: EventsResponseModel | null;
  setEvents: React.Dispatch<React.SetStateAction<EventsResponseModel | null>>;
  location: LocationModel | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationModel | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  sort: "date" | "rate" | "distance";
  setSort: React.Dispatch<React.SetStateAction<"date" | "rate" | "distance">>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

// This react context is used to provide the data from the useEvents hook
// for the app to use it

const EventsContext = React.createContext<EventsContextModel | null>(null);

export const EventsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    events,
    setEvents,
    location,
    setLocation,
    page,
    setPage,
    sort,
    setSort,
    categories,
    setCategories,
  } = useEvents();

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        location,
        setLocation,
        page,
        setPage,
        sort,
        setSort,
        categories,
        setCategories,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
