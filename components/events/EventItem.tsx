import React from "react";
import { twMerge } from "tailwind-merge";
import CategoryModel from "../../models/CategoryModel";
import { LatLng } from "../../models/Location";
import { monthNames, stripLeadingZerosDate } from "../../utils/dateUtils";
import Divider from "../ui/Divider";
import Category from "./Category";
import EventIcons from "./EventIcons";
import Labels from "./Labels";

// component representing an event in the grid

interface Props {
  className?: string;
  title: string;
  description?: string;
  rank: number;
  start: string;
  end: string;
  isPrivate: boolean;
  location: LatLng;
  category: CategoryModel;
  labels: string[];
}

const Event: React.FC<Props> = ({
  className,
  title,
  description,
  rank,
  start,
  end,
  isPrivate,
  location,
  category,
  labels,
}) => {
  // transform the date strings to more readable format
  const startDate = stripLeadingZerosDate(start.split("T")[0]).split("-");
  const startTime = start.split("T")[1].split(":");

  const endDate = stripLeadingZerosDate(end.split("T")[0]).split("-");
  const endTime = end.split("T")[1].split(":");

  // create the paragraph for displaying the dates and hours
  let dateParagraph: JSX.Element;

  if (startDate.join("-") === endDate.join("-")) {
    dateParagraph = (
      <div className="mt-3 font-bold">
        <p className="inline text-green-700">
          {`${monthNames[+startDate[1] - 1]} ${startDate[2]}, ${startDate[0]}`}{" "}
          |{" "}
        </p>
        <p className="inline text-green-500">
          {startTime.join(":") === endTime.join(":")
            ? `${startTime[0]}:${startTime[1]}`
            : `${startTime[0]}:${startTime[1]} - ${endTime[0]}:${endTime[1]}`}
        </p>
      </div>
    );
  } else {
    dateParagraph = (
      <p className="mt-2 font-semibold">
        From{" "}
        <span className="text-rose-500">{`${monthNames[+startDate[1] - 1]} ${
          startDate[2]
        }, ${startDate[0]}`}</span>{" "}
        to{" "}
        <span className="text-rose-500">{`${monthNames[+endDate[1] - 1]} ${
          endDate[2]
        }, ${endDate[0]}`}</span>{" "}
      </p>
    );
  }

  return (
    <div
      className={twMerge(
        `flex flex-col opacity-60 shadow-xl p-5 rounded-lg transition-all hover:opacity-100 hover:scale-105 ${className}`
      )}
    >
      <EventIcons rank={rank} isPrivate={isPrivate} location={location} />
      <div className="my-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-500">
          {description ||
            "This event has no description! Click to get more information"}
        </p>
        {dateParagraph}
        {/* isActive indicator **/}
        {(new Date() >= new Date(start) && new Date() <= new Date(end)) ||
          (true && <p className="mt-3 font-bold text-green-500">Active now</p>)}
      </div>
      <Category category={category} />
      <Divider />
      <Labels labels={labels} />
    </div>
  );
};

export default Event;
