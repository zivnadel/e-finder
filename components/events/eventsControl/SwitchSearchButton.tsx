import React from "react";

import { FaLocationArrow } from "react-icons/fa";
import { BsFillCalendarFill } from "react-icons/bs";

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  searchEvents: boolean;
}

// a component wrapping a button to switch between searching for events (button for mobile devices)

const SwitchSearchButton: React.FC<Props> = ({ onClick, searchEvents }) => {
  return (
    <div
      className="cursor-pointer md:hidden font-medium w-full text-left text-sm drop-shadow-lg hover:opacity-70 transition-all flex items-center gap-1"
      onClick={onClick}
    >
      {searchEvents ? (
        <FaLocationArrow className="text-sm" />
      ) : (
        <BsFillCalendarFill className="text-sm" />
      )}
      {searchEvents ? "Search Places" : "Search Events"}
    </div>
  );
};

export default SwitchSearchButton;
