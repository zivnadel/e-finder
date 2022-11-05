import React from "react";
import { AiFillStar, AiFillLock } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { GiPathDistance } from "react-icons/gi";
import { BsPinMapFill } from "react-icons/bs";
import { LatLng } from "../../models/Location";
import AppContext from "../../store/AppContext";
import distance from "../../utils/distance";
import EventIcon from "./EventIcon";

interface Props {
  rank: number;
  isPrivate: boolean;
  location: LatLng;
}

// wrapper for the 4 icons in the event item

const EventIcons: React.FC<Props> = ({ rank, isPrivate, location }) => {
  const appContext = React.useContext(AppContext);

  // calculate the distance from the distance icon
  const distanceInKm =
    distance(
      location.lat,
      location.lng,
      appContext?.location!.lat!,
      appContext?.location!.lng!
    ) / 1000;

  return (
    <div className="flex items-center justify-center my-4 gap-4">
      {rank > 0 && (
        <EventIcon
          className={`bg-gradient-to-r ${
            rank >= 80
              ? "from-green-400 to-green-800"
              : rank >= 50
              ? "from-yellow-400 to-yellow-800"
              : rank >= 20
              ? "from-red-400 to-red-600"
              : "from-red-700 to-red-900"
          }`}
          text={(rank / 10).toString()}
          icon={<AiFillStar />}
        />
      )}{" "}
      <EventIcon
        className={`bg-gradient-to-r ${
          isPrivate ? "from-red-600 to-red-800" : "from-blue-400 to-blue-800"
        }`}
        icon={
          isPrivate ? (
            <AiFillLock className="text-4xl" />
          ) : (
            <HiUserGroup className="text-4xl" />
          )
        }
      />
      <EventIcon
        className="text-lg text-center bg-gradient-to-r from-pink-300 to-purple-500"
        text={`${
          distanceInKm.toFixed().toString().length > 2
            ? distanceInKm.toFixed()
            : distanceInKm.toFixed(1)
        }km`}
        icon={<GiPathDistance />}
      />
      <EventIcon
        className="bg-gradient-to-r from-orange-400 to-orange-800"
        icon={<BsPinMapFill className="text-4xl" />}
      />
    </div>
  );
};

export default EventIcons;
