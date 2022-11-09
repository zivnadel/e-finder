import React from "react";

import { FaSearch } from "react-icons/fa";

// a search bar component

const Search: React.FC = () => {
  return (
    <form className="flex items-center m-2 w-5/6 sm:w-2/6">
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <FaSearch />
        </div>
        <input
          type="text"
          className="bg-gray-50 shadow-sm border font-medium border-gray-300 text-gray-900 text-base outline-primary outline-8 rounded-lg block w-full pl-10 p-3.5"
          placeholder="Search Events"
          required
        />
      </div>
      <button
        type="submit"
        className="p-5 ml-3 shadow-md text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:opacity-70 hover:scale-105 transition-all"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
