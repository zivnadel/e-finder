import React from "react";
import { IoClose } from "react-icons/io5";
import {
  MdDirectionsBike,
  MdDirectionsCar,
  MdDirectionsTransit,
  MdDirectionsWalk,
} from "react-icons/md";
import RoundedButton from "../../ui/buttons/RoundedButton";
import Tooltip from "../../ui/Tooltip";

interface Props {
  setShowRoute: React.Dispatch<React.SetStateAction<boolean>>;
  setTravelMode: React.Dispatch<React.SetStateAction<string>>;
}

// this component is a set of buttons to control directions and navigation
// on the map in the inner event page

const MapButtons: React.FC<Props> = ({ setShowRoute, setTravelMode }) => {
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

  return (
    <>
      <Tooltip />
      <div className="flex items-center justify-center gap-3 m-3">
        <RoundedButton dataTip="Driving Directions" onClick={driveHandler}>
          <MdDirectionsCar className="text-3xl" />
        </RoundedButton>
        <RoundedButton dataTip="Transit Directions" onClick={transitHandler}>
          <MdDirectionsTransit className="text-3xl" />
        </RoundedButton>
        <RoundedButton dataTip="Biking Directions" onClick={bikeHandler}>
          <MdDirectionsBike className="text-3xl" />
        </RoundedButton>
        <RoundedButton dataTip="Walking Directions" onClick={walkHandler}>
          <MdDirectionsWalk className="text-3xl" />
        </RoundedButton>
        <RoundedButton dataTip="Clear Directions" onClick={clearHandler}>
          <IoClose className="text-3xl" />
        </RoundedButton>
      </div>
    </>
  );
};

export default MapButtons;
