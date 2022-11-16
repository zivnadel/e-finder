import React from "react";
import { Element } from "react-scroll";

import {
  AiFillClockCircle,
  AiFillLock,
  AiFillUnlock,
  AiOutlineGlobal,
} from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import EventModel from "../../../models/EventModel";
import { capitalizeAndRemoveDashes } from "../../../utils/generalUtils";
import DetailBox from "./DetailBox";
import { FaPlane } from "react-icons/fa";
import { BsHourglassSplit, BsQuestionCircleFill } from "react-icons/bs";
import { getCategoryDetails } from "../Category";
import Labels from "./Labels";
import { MdOutlineLocalFlorist, MdOutlineLocationCity } from "react-icons/md";

interface Props {
  event: EventModel;
  address: string;
}

const Details: React.FC<Props> = ({ event, address }) => {
  React.useEffect(() => {
    console.log(event);
  }, [event]);

  const { icon, description } = getCategoryDetails(event.category);

  const entity = event.entities.find(
    (entity) => entity.type === "venue" || entity.type === "airport"
  );

  // transform the date strings to more readable format
  const startDate = event.start.split("T")[0].replace(/-/g, ".");
  const startTime = event.start.split("T")[1].split(":").slice(0, 2).join(":");

  const endDate = event.end.split("T")[0].replace(/-/g, ".");
  const endTime = event.end.split("T")[1].split(":").slice(0, 2).join(":");

  const predictedEndDate =
    event.predicted_end?.split("T")[0].replace(/-/g, ".") || "";
  const predictedEndTime =
    event.predicted_end?.split("T")[1].split(":").slice(0, 2).join(":") || "";

  const updatedDate = event.updated?.split("T")[0].replace(/-/g, ".") || "";
  const updatedTime =
    event.updated?.split("T")[1].split(":").slice(0, 2).join(":") || "";

  return (
    <Element name="details">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-5 gap-5">
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
          icon={<AiFillClockCircle />}
        />
        {new Date(endDate) !== new Date(startDate) && endTime !== startTime ? (
          <DetailBox
            title="Official End Time"
            content={`${endDate}, ${endTime}`}
            description="The official date and time the event ends"
            icon={<AiFillClockCircle />}
          />
        ) : (
          <></>
        )}
        {event.predicted_end ? (
          <DetailBox
            title="Predicted End Time"
            content={`${predictedEndDate}, ${predictedEndTime}`}
            description="The predicted date and time the event ends"
            icon={<BsQuestionCircleFill />}
          />
        ) : (
          <></>
        )}
        {event.duration ? (
          <DetailBox
            title="Expected Duration"
            content={`${(+event.duration / 60 / 60).toFixed(1)} Hours`}
            description="The expected duration of the event (in hours)"
            icon={<BsHourglassSplit />}
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
            icon={<HiUserGroup />}
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
            icon={<AiOutlineGlobal />}
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
            icon={<MdOutlineLocalFlorist />}
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
            icon={<FaPlane />}
          />
        ) : (
          <></>
        )}
        <DetailBox
          title="Event Privacy"
          content={`${event.private ? "Private" : "Public"} Event`}
          description="Whether the event is private or public"
          icon={event.private ? <AiFillLock /> : <AiFillUnlock />}
        />
        {entity ? (
          <DetailBox
            title={capitalizeAndRemoveDashes(entity.type)}
            content={entity.name}
            description={`The ${entity.type} associated with the event`}
            icon={<MdOutlineLocationCity />}
          />
        ) : (
          <></>
        )}
        <DetailBox
          title="Address"
          content={address}
          description="The address of the event"
          icon={<IoLocationSharp />}
        />
      </div>
      {event.labels ? <Labels labels={event.labels} /> : <></>}
      <p className="pl-6 my-1 text-gray-400 font-medium text-lg">{`Last updated on ${updatedDate} at ${updatedTime}`}</p>
    </Element>
  );
};

export default Details;
