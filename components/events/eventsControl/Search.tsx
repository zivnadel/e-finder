import React from "react";

import {
  FaLocationArrow,
  FaSearch,
  FaSearchLocation,
  FaTimes,
} from "react-icons/fa";

import EventsContext from "../../../store/EventsContext";
import SquareButton from "../../ui/buttons/SquareButton";
import Tooltip from "../../ui/Tooltip";
import { BsFillCalendarFill } from "react-icons/bs";
import useGeocode from "../../../hooks/useGeocode";

// a search bar component

const Search: React.FC = () => {
  const { query, setQuery, setEvents, location, setPage } =
    React.useContext(EventsContext)!;

  const { geocodeByAddress, getCurrentPosition } = useGeocode();

  const [search, setSearch] = React.useState(query);

  const [searchEvents, setSearchEvents] = React.useState(
    location?.q ? false : true
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = search.trim();

    if (trimmed.length === 0) {
      return;
    }

    if (searchEvents) {
      setQuery(trimmed);
    } else {
      await geocodeByAddress(trimmed);

      setQuery("");
      setPage(1);
    }
  };

  const clearHandler = () => {
    setQuery("");
    setPage(1);

    if (location?.q) {
      getCurrentPosition();
    }
  };

  const changeSearchHandler = () => {
    setSearchEvents((prev) => !prev);
  };

  return (
    <>
      <Tooltip />
      <form
        onSubmit={submitHandler}
        className="flex items-center gap-3 m-2 w-full"
      >
        <SquareButton
          type="button"
          onClick={changeSearchHandler}
          dataTip={`Search ${searchEvents ? "Locations" : "Events"}`}
        >
          {searchEvents ? (
            <FaLocationArrow className="text-2xl" />
          ) : (
            <BsFillCalendarFill className="text-2xl" />
          )}
        </SquareButton>
        {/** Search Bar */}
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            {searchEvents ? (
              <FaSearch className="text-lg" />
            ) : (
              <FaSearchLocation className="text-lg" />
            )}
          </div>
          <input
            value={search}
            onChange={changeHandler}
            type="text"
            className="bg-gray-50 shadow-sm border font-medium border-gray-300 text-gray-900 text-base outline-primary outline-8 rounded-lg block w-full pl-10 p-3.5"
            placeholder={searchEvents ? "Search Events" : "Search Location"}
          />
        </div>
        <SquareButton type="submit">
          {searchEvents ? (
            <FaSearch className="text-2xl" />
          ) : (
            <FaSearchLocation className="text-2xl" />
          )}
        </SquareButton>
        <SquareButton
          type="button"
          dataTip="Clear Search"
          onClick={clearHandler}
        >
          <FaTimes className="text-2xl" />
        </SquareButton>
      </form>
    </>
  );
};

export default Search;
