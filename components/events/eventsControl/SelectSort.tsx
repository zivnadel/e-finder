import React from "react";

import { GoCheck } from "react-icons/go";

import DropList from "../../ui/DropList";

// data for the list
const sortOptions = [
  { name: "date", color: "text-green-500", bgColor: "bg-green-500" },
  { name: "rate", color: "text-blue-500", bgColor: "bg-blue-500" },
  { name: "distance", color: "text-orange-500", bgColor: "bg-orange-500" },
];

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

// a dropdown list that allows the user to select a sort option

const SelectSort: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <DropList
      options={sortOptions}
      selected={selected}
      setSelected={setSelected}
      name="Sort by"
      selectedIcon={<GoCheck />}
    />
  );
};

export default SelectSort;
