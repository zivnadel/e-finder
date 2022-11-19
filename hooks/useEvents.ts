import React from "react";
import CategoryModel from "../models/CategoryModel";
import EventModel from "../models/EventModel";
import EventsResponseModel from "../models/EventsResponseModel";
import LocationModel from "../models/LocationModel";
import FetchContext from "../store/FetchContext";

/** 
this react hook is the place where all the data about the events
is handled and stored.
It includes all the states of the events page and the functions
As well as auto fetching the relevant events on startup and on change
*/

const useEvents = () => {
  const { sendRequest } = React.useContext(FetchContext)!;

  // all the states related to the events
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState<string>("date");
  const [categories, setCategories] = React.useState<CategoryModel[]>([]);
  const [location, setLocation] = React.useState<LocationModel | null>(null);
  const [userLocation, setUserLocation] = React.useState<LocationModel | null>(
    null
  );
  const [events, setEvents] = React.useState<EventsResponseModel | null>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<EventModel | null>(
    null
  );
  const [radius, setRadius] = React.useState(5);
  const [query, setQuery] = React.useState("");

  // construct the date query as required by PredictHQ API
  const getSortOption = React.useCallback(() => {
    switch (sort) {
      case "date":
        return `start${query && ",relevance"},local_rank`;
      case "-date":
        return `-start${query && ",relevance"},local_rank`;
      case "rate":
        return `local_rank${query && ",relevance"},start`;
      case "-rate":
        return `-local_rank${query && ",relevance"},start`;
      case "distance":
        return "relevance,start,local_rank";
      case "-distance":
        return "-relevance,start,local_rank";
    }
  }, [query, sort]);

  // construct the query URL
  const constructUrl = React.useCallback(() => {
    const { lat, lng, country } = location || {};

    const params: any = {
      within: `${radius}km@${lat},${lng}`,
      "location_around.origin": `${lat},${lng}`,
      country,
      "active.gte": new Date().toISOString(),
      sort: getSortOption(),
      offset: page * 10 - 10,
      category: categories.join(","),
      relevance: "q, location_around",
      q: query,
    };

    const queryString = Object.keys(params)
      .map((key) => (params[key] ? key + "=" + params[key] : ""))
      .join("&");

    return `/api/events?${queryString}`;
  }, [location, radius, getSortOption, page, categories, query]);

  // send the query to the API and update the events state on mount and on change
  React.useEffect(() => {
    const url = constructUrl();
    if (location) {
      sendRequest<EventsResponseModel>(url).then((res) => {
        setEvents(res!);
      });
    }
  }, [
    page,
    sort,
    categories,
    query,
    radius,
    constructUrl,
    sendRequest,
    location,
  ]);

  return {
    events,
    setEvents,
    selectedEvent,
    setSelectedEvent,
    location,
    setLocation,
    userLocation,
    setUserLocation,
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
  };
};

export default useEvents;
