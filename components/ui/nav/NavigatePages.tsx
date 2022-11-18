import React from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-scroll";
import EventsContext from "../../../store/EventsContext";
import FetchContext from "../../../store/FetchContext";

// this component is the navigation at the bottom of the page
// that lets the user navigate between pages of the events grid

const NavigatePages: React.FC = () => {
  const { events, page, setPage } = React.useContext(EventsContext)!;

  const { isLoading } = React.useContext(FetchContext)!;

  const [blockButtons, setBlockButtons] = React.useState(false);

  React.useEffect(() => {
    // if loading, prevent the user from clicking the buttons
    isLoading ? setBlockButtons(true) : setBlockButtons(false);
  }, [isLoading]);

  const next = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prev = async () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="m-5 flex items-center justify-between px-5 py-2 w-5/6 lg:w-3/6 rounded-full bg-gradient-to-r from-primary to-secondary">
        {events!.next && (
          <Link to="events">
            <FaChevronLeft
              className="transition-all hover:opacity-70 text-5xl text-white cursor-pointer"
              onClick={next}
              pointerEvents={blockButtons ? "none" : "auto"}
            />
          </Link>
        )}
        <p className="mx-5 text-4xl text-white font-bold justify-self-center">
          {page}
        </p>
        {events!.previous && (
          <Link to="events">
            <FaChevronRight
              className="transition-all hover:opacity-70 text-5xl text-white cursor-pointer"
              onClick={prev}
              pointerEvents={blockButtons ? "none" : "auto"}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavigatePages;
