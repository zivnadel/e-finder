import React from "react";
import { Transition } from "@headlessui/react";

import Logo from "./Logo";
import NavItem from "./NavItem";

// the navigation bar of the app
// visible on every page and stays at the top
// contains the logo at the middlee, and nav links
// on the sides

const NavBar: React.FC = () => {
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
      /** Animate the navbar */
      show={visible}
      unmount={false}
      enter="transition-opacity ease-in-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="z-20 w-full fixed flex items-center justify-center h-28 bg-white/70">
        <NavItem href="events" className="text-primary">
          Events
        </NavItem>
        <Logo />
        <NavItem href="" className="text-secondary">
          About
        </NavItem>
      </div>
    </Transition>
  );
};

export default NavBar;
