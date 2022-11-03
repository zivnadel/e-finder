import React from "react";
import { animateScroll } from "react-scroll";

// a component for the logo in the navbar

const Logo: React.FC = () => {
  return (
    <div className="transition-all hover:scale-125">
      <button
        onClick={animateScroll.scrollToTop}
        className="font-quicksand drop-shadow-md text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        E
      </button>
    </div>
  );
};

export default Logo;
