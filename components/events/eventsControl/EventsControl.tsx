import { Transition } from "@headlessui/react";
import React from "react";

import { BiCheck } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import CategoryModel from "../../../models/CategoryModel";
import EventsContext from "../../../store/EventsContext";
import RoundedButton from "../../ui/buttons/RoundedButton";
import FilterCategory from "./FilterCategory";
import FiltersDisplay from "./FiltersDisplay";
import Search from "./Search";
import SelectRadius from "./SelectRadius";
import SelectSort from "./SelectSort";
import ShowFiltersButton from "./ShowFiltersButton";
import SortOrderButton from "./SortOrderButton";

// parent component for the filters and controls of the even grid
// such as search, filters and sort
// it also contains the states of each component

const EventsControl: React.FC = () => {
  const {
    sort,
    setSort,
    categories,
    setCategories,
    radius,
    setRadius,
    setPage,
  } = React.useContext(EventsContext)!;

  const [selectedCategories, setSelectedCategories] =
    React.useState<CategoryModel[]>(categories);
  const [selectedSort, setSelectedSort] = React.useState<string>(sort);
  const [selectedRadius, setSelectedRadius] = React.useState(radius);

  const [showFilters, setShowFilters] = React.useState(false);

  const applyFilters = () => {
    setSort(selectedSort);
    setCategories(selectedCategories);
    setRadius(selectedRadius);
    setPage(1);
  };

  const clearFilters = () => {
    setSort("date");
    setSelectedSort("date");
    setRadius(5);
    setSelectedRadius(5);
    if (categories.length > 0) setCategories([]);
    if (selectedCategories.length > 0) setSelectedCategories([]);
    setPage(1);
  };

  const showFiltersClickedHandler = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center gap-2 m-3 p-5 rounded-xl shadow-lg w-[90%] lg:w-3/6 bg-white">
        <Search />
        <div className="flex items-center justify-center gap-3">
          <FilterCategory
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />
          <SelectRadius
            selected={selectedRadius}
            setSelected={setSelectedRadius}
          />
          <SelectSort selected={selectedSort} setSelected={setSelectedSort} />
          <SortOrderButton sort={sort} setSort={setSort} />
          <RoundedButton dataTip="Apply Filters" onClick={applyFilters}>
            <BiCheck className="text-5xl" />
          </RoundedButton>
          <RoundedButton dataTip="Clear Filters" onClick={clearFilters}>
            <IoClose className="text-5xl" />
          </RoundedButton>
        </div>
      </div>
      <ShowFiltersButton
        onClick={showFiltersClickedHandler}
        showFilters={showFilters}
      />
      <Transition
        show={showFilters}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <FiltersDisplay
          categories={selectedCategories}
          radius={selectedRadius}
          sort={selectedSort}
        />
      </Transition>
    </div>
  );
};

export default EventsControl;
