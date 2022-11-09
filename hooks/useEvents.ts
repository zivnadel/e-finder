import React from "react";
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

  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState<"date" | "rate" | "distance">("date");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState<LocationModel | null>(null);
  const [events, setEvents] = React.useState<EventsResponseModel | null>(null);

  const getSortOption = React.useCallback(() => {
    switch (sort) {
      case "date":
        return "start";
      case "rate":
        return "local_rank";
      default:
        return "";
    }
  }, [sort]);

  // construct the query URL
  const constructUrl = React.useCallback(
    () =>
      `/api/events?within=100km@${location?.lat},${
        location?.lng
      }&active.gte=${new Date().toISOString()}&sort=${getSortOption()}&country=${
        location?.country
      }&offset=${page * 10 - 10}${
        categories.length > 0 ? `&category=${categories.join(",")}` : ""
      }`,
    [page, categories, getSortOption, location]
  );

  React.useEffect(() => {
    const url = constructUrl();
    if (location) {
      sendRequest<EventsResponseModel>(url).then((res) => {
        setEvents(res!);
      });
    }
  }, [page, sort, categories, constructUrl, sendRequest, location]);

  return {
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
  };
};

export default useEvents;
