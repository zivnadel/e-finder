import React from "react";
import useEvents from "../hooks/useEvents";
import CategoryModel from "../models/CategoryModel";
import EventModel from "../models/EventModel";
import EventsResponseModel from "../models/EventsResponseModel";
import LocationModel from "../models/LocationModel";

type EventsContextModel = {
  events: EventsResponseModel | null;
  setEvents: React.Dispatch<React.SetStateAction<EventsResponseModel | null>>;
  selectedEvent: EventModel | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventModel | null>>;
  location: LocationModel | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationModel | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  categories: CategoryModel[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryModel[]>>;
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
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
    selectedEvent,
    setSelectedEvent,
    location,
    setLocation,
    page,
    setPage,
    sort,
    setSort,
    categories,
    setCategories,
    radius,
    setRadius,
    query,
    setQuery,
  } = useEvents();

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        selectedEvent,
        setSelectedEvent,
        location,
        setLocation,
        page,
        setPage,
        sort,
        setSort,
        categories,
        setCategories,
        radius,
        setRadius,
        query,
        setQuery,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
