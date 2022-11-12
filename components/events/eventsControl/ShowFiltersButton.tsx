import React from "react";

import { BiPlus, BiMinus } from "react-icons/bi";

interface Props {
  onClick: React.MouseEventHandler<HTMLParagraphElement>;
  showFilters: boolean;
}

// a component wrapping a button to show the filters display when clicked

const ShowFilters: React.FC<Props> = ({ onClick, showFilters }) => {
  return (
    <div className="w-[90%] lg:w-3/6">
      <p
        onClick={onClick}
        className="flex items-center transition-all hover:opacity-50 gap-1 cursor-pointer text-left drop-shadow-md font-medium w-fit"
      >
        {showFilters ? <BiMinus /> : <BiPlus />}
        {`${showFilters ? "Collapse" : "Show"} Filters`}
      </p>
    </div>
  );
};

export default ShowFilters;
