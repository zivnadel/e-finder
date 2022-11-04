import React from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";

// the navigation bar of the app
// visible on every page and stays at the top
// contains the logo at the middlee, and nav links
// on the sides

const NavBar: React.FC = () => {
  return (
    <div className="z-10 w-full fixed flex items-center justify-center h-28 bg-white/70">
      <NavItem href="events" className="text-primary">
        Events
      </NavItem>
      <Logo />
      <NavItem href="" className="text-secondary">
        About
      </NavItem>
    </div>
  );
};

export default NavBar;
