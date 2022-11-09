import React from "react";

import { BsBookmarkCheck } from "react-icons/bs";

import DropList from "../../ui/DropList";

const categories = [
  { name: "community", color: "text-green-500", bgColor: "bg-green-500" },
  { name: "conferences", color: "text-emerald-500", bgColor: "bg-emerald-500" },
  { name: "academic", color: "text-orange-500", bgColor: "bg-orange-500" },
  { name: "concerts", color: "text-red-500", bgColor: "bg-red-500" },
  { name: "expos", color: "text-yellow-500", bgColor: "bg-yellow-500" },
  { name: "festivals", color: "text-purple-500", bgColor: "bg-purple-500" },
  { name: "sports", color: "text-blue-500", bgColor: "bg-blue-500" },
  { name: "performing-arts", color: "text-pink-500", bgColor: "bg-pink-500" },
  { name: "politics", color: "text-yellow-500", bgColor: "bg-yellow-500" },
  { name: "terror", color: "text-gray-500", bgColor: "bg-gray-500" },
  { name: "school-holidays", color: "text-amber-500", bgColor: "bg-amber-500" },
  { name: "observances", color: "text-rose-500", bgColor: "bg-rose-500" },
  {
    name: "public-holidays",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500",
  },
  { name: "daylight-savings", color: "text-cyan-500", bgColor: "bg-cyan-500" },
  { name: "protests", color: "text-teal-500", bgColor: "bg-teal-500" },
  { name: "health-warnings", color: "text-rose-500", bgColor: "bg-rose-500" },
  {
    name: "airport-delays",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
  },
  { name: "severe-weather", color: "text-red-600", bgColor: "bg-red-600" },
  { name: "disasters", color: "text-red-600", bgColor: "bg-red-600" },
];

interface Props {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

// this component is a dropdown list that allows the user to select a category
// or multiple categories to filter the events by

const FilterCategory: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <DropList
      name="Categories"
      options={categories}
      selected={selected}
      setSelected={setSelected}
      selectedIcon={<BsBookmarkCheck />}
      multiple
    />
  );
};

export default FilterCategory;
