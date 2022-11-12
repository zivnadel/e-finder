import React from "react";

import { BiSortDown, BiSortUp } from "react-icons/bi";

import RoundedButton from "../../ui/buttons/RoundedButton";

interface Props {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

// upon clicking this button, the order of the sorting will change
// (ascending, descending)

const SortOrderButton: React.FC<Props> = ({ sort, setSort }) => {
  const changeSortingOrder = () => {
    setSort((prevSort) =>
      prevSort.startsWith("-") ? prevSort.slice(1) : "-" + prevSort
    );
  };

  return (
    <RoundedButton
      onClick={changeSortingOrder}
      dataTip={sort.startsWith("-") ? "Sort Ascending" : "Sort Descending"}
    >
      {sort.startsWith("-") ? (
        <BiSortUp className="text-2xl" />
      ) : (
        <BiSortDown className="text-2xl" />
      )}
    </RoundedButton>
  );
};

export default SortOrderButton;
