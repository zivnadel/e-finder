import React from "react";
import { Element } from "react-scroll";

import { AiFillClockCircle, AiOutlineGlobal } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import EventModel from "../../../models/EventModel";
import {
  capitalizeAndRemoveDashes,
  getCategoryDetails,
} from "../../../utils/generalUtils";
import DetailBox from "./DetailBox";
import { FaPlane } from "react-icons/fa";
import { BsQuestionCircleFill } from "react-icons/bs";

interface Props {
  event: EventModel;
}

const Details: React.FC<Props> = ({ event }) => {
  React.useEffect(() => {
    console.log(event);
  }, [event]);

  const { icon, description } = getCategoryDetails(event.category);

  // transform the date strings to more readable format
  const startDate = event.start.split("T")[0].replace(/-/g, ".");
  const startTime = event.start.split("T")[1].split(":").slice(0, 2).join(":");

  const endDate = event.end.split("T")[0].replace(/-/g, ".");
  const endTime = event.end.split("T")[1].split(":").slice(0, 2).join(":");

  const predictedEndDate =
    event.predicted_end?.split("T")[0].replace(/-/g, ".") || "";
  const predictedEndTime =
    event.predicted_end?.split("T")[1].split(":").slice(0, 2).join(":") || "";

  return (
    <Element
      name="details"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-2"
    >
      <DetailBox
        title="Category"
        content={capitalizeAndRemoveDashes(event.category)}
        description={description}
        icon={icon}
      />
      <DetailBox
        title="Start Time"
        content={`${startDate}, ${startTime}`}
        description="The date and time the event starts"
        icon={<AiFillClockCircle className="text-4xl" />}
      />
      {new Date(endDate) !== new Date(startDate) && endTime !== startTime ? (
        <DetailBox
          title="Official End Time"
          content={`${endDate}, ${endTime}`}
          description="The official date and time the event ends"
          icon={<AiFillClockCircle className="text-4xl" />}
        />
      ) : (
        <></>
      )}
      {event.predicted_end ? (
        <DetailBox
          title="Predicted End Time"
          content={`${predictedEndDate}, ${predictedEndTime}`}
          description="The predicted date and time the event ends"
          icon={<BsQuestionCircleFill className="text-4xl" />}
        />
      ) : (
        <></>
      )}
      {event.phq_attendance ? (
        <DetailBox
          title="Predicted Attendance"
          content={`${event.phq_attendance} People`}
          description="The predicted attendance at the event"
          // eslint-disable-next-line react/jsx-no-undef
          icon={<HiUserGroup className="text-4xl" />}
        />
      ) : (
        <></>
      )}
      {event.rank ? (
        <DetailBox
          title="Global Rank"
          content={`${event.rank.toString()} Points`}
          description="The global rank of the event (out of 100)"
          // eslint-disable-next-line react/jsx-no-undef
          icon={<AiOutlineGlobal className="text-4xl" />}
        />
      ) : (
        <></>
      )}
      {event.local_rank ? (
        <DetailBox
          title="Local Rank"
          content={`${event.local_rank} Points`}
          description="The local (regional) rank of the event (out of 100)"
          // eslint-disable-next-line react/jsx-no-undef
          icon={<IoLocationSharp className="text-4xl" />}
        />
      ) : (
        <></>
      )}
      {event.aviation_rank ? (
        <DetailBox
          title="Aviation Impact"
          content={`${event.aviation_rank} Points`}
          description="A metric indicating how impactful the event is on aviation traffic (represented in points, out of 100)"
          // eslint-disable-next-line react/jsx-no-undef
          icon={<FaPlane className="text-4xl" />}
        />
      ) : (
        <></>
      )}
    </Element>
  );
};

export default Details;
