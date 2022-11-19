import { Transition } from "@headlessui/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import {
  MdDirectionsBike,
  MdDirectionsCar,
  MdDirectionsTransit,
  MdDirectionsWalk,
} from "react-icons/md";
import RoundedButton from "../ui/buttons/RoundedButton";
import Tooltip from "../ui/Tooltip";

interface Props {
  setShowRoute: React.Dispatch<React.SetStateAction<boolean>>;
  setTravelMode: React.Dispatch<React.SetStateAction<string>>;
}

// this component is a set of buttons to control directions and navigation
// on the map in the inner event page

const MapButtons: React.FC<Props> = ({ setShowRoute, setTravelMode }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const driveHandler = () => {
    setTravelMode("DRIVING");
    setShowRoute(true);
  };
  const transitHandler = () => {
    setTravelMode("TRANSIT");
    setShowRoute(true);
  };
  const bikeHandler = () => {
    setTravelMode("BICYCLING");
    setShowRoute(true);
  };
  const walkHandler = () => {
    setTravelMode("WALKING");
    setShowRoute(true);
  };

  const clearHandler = () => {
    setShowRoute(false);
  };

  const showDirectionsHandler = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <Tooltip />
      <div className="absolute top-16 z-10 m-3">
        {/* Hamburger button to toggle the menu */}
        <RoundedButton
          className="mb-3 text-black from-white to-white"
          dataTip="Directions"
          onClick={showDirectionsHandler}
        >
          <GiHamburgerMenu className="text-3xl" />
        </RoundedButton>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          show={showMenu}
          className="flex flex-col gap-3 items-center justify-center"
        >
          <RoundedButton
            className="text-black from-white to-white"
            dataTip="Driving Directions"
            onClick={driveHandler}
          >
            <MdDirectionsCar className="text-3xl" />
          </RoundedButton>
          <RoundedButton
            className="text-black from-white to-white"
            dataTip="Transit Directions"
            onClick={transitHandler}
          >
            <MdDirectionsTransit className="text-3xl" />
          </RoundedButton>
          <RoundedButton
            className="text-black from-white to-white"
            dataTip="Biking Directions"
            onClick={bikeHandler}
          >
            <MdDirectionsBike className="text-3xl" />
          </RoundedButton>
          <RoundedButton
            className="text-black from-white to-white"
            dataTip="Walking Directions"
            onClick={walkHandler}
          >
            <MdDirectionsWalk className="text-3xl" />
          </RoundedButton>
          <RoundedButton
            className="text-black from-white to-white"
            dataTip="Clear Directions"
            onClick={clearHandler}
          >
            <IoClose className="text-3xl" />
          </RoundedButton>
        </Transition>
      </div>
    </>
  );
};

export default MapButtons;
