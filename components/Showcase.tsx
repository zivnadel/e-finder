import React from "react";

import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-scroll";

// the landing view of the app

const Showcase: React.FC = () => {
  return (
    <Link smooth to="events">
      <div className="text-center text-white h-screen overflow-auto bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-col p-3 md:p-0">
        <h1 className="drop-shadow-md mb-2 font-bold text-7xl md:text-8xl sm:text-8xl">
          E-Finder
        </h1>
        <h2 className="drop-shadow-sm mb-1 font-semibold text-xl">
          Explore exciting and thrilling events around you
        </h2>
        <p className="mb-5 opacity-80">
          Scroll down or click anywhere to discover
        </p>

        <BsChevronDown className="cursor-pointer text-4xl animate-bounce" />
      </div>
    </Link>
  );
};

export default Showcase;
