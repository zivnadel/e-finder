import { useRouter } from "next/router";
import React from "react";
import { twMerge } from "tailwind-merge";
import CategoryModel from "../../../models/CategoryModel";
import EventModel from "../../../models/EventModel";
import { LatLng } from "../../../models/LocationModel";
import EventsContext from "../../../store/EventsContext";
import { monthNames, stripLeadingZerosDate } from "../../../utils/dateUtils";
import Divider from "../../ui/Divider";
import Category from "../Category";
import EventIcons from "./EventIcons";
import Labels from "./Labels";

// component representing an event in the grid

interface Props {
  className?: string;
  event: EventModel;
}

const Event: React.FC<Props> = ({ className, event }) => {
  const router = useRouter();

  const {
    id,
    title,
    description,
    local_rank: rank,
    start,
    end,
    private: isPrivate,
    location,
    category,
    labels,
  } = event;

  const { setSelectedEvent } = React.useContext(EventsContext)!;

  const eventClickedHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedEvent(event);
    router.push(`/event/${id}`);
  };

  // transform the date strings to more readable format
  const startDate = stripLeadingZerosDate(start.split("T")[0]).split("-");
  const startTime = start.split("T")[1].split(":");

  const endDate = stripLeadingZerosDate(end.split("T")[0]).split("-");
  const endTime = end.split("T")[1].split(":");

  // create and format the paragraph for displaying the dates and hours
  let dateParagraph: JSX.Element;

  if (startDate.join("-") === endDate.join("-")) {
    dateParagraph = (
      <p className="font-bold text-green-700">
        {`${monthNames[+startDate[1] - 1]} ${startDate[2]}, ${startDate[0]}`}{" "}
        <span className="text-black">|</span>{" "}
        {startTime.join(":") === endTime.join(":")
          ? `${startTime[0]}:${startTime[1]}`
          : `${startTime[0]}:${startTime[1]} - ${endTime[0]}:${endTime[1]}`}
      </p>
    );
  } else {
    dateParagraph = (
      <div className="font-semibold">
        <p>
          From{" "}
          <span className="text-green-700 font-bold">{`${
            monthNames[+startDate[1] - 1]
          } ${startDate[2]}, ${startDate[0]}`}</span>{" "}
          at{" "}
          <span className="text-green-700 font-bold">{`${startTime[0]}:${startTime[1]}`}</span>
        </p>
        <p>
          to{" "}
          <span className="text-green-700 font-bold">{`${
            monthNames[+endDate[1] - 1]
          } ${endDate[2]}, ${endDate[0]}`}</span>{" "}
          at{" "}
          <span className="text-green-700 font-bold">{`${endTime[0]}:${endTime[1]}`}</span>
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={eventClickedHandler}
      className={twMerge(
        `flex flex-col overflow-auto md:overflow-hidden opacity-60 cursor-pointer shadow-xl p-5 rounded-lg transition-all hover:opacity-100 hover:scale-105 ${className}`
      )}
    >
      <EventIcons
        rank={rank}
        isPrivate={isPrivate}
        location={{ lat: location[1], lng: location[0] }}
        category={category}
      />
      <div className="my-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="md:w-80 lg:w-72 overflow-auto md:overflow-hidden md:text-ellipsis md:whitespace-nowrap text-gray-500">
          {description ||
            "This event has no description! Click to get more information"}
        </p>
        <div className="flex items-center justify-between">
          <div className="self-start mt-2">{dateParagraph}</div>
          {/* isActive indicator **/}
          {new Date() >= new Date(start) && new Date() <= new Date(end) && (
            <div className="bg-gradient-to-r from-green-400 to-green-800 flex items-center justify-center w-[25%] rounded-lg p-0.5 m-2">
              <p className="text-white font bold px-1">Active</p>
            </div>
          )}
        </div>
      </div>
      <Category category={category} />
      <Divider />
      {labels && <Labels labels={labels} />}
    </div>
  );
};

export default Event;
