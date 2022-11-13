import React from "react";

import { animateScroll } from "react-scroll";
import { useRouter } from "next/router";

// a component for the logo in the navbar

const Logo: React.FC = () => {
  const router = useRouter();

  // if not in home page, move to home page and scroll
  const logoClickedHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (router.pathname === "/") {
      animateScroll.scrollToTop();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="transition-all cursor-pointer hover:scale-125">
      <button
        onClick={logoClickedHandler}
        className="drop-shadow-md text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        E
      </button>
    </div>
  );
};

export default Logo;
