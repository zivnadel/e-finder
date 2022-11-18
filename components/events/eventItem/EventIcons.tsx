import React from "react";
import { AiFillStar, AiFillLock } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { GiPathDistance } from "react-icons/gi";
import { LatLng } from "../../../models/LocationModel";
import distance from "../../../utils/distance";
import EventIcon from "./EventIcon";
import EventsContext from "../../../store/EventsContext";

interface Props {
  rank?: number;
  isPrivate?: boolean;
  location: LatLng;
  category: string;
}

// wrapper for the 3 icons in the event item

const EventIcons: React.FC<Props> = ({
  rank,
  isPrivate,
  location,
  category,
}) => {
  const { location: currentLocation } = React.useContext(EventsContext)!;

  // calculate the distance for the distance icon
  const distanceInKm =
    distance(
      location.lat,
      location.lng,
      currentLocation!.lat!,
      currentLocation!.lng!
    ) / 1000;

  return (
    <div className="flex items-center justify-center m-4 gap-4">
      {rank !== undefined && rank > 0 ? (
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
          tooltip="The local rank score of the event"
          text={(rank / 10).toString()}
          icon={<AiFillStar />}
        />
      ) : (
        <></>
      )}
      {isPrivate !== undefined ? (
        <EventIcon
          className={`bg-gradient-to-r ${
            isPrivate ? "from-red-600 to-red-800" : "from-blue-400 to-blue-800"
          }`}
          tooltip={isPrivate ? "Private Event" : "Public Event"}
          icon={
            isPrivate ? (
              <AiFillLock className="text-4xl" />
            ) : (
              <HiUserGroup className="text-4xl" />
            )
          }
        />
      ) : (
        <></>
      )}
      {![
        "public-holidays",
        "school-holidays",
        "observances",
        "politics",
        "daylight-savings",
        "academic",
      ].includes(category) ? (
        <EventIcon
          className="text-md text-center bg-gradient-to-r from-pink-300 to-purple-500"
          tooltip="Distance (km) from you to the location of the event"
          text={`${
            distanceInKm.toFixed().toString().length > 2
              ? distanceInKm.toFixed()
              : distanceInKm.toFixed(1)
          }km`}
          icon={<GiPathDistance />}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventIcons;
