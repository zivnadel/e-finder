import React from "react";
import { Transition } from "@headlessui/react";

import Logo from "./Logo";
import NavItem from "./NavItem";
import { useRouter } from "next/router";

// the navigation bar of the app
// visible on every page and stays at the top
// contains the logo at the middlee, and nav links
// on the sides

const NavBar: React.FC = () => {
  const router = useRouter();

  const [visible, setVisible] = React.useState(true);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const handleScroll = React.useCallback(() => {
    if (window.scrollY > scrollPosition) {
      // hide the navbar if the user is scrolling down
      setVisible(false);
    } else {
      // show the navbar if the user is scrolling up
      setVisible(true);
    }
    // update the scroll position
    setScrollPosition(window.scrollY);
  }, [scrollPosition]);

  // bind and unbind the scroll event listener on mount and unmount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, scrollPosition]);

  return (
    <Transition
      show={visible}
      enter="transition duration-100 ease-out"
      enterFrom="transform -translate-y-full opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition duration-100 ease-in"
      leaveFrom="transform translate-y-0 opacity-100"
      leaveTo="transform -translate-y-full opacity-0"
      className={`z-20 flex transition-all duration-500 w-full fixed items-center justify-center gap-4 md:gap-8 h-20 md:h-[6.5rem] bg-white/80`}
    >
      <NavItem
        href={router.pathname === "/" ? "events" : "details"}
        className="text-primary"
      >
        {router.pathname === "/" ? "Events" : "Details"}
      </NavItem>
      <Logo />
      <NavItem
        href={router.pathname === "/" ? "" : "map"}
        className="text-secondary"
      >
        {router.pathname === "/" ? "About" : "Map"}
      </NavItem>
    </Transition>
  );
};

export default NavBar;
