import React from "react";

import { GoCheck } from "react-icons/go";

import DropList from "../../ui/DropList";

const sortOptions = [
  { name: 1, color: "text-green-500", bgColor: "bg-green-500" },
  { name: 2, color: "text-blue-500", bgColor: "bg-blue-500" },
  { name: 5, color: "text-orange-500", bgColor: "bg-orange-500" },
  { name: 10, color: "text-red-500", bgColor: "bg-red-500" },
  { name: 50, color: "text-purple-500", bgColor: "bg-purple-500" },
  { name: 100, color: "text-orange-500", bgColor: "bg-pink-500" },
];

interface Props {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

// a dropdown list that allows the user to select a radius.
// all the locations that are in this radius from the location
// of the user will be displayed.

const SelectSort: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <DropList
      options={sortOptions}
      selected={selected}
      setSelected={setSelected}
      name="Radius"
      selectedIcon={<GoCheck />}
    />
  );
};

export default SelectSort;
