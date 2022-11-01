import React from "react";

import { BsChevronDown } from "react-icons/bs";

const Showcase: React.FC = () => {
  return (
    <div className="text-white font-quicksand h-screen overflow-auto bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-col">
      <h1 className="drop-shadow-md mb-2 font-bold text-8xl">E-Finder</h1>
      <h2 className="drop-shadow-sm mb-1 font-semibold text-xl">
        Explore exciting and thrilling events around you
      </h2>
      <p className="mb-5 opacity-80">Scroll down to discover</p>
      <BsChevronDown className="text-4xl animate-bounce" />
    </div>
  );
};

export default Showcase;
