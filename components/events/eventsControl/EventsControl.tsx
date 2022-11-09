import React from "react";

import EventsContext from "../../../store/EventsContext";
import ApplyButton from "./ApplyButton";
import FilterCategory from "./FilterCategory";
import Search from "./Search";
import SelectSort from "./SelectSort";
import ToggleVisibility from "./ToggleVisibility";

// parent component for the filters and controls of the even grid
// such as search, filters and sort
// it also contains the states of each component

const EventsControl: React.FC = () => {
  const { sort, setSort, categories, setCategories } =
    React.useContext(EventsContext)!;

  const [selectedCategories, setSelectedCategories] =
    React.useState<string[]>(categories);
  const [selectedSort, setSelectedSort] = React.useState<
    "date" | "rate" | "distance"
  >(sort);

  const applyFilters = () => {
    setSort(selectedSort);
    setCategories(selectedCategories);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 m-3 w-full">
      <Search />
      <div className="flex items-center justify-center gap-3">
        <FilterCategory
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
        <SelectSort selected={selectedSort} setSelected={setSelectedSort} />
        <ToggleVisibility />
        <ApplyButton onClick={applyFilters} />
      </div>
    </div>
  );
};

export default EventsControl;
