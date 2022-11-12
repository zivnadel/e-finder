import React from "react";

import { MdOutlineSearch, MdSearchOff } from "react-icons/md";

import EventsContext from "../../../store/EventsContext";
import SquareButton from "../../ui/buttons/SquareButton";
import Tooltip from "../../ui/Tooltip";

// a search bar component

const Search: React.FC = () => {
  const { query, setQuery, setPage } = React.useContext(EventsContext)!;

  const [search, setSearch] = React.useState(query);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.trim().length === 0) {
      return;
    }

    setQuery(search);
    setPage(1);
  };

  const clearHandler = () => {
    setQuery("");
    setPage(1);
  };

  return (
    <>
      <Tooltip />
      <form onSubmit={submitHandler} className="flex items-center m-2 w-full">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <MdOutlineSearch className="text-2xl" />
          </div>
          <input
            value={search}
            onChange={changeHandler}
            type="text"
            className="bg-gray-50 shadow-sm border font-medium border-gray-300 text-gray-900 text-base outline-primary outline-8 rounded-lg block w-full pl-10 p-3.5"
            placeholder="Search Events"
          />
        </div>
        <SquareButton type="submit">
          <MdOutlineSearch className="text-2xl" />
        </SquareButton>
        <SquareButton
          type="button"
          dataTip="Clear Search"
          onClick={clearHandler}
        >
          <MdSearchOff className="text-2xl" />
        </SquareButton>
      </form>
    </>
  );
};

export default Search;
