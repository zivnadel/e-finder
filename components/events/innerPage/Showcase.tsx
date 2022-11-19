import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-scroll";

interface Props {
  title: string;
  description: string;
  className: string;
}

// showcase ("landing section") component for the inner event page, containing the title and description of the event

const Showcase: React.FC<Props> = ({ title, description, className }) => {
  return (
    <Link smooth to="details">
      <div
        className={`w-full relative min-h-screen backdrop-blur-md ${className} bg-no-repeat bg-center bg-cover shadow-md text-white flex flex-col items-center justify-center p-10 gap-5 bg-size bg-gradient-to-r`}
      >
        {/* Image Backdrop */}
        <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-50"></div>
        <h1 className="mt-nav font-bold text-4xl md:text-5xl text-center drop-shadow-md">
          {title}
        </h1>
        <p className="text-center text-lg md:text-xl font-medium drop-shadow-md">
          {description}
        </p>
        <BsChevronDown className="cursor-pointer text-4xl animate-bounce" />
      </div>
    </Link>
  );
};

export default Showcase;
